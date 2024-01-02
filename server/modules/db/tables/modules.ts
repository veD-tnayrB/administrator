import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface ModulesAttributes {
  id: string;
  label?: string;
  to?: string;
  iconDarkMode?: string;
  iconLightMode?: string;
  timeCreated?: Date;
  timeUpdated?: Date;
  order?: number;
}

export type ModulesPk = "id";
export type ModulesId = Modules[ModulesPk];
export type ModulesOptionalAttributes = "label" | "to" | "iconDarkMode" | "iconLightMode" | "timeCreated" | "timeUpdated" | "order";
export type ModulesCreationAttributes = Optional<ModulesAttributes, ModulesOptionalAttributes>;

export class Modules extends Model<ModulesAttributes, ModulesCreationAttributes> implements ModulesAttributes {
  id!: string;
  label?: string;
  to?: string;
  iconDarkMode?: string;
  iconLightMode?: string;
  timeCreated?: Date;
  timeUpdated?: Date;
  order?: number;


  static initModel(sequelize: Sequelize.Sequelize): typeof Modules {
    return Modules.init({
    id: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      primaryKey: true
    },
    label: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    to: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    iconDarkMode: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'icon_dark_mode'
    },
    iconLightMode: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'icon_light_mode'
    },
    timeCreated: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'time_created'
    },
    timeUpdated: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'time_updated'
    },
    order: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'modules',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
