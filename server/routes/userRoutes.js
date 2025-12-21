import {Register,deleteUser, login,logoutUser,refreshToken} from '../controllers/userController.js';
import express from 'express';
import { isAdmin } from '../middlewares/roleMiddleware.js';
import auth from '../middlewares/authMiddleware.js';
import validate from '../middlewares/validate.js';
import { loginSchema, registerSchema } from '../validators/userValidator.js';
import validateParams from '../middlewares/validateParams.js';
import { idSchema } from '../validators/idValidator.js';
const router = express.Router();


router.post('/register', validate(registerSchema) ,Register);
router.delete('/:id', validateParams(idSchema)  ,auth,isAdmin,deleteUser);
router.post("/refresh-token", refreshToken);
router.post('/login', validate(loginSchema), login);
router.post("/logout", auth, logoutUser);

export default router;