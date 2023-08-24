import express from 'express';
import { UserController } from './user.controller';

const router = express.Router();

router.post('/', UserController.insertIntoDB)
router.post('/profile', UserController.insertOrUpdateProfileController)
router.get('/', UserController.getUsers)
router.get('/:userId', UserController.getSingleUser)



export const UserRoutes = router;