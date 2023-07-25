import express from 'express';
import { addToFavoritesController, createCoreController, createSpeciesController, createSpellsController, createWandController, createWoodController, deleteFromFavoritesController, getCharacter, getFavoriteCountController, getFavoritesController, getSingleCharacter, getSingleSpellsController, getSingleWandController, getSpeciesController, getSpellAudioController, getSpellsController, getWandsController, loginController, registrationController, searchController } from '../controllers/userController.js';

import ExpressFormidable from "express-formidable";
import { requireSignIn } from '../Middleware.js/authMiddleware.js';


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

// get single spell
router.get('/singleSpell/:id', getSingleSpellsController);
    
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

// Search route
router.get('/search/:keyword', searchController);

// Add to favorite
router.post('/addFavorite/:id', requireSignIn, addToFavoritesController);

// get all favorites
router.get('/getFavorites', requireSignIn, getFavoritesController);

// get favorite count
router.get('/getFavoriteCount', requireSignIn, getFavoriteCountController);

// delete favorite
router.delete('/deleteFavorite/:id', requireSignIn ,deleteFromFavoritesController);

// protected route
router.get('/protected', requireSignIn, (req, res) => {
    res.status(200).send({ok: true});
});

export default router;