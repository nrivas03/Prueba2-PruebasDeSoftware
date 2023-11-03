import { expect, jest } from '@jest/globals';
import SubscriptionLogic from '../../../src/business-logic/subscription';
import addSubscription from '../../../src/controllers/club/add-subscription.controller';
import HTTPError from '../../../src/errors/http.error';
import subscriptionErrors from '../../../src/errors/subscription.errors';

// Mock SubscriptionLogic
jest.mock('../../../src/business-logic/subscription');
jest.mock('../../../src/business-logic/club');
jest.mock('../../../src/business-logic/users');

describe('Controller: Subscription: Add Subscription', () => {
    let resMock;
    const subscription = {
        name: 'name',
        price: 10.99,
        description: 'description',
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

    it('Should add a subscription', async () => {
        SubscriptionLogic.create.mockReturnValue(subscription);

        await addSubscription({
            body: subscription,
            params: { clubId: 'club456' },
            userId: 'user123',
        }, resMock);

        //expect(resMock.status).toBeCalledWith(201);
        expect(resMock.send).toBeCalledWith({ subscription });
        expect(SubscriptionLogic.create).toHaveBeenCalled();
    });

    it('Should throw an error when name is not defined', async () => {
        await addSubscription({ body: { price: 10.99, }, params: { clubId: 'club456' }, userId: 'user123' }, resMock);

        expect(resMock.send).toBeCalledWith({
            error: new HTTPError({
                name: subscriptionErrors.validation.name,
                message: subscriptionErrors.validation.messages.name,
                code: 400,
            }),
        });
        expect(SubscriptionLogic.create).not.toHaveBeenCalled();
    });
});
