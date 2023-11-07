import getOne from '../../../src/business-logic/users/get-one';
import UserModel from '../../../src/models/user/user.model';

jest.mock('../../../src/models/user/user.model');

describe('Business logic: Users: Get One', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return null when the user does not exist', async () => {
    const query = { email: 'nonExistingUser@example.com' };

    UserModel.findOne.mockResolvedValue(null);

    const result = await getOne({ query });

    expect(result).toBeNull();
    expect(UserModel.findOne).toHaveBeenCalledWith(query);
  });

  it('should return the user when the user exists', async () => {
    const query = { email: 'user@example.com' };
    const user = { _id: 'userId', email: 'user@example.com' };

    UserModel.findOne.mockResolvedValue(user);

    const result = await getOne({ query });

    expect(result).toEqual(user);
    expect(UserModel.findOne).toHaveBeenCalledWith(query);
  });

  // TODO
  it.skip('should return the user with the selected and populated fields when the select and populate parameters are provided', async () => {

  });
});
