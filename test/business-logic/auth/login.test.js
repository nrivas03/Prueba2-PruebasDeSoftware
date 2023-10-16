import { expect, jest } from '@jest/globals';
import login from '../../../src/business-logic/auth/login';
import UserLogic from '../../../src/business-logic/users';

jest.mock('../../../src/business-logic/users');

describe('Logic: Auth: Login', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it.skip('Should return a valid token', async () => {
    UserLogic.getOne.mockReturnValue({ name: 'juan', _id: 1 });
    const result = await login({ email: 'email@gmail.com', password: '123asd' });
  });
});
