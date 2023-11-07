import listByClub from '../../../src/business-logic/subscription/list-by-club';
import ClubLogic from '../../../src/business-logic/club';
import SubscriptionModel from '../../../src/models/subscription/subscription.model';

jest.mock('../../../src/business-logic/club');
jest.mock('../../../src/models/subscription/subscription.model');

describe('Business logic: Subscription: List By Club', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should throw an error when the user is not an admin', async () => {
    const clubId = 'validClubId';
    const userId = 'nonAdminUserId';

    ClubLogic.checkIfUserIsAdmin.mockRejectedValue(new Error('User is not an admin'));

    await expect(listByClub({ clubId, userId })).rejects.toThrow('User is not an admin');
    expect(ClubLogic.checkIfUserIsAdmin).toHaveBeenCalledWith({ clubId, userId });
  });

  it('should return a list of subscriptions when the user is an admin', async () => {
    const clubId = 'validClubId';
    const userId = 'validUserId';
    const subscriptions = [{ _id: 'subscription1' }, { _id: 'subscription2' }];

    ClubLogic.checkIfUserIsAdmin.mockResolvedValue();
    SubscriptionModel.find.mockResolvedValue(subscriptions);

    const result = await listByClub({ clubId, userId });

    expect(result).toEqual(subscriptions);
    expect(ClubLogic.checkIfUserIsAdmin).toHaveBeenCalledWith({ clubId, userId });
    expect(SubscriptionModel.find).toHaveBeenCalledWith({ clubId });
  });
});