import clubModel from '../../models/club/club.model';

async function list() {
  const clubs = await clubModel.find({}).populate('admin managers.userId');
  return clubs;
}

export default list;
