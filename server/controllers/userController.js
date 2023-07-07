import SpeciesModel from "../models/speciesModel.js";

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
