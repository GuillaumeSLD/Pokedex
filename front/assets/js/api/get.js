import { apiBaseUrl } from "../config.js";

// Get all Pokemons
export async function getPokemons() {
  try {
    const httpResponse = await fetch(`${apiBaseUrl}/pokemons`);

    if (!httpResponse.ok) {
      return null;
    }

    const pokemons = await httpResponse.json();
    return pokemons;
  } catch (error) {
    console.error(error);
    return null;
  }
}

// Get a Pokemon by id
export async function getPokemon(id) {
  try {
    const httpResponse = await fetch(`${apiBaseUrl}/pokemons/${id}`);

    if (!httpResponse.ok) {
      return null;
    }

    const pokemon = await httpResponse.json();
    return pokemon;
  } catch (error) {
    console.error(error);
    return null;
  }
}

// Get all types
export async function getTypes() {
  try {
    const httpResponse = await fetch(`${apiBaseUrl}/types`);

    if (!httpResponse.ok) {
      return null;
    }

    const types = await httpResponse.json();
    return types;
  } catch (error) {
    console.error(error);
    return null;
  }
}

// Get a type by id
export async function getType(id) {
  try {
    const httpResponse = await fetch(`${apiBaseUrl}/types/${id}`);

    if (!httpResponse.ok) {
      return null;
    }

    const type = await httpResponse.json();
    return type;
  } catch (error) {
    console.error(error);
    return null;
  }
}

// Get all teams
export async function getTeams() {
  try {
    const httpResponse = await fetch(`${apiBaseUrl}/teams`);

    if (!httpResponse.ok) {
      return null;
    }

    const teams = await httpResponse.json();
    return teams;
  } catch (error) {
    console.error(error);
    return null;
  }
}

// Get a team by id
export async function getTeam(id) {
  try {
    const httpResponse = await fetch(`${apiBaseUrl}/teams/${id}`);

    if (!httpResponse.ok) {
      return null;
    }

    const team = await httpResponse.json();
    return team;
  } catch (error) {
    console.error(error);
    return null;
  }
}