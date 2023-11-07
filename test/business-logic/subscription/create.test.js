import create from '../../../src/business-logic/subscription/create';
import ClubLogic from '../../../src/business-logic/club';
import SubscriptionModel from '../../../src/models/subscription/subscription.model';
import HTTPError from '../../../src/errors/http.error';
import subscriptionErrors from '../../../src/errors/subscription.errors';
import checkClubExists from '../../../src/utils/check-club-exists.util';

jest.mock('../../../src/business-logic/club');
jest.mock('../../../src/models/subscription/subscription.model');
jest.mock('../../../src/utils/check-club-exists.util');

describe('Business logic: Subscription: Create', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should throw an error when the club does not exist', async () => {
    const clubId = 'nonExistingClubId';
    const userId = 'validUserId';
    const args = { name: 'subscription1', price: 100, clubId, userId };

    ClubLogic.checkIfUserIsAdmin.mockRejectedValue(new HTTPError({ ...subscriptionErrors.clubNotFound, code: 404 }));

    await expect(create(args)).rejects.toThrow('the club not found');
    expect(ClubLogic.checkIfUserIsAdmin).toHaveBeenCalledWith({ clubId, userId });
  });

  it('should throw an error when the user is not an admin', async () => {
    const clubId = 'validClubId';
    const userId = 'nonAdminUserId';
    const args = { name: 'subscription1', price: 100, clubId, userId };

    checkClubExists.mockResolvedValue();
    ClubLogic.checkIfUserIsAdmin.mockRejectedValue(new Error('User is not an admin'));

    await expect(create(args)).rejects.toThrow('User is not an admin');
    expect(ClubLogic.checkIfUserIsAdmin).toHaveBeenCalledWith({ clubId, userId });
  });

  it('should create a subscription when the subscription details are valid', async () => {
    const clubId = 'validClubId';
    const userId = 'validUserId';
    const args = { name: 'subscription1', price: 100, clubId, userId };
    const subscription = { _id: 'subscription1', ...args };

    ClubLogic.checkIfUserIsAdmin.mockResolvedValue();
    SubscriptionModel.create.mockResolvedValue(subscription);

    const result = await create(args);

    expect(result).toEqual(subscription);
    expect(ClubLogic.checkIfUserIsAdmin).toHaveBeenCalledWith({ clubId, userId });
    expect(SubscriptionModel.create).toHaveBeenCalledWith(args);
  });

  it('should throw an error when the subscription details are invalid', async () => {
    const clubId = 'validClubId';
    const userId = 'validUserId';
    const args = { name: '', price: 'invalidPrice', clubId, userId };
  
    ClubLogic.checkIfUserIsAdmin.mockResolvedValue();
    SubscriptionModel.create.mockRejectedValue(new Error('Invalid subscription details'));
  
    await expect(create(args)).rejects.toThrow('Invalid subscription details');
    expect(ClubLogic.checkIfUserIsAdmin).toHaveBeenCalledWith({ clubId, userId });
    expect(SubscriptionModel.create).toHaveBeenCalledWith(args);
  });

});