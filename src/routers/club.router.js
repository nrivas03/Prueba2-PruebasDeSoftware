import { Router } from 'express';
import ClubController from '../controllers/club';
import authMiddleware from '../middlewares/auth.middleware';
import isAdminMiddleware from '../middlewares/is-admin.middleware';

const router = Router();

router.get('/', authMiddleware, isAdminMiddleware, ClubController.list);
router.post('/', authMiddleware, ClubController.create);

router.post('/:clubId/members', authMiddleware, ClubController.addMember);
router.get('/:clubId/members', authMiddleware, ClubController.listMembers);

export default router;
