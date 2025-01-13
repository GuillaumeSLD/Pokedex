import { apiBaseUrl } from "../config.js";

export async function putPokemonInTeam(teamId, pokemonId) {
  try {
    const httpResponse = await fetch(`${apiBaseUrl}/teams/${teamId}/pokemons/${pokemonId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!httpResponse.ok) {
      const errorResponse = await httpResponse.json();
      console.error("Error response from server:", errorResponse);
      return errorResponse.message || "An error occured.";
    }

    const team = await httpResponse.json();
    return team;
  } catch (error) {
    console.error(error);
    return null;
  }
}