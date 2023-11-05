import { expect, jest } from '@jest/globals';
import MemberLogic from '../../../src/business-logic/member';
import listMembers from '../../../src/controllers/club/list-members.controller';
import HTTPError from '../../../src/errors/http.error';
import clubErrors from '../../../src/errors/club.errors';

// Mock MemberLogic
jest.mock('../../../src/business-logic/member');
jest.mock('../../../src/business-logic/club');

describe('Controller: Club: List members', () => {
    let resMock;
    const members = [
        { name: 'Member 1' },
        { name: 'Member 2' },
    ];

    beforeEach(() => {
        resMock = {
            status: jest.fn().mockReturnThis() ,
            send: jest.fn(),
        };
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('Should list members', async () => {
        MemberLogic.listByClub.mockReturnValue(members);

        const req = {
            userId: 'user123', 
            params: { clubId: '1' }, 
        };

        await listMembers(req, resMock);

        expect(resMock.send).toBeCalledWith({ members });
        expect(MemberLogic.listByClub).toHaveBeenCalled();
    });
    it('Should throw an error when clubId is not defined', async () => {
        const req = {
            userId: 'user123',
            params: {}, 
        };

        await listMembers(req, resMock);
        
        expect(resMock.send).toBeCalledWith({
            error: new HTTPError({
                name: clubErrors.validation.name,
                message: clubErrors.validation.messages.clubId,
                code: 400,
            }),
        });
        expect(resMock.status).toBeCalledWith(400);
        expect(MemberLogic.listByClub).not.toHaveBeenCalled();
    }
    );
});