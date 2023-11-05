import SubscriptionLogic from '../../business-logic/subscription';
import { returnErrorResponse } from '../../errors/error-response';
import HTTPError from '../../errors/http.error';
import subscriptionErrors from '../../errors/subscription.errors';
/**
 * List subscriptions
 * @param {Express.Request} req - Express request
 * @param {string} req.userId - User id extracted from token
 * @param {Express.Response} res - Express response
 * @returns {Express.Response} 200 with a list of subscriptions
 */
async function listSubscriptions(req, res) {
  try {
    const { userId, params } = req;
    const { clubId } = params;

    //Se agregan validaciones ya que no pasaba por el test de error, nunca llegaba al catch
    if (!clubId) {
      throw new HTTPError({
          name: subscriptionErrors.validation.name,
          message: subscriptionErrors.validation.messages.clubId,
          code: 400,
      });
  }

    const subscriptions = await SubscriptionLogic.listByClub({ clubId, userId });

    return res.send({ subscriptions });
  } catch (error) {
    return returnErrorResponse({ error, res });
  }
}

export default listSubscriptions;
