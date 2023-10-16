import { expect, jest } from '@jest/globals';
import usersLogic from '../../../src/business-logic/users';
import list from '../../../src/controllers/user/list.controller';
import { HTTPError } from '../../../src/errors/error-response';

jest.mock('../../../src/business-logic/users', () => ({
  list: jest.fn().mockReturnThis(),
}));

let resMock;

describe('Controller: List users controller', () => {
  beforeEach(() => {
    resMock = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('Should return a empty list', async () => {
    usersLogic.list.mockReturnValue([]);

    await list({}, resMock);

    expect(resMock.status).toBeCalledWith(200);
    expect(resMock.send).toBeCalledWith({ users: [] });
    expect(usersLogic.list).toHaveBeenCalled();
  });

  it('Should return a list of users', async () => {
    const users = [{ name: 'user1', email: 'email@gmail.com' }];
    usersLogic.list.mockReturnValue(users);

    await list({}, resMock);

    expect(resMock.status).toBeCalledWith(200);
    expect(resMock.send).toBeCalledWith({ users });
    expect(usersLogic.list).toHaveBeenCalled();
  });

  it('Should throw an error when the logic fails', async () => {
    const error = new HTTPError({ name: 'error', message: 'some-error', code: 400 });

    usersLogic.list.mockRejectedValue(error);

    await list({}, resMock);

    expect(resMock.status).toBeCalledWith(400);
    expect(resMock.send).toBeCalledWith({ error: { ...error } });
    expect(usersLogic.list).toHaveBeenCalled();
  });
});
