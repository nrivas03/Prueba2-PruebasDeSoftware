import memberLogic from '../../business-logic/member';
import { returnErrorResponse } from '../../errors/error-response';

async function listMembers(req, res) {
  try {
    const { clubId } = req.params;

    const members = await memberLogic.listByClub(clubId);

    return res.send({ members });
  } catch (error) {
    return returnErrorResponse({ error, res });
  }
}

export default listMembers;
