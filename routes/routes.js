import express from 'express';
import * as auth from '../controllers/authController.js';
import * as post from '../controllers/postController.js';

const router = express.Router();

// Define routes

router.get('/login', auth.login);
router.post('/login', auth.verifyLogin);
router.get('/register', auth.register);
router.post('/register', auth.verifyRegister);
router.get('/logout', auth.logout);

router.get('/', auth.isAuthenticated, post.loadPosts);

router.get('/createPost', auth.isAuthenticated, post.writePost);
router.post('/createPost', auth.isAuthenticated, post.createPost);

router.post('/deletePost/:id', auth.isAuthenticated, auth.isAdmin, post.deletePost);

router.get('/editPost/:id', auth.isAuthenticated, post.editPost); 
router.post('/editPost/:id', auth.isAuthenticated, post.savePost);
            
export default router;
