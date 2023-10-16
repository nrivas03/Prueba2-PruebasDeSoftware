import memberModel from '../../models/member/member.model';

async function listByClub(clubId) {
  const members = await memberModel.find({ clubId });
  return members;
}

export default listByClub;
