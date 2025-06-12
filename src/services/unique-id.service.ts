import {BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {BranchUnitRepository, OrganizationRepository, SetupRepository} from '../repositories';

@injectable({scope: BindingScope.SINGLETON})
export class UniqueIdService {
  constructor(
    @repository(SetupRepository)
    private setupRepository: SetupRepository,

    @repository(OrganizationRepository)
    private organizationRepository: OrganizationRepository,

    @repository(BranchUnitRepository)
    private branchUnitRepository: BranchUnitRepository,

  ) { }

  /* To Increment and Update User Id */
  async generateNextUserId(): Promise<string> {
    const setup = await this.setupRepository.findOne();
    if (!setup) throw new Error('Setup configuration not found');

    const prefix = 'user-';
    const currentId = parseInt(setup.nextUserId.replace(prefix, ''), 10);
    const newUserId = `${prefix}${currentId + 1}`;

    // update back
    await this.setupRepository.updateById(setup.id, {
      nextUserId: newUserId,
    });

    return setup.nextUserId; // return the one used before increment
  }

  /* To Increment and Update Organization Id */
  async generateNextOrgId(): Promise<string> {
    const setup = await this.setupRepository.findOne();
    if (!setup) throw new Error('Setup configuration not found');

    const prefix = 'org-';
    const currentId = parseInt(setup.nextOrgId.replace(prefix, ''), 10);
    const newOrgId = `${prefix}${currentId + 1}`;

    // update back
    await this.setupRepository.updateById(setup.id, {
      nextOrgId: newOrgId,
    });

    return setup.nextOrgId; // return the one used before increment
  }

  /* To Increment and Update Branch Id */
  async generateNextBranchId(orgId: string): Promise<string> {
    // 1. Find organization by orgId
    const organization = await this.organizationRepository.findOne({where: {orgId}});
    if (!organization) throw new Error(`Organization not found with orgId: ${orgId}`);

    const fullBranchId = organization.nextbranchId; // e.g., "org-1000-branch-1000"

    // 2. Extract current numeric branch number
    const parts = fullBranchId.split('-');
    const currentBranchNumber = parseInt(parts[3], 10); // "1000"

    const newBranchNumber = currentBranchNumber + 1;
    const newBranchId = `org-${orgId.split('-')[1]}-branch-${newBranchNumber}`;

    // 3. Update back into organization record
    await this.organizationRepository.updateAll(
      {nextbranchId: newBranchId},
      {orgId}
    );

    // 4. Return current value before incrementing
    return fullBranchId;
  }

  /* Generating Next ids in Branch Unit Table */

  /* Generating Next Brand Id */
  async generateNextBrandId(orgId: string): Promise<string> {
    const branchUnit = await this.branchUnitRepository.findOne({where: {orgId}});
    if (!branchUnit) throw new Error('BranchUnit configuration not found');

    const prefix = 'brand-';
    const currentId = parseInt(branchUnit.nextBrandId.replace(prefix, ''), 10);
    const newId = `${prefix}${currentId + 1}`;

    // update back
    await this.branchUnitRepository.updateById(branchUnit.id, {
      nextBrandId: newId,
    });

    return branchUnit.nextBrandId; // return the one used before increment
  }

  /* Generating Next ProductType Id */
  async generateNextProductTypeId(orgId: string): Promise<string> {
    const branchUnit = await this.branchUnitRepository.findOne({where: {orgId}});
    if (!branchUnit) throw new Error('BranchUnit configuration not found');

    const prefix = 'productType-';
    const currentId = parseInt(branchUnit.nextproductTypeId.replace(prefix, ''), 10);
    const newId = `${prefix}${currentId + 1}`;

    // update back
    await this.branchUnitRepository.updateById(branchUnit.id, {
      nextproductTypeId: newId,
    });

    return branchUnit.nextproductTypeId; // return the one used before increment
  }

  /* Generating Next Product Id */
  async generateNextProductId(orgId: string): Promise<string> {
    const branchUnit = await this.branchUnitRepository.findOne({where: {orgId}});
    if (!branchUnit) throw new Error('BranchUnit configuration not found');

    const prefix = 'product-';
    const currentId = parseInt(branchUnit.nextproductId.replace(prefix, ''), 10);
    const newId = `${prefix}${currentId + 1}`;

    await this.branchUnitRepository.updateById(branchUnit.id, {
      nextproductId: newId,
    });

    return branchUnit.nextproductId;
  }

  /* Generating Next ProductIUnit Id */
  async generateNextProductUnitId(orgId: string): Promise<string> {
    const branchUnit = await this.branchUnitRepository.findOne({where: {orgId}});
    if (!branchUnit) throw new Error('BranchUnit configuration not found');

    const prefix = 'productUnit-';
    const currentId = parseInt(branchUnit.nextproductUnitId.replace(prefix, ''), 10);
    const newId = `${prefix}${currentId + 1}`;

    await this.branchUnitRepository.updateById(branchUnit.id, {
      nextproductUnitId: newId,
    });

    return branchUnit.nextproductUnitId;
  }

  /* Generating Next Discount Id */
  async generateNextDiscountId(orgId: string): Promise<string> {
    const branchUnit = await this.branchUnitRepository.findOne({where: {orgId}});
    if (!branchUnit) throw new Error('BranchUnit configuration not found');

    const prefix = 'discount-';
    const currentId = parseInt(branchUnit.nextDiscountId.replace(prefix, ''), 10);
    const newId = `${prefix}${currentId + 1}`;

    await this.branchUnitRepository.updateById(branchUnit.id, {
      nextDiscountId: newId,
    });

    return branchUnit.nextDiscountId;
  }

  /* Generating Next PaymentInfo Id */
  async generateNextPaymentInfoId(orgId: string): Promise<string> {
    const branchUnit = await this.branchUnitRepository.findOne({where: {orgId}});
    if (!branchUnit) throw new Error('BranchUnit configuration not found');

    const prefix = 'paymentInfo-';
    const currentId = parseInt(branchUnit.nextpaymentInfoId.replace(prefix, ''), 10);
    const newId = `${prefix}${currentId + 1}`;

    await this.branchUnitRepository.updateById(branchUnit.id, {
      nextpaymentInfoId: newId,
    });

    return branchUnit.nextpaymentInfoId;
  }

  /* Generating Next PurchaseBill Id */
  async generateNextPurchasedBillId(orgId: string): Promise<string> {
    const branchUnit = await this.branchUnitRepository.findOne({where: {orgId}});
    if (!branchUnit) throw new Error('BranchUnit configuration not found');

    const prefix = 'purchasedBill-';
    const currentId = parseInt(branchUnit.nextpurchasedBillId.replace(prefix, ''), 10);
    const newId = `${prefix}${currentId + 1}`;

    await this.branchUnitRepository.updateById(branchUnit.id, {
      nextpurchasedBillId: newId,
    });

    return branchUnit.nextpurchasedBillId;
  }

  /* Generating Next SellBill Id */
  async generateNextSellBillId(orgId: string): Promise<string> {
    const branchUnit = await this.branchUnitRepository.findOne({where: {orgId}});
    if (!branchUnit) throw new Error('BranchUnit configuration not found');

    const prefix = 'sellBill-';
    const currentId = parseInt(branchUnit.nextsellBillId.replace(prefix, ''), 10);
    const newId = `${prefix}${currentId + 1}`;

    await this.branchUnitRepository.updateById(branchUnit.id, {
      nextsellBillId: newId,
    });

    return branchUnit.nextsellBillId;
  }

  /* Generating Next Supplier Id */
  async generateNextSupplierId(orgId: string): Promise<string> {
    const branchUnit = await this.branchUnitRepository.findOne({where: {orgId}});
    if (!branchUnit) throw new Error('BranchUnit configuration not found');

    const prefix = 'supplier-';
    const currentId = parseInt(branchUnit.nextsupplierId.replace(prefix, ''), 10);
    const newId = `${prefix}${currentId + 1}`;

    await this.branchUnitRepository.updateById(branchUnit.id, {
      nextsupplierId: newId,
    });

    return branchUnit.nextsupplierId;
  }

  /* Generating Next Customer Id */
  async generateNextCustomerId(orgId: string): Promise<string> {
    const branchUnit = await this.branchUnitRepository.findOne({where: {orgId}});
    if (!branchUnit) throw new Error('BranchUnit configuration not found');

    const prefix = 'customer-';
    const currentId = parseInt(branchUnit.nextcustomerId.replace(prefix, ''), 10);
    const newId = `${prefix}${currentId + 1}`;

    await this.branchUnitRepository.updateById(branchUnit.id, {
      nextcustomerId: newId,
    });

    return branchUnit.nextcustomerId;
  }

  /* Generating Next Staff Id */
  async generateNextStaffId(orgId: string): Promise<string> {
    const branchUnit = await this.branchUnitRepository.findOne({where: {orgId}});
    if (!branchUnit) throw new Error('BranchUnit configuration not found');

    const prefix = 'staff-';
    const currentId = parseInt(branchUnit.nextStaffId.replace(prefix, ''), 10);
    const newId = `${prefix}${currentId + 1}`;

    await this.branchUnitRepository.updateById(branchUnit.id, {
      nextStaffId: newId,
    });

    return branchUnit.nextStaffId;
  }

}
