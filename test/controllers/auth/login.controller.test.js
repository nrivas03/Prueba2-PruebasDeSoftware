import { expect } from '@jest/globals';
import AuthLogic from '../../../src/business-logic/auth';
import login from '../../../src/controllers/auth/login.controller';
import HTTPError from '../../../src/errors/http.error';
import authErrors from '../../../src/errors/auth.errors';
import { returnErrorResponse } from '../../../src/errors/error-response';
import { loginValidation } from '../../../src/validations/auth.validations';

jest.mock('../../../src/business-logic/auth');
describe('login', () => {
  // Supongamos que tienes una función mock de Express para req y res

  let req;
  let res;

  beforeEach(() => {
    req = {
      body: {
        email: 'example@example.com', // Debe ser una dirección de correo electrónico válida
        password: 'mypassword123',  
      },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
  });

  it('should return a 200 status and a token on successful login', async () => {
    // Mockear la función AuthLogic.login para devolver un token simulado
    AuthLogic.login = jest.fn().mockResolvedValue('mocked_token');

    await login(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({ token: 'mocked_token' });
    expect(AuthLogic.login).toHaveBeenCalledWith(req.body);
  });

  it('should return an error response on failed login', async () => {
    // Mockear la función AuthLogic.login para lanzar un error simulado
    AuthLogic.login = jest.fn().mockRejectedValue(new Error('Mocked login error'));

    await login(req, res);

    // Asegurarse de que se llama a la función de manejo de errores (returnErrorResponse)
    expect(res.status).toHaveBeenCalled(); // Asegúrate de verificar el código de estado específico
    expect(res.send).toHaveBeenCalled();   // Asegúrate de verificar el mensaje de error específico
  });

  it('should validate the request body', async () => {
    // Mockear la función de validación para que siempre pase
    loginValidation.validateAsync = jest.fn().mockResolvedValue();

    await login(req, res);

    // Asegurarse de que se llame a la función de validación con el cuerpo de la solicitud
    expect(loginValidation.validateAsync).toHaveBeenCalledWith(req.body);
  });
});

