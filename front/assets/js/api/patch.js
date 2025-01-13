import { apiBaseUrl } from "../config.js";

export async function updateTeam(data) {
  try {
    const httpResponse = await fetch(`${apiBaseUrl}/teams/${data.teamId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!httpResponse.ok) {
      const errorResponse = await httpResponse.json();
      console.error("Error response from server:", errorResponse);
      return null;
    }

    const team = await httpResponse.json();
    return team;
  } catch (error) {
    console.error(error);
    return null;
  }
}
