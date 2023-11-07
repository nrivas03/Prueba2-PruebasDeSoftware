import HTTPError from "../../src/errors/http.error";
import { returnErrorResponse } from '../../src/errors/error-response';
import UserModel from '../../src/models/user/user.model';
import isAdminMiddleware from "../../src/middlewares/is-admin.middleware";

jest.mock('../../src/errors/http.error');
jest.mock('../../src/errors/error-response');
jest.mock('../../src/models/user/user.model', () => ({
    findById: jest.fn().mockImplementation(() => ({
        select: jest.fn().mockResolvedValue({ isAdmin: false }),
    })),
}));

describe('Middlewares: auth.middleware', () => {

    const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
    };
    const mockNext = jest.fn();


    beforeEach(() => {
        jest.resetAllMocks();
    });

    it('should call returnErrorResponse with a forbidden_not_admin if user is not admin', async () => {
        const mockReq = {
            userId: 'nonAdminUserId',
        };

        UserModel.findById.mockReturnValue({
            select: jest.fn().mockResolvedValue({ isAdmin: false })
        });

        await isAdminMiddleware(mockReq, mockRes, mockNext);
        expect(HTTPError).toHaveBeenCalledWith({
            name: 'forbidden_not_admin',
            message: 'the users is not admin',
            code: 403,
        });

        expect(returnErrorResponse).toHaveBeenCalled();
        expect(mockNext).not.toHaveBeenCalled();
    });


    it('should call returnErrorResponse with the appropriate error when there is an unexpected error', async () => {
        const mockReq = {
            userId: 'someUserId',
        };
        const error = new Error('Unexpected error');

        UserModel.findById.mockImplementation(() => {
            throw error;
        });

        await isAdminMiddleware(mockReq, mockRes, mockNext);

        expect(returnErrorResponse).toHaveBeenCalledWith({ error, res: mockRes });
        expect(mockNext).not.toHaveBeenCalled();
    });

    it('should call next() when the user is an admin', async () => {
        const mockReq = {
            userId: 'adminUserId',
        };

        UserModel.findById.mockReturnValue({
            select: jest.fn().mockResolvedValue({ isAdmin: true })
        });

        await isAdminMiddleware(mockReq, mockRes, mockNext);

        expect(mockNext).toHaveBeenCalled();
    });
});

