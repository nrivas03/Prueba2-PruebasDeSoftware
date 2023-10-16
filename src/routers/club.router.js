import { Router } from 'express';
import clubController from '../controllers/club';

const router = Router();

router.get('/', clubController.list);
router.post('/', clubController.create);

router.post('/:clubId/members', clubController.addMember);
router.get('/:clubId/members', clubController.listMembers);

export default router;
