import express from 'express';
import { createCoreController, createSpeciesController, createSpellsController, createWandController, createWoodController, getCharacter, getSingleCharacter, getSingleWandController, getSpeciesController, getSpellAudioController, getSpellsController, getWandsController, loginController, registrationController } from '../controllers/userController.js';

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

// create spells
router.post('/createSpells', 
ExpressFormidable(),createSpellsController);

// get spell audio
router.get('/spells/:id/audio', getSpellAudioController);

// get spell all spells
router.get('/spells', getSpellsController);

//Wand routes

// Create Wood
router.post('/createWood', ExpressFormidable() ,createWoodController);

// Create Core 
router.post('/createCore', ExpressFormidable() ,createCoreController);

// create wand
router.post('/createWand', ExpressFormidable(),createWandController);

// get Wand
router.get('/getWands', getWandsController);

// get single wand
router.get('/getWand/:id', getSingleWandController);

// get characters
router.get('/getCharacter', getCharacter);

// get single character
router.get('/getCharacter/:id', getSingleCharacter);



export default router;