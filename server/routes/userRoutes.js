import express from 'express';
import { createSpeciesController } from '../controllers/userController.js';

const router = express.Router();

// create species
router.post('/createSpecies', createSpeciesController);

export default router;