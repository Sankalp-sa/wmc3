import { comparePassword, hashPassword } from "../helper/helper.js";
import SpeciesModel from "../models/speciesModel.js";
import userModel from "../models/userModel.js";
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
