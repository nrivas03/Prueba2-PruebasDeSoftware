import { expect, jest } from '@jest/globals';
import login from '../../../src/business-logic/auth/login';
import UserLogic from '../../../src/business-logic/users';
import { generateToken } from '../../../src/utils/jwt.util';
import authErrors from '../../../src/errors/auth.errors';

jest.mock('../../../src/business-logic/users');
jest.mock('../../../src/utils/jwt.util');

describe('Logic: Auth: Login', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('Should return a valid token', async () => {
    UserLogic.getOne.mockReturnValue({
      name: 'juan',
      _id: 1,
      comparePassword: () => true,
    });

    generateToken.mockReturnValue('valid-token');

    const result = await login({ email: 'email@gmail.com', password: '123asd' });
    expect(result).toEqual('valid-token');
    expect(generateToken).toBeCalledWith({
      data: { userId: 1, name: 'juan' },
      expiresIn: '1d',
    });
    expect(UserLogic.getOne).toBeCalled();
    expect(result).toEqual('valid-token');
  });

  it('Should throw an error when userLogic.getOne throws', async () => {});

  it('Should throw an error invalid credentials when comparePassword return false', async () => {});
});
