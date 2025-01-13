import { Pokemon, Type, Team } from "../models/associations.js";

// Get all Pokemons
export const getPokemons = async (req, res) => {
  const pokemons = await Pokemon.findAll({
    order: [['name', 'ASC']],
  });
  res.status(200).json(pokemons);
};

// Get a Pokemon by id
export const getPokemon = async (req, res) => {
  // Get Pokemon id
  const id = parseInt(req.params.id, 10);

  // Check if Pokemon id is a number
  if (isNaN(id)) {
    return res.status(400).json({ message: 'Invalid Pokemon ID.' });
  }

  const pokemon = await Pokemon.findByPk(id);
  res.status(200).json(pokemon);
};

// Get all types
export const getTypes = async (req, res) => {
  const types = await Type.findAll();
  res.status(200).json(types);
};

// Get a type by id
export const getType = async (req, res) => {
  // Get type id
  const id = parseInt(req.params.id, 10);

  // Check if type id is a number
  if (isNaN(id)) {
    return res.status(400).json({ message: 'Invalid type ID.' });
  }

  // Get type with associated Pokemons
  const type = await Type.findByPk(id, {
    include: {
      model: Pokemon,
    },
  });

  const pokemons = type.Pokemons;

  // Check if type has Pokemons
  if (pokemons.length === 0) {
    return res.status(200).json({
      message: `No Pokémon found for type: ${type.name}`,
      typeName: type.name,
    });
  }

  res.status(200).json({
    typeName: type.name,
    pokemons: pokemons,
  });
};

// Get all teams
export const getTeams = async (req, res) => {
  // Get teams with associated Pokemons
  const teams = await Team.findAll({
    include: [
      {
        model: Pokemon,
      },
    ],
    order: [
      ['name', 'ASC'], // Order teams list by name
      [Pokemon, 'name', 'ASC'], // Order Pokemons list by name in each team
    ],
  });
  res.status(200).json(teams);
};

// Get a team by id
export const getTeam = async (req, res) => {
  // Get team id
  const id = parseInt(req.params.id, 10);

  // Check if team id is a number
  if (isNaN(id)) {
    return res.status(400).json({ message: 'Invalid team ID.' });
  }

  // Get team with Pokemons and types associated
  const team = await Team.findByPk(id, {
    include: {
      model: Pokemon,
      through: { attributes: [] },
      include: {
        model: Type,
        through: { attributes: [] },
      },
    },
    order: [[Pokemon, 'name', 'ASC']],
  });

  const pokemons = team.Pokemons;

  // Check if team has Pokemons
  if (pokemons.length === 0) {
    return res.status(200).json({
      id: team.id,
      name: team.name,
      description: team.description,
      message: `No Pokémon found for team : ${team.name}`,
    });
  }

  res.status(200).json({
    id: team.id,
    name: team.name,
    description: team.description,
    pokemons: pokemons,
  });
};