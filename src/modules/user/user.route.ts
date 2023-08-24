import express from 'express';
import { UserController } from './user.controller';

const router = express.Router();

router.post('/', UserController.insertIntoDB)
router.post('/profile', UserController.insertOrUpdateProfileController)



export const UserRoutes = router;