import { Team } from "../models/associations.js";
import Joi from "joi";
import xss from "xss";

// Create a new team
export const createTeam = async (req, res) => {
  // Get user entries
  const { name, description } = req.body;

  // Define a validation schema
  const schema = Joi.object({
    name: Joi.string().max(255).required(),
    description: Joi.string().allow("").optional(),
  });

  // Validate user entries
  const { error } = schema.validate({ name, description });

  // Check error in user entries
  if (error) {
    // Create an array of error messages
    const errorMessages = error.details.map((err) => err.message);

    // Return error messages array
    return res.status(400).json({ messages: errorMessages });
  }

  // Sanitize user entries
  const cleanName = xss(name);
  const cleanDescription = xss(description);

  // Check if a team with the same name already exists
  const existingTeam = await Team.findOne({ where: { name: cleanName } });
  if (existingTeam) {
    return res.status(400).json({ message: "A team with that name already exists." });
  }

  // Create team
  const newTeam = await Team.create({
    name: cleanName,
    description: cleanDescription,
  });
  res.status(201).json(newTeam);
};
