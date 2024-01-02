import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface ProfilesAttributes {
  id: string;
  name?: string;
  description?: string;
  timeCreated?: Date;
  timeUpdated?: Date;
}

export type ProfilesPk = "id";
export type ProfilesId = Profiles[ProfilesPk];
export type ProfilesOptionalAttributes = "name" | "description" | "timeCreated" | "timeUpdated";
export type ProfilesCreationAttributes = Optional<ProfilesAttributes, ProfilesOptionalAttributes>;

export class Profiles extends Model<ProfilesAttributes, ProfilesCreationAttributes> implements ProfilesAttributes {
  id!: string;
  name?: string;
  description?: string;
  timeCreated?: Date;
  timeUpdated?: Date;


  static initModel(sequelize: Sequelize.Sequelize): typeof Profiles {
    return Profiles.init({
    id: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
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
    }
  }, {
    sequelize,
    tableName: 'profiles',
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
