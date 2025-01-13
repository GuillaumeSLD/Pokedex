import { Team } from "../models/associations.js";
import Joi from "joi";
import xss from "xss";

// Update a team
export const patchTeam = async (req, res) => {
  // Get team id
  const teamId = parseInt(req.params.id, 10);

  // Check if team id is a number
  if (isNaN(teamId)) {
    return res.status(400).json({ message: "Invalid team ID." });
  }

  // Get team
  const team = await Team.findByPk(teamId);

  // Return if team doesn't exists
  if (!team) {
    return res
      .status(404)
      .json({ message: `There's no team with the specified id : ${teamId}` });
  }

  // Get user entries
  const { name } = req.body;

  // Define a validation schema
  const schema = Joi.object({
    name: Joi.string().max(255),
  });

  // Validate user entries
  const { error } = schema.validate({ name });

  // Check error in user entries
  if (error) {
    // Create an array of error messages
    const errorMessages = error.details.map((err) => err.message);

    // Return error messages array
    return res.status(400).json({ messages: errorMessages });
  }

  // Sanitize user entries. If an entry is empty, we set it as undefined.
  const cleanName = name ? xss(name) : undefined;

  // Update team
  await team.update({
    name: cleanName || team.name, // If empty cleanName, the current name is set.
  });
  res.status(200).json(team);
};