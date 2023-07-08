import express from 'express';
import { createSpeciesController, registrationController } from '../controllers/userController.js';

const router = express.Router();

// create species
router.post('/createSpecies', createSpeciesController);

// create user register || post
router.post('/register', registrationController);

export default router;