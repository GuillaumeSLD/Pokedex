import { Team, Pokemon } from "../models/associations.js";

// Delete a team
export const deleteTeam = async (req, res) => {
  // Get team id
  const teamId = parseInt(req.params.id, 10);

  // Check if team id is a number
  if (isNaN(teamId)) {
    return res.status(400).json({ message: 'Invalid team ID.' });
  }

  // Get team
  const team = await Team.findByPk(teamId);

  // Return if team doesn't exists
  if (!team) {
    return res
      .status(404)
      .json({ message: `There's no team with the specified id : ${teamId}` });
  }

  // Remove associated Pokemons
  await team.setPokemons([]);

  // Delete team
  await team.destroy();
  res.status(200).json({ message: `The team with the id ${teamId} has been successfully deleted.` });
};

// Delete a Pokemon from a team
export const deletePokemonInTeam = async (req, res) => {
  // Get Pokemon and team ids
  let { teamId, pokemonId } = req.params;
  teamId = parseInt(teamId, 10);
  pokemonId = parseInt(pokemonId, 10);

  // Check if ids are numbers
  if (isNaN(teamId) || isNaN(pokemonId)) {
    return res.status(400).json({ message: 'Invalid team or Pokemon ID.' });
  }

  // Check if Pokemon exists
  const pokemon = await Pokemon.findByPk(pokemonId);
  if (!pokemon) {
    return res.status(404).json({ message: `The Pokemon with id ${pokemonId} doesn't exists.` });
  }

  // Check if team exists
  const team = await Team.findByPk(teamId, {
    include: {
        model: Pokemon,
    },
  });
  if (!team) {
    return res.status(404).json({ message: `The team ${team.name} doesn't exists.` });
  }

  // Check if team has Pokemons
  if (!team.Pokemons || team.Pokemons.length === 0) {
    return res.status(400).json({ message: `The team ${team.name} doesn't contains any Pokemons.` });
  }

  // Check if Pokemon is in team
  const isPokemonInTeam = team.Pokemons.some(pokemon => pokemon.id === pokemonId);
  if (!isPokemonInTeam) {
    return res.status(400).json({ message: `${pokemon.name} isn't in the team ${team.name}.` });
  }

  // Remove Pokemon from team
  await team.removePokemon(pokemon);

  res.status(200).json({ message: `${pokemon.name} has been successfully removed from the team ${team.name}.` });
};