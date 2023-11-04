import { expect, jest } from '@jest/globals';
import SubscriptionLogic from '../../../src/business-logic/subscription';
import listSubscriptions from '../../../src/controllers/club/list-subscriptions.controller';
import HTTPError from '../../../src/errors/http.error';
import subscriptionErrors from '../../../src/errors/subscription.errors';

// Mock SubscriptionLogic
jest.mock('../../../src/business-logic/subscription');
jest.mock('../../../src/business-logic/club');
jest.mock('../../../src/business-logic/users');

describe('Controller: Subscription: List Subscriptions', () => {
    let resMock;
    const subscriptions = [
        { name: 'Subscription 1' },
        { name: 'Subscription 2' },
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

    it('Should list subscriptions', async () => {
        SubscriptionLogic.listByClub.mockReturnValue(subscriptions);

        const req = {
            userId: 'user123',
            params: { clubId: '1' },
        };

        await listSubscriptions(req, resMock);

        expect(resMock.send).toBeCalledWith({ subscriptions });
        expect(SubscriptionLogic.listByClub).toHaveBeenCalled();
    });
    it('Should throw an error when clubId is not defined', async () => {
        const req = {
            userId: 'user123',
            params: {},
        };

        await listSubscriptions(req, resMock);

        expect(resMock.send).toBeCalledWith({
            error: new HTTPError({
                name: subscriptionErrors.validation.name,
                message: subscriptionErrors.validation.messages.clubId,
                code: 400,
            }),
        });
        expect(resMock.status).toBeCalledWith(400);
        expect(SubscriptionLogic.listByClub).not.toHaveBeenCalled();
    }
    );
}
);