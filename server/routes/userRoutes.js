import {createUser,deleteUser} from '../controllers/userController.js';
import express from 'express';
const router = express.Router();


router.post('/create',createUser);
router.delete('/delete',deleteUser);

export default router;