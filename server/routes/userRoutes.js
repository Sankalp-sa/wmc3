import express from 'express';
import { addCommentController, addToFavoritesController, createCharacterController, createCoreController, createSpeciesController, createSpellsController, createWandController, createWoodController, deleteFromFavoritesController, getCharacter, getCommentController, getFavoriteCountController, getFavoritesController, getImageBack, getImageFront, getSingleCharacter, getSingleSpellsController, getSingleWandController, getSpeciesController, getSpellAudioController, getSpellsController, getWandImageController, getWandsController, loginController, registrationController, searchController } from '../controllers/userController.js';

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
router.post('/createWand', ExpressFormidable(), createWandController);

// get Wand
router.get('/getWands', getWandsController);

// get wand image
router.get('/wandImage/:id', getWandImageController);

// get single wand
router.get('/getWand/:id', getSingleWandController);

// create character
router.post('/createCharacter', ExpressFormidable(), createCharacterController);

// get character Image Front
router.get('/character/:id/imageFront', getImageFront);

// get character Image Back
router.get('/character/:id/imageBack', getImageBack);

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

// add comment route
router.post('/addComment/:id', requireSignIn, addCommentController);

// get Comment route
router.get('/getComment/:id', getCommentController);

// protected route
router.get('/protected', requireSignIn, (req, res) => {
    res.status(200).send({ok: true});
});

export default router;