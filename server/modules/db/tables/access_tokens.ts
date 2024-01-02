import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Users, UsersId } from './users';

export interface AccessTokensAttributes {
  id: string;
  userId?: string;
  accessToken?: string;
  timeUpdated?: Date;
  timeCreated?: Date;
}

export type AccessTokensPk = "id";
export type AccessTokensId = AccessTokens[AccessTokensPk];
export type AccessTokensOptionalAttributes = "userId" | "accessToken" | "timeUpdated" | "timeCreated";
export type AccessTokensCreationAttributes = Optional<AccessTokensAttributes, AccessTokensOptionalAttributes>;

export class AccessTokens extends Model<AccessTokensAttributes, AccessTokensCreationAttributes> implements AccessTokensAttributes {
  id!: string;
  userId?: string;
  accessToken?: string;
  timeUpdated?: Date;
  timeCreated?: Date;

  // AccessTokens belongsTo Users via userId
  user!: Users;
  getUser!: Sequelize.BelongsToGetAssociationMixin<Users>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<Users, UsersId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<Users>;

  static initModel(sequelize: Sequelize.Sequelize): typeof AccessTokens {
    return AccessTokens.init({
    id: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      primaryKey: true
    },
    userId: {
      type: DataTypes.CHAR(36),
      allowNull: true,
      references: {
        model: 'users',
        key: 'id'
      },
      field: 'user_id'
    },
    accessToken: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'access_token'
    },
    timeUpdated: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'time_updated'
    },
    timeCreated: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'time_created'
    }
  }, {
    sequelize,
    tableName: 'access_tokens',
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
      {
        name: "user_id",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
    ]
  });
  }
}
