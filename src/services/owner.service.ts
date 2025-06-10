import {BindingScope, inject, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {HttpErrors} from '@loopback/rest';
import {OwnerRegistrationDto} from '../dtos/owner.dto';
import {Owner} from '../models';
import {OwnerRepository, SessionRepository, UsersRepository} from '../repositories';
import {UniqueIdService} from './unique-id.service';

@injectable({scope: BindingScope.SINGLETON})
export class OwnerService {
  constructor(
    @repository(UsersRepository)
    private usersRepository: UsersRepository,

    @repository(OwnerRepository)
    private ownerRepository: OwnerRepository,

    @repository(SessionRepository)
    private sessionRepository: SessionRepository,

    @inject('services.UniqueIdService')
    private uniqueIdService: UniqueIdService,
  ) { }

  async ownerRegistration(
    ownerData: OwnerRegistrationDto,
    userId: string,
  ): Promise<Owner> {
    // 1. Check if user exists in Users table
    const user = await this.usersRepository.findById(userId);
    if (!user) {
      throw new HttpErrors.NotFound(`User not found.`);
    }

    // 2. Check if user already registered as an owner
    const existingOwner = await this.ownerRepository.findOne({
      where: {userId},
    });

    if (existingOwner) {
      throw new HttpErrors.BadRequest('User already registered as an owner.');
    }

    // 3. Generate orgId
    const orgId = await this.uniqueIdService.generateNextOrgId();

    // 4. Combine address fields into a single object
    const ownerAdd = {
      houseNo: ownerData.houseNo,
      buildingName: ownerData.buildingName,
      street: ownerData.street,
      area: ownerData.area,
      landmark: ownerData.landmark,
      city: ownerData.city,
      district: ownerData.district,
      state: ownerData.state,
      country: ownerData.country,
      pincode: ownerData.pincode,
    };

    // 5. Create the Owner entity
    const newOwner = await this.ownerRepository.create({
      ownerFirstName: ownerData.firstName,
      ownerLastName: ownerData.lastName,
      ownerEmail: ownerData.email,
      ownerPhone: ownerData.contactNo,
      alternatePhone: ownerData.alternatePhone,
      ownerAdd: ownerAdd,
      orgId: orgId,
      userId: userId,
      createdDate: new Date().toISOString(),
      upDatedDate: new Date().toISOString(),
      createdBy: 'system',
      updatedBy: 'system',
    });

    /* Only Perform if user is New and Unregistered */
    // 6. Update orgId in Sessions where userId matches
    await this.sessionRepository.updateAll(
      {orgId: orgId},   // data to update
      {userId: userId}, // where filter
    );

    /* Only Perform if user is New and Unregistered */
    // 7. Update orgId in Users where userId matches
    await this.usersRepository.updateAll(
      {orgId: orgId},   // data to update
      {userId: userId}, // where filter
    );

    // Update isRegistered Field in Users to true when Organization is Also Registered
    // await this.usersRepository.updateAll(
    //   {isRegistered: true},   // data to update
    //   {userId: userId}, // where filter
    // );

    return newOwner;
  }

}
