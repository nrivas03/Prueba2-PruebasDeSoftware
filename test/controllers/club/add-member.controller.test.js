import { expect, jest } from '@jest/globals';
import MemberLogic from '../../../src/business-logic/member';
import addMember from '../../../src/controllers/club/add-member.controller';
import HTTPError from '../../../src/errors/http.error';
import clubErrors from '../../../src/errors/club.errors';


// Mock ClubLogic
jest.mock('../../../src/business-logic/club');
jest.mock('../../../src/business-logic/member');

describe('Controller: Club: Add member', () => {
    let resMock;
    const member = {
        name: 'member-test',
        lastName: 'member-lastname',
        email: 'member-email@email.com',
        dni: 'member-dni',
        nickname: 'member-nickname',
    };

    const club = {
        // Puedes agregar propiedades del club aquí si es necesario.
    };

    beforeEach(() => {
        resMock = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('Should add a member', async () => {
        MemberLogic.create.mockReturnValue(member);

        await addMember({
            body: member,
            params: { clubId: '1' }, // Simulación de parámetros
            userId: 'user123', // Simulación de userId
        }, resMock);

        expect(resMock.status).toBeCalledWith(201); 
        expect(resMock.send).toBeCalledWith({ member });
        expect(MemberLogic.create).toHaveBeenCalled(); 
    });

    it('Should throw an error when name is not defined', async () => {
        await addMember({ body: {} }, resMock);

        //expect(resMock.status).toBeCalledWith(400); 
        expect(resMock.send).toBeCalledWith({
            error: new HTTPError({
                name: clubErrors.validation.name,
                message: clubErrors.validation.messages.name,
                code: 400,
            }),
        });
        expect(MemberLogic.create).not.toHaveBeenCalled();
    });
});
