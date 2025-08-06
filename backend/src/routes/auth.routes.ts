import { Router } from 'express';
import { validateBody } from '@/middlewares/validateSchema.js';
import { loginSchema, registerSchema } from '@/schemas/auth.schema.js';
import { login, register, logout, getProfile } from '@/controllers/auth.controller.js';

const router = Router();

/**
 * @route   POST /api/auth/login
 * @desc    Authenticate user and return JWT tokens
 * @access  Public
 */
router.post('/login', validateBody(loginSchema), login);

/**
 * @route   POST /api/auth/register
 * @desc    Register a new user
 * @access  Public
 */
router.post('/register', validateBody(registerSchema), register);

/**
 * @route   POST /api/auth/logout
 * @desc    Logout user and invalidate tokens
 * @access  Private
 */
router.post('/logout', logout);

/**
 * @route   GET /api/auth/profile
 * @desc    Get current user profile
 * @access  Private
 */
router.get('/profile', getProfile);

export default router;