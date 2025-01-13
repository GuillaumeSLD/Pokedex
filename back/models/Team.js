import { DataTypes, Model } from "sequelize";
import sequelize from "./sequelize.js";

class Team extends Model {}

Team.init(
  {
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Team",
    tableName: "team",
  }
);

export default Team;
