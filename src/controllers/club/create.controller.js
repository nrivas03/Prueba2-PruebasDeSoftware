import clubLogic from '../../business-logic/club';
import { returnErrorResponse } from '../../errors/error-response';
import { createValidation } from '../../validations/club.validations';

async function create(req, res) {
  try {
    const { body } = req;
    await createValidation.validateAsync(body);

    const clubAdminId = '652c489e8bb016a5a5b45091';

    const club = await clubLogic.create({ ...body, clubAdminId });

    return res.send({ club });
  } catch (error) {
    return returnErrorResponse({ error, res });
  }
}

export default create;
