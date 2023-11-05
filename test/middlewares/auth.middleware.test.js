import authMiddleware from "../../src/middlewares/auth.middleware";
import HTTPError from "../../src/errors/http.error";
import { verifyToken } from '../../src/utils/jwt.util';
import { returnErrorResponse } from '../../src/errors/error-response';

jest.mock('../../src/errors/http.error');
jest.mock('../../src/utils/jwt.util');
jest.mock('../../src/errors/error-response');


describe('Middlewares: auth.middleware', () => {
    const mockNext = jest.fn();

    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
  
    beforeEach(() => {
      jest.resetAllMocks();
    });
  
    it('should return an error response if token is not sent', () => {
      const mockReq = {
        headers: {},
      };
  
      authMiddleware(mockReq, mockRes, mockNext);
      expect(returnErrorResponse).toHaveBeenCalledWith({
        error: expect.any(HTTPError),
        res: mockRes,
      });
      expect(HTTPError).toHaveBeenCalledWith({
        name: 'auhtorization_token_is_required',
        message: 'the authorization header is needed and the token',
        code: 401,
      });
      expect(mockNext).not.toHaveBeenCalled();
    });


    it('should call returnErrorResponse with an error when verifyToken throws an error', () => {
        const mockReq = {
          headers: {
            authorization: 'Bearer invalidtoken',
          },
        };

        const testError = new Error('Invalid token');
        verifyToken.mockImplementation(() => {
          throw testError;
        });
    
        authMiddleware(mockReq, mockRes, mockNext);
    
        expect(returnErrorResponse).toHaveBeenCalledWith({ error: testError, res: mockRes });
        expect(mockNext).not.toHaveBeenCalled();
      });
});

