import { apiBaseUrl } from "../config.js";

export async function addTeam(data) {
  try {
    const httpResponse = await fetch(`${apiBaseUrl}/teams`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

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
