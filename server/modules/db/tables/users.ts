import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface UsersAttributes {
  id: string;
  active?: number;
  email?: string;
  lastNames?: string;
  names?: string;
  timeCreated?: Date;
  timeUpdated?: Date;
}

export type UsersPk = "id";
export type UsersId = Users[UsersPk];
export type UsersOptionalAttributes = "active" | "email" | "lastNames" | "names" | "timeCreated" | "timeUpdated";
export type UsersCreationAttributes = Optional<UsersAttributes, UsersOptionalAttributes>;

export class Users extends Model<UsersAttributes, UsersCreationAttributes> implements UsersAttributes {
  id!: string;
  active?: number;
  email?: string;
  lastNames?: string;
  names?: string;
  timeCreated?: Date;
  timeUpdated?: Date;


  static initModel(sequelize: Sequelize.Sequelize): typeof Users {
    return Users.init({
    id: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      primaryKey: true
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    lastNames: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    names: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    timeCreated: {
      type: DataTypes.DATE,
      allowNull: true
    },
    timeUpdated: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'users',
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
