import { expect, jest } from '@jest/globals';
import ClubLogic from '../../../src/business-logic/club';
import list from '../../../src/controllers/club/list.controller';
import HTTPError from '../../../src/errors/http.error';
import clubErrors from '../../../src/errors/club.errors';

jest.mock('../../../src/business-logic/club')

describe('Controller: Club: List', ()=>{
    let resMock;
    const clubs = [
        // Array de clubes simulados
        { name: 'Club 1' },
        { name: 'Club 2' },
        // Agrega más clubes simulados si es necesario
    ];

    beforeEach(() => {
        resMock = {
            status: jest.fn().mockReturnThis() ,
            send: jest.fn(),
        };
    });

    afterEach(()=>{
        jest.resetAllMocks();
    });

    it('Should list clubs', async()=>{
        ClubLogic.list.mockReturnValue(clubs);

        const req = { }
        const response = await list(req, resMock);
        expect(resMock.send).toBeCalledWith({clubs});
        expect(ClubLogic.list).toHaveBeenCalled(); 
    });

    it('Should handle errors', async () => {
        ClubLogic.list.mockImplementationOnce(() => {
            throw new HTTPError({
                name: clubErrors.validation.name,
                message: clubErrors.validation.messages.clubId,
                code: 400,
            });
        });
    
        const req = {}
    
        const response = await list(req, resMock);
    
        expect(resMock.send).toBeCalledWith({
            error: new HTTPError({
                name: clubErrors.validation.name,
                message: clubErrors.validation.messages.clubId,
                code: 400,
            }),
        });
    });
    
});
