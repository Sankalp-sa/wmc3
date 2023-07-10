import express from 'express';
import { createSpeciesController, createSpellsController, getSpeciesController, getSpellAudioController, getSpellsController, loginController, registrationController } from '../controllers/userController.js';

import ExpressFormidable from "express-formidable";

const router = express.Router();

// create species
router.post('/createSpecies', createSpeciesController);

// get Species
router.get('/getSpecies', getSpeciesController);

// create user register || post
router.post('/register', registrationController);

// login user || post
router.post('/login', loginController);

// spells routes
// router.get('/spells', getSpellsController);

router.post('/createSpells', 
ExpressFormidable(),createSpellsController);

// get spell audio
router.get('/spells/:id/audio', getSpellAudioController);

// get spell all spells
router.get('/spells', getSpellsController);

export default router;