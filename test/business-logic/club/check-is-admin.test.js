import { expect, jest } from '@jest/globals';
import ClubModel from '../../../src/models/club/club.model';
import HTTPError from '../../../src/errors/http.error';
import clubErrors from '../../../src/errors/club.errors';
import checkIfTheUserIsTheClubAdmin from '../../../src/business-logic/club/check-is-admin';


// Mock ClubModel
jest.mock('../../../src/models/club/club.model');

describe('Controller: Club: Check Admin', () => {
    beforeEach(() => {
        jest.clearAllMocks(); // Restablecer todos los mocks antes de cada prueba
    });

    it('Should throw HTTPError when user is not the admin', async () => {
        // Mock ClubModel.findOne para simular que el usuario no es el administrador
        ClubModel.findOne.mockReturnValue(null);

        const args = {
            clubId: 'club123', // ID del club
            userId: 'user456', // ID del usuario (que no es el administrador)
        };

        // Esperamos que se arroje una excepción HTTPError con los detalles adecuados
        await expect(checkIfTheUserIsTheClubAdmin(args)).rejects.toThrow(
            new HTTPError({
                name: clubErrors.userIsNotTheAdmin.name,
                message: clubErrors.userIsNotTheAdmin.message,
                code: 403,
            })
        );
    });

    it('Should not throw an error when user is the admin', async () => {
        // Mock ClubModel.findOne para simular que el usuario es el administrador
        ClubModel.findOne.mockReturnValue({ _id: 'club123', admin: 'user456' });

        const args = {
            clubId: 'club123', // ID del club
            userId: 'user456', // ID del usuario (que es el administrador)
        };

        // No esperamos que se arroje una excepción
        await expect(checkIfTheUserIsTheClubAdmin(args)).resolves.not.toThrow();
    });
});
