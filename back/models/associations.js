import Pokemon from "./Pokemon.js";
import Type from "./Type.js";
import Team from "./Team.js";

// Association Pokemon <-> Type (Relation many-to-many via pokemon_type)
Pokemon.belongsToMany(Type, {
  through: "pokemon_type",
  foreignKey: "pokemon_id",
  otherKey: "type_id",
});

Type.belongsToMany(Pokemon, {
  through: "pokemon_type",
  foreignKey: "type_id",
  otherKey: "pokemon_id",
});

// Association Pokemon <-> Team (Relation many-to-many via team_pokemon)
Pokemon.belongsToMany(Team, {
  through: "team_pokemon",
  foreignKey: "pokemon_id",
  otherKey: "team_id",
});

Team.belongsToMany(Pokemon, {
  through: "team_pokemon",
  foreignKey: "team_id",
  otherKey: "pokemon_id",
});

export { Pokemon, Type, Team };