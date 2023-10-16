import memberErrors from '../../errors/member.errors';
import { HTTPError } from '../../errors/error-response';
import clubModel from '../../models/club/club.model';
import memberModel from '../../models/member/member.model';

async function checkClubExists(clubId) {
  const club = await clubModel.findById(clubId);

  if (!club) {
    throw new HTTPError({ ...memberErrors.clubNotFound, code: 404 });
  }
}

async function create(args) {
  const { clubId } = args;

  await checkClubExists(clubId);

  const member = await memberModel.create(args);
  return member;
}

export default create;
