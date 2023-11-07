import listByClub from '../../../src/business-logic/member/list-by-club';
import ClubLogic from '../../../src/business-logic/club';
import MemberModel from '../../../src/models/member/member.model';
import clubErrors from '../../../src/errors/club.errors';
import HTTPError from '../../../src/errors/http.error';

// Mock the dependencies
jest.mock('../../../src/business-logic/club');
jest.mock('../../../src/models/member/member.model');

describe('Business logic: Member: List By Club', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return a list of members when called with valid clubId and userId', async () => {
    const clubId = 'validClubId';
    const userId = 'validUserId';
    const members = [{ _id: 'member1' }, { _id: 'member2' }];

    ClubLogic.checkIfUserIsAdmin.mockResolvedValue();
    MemberModel.find.mockResolvedValue(members);

    const result = await listByClub({ clubId, userId });

    expect(result).toEqual(members);
    expect(ClubLogic.checkIfUserIsAdmin).toHaveBeenCalledWith({ clubId, userId });
    expect(MemberModel.find).toHaveBeenCalledWith({ clubId });
  });

  it('should throw an error when called with non-existing clubId', async () => {
    const clubId = 'nonExistingClubId';
    const userId = 'validUserId';

    ClubLogic.checkIfUserIsAdmin.mockRejectedValue(new Error('Club not found'));

    await expect(listByClub({ clubId, userId })).rejects.toThrow('Club not found');
    expect(ClubLogic.checkIfUserIsAdmin).toHaveBeenCalledWith({ clubId, userId });
  });

  it('should throw an error when called with userId that is not an admin', async () => {
    const clubId = 'validClubId';
    const userId = 'nonAdminUserId';
    const expectedError = new HTTPError({ ...clubErrors.userIsNotTheAdmin, code: 403 });

    ClubLogic.checkIfUserIsAdmin.mockRejectedValue(expectedError);

    await expect(listByClub({ clubId, userId })).rejects.toThrow(expectedError);
    expect(ClubLogic.checkIfUserIsAdmin).toHaveBeenCalledWith({ clubId, userId });
  });
});
