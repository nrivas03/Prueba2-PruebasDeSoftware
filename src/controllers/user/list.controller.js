import usersLogic from '../../business-logic/users';
import { returnErrorResponse } from '../../errors/error-response';

async function list(req, res) {
  try {
    const users = await usersLogic.list();

    return res.status(200).send({ users });
  } catch (error) {
    return returnErrorResponse({ error, res });
  }
}

export default list;
