import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { AccessTokens, AccessTokensId } from './access_tokens';

export interface UsersAttributes {
  id: string;
  active?: number;
  email?: string;
  lastNames?: string;
  names?: string;
  timeCreated?: Date;
  timeUpdated?: Date;
  password?: string;
}

export type UsersPk = "id";
export type UsersId = Users[UsersPk];
export type UsersOptionalAttributes = "active" | "email" | "lastNames" | "names" | "timeCreated" | "timeUpdated" | "password";
export type UsersCreationAttributes = Optional<UsersAttributes, UsersOptionalAttributes>;

export class Users extends Model<UsersAttributes, UsersCreationAttributes> implements UsersAttributes {
  id!: string;
  active?: number;
  email?: string;
  lastNames?: string;
  names?: string;
  timeCreated?: Date;
  timeUpdated?: Date;
  password?: string;

  // Users hasMany AccessTokens via userId
  accessTokens!: AccessTokens[];
  getAccessTokens!: Sequelize.HasManyGetAssociationsMixin<AccessTokens>;
  setAccessTokens!: Sequelize.HasManySetAssociationsMixin<AccessTokens, AccessTokensId>;
  addAccessToken!: Sequelize.HasManyAddAssociationMixin<AccessTokens, AccessTokensId>;
  addAccessTokens!: Sequelize.HasManyAddAssociationsMixin<AccessTokens, AccessTokensId>;
  createAccessToken!: Sequelize.HasManyCreateAssociationMixin<AccessTokens>;
  removeAccessToken!: Sequelize.HasManyRemoveAssociationMixin<AccessTokens, AccessTokensId>;
  removeAccessTokens!: Sequelize.HasManyRemoveAssociationsMixin<AccessTokens, AccessTokensId>;
  hasAccessToken!: Sequelize.HasManyHasAssociationMixin<AccessTokens, AccessTokensId>;
  hasAccessTokens!: Sequelize.HasManyHasAssociationsMixin<AccessTokens, AccessTokensId>;
  countAccessTokens!: Sequelize.HasManyCountAssociationsMixin;

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
      allowNull: true,
      field: 'last_names'
    },
    names: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    timeCreated: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      field: 'time_created'
    },
    timeUpdated: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      field: 'time_updated'
    },
    password: {
      type: DataTypes.STRING(32),
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
