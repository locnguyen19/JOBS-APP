import express from 'express';
const router = express.Router();



import {
  register,
  login,
  getCurrentUser,
  getAllUsers,
  updateUser,
  logout
 
} from '../controllers/authController.js';
import authenticate  from '../middleware/auth.js';

router.route('/register').post( register);
router.route('/login').post( login);
router.get('/logout', logout);
router.route('/updateUser').patch(authenticate,updateUser);
router.route('/getCurrentUser').get(getCurrentUser);
router.route('/getAllUsers').get(getAllUsers);
export default router;
