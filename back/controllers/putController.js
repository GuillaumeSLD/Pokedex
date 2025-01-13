import { Team, Pokemon } from "../models/associations.js";

// Add Pokemon in a team
export const putPokemonInTeam = async (req, res) => {
  // Get Pokemon and team ids
  let { teamId, pokemonId } = req.params;
  teamId = parseInt(teamId, 10);
  pokemonId = parseInt(pokemonId, 10);

  // Check if ids are numbers
  if (isNaN(teamId) || isNaN(pokemonId)) {
    return res.status(400).json({ message: "Invalid team or Pokemon ID." });
  }

  // Check if Pokemon exists
  const pokemon = await Pokemon.findByPk(pokemonId);
  if (!pokemon) {
    return res
      .status(404)
      .json({ message: `The Pokemon with id ${pokemonId} doesn't exists.` });
  }

  // Check if team exists
  const team = await Team.findByPk(teamId, {
    include: {
      model: Pokemon,
    },
  });
  if (!team) {
    return res
      .status(404)
      .json({ message: `The team with id ${teamId} doesn't exists.` });
  }

  // Check if team is full (max 6 Pokemons per team)
  if (team.Pokemons && team.Pokemons.length === 6) {
    return res
      .status(400)
      .json({
        message: `The team is full. You cannot add more than 6 Pokemons in a team.`,
      });
  }

  // Check if Pokemon is not already in team
  if (team.Pokemons && team.Pokemons.length > 0) {
    const isPokemonInTeam = team.Pokemons.some(
      (pokemon) => pokemon.id === pokemonId
    );
    if (isPokemonInTeam) {
      return res
        .status(400)
        .json({
          message: `The Pokemon with id ${pokemonId} is already in the team.`,
        });
    }
  }

  // Add Pokemon to team
  await team.addPokemon(pokemon);

  // Reload team with updated Pokemons
  await team.reload({
    include: {
      model: Pokemon,
    },
  });

  res.status(200).json(team);
};
