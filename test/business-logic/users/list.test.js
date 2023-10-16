import { expect, jest } from '@jest/globals';
import userModel from '../../../src/models/user/user.model';
import list from '../../../src/business-logic/users/list.js';

jest.mock('../../../src/models/user/user.model');

describe('Business logic: List users', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('Should return a empty list', async () => {
    userModel.find.mockReturnValue([]);

    const result = await list();
    expect(userModel.find).toHaveBeenCalled();
    expect(result).toEqual([]);
    expect(result).toHaveLength(0);
  });

  it('Should return a list of users', async () => {
    const users = [{ name: 'user1', email: 'email@gmail.com' }];
    userModel.find.mockReturnValue(users);

    const result = await list();
    expect(result).toEqual(users);
    expect(result).toHaveLength(1);
    expect(result[0]).toHaveProperty('name');
    expect(result[0]).toHaveProperty('email');
  });
});
