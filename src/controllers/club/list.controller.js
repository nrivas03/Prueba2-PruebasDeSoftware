import clubLogic from '../../business-logic/club';
import { returnErrorResponse } from '../../errors/error-response';

async function list(req, res) {
  try {
    const clubs = await clubLogic.list();

    return res.send({ clubs });
  } catch (error) {
    return returnErrorResponse({ error, res });
  }
}

export default list;
