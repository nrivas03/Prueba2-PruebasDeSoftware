import list from '../../../src/business-logic/club/list';
import ClubModel from '../../../src/models/club/club.model';

jest.mock('../../../src/models/club/club.model');

describe('Business logic: Club: List clubs', () => {
  it('Should list all clubs', async () => {
    const mockClubs = [
      { _id: '1', name: 'Club 1', admin: 'Admin 1', managers: [{ userId: 'User 1' }] },
      { _id: '2', name: 'Club 2', admin: 'Admin 2', managers: [{ userId: 'User 2' }] },
    ];

    ClubModel.find.mockReturnValue({
        populate: jest.fn().mockReturnValue(mockClubs),
    });

    const clubs = await list();

    expect(clubs).toEqual(mockClubs);
    expect(ClubModel.find).toHaveBeenCalledWith({});
    expect(ClubModel.find).toHaveBeenCalledTimes(1);
  });
});