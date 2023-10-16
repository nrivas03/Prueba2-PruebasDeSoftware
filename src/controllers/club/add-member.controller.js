import memberLogic from '../../business-logic/member';
import { returnErrorResponse } from '../../errors/error-response';
import { addValidation } from '../../validations/member.validations';

async function addMember(req, res) {
  try {
    const { body, params } = req;
    await addValidation.validateAsync(body);

    const member = await memberLogic.create({ ...body, clubId: params.clubId });

    return res.send({ member });
  } catch (error) {
    return returnErrorResponse({ error, res });
  }
}

export default addMember;
