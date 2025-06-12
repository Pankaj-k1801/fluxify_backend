import {BindingScope, inject, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {AddOrganizationRequest} from '../dtos/organization.dto';
import {Organization} from '../models';
import {BranchUnitRepository, OrganizationRepository, SessionRepository, UsersRepository} from '../repositories';
import {UniqueIdService} from './unique-id.service';

@injectable({scope: BindingScope.TRANSIENT})
export class OrganizationService {
  constructor(/* Add @inject to inject parameters */

    @repository(UsersRepository)
    private usersRepository: UsersRepository,

    @repository(SessionRepository)
    private sessionRepository: SessionRepository,

    @repository(OrganizationRepository)
    private organizationRepository: OrganizationRepository,

    @repository(BranchUnitRepository)
    private branchUnitRepository: BranchUnitRepository,

    @inject('services.UniqueIdService')
    private uniqueIdService: UniqueIdService,
  ) { }

  /*
   * Add service methods here
   */

  /* Find Registred Organization */
  async findIsOrganizationRegistered(userId: string): Promise<{isRegistered: boolean}> {
    // 1. Find the session by userId
    const session = await this.sessionRepository.findOne({where: {userId}});
    if (!session || !session.orgId) {
      // If session or orgId not found, update and return false
      await this.usersRepository.updateById(userId, {isRegistered: false});
      return {isRegistered: false};
    }

    // 2. Find organization by orgId from session
    const organization = await this.organizationRepository.findOne({where: {orgId: session.orgId}});

    // 3. Update isRegistered based on whether organization exists
    const isRegistered = !!organization;
    await this.usersRepository.updateById(userId, {isRegistered});

    // 4. Return the result
    return {isRegistered};
  }

  async addOrganization(data: AddOrganizationRequest): Promise<Organization> {
    const orgAdd = {
      shopNo: data.shopNo,
      buildingName: data.buildingName,
      street: data.street,
      area: data.area,
      landmark: data.landmark,
      city: data.city,
      district: data.district,
      state: data.state,
      country: data.country,
      pincode: data.pincode,
    };

    const intialBranchId = `${data.orgId}-branch-1000`;

    const newOrg = await this.organizationRepository.create({
      orgId: data.orgId,
      orgName: data.orgName,
      orgAdd: orgAdd,
      orgEmail: data.orgEmail,
      orgPhone: data.orgPhone,
      isMultipleBranches: false,
      nextbranchId: intialBranchId,
      createdDate: new Date().toISOString(),
      upDatedDate: new Date().toISOString(),
      createdBy: 'system',
      updatedBy: 'system',
    });

    // 3. Generate next BranchId
    const nextBranchId = await this.uniqueIdService.generateNextBranchId(data.orgId);

    /* Adding Organization as first Branch in BranchUnit */
    await this.branchUnitRepository.create({
      orgId: data.orgId,
      branchId: nextBranchId,
      branchName: data.orgName,
      branchAdd: orgAdd,
      branchPhone: data.orgPhone,
      branchEmail: data.orgEmail,
      branchManagerStaffId: null,
      noOfStaff: 1,
      nextBrandId: 'brand-1000',
      nextproductTypeId: 'productType-1000',
      nextproductId: 'product-1000',
      nextproductUnitId: 'productUnit-1000',
      nextDiscountId: 'discount-1000',
      nextpaymentInfoId: 'paymentInfo-1000',
      nextpurchasedBillId: 'purchasedBill-1000',
      nextsellBillId: 'sellBill-1000',
      nextsupplierId: 'supplier-1000',
      nextcustomerId: 'customer-1000',
      nextStaffId: 'staff-1000',
      createdDate: new Date().toISOString(),
      upDatedDate: new Date().toISOString(),
      createdBy: 'system',
      updatedBy: 'system',
    });

    return newOrg;
  }

}
