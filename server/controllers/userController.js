import { comparePassword, hashPassword } from "../helper/helper.js";
import SpeciesModel from "../models/speciesModel.js";
import userModel from "../models/userModel.js";
import spellsModel from "../models/spellsModel.js";
import fs from "fs";
import jwt from "jsonwebtoken";
import { coreModel, wandsModel, woodModel } from "../models/wandsModel.js";
import characterModel from "../models/characterModel.js";

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
    const {name , description , image_url, binomialName} = req.fields;

    console.log(req.body);
  
    const newWood = await woodModel({
      name,
      description,
      image_url,
      binomialName
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
  
}

// Create core controller
export const createCoreController = async (req, res) => {

  try {
    const {name , description , image_url} = req.fields;
  
    const newCore = await coreModel({
      name,
      description,
      image_url
    }).save();
  
    res.status(201).send({
      success: true,
      message: "Core created successfully",
      data: newCore,
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Error creating core" });
  }


}

// Create wand controller

export const createWandController = async (req, res) => {

  try {
    
    const {owner , description , image_url , wood , core, length} = req.fields;
  
    const newWand = await wandsModel({
      owner,
      description,
      image_url,
      wood,
      core,
      length
    }).save();
  
    res.status(201).send({
      success: true,
      message: "Wand created successfully",
      data: newWand,
    });

  } catch (error) {
    
    res.status(500).json({ message: "Error creating wand" });
  }
}

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
}

// get single wand controller

export const getSingleWandController = async (req, res) => {

  try {
    
    const {id} = req.params;

    const wand = await wandsModel.findById(id).populate("wood").populate("core");

    res.status(200).send({
      success: true,
      message: "Wand fetched successfully",
      wand,
    });

  } catch (error) {
    console.log(error)
    res.send(500).json({ message: "Error fetching wand" });
  }
}

// getAll characters controller
export const getCharacter = async (req,res) => {

  try{

    const page = req.query.page || 1;
    const pageSize = req.query.pageSize || 4;

    const characters = await characterModel.find({}).skip((page - 1) * pageSize).limit(pageSize);

    res.status(200).send({
      success: true,
      message: "Characters fetched successfully",
      characters,
    });
  }
  catch(error){
    console.log(error);
    res.send(500).json({ message: "Error fetching characters" });
  }

}

// get single character controller

export const getSingleCharacter = async (req,res) => {

  try {
    
    const {id} = req.params;

    const character = await characterModel.findById(id);

    res.status(200).send({
      success: true,
      message: "Character fetched successfully",
      character,
    });

  } catch (error) {
    console.log(error)
    res.send(500).json({ message: "Error fetching character" });
  }
}