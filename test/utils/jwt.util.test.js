import jwt from 'jsonwebtoken';
import { generateToken, verifyToken } from '../../src/utils/jwt.util';
import envs from '../../src/configs/environment';

jest.mock('jsonwebtoken', () => ({
    sign: jest.fn(),
    verify: jest.fn(),
}));

describe('Auth Functions', () => {
    const SECRET = envs.JWT.SECRET;
    const DEFAULT_EXPIRES = envs.JWT.DEFAULT_EXPIRES;
    const mockData = { id: 1, username: 'testUser' };

    beforeEach(() => {
        // Limpiamos los mocks antes de cada prueba.
        jest.clearAllMocks();
    });

    describe('generateToken', () => {
        it('should call jwt.sign with correct parameters', () => {
            generateToken({ data: mockData });
            expect(jwt.sign).toHaveBeenCalledWith(mockData, SECRET, { expiresIn: DEFAULT_EXPIRES });
        });

        it('should allow custom expiration times', () => {
            const customExpires = '2h';
            generateToken({ data: mockData, expiresIn: customExpires });
            expect(jwt.sign).toHaveBeenCalledWith(mockData, SECRET, { expiresIn: customExpires });
        });
    });

    describe('verifyToken', () => {
        it('should call jwt.verify with the correct parameters', () => {
            const mockToken = 'mockToken';
            verifyToken(mockToken);
            expect(jwt.verify).toHaveBeenCalledWith(mockToken, SECRET);
        });
    });
});