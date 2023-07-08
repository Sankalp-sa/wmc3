import express from 'express';
import { createSpeciesController, loginController, registrationController } from '../controllers/userController.js';

const router = express.Router();

// create species
router.post('/createSpecies', createSpeciesController);

// create user register || post
router.post('/register', registrationController);

// login user || post
router.post('/login', loginController);

export default router;