import userModel from '../../models/user/user.model';

async function list() {
  const users = await userModel.find({});
  return users;
}

export default list;
