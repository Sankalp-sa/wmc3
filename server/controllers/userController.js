import { comparePassword, hashPassword } from "../helper/helper.js";
import SpeciesModel from "../models/speciesModel.js";
import userModel from "../models/userModel.js";
import spellsModel from "../models/spellsModel.js";
import characterModel from "../models/characterModel.js";
import fs from "fs";
import jwt from "jsonwebtoken";
import { coreModel, wandsModel, woodModel } from "../models/wandsModel.js";
import FavoriteModel from "../models/favoriteModel.js";

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
      image_url,
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
    const { owner, description, image_url, wood, core, length } = req.fields;

    const newWand = await wandsModel({
      owner,
      description,
      image_url,
      wood,
      core,
      length,
    }).save();

    res.status(201).send({
      success: true,
      message: "Wand created successfully",
      data: newWand,
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating wand" });
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
    res.send(500).json({ message: "Error fetching wands" });
  }
};

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
    res.send(500).json({ message: "Error fetching wand" });
  }
};

// getAll characters controller
export const getCharacter = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const pageSize = req.query.pageSize || 4;

    const characters = await characterModel
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
    res.send(500).json({ message: "Error fetching characters" });
  }
};

// get single character controller

export const getSingleCharacter = async (req, res) => {
  try {
    const { id } = req.params;

    const character = await characterModel.findById(id);

    res.status(200).send({
      success: true,
      message: "Character fetched successfully",
      character,
    });
  } catch (error) {
    console.log(error);
    res.send(500).json({ message: "Error fetching character" });
  }
};

// search controller

export const searchController = async (req, res) => {
  try {
    const { keyword } = req.params;

    const character = await characterModel.find({
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
    const character = await characterModel.findById(id);
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
        res.status(500).send({
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
                "characters": character,
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
                "species": species,
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
                "wand": wand,
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
                "spells": spell,
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
    const favorites = await FavoriteModel.findOne({ user: req.user._id }).populate("characters").populate("species").populate("wand").populate("spells");

    res.status(200).send({
      success: true,
      message: "Favorites fetched successfully",
      favorites,
    });

  } catch (error) {
    console.log(error);
    res.send(500).json({ message: "Error fetching favorites" });
  }
}

// delete from favorites controller

export const deleteFromFavoritesController = async (req, res) => {

  const { id } = req.params;

  try{

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

    if(isCharacter){
      const updatedFavorite = await FavoriteModel.findByIdAndUpdate(
        favorites._id,
        {
          $pull: {
            "characters": id,
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

    if(isSpecies){
      const updatedFavorite = await FavoriteModel.findByIdAndUpdate(
        favorites._id,
        {
          $pull: {
            "species": id,
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

    if(isWand){
      const updatedFavorite = await FavoriteModel.findByIdAndUpdate(
        favorites._id,
        {
          $pull: {
            "wand": id,
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

    if(isSpell){
      const updatedFavorite = await FavoriteModel.findByIdAndUpdate(
        favorites._id,
        {
          $pull: {
            "spells": id,
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

  }
  catch{
    console.log(error);
    res.send(500).json({ message: "Error deleting from favorites" });
  }
}

// get Favorite count controller

export const getFavoriteCountController = async (req, res) => {

  try {

    const favorite = await FavoriteModel.findOne({ user: req.user._id });

    const favoriteCount = favorite.characters.length + favorite.species.length + favorite.wand.length + favorite.spells.length;

    res.status(200).send({
      success: true,
      message: "Favorites count fetched successfully",
      favoriteCount,
    });
    
  } catch (error) {
    console.log(error);
    res.send(500).json({ message: "Error fetching favorites count" });
  }

}