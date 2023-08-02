import { comparePassword, hashPassword } from "../helper/helper.js";
import SpeciesModel from "../models/speciesModel.js";
import userModel from "../models/userModel.js";
import spellsModel from "../models/spellsModel.js";
// import characterModel from "../models/characterModel.js";
import fs from "fs";
import jwt from "jsonwebtoken";
import { coreModel, wandsModel, woodModel } from "../models/wandsModel.js";
import FavoriteModel from "../models/favoriteModel.js";
import CommentModel from "../models/CommentModel.js";
import newCharacterModel from "../models/newCharacterModel.js";

// registration controller

export const registrationController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.send({
        success: false,
        error: "All fields are required",
      });
    }

    // check if user already exists
    const user = await userModel.findOne({ email });

    // existing user
    if (user) {
      return res.status(200).send({
        success: false,
        error: "User already exists",
      });
    }

    // register new user

    // hash password
    const hashedPassword = await hashPassword(password);

    // save
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(200).send({
      success: true,
      message: "User registered successfully",
      newUser,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Internal Server Register Error",
      error: err.message,
    });
  }
};

// Login controller

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        error: "All fields are required",
      });
    }

    // check user
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).send({
        success: false,
        error: "Email does not exist",
      });
    }

    console.log(user);

    const match = await comparePassword(password, user.password);

    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Incorrect password",
      });
    }

    const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).send({
      success: true,
      message: "Login successful",
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Internal Server Login Error",
      error: err.message,
    });
  }
};

/// create species

export const createSpeciesController = async (req, res) => {
  try {
    const { name, description, image_url } = req.body;

    const newSpecies = await SpeciesModel({
      name,
      description,
      image_url,
    }).save();

    res.status(201).send({
      success: true,
      message: "Species created successfully",
      data: newSpecies,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating species" });
  }
};

// get Species controller

export const getSpeciesController = async (req, res) => {
  try {
    const species = await SpeciesModel.find({});

    console.log(species);

    res.status(200).send({
      success: true,
      message: "Species fetched successfully",
      species,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching species" });
  }
};

// create spells controller

export const createSpellsController = async (req, res) => {
  try {
    const { name, description, image_url, category } = req.fields;

    const { audio } = req.files;

    const spell = new spellsModel({
      name,
      description,
      image_url,
      category,
    });

    if (audio) {
      spell.audio.data = fs.readFileSync(audio.path);
      spell.audio.contentType = audio.type;
    }

    await spell.save();

    res.status(201).send({
      success: true,
      message: "Spells created successfully",
      data: spell,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating spells" });
  }
};

// get single spell controller

export const getSingleSpellsController = async (req, res) => {
  try {
    const { id } = req.params;

    const spell = await spellsModel.findById(id).select("-audio");

    res.status(200).send({
      success: true,
      message: "Spell fetched successfully",
      spell,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching spell" });
  }
};

// get spells audio controller

export const getSpellAudioController = async (req, res) => {
  try {
    const { id } = req.params;

    const spell = await spellsModel.findById(id);

    if (spell.audio.data) {
      res.set("Content-Type", spell.audio.contentType);
      return res.send(spell.audio.data);
    }

    res.status(404).send({
      success: false,
      message: "Audio not found",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching spells" });
  }
};

// get spells controller

export const getSpellsController = async (req, res) => {
  try {
    const spells = await spellsModel.find({}).select("-audio");

    res.status(200).send({
      success: true,
      message: "Spells fetched successfully",
      spells,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching spells" });
  }
};

// Wand Controllers :

// Create wood Controller

export const createWoodController = async (req, res) => {
  try {
    const { name, description, image_url, binomialName } = req.fields;

    console.log(req.body);

    const newWood = await woodModel({
      name,
      description,
      // image_url,
      binomialName,
    }).save();

    res.status(201).send({
      success: true,
      message: "Wood created successfully",
      data: newWood,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating wood" });
  } 
};

// Create core controller
export const createCoreController = async (req, res) => {
  try {
    const { name, description, image_url } = req.fields;

    const newCore = await coreModel({
      name,
      description,
      image_url,
    }).save();

    res.status(201).send({
      success: true,
      message: "Core created successfully",
      data: newCore,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating core" });
  }
};

// Create wand controller

export const createWandController = async (req, res) => {
  try {
    const { owner, description, wood, core, length } = req.fields;

    const { wandImage } = req.files;

    console.log(req.files);

    const newWand = await wandsModel({
      owner,
      description,
      wood,
      core,
      length,
    });

    if (wandImage) {
      newWand.wandImage.data = fs.readFileSync(wandImage.path);
      newWand.wandImage.contentType = wandImage.type;
    }

    await newWand.save();

    res.status(201).send({
      success: true,
      message: "Wand created successfully",
      data: newWand,
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error, message: "Error creating wand" });
  }
};

// get wands controller

export const getWandsController = async (req, res) => {
  try {
    const wands = await wandsModel.find({}).populate("wood").populate("core");

    res.status(200).send({
      success: true,
      message: "Wands fetched successfully",
      wands,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching wands" });
  }
};

// get wand image controller

export const getWandImageController = async (req, res) => {

  try{

    const { id } = req.params;

    const wand = await wandsModel.findById(id);

    console.log(wand);

    if(wand.wandImage.data){
      res.set("Content-Type", wand.wandImage.contentType);
      return res.send(wand.wandImage.data);
    }
    else{
      res.status(404).send({
        success: false,
        message: "Image not found",
      });
    }
    
  }
  catch(error){
    res.status(500).json({ message: "Error fetching wand image" });
  }
}


// get single wand controller

export const getSingleWandController = async (req, res) => {
  try {
    const { id } = req.params;

    const wand = await wandsModel
      .findById(id)
      .populate("wood")
      .populate("core");

    res.status(200).send({
      success: true,
      message: "Wand fetched successfully",
      wand,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching wand" });
  }
};

// create character controller:

export const createCharacterController = async (req, res) => {
  try {
    const {
      name,
      house,
      description,
      // wandId,
      bloodStatus,
      patronus
    } = req.fields;

    const { imageBack, imageFront } = req.files;

    const character = new newCharacterModel({
      name,
      house,
      description,
      // wand: wandId,
      bloodStatus,
      patronus
    });

    if (imageBack) {
      character.imageBack.data = fs.readFileSync(imageBack.path);
      character.imageBack.contentType = imageBack.type;
    }

    if (imageFront) {
      character.imageFront.data = fs.readFileSync(imageFront.path);
      character.imageFront.contentType = imageFront.type;
    }

    await character.save();

    res.status(201).send({
      success: true,
      message: "Character created successfully",
      data: character,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating character" });
  }
};

// getImage Front controller
export const getImageFront = async (req, res) => {
  try{
    const { id } = req.params;

    const character = await newCharacterModel.findById(id);

    if (character.imageFront.data) {
      res.set("Content-Type", character.imageFront.contentType);
      return res.send(character.imageFront.data);
    }

    res.status(404).send({
      success: false,
      message: "Image not found",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching image" });
  }
}

export const getImageBack = async (req, res) => {
  try{
    const { id } = req.params;

    const character = await newCharacterModel.findById(id);

    if (character.imageBack.data) {
      res.set("Content-Type", character.imageBack.contentType);
      return res.send(character.imageBack.data);
    }

    res.status(404).send({
      success: false,
      message: "Audio not found",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching image" });
  }
}



// getAll characters controller
export const getCharacter = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const pageSize = req.query.pageSize || 4;

    const characters = await newCharacterModel
      .find({})
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    res.status(200).send({
      success: true,
      message: "Characters fetched successfully",
      characters,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching characters" });
  }
};

// get single character controller

export const getSingleCharacter = async (req, res) => {
  try {
    const { id } = req.params;

    const character = await newCharacterModel.findById(id);

    res.status(200).send({
      success: true,
      message: "Character fetched successfully",
      character,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching character" });
  }
};

// search controller

export const searchController = async (req, res) => {
  try {
    const { keyword } = req.params;

    const character = await newCharacterModel.find({
      $or: [
        { name: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    });

    const wand = await wandsModel.find({
      $or: [
        {
          owner: { $regex: keyword, $options: "i" },
        },
        { description: { $regex: keyword, $options: "i" } },
      ],
    });

    const spell = await spellsModel.find({
      $or: [
        {
          name: { $regex: keyword, $options: "i" },
        },
        { description: { $regex: keyword, $options: "i" } },
      ],
    });

    const species = await SpeciesModel.find({
      $or: [
        {
          name: { $regex: keyword, $options: "i" },
        },
        { description: { $regex: keyword, $options: "i" } },
      ],
    });

    res.status(200).send({
      success: true,
      message: "Search results",
      data: {
        character,
        wand,
        spell,
        species,
      },
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: "Error fetching characters",
    });
  }
};

// Add to favorites controller

export const addToFavoritesController = async (req, res) => {
  const { id } = req.params;

  try {
    const character = await newCharacterModel.findById(id);
    const species = await SpeciesModel.findById(id);
    const wand = await wandsModel.findById(id);
    const spell = await spellsModel.findById(id);

    const faviorate = await FavoriteModel.findOne({ user: req.user._id });

    if (faviorate) {
      const isCharacter = await faviorate.characters.find((item) =>
        item !== null ? item.toString() === id : null
      );

      const isSpecies = await faviorate.species.find((item) =>
        item !== null ? item.toString() === id : null
      );

      const isWand = await faviorate.wand.find((item) =>
        item !== null ? item.toString() === id : null
      );

      const isSpell = await faviorate.spells.find((item) =>
        item !== null ? item.toString() === id : null
      );

      if (isCharacter || isSpecies || isWand || isSpell) {
        res.status(200).send({
          success: false,
          message: "Already added to favorites",
        });
      } else {
        let data = null;

        if (character !== null) {
          const updatedFavorite = await FavoriteModel.findByIdAndUpdate(
            faviorate._id,
            {
              $push: {
                characters: character,
              },
            },
            { new: true }
          );

          data = updatedFavorite;
        }

        if (species !== null) {
          const updatedFavorite = await FavoriteModel.findByIdAndUpdate(
            faviorate._id,
            {
              $push: {
                species: species,
              },
            },
            { new: true }
          );

          data = updatedFavorite;
        }

        if (wand !== null) {
          const updatedFavorite = await FavoriteModel.findByIdAndUpdate(
            faviorate._id,
            {
              $push: {
                wand: wand,
              },
            },
            { new: true }
          );

          data = updatedFavorite;
        }

        if (spell !== null) {
          const updatedFavorite = await FavoriteModel.findByIdAndUpdate(
            faviorate._id,
            {
              $push: {
                spells: spell,
              },
            },
            { new: true }
          );

          data = updatedFavorite;
        }

        res.status(201).send({
          success: true,
          message: "Added to favorites successfully",
          data: data,
        });
      }
    } else {
      const newFavorite = await FavoriteModel({
        user: req.user._id,
        favorites: {
          character: character,
          species: species,
          wand: wand,
          spell: spell,
        },
      }).save();

      res.status(201).send({
        success: true,
        message: "Added to favorites successfully",
        data: newFavorite,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error adding to favorites" });
  }
};

// get favorites controller

export const getFavoritesController = async (req, res) => {
  try {
    console.log(req.user);
    const favorites = await FavoriteModel.findOne({ user: req.user._id })
      .populate("characters")
      .populate("species")
      .populate("wand")
      .populate("spells");

    res.status(200).send({
      success: true,
      message: "Favorites fetched successfully",
      favorites,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching favorites" });
  }
};

// delete from favorites controller

export const deleteFromFavoritesController = async (req, res) => {
  const { id } = req.params;

  try {
    const favorites = await FavoriteModel.findOne({ user: req.user._id });

    const isCharacter = await favorites.characters.find((item) =>
      item !== null ? item.toString() === id : null
    );

    const isSpecies = await favorites.species.find((item) =>
      item !== null ? item.toString() === id : null
    );

    const isWand = await favorites.wand.find((item) =>
      item !== null ? item.toString() === id : null
    );

    const isSpell = await favorites.spells.find((item) =>
      item !== null ? item.toString() === id : null
    );

    if (isCharacter) {
      const updatedFavorite = await FavoriteModel.findByIdAndUpdate(
        favorites._id,
        {
          $pull: {
            characters: id,
          },
        },
        { new: true }
      );

      res.status(201).send({
        success: true,
        message: "Deleted from favorites successfully",
        data: updatedFavorite,
      });
    }

    if (isSpecies) {
      const updatedFavorite = await FavoriteModel.findByIdAndUpdate(
        favorites._id,
        {
          $pull: {
            species: id,
          },
        },
        { new: true }
      );

      res.status(201).send({
        success: true,
        message: "Deleted from favorites successfully",
        data: updatedFavorite,
      });
    }

    if (isWand) {
      const updatedFavorite = await FavoriteModel.findByIdAndUpdate(
        favorites._id,
        {
          $pull: {
            wand: id,
          },
        },
        { new: true }
      );

      res.status(201).send({
        success: true,
        message: "Deleted from favorites successfully",
        data: updatedFavorite,
      });
    }

    if (isSpell) {
      const updatedFavorite = await FavoriteModel.findByIdAndUpdate(
        favorites._id,
        {
          $pull: {
            spells: id,
          },
        },
        { new: true }
      );

      res.status(201).send({
        success: true,
        message: "Deleted from favorites successfully",
        data: updatedFavorite,
      });
    }
  } catch {
    console.log(error);
    res.status(500).json({ message: "Error deleting from favorites" });
  }
};

// get Favorite count controller

export const getFavoriteCountController = async (req, res) => {
  try {
    const favorite = await FavoriteModel.findOne({ user: req.user._id });

    // console.log(favorite)

    const favoriteCount =
      favorite.characters.length +
      favorite.species.length +
      favorite.wand.length +
      favorite.spells.length;

    res.status(200).send({
      success: true,
      message: "Favorites count fetched successfully",
      favoriteCount,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching favorites count" });
  }
};

// Add comment controller

export const addCommentController = async (req, res) => {
  try {
    const { id } = req.params;
    // console.log(req.body)
    const { comment } = req.body;

    const species = await SpeciesModel.countDocuments({ _id: id });
    const wand = await wandsModel.countDocuments({ _id: id });
    const spell = await spellsModel.countDocuments({ _id: id });
    const character = await newCharacterModel.countDocuments({ _id: id });

    // console.log(species);

    let newComment = null;
    if (species > 0) {
      newComment = await CommentModel({
        user: req.user._id,
        species: id,
        comment,
      }).save();
    } else if (wand > 0) {
      newComment = await CommentModel({
        user: req.user._id,
        wand: id,
        comment,
      }).save();
    } else if (spell > 0) {
      newComment = await CommentModel({
        user: req.user._id,
        spell: id,
        comment,
      }).save();
    } else if (character > 0) {
      newComment = await CommentModel({
        user: req.user._id,
        character: id,
        comment,
      }).save();
    }

    if (newComment) {
      res.status(201).send({
        success: true,
        message: "Comment added successfully",
        data: newComment,
      });
    } else {
      res.status(500).send({
        success: false,
        message: "Error adding comment",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error adding comment", error });
  }
};

// get comment controller

export const getCommentController = async (req, res) => {
  const { id } = req.params;

  try {
    const species = await CommentModel.find({ species: id }).populate("user");

    const wand = await CommentModel.find({ wand: id }).populate("user");

    const spell = await CommentModel.find({ spell: id }).populate("user");

    const character = await CommentModel.find({ character: id }).populate(
      "user"
    );

    res.status(200).send({
      success: true,
      message: "Comments fetched successfully",
      data: {
        species,
        wand,
        spell,
        character,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching comments" });
  }
};
