import {expect, jest} from '@jest/globals';
import UserLogic from '../../../src/business-logic/users';
import list from '../../../src/controllers/user/list.controller';
import HTTPError from '../../../src/errors/http.error';


jest.mock('../../../src/business-logic/users');

describe('Controller: User: List', () => {
    let resMock;
    const users = [
        { name: 'User 1' },
        { name: 'User 2' },
    ];

    beforeEach(() => {
        resMock = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('Should list users', async () => {
        UserLogic.list.mockReturnValue(users);

        const req = {};
        const response = await list(req, resMock);
        expect(resMock.send).toBeCalledWith({ users });
        expect(UserLogic.list).toHaveBeenCalled;
    }
    );

    it('Should handle errors', async () => {
        UserLogic.list.mockImplementationOnce(() => {
            throw new HTTPError({
                name: 'ValidationError', 
                message: 'User ID is invalid', 
                code: 400, 
            });
        });
    
        const req = {};
    
        const response = await list(req, resMock);
    
        expect(resMock.send).toBeCalledWith({
            error: new HTTPError({
                name: 'ValidationError', 
                message: 'User ID is invalid', 
                code: 400, 
            }),
        });
    });    

}
);