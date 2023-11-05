import { expect } from '@jest/globals';
import AuthLogic from '../../../src/business-logic/auth';
import login from '../../../src/controllers/auth/login.controller';
import HTTPError from '../../../src/errors/http.error';
import authErrors from '../../../src/errors/auth.errors';
import { returnErrorResponse } from '../../../src/errors/error-response';
import { loginValidation } from '../../../src/validations/auth.validations';

jest.mock('../../../src/business-logic/auth');
describe('login', () => {

  let req;
  let res;

  beforeEach(() => {
    req = {
      body: {
        email: 'example@example.com', 
        password: 'mypassword123',  
      },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
  });

  it('should return a 200 status and a token on successful login', async () => {

    AuthLogic.login = jest.fn().mockResolvedValue('mocked_token');

    await login(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({ token: 'mocked_token' });
    expect(AuthLogic.login).toHaveBeenCalledWith(req.body);
  });

  it('should return an error response on failed login', async () => {
    AuthLogic.login = jest.fn().mockRejectedValue(new Error('Mocked login error'));

    await login(req, res);


    expect(res.status).toHaveBeenCalled();
    expect(res.send).toHaveBeenCalled();  
  });

  it('should validate the request body', async () => {
  
    loginValidation.validateAsync = jest.fn().mockResolvedValue();

    await login(req, res);

    expect(loginValidation.validateAsync).toHaveBeenCalledWith(req.body);
  });
});

