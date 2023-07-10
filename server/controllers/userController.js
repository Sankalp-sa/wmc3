import { comparePassword, hashPassword } from "../helper/helper.js";
import SpeciesModel from "../models/speciesModel.js";
import userModel from "../models/userModel.js";
import spellsModel from "../models/spellsModel.js";
import fs from "fs";
import jwt from "jsonwebtoken";

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
}


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
        data: newSpecies
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

    console.log(species)

    res.status(200).send({
      success: true,
      message: "Species fetched successfully",
      species
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching species" });
  }
};

// create spells controller

export const createSpellsController = async (req, res) => {

  try{

    const { name, description, image_url } = req.fields;

    const { audio } = req.files;

    const spell = new spellsModel({
      name,
      description,
      image_url,
    });
    
    if(audio){
      spell.audio.data = fs.readFileSync(audio.path);
      spell.audio.contentType = audio.type;
    }

    await spell.save();

    res.status(201).send({
      success: true,
      message: "Spells created successfully",
      data: spell
    });

  }
  catch(error){
    console.log(error);
    res.status(500).json({ message: "Error creating spells" });
  }
}

// get spells audio controller

export const getSpellAudioController = async (req, res) => {

  try{

    const { id } = req.params;

    const spell = await spellsModel.findById(id);

    if(spell.audio.data){
      res.set("Content-Type", spell.audio.contentType);
      return res.send(spell.audio.data);
    }

    res.status(404).send({
      success: false,
      message: "Audio not found"
    });

  }
  catch(error){
    console.log(error);
    res.status(500).json({ message: "Error fetching spells" });
  }

}

// get spells controller

export const getSpellsController = async (req, res) => {

  try{

    const spells = await spellsModel.find({}).select("-audio");

    res.status(200).send({
      success: true,
      message: "Spells fetched successfully",
      spells
    });

  }
  catch(error){
    console.log(error);
    res.status(500).json({ message: "Error fetching spells" });
  }

}