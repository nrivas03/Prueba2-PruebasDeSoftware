import clubErrors from '../../errors/club.errors';
import { HTTPError } from '../../errors/error-response';
import clubModel from '../../models/club/club.model';
import userModel from '../../models/user/user.model';

async function checkClubAdmin(clubAdminId) {
  const clubAdmin = await userModel.findById(clubAdminId);

  if (!clubAdmin) {
    throw new HTTPError({ ...clubErrors.adminNotFound, code: 404 });
  }
}

async function create(args) {
  const { clubAdminId, name, description } = args;

  await checkClubAdmin(clubAdminId);

  const club = await clubModel.create({ name, description, admin: clubAdminId });
  return club;
}

export default create;
