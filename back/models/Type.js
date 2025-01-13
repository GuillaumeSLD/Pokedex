import { DataTypes, Model } from "sequelize";
import sequelize from "./sequelize.js";

class Type extends Model {}

Type.init(
  {
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    color: {
      type: DataTypes.STRING(7), // Le type "VARCHAR(7)" peut correspondre à une chaîne de caractères de 7 caractères
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Type",
    tableName: "type",
  }
);

export default Type;
