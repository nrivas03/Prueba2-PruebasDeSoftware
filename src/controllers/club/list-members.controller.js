import MemberLogic from '../../business-logic/member';
import { returnErrorResponse } from '../../errors/error-response';
import HTTPError from '../../errors/http.error';
import clubErrors from '../../../src/errors/club.errors';
/**
 * List members
 * @param {Express.Request} req - Express request
 * @param {string} req.userId - User id extracted from token
 * @param {Express.Response} res - Express response
 * @returns {Express.Response} 200 with a list of members
 */
async function listMembers(req, res) {
  try {
    const { userId, params } = req;
    const { clubId } = params;
    //Se agregan validaciones ya que no pasaba por el test de error, nunca llegaba al catch
    if (!clubId) {
      throw new HTTPError({
          name: clubErrors.validation.name,
          message: clubErrors.validation.messages.clubId,
          code: 400,
      });
  }
    const members = await MemberLogic.listByClub({ clubId, userId });

    return res.send({ members });
  } catch (error) {
    return returnErrorResponse({ error, res });
  }
}

export default listMembers;
