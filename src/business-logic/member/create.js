import HTTPError from '../../errors/http.error';
import memberErrors from '../../errors/member.errors';
import ClubModel from '../../models/club/club.model';
import MemberModel from '../../models/member/member.model';
import checkIfUserIsAdmin from '../club/check-is-admin';

/**
 * Check if the club exists in Club collection
 * @param {string} clubId - Candidate club id
 * @throws {HTTPError} 404 error if the club doesnt exists
 */
async function checkClubExists(clubId) {
  const club = await ClubModel.findById(clubId);

  if (!club) {
    throw new HTTPError({ ...memberErrors.clubNotFound, code: 404 });
  }
}

/**
 * Create member
 * @param {object} args - Required arguments
 * @param {string} args.name - Member's name
 * @param {string} args.email - Member's email
 * @param {string} [args.dni] - Member's DNI
 * @param {string} [args.nickname] - Member's nickname
 * @param {string} args.clubId - Club id associated to the member
 * @param {string} args.userId - req.userId (from token) must be the club admin
 * @returns {Member} Created member
 */
async function create(args) {
  const { clubId, userId } = args;

  await checkClubExists(clubId);
  await checkIfUserIsAdmin({ clubId, userId });

  const member = await MemberModel.create(args);
  return member;
}

export default create;
