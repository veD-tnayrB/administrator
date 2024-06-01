import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Profiles, ProfilesId } from './profiles';
import type { Users, UsersId } from './users';

export interface UsersProfilesAttributes {
  userId: string;
  profileId: string;
}

export type UsersProfilesPk = "userId" | "profileId";
export type UsersProfilesId = UsersProfiles[UsersProfilesPk];
export type UsersProfilesCreationAttributes = UsersProfilesAttributes;

export class UsersProfiles extends Model<UsersProfilesAttributes, UsersProfilesCreationAttributes> implements UsersProfilesAttributes {
  userId!: string;
  profileId!: string;

  // UsersProfiles belongsTo Profiles via profileId
  profile!: Profiles;
  getProfile!: Sequelize.BelongsToGetAssociationMixin<Profiles>;
  setProfile!: Sequelize.BelongsToSetAssociationMixin<Profiles, ProfilesId>;
  createProfile!: Sequelize.BelongsToCreateAssociationMixin<Profiles>;
  // UsersProfiles belongsTo Users via userId
  user!: Users;
  getUser!: Sequelize.BelongsToGetAssociationMixin<Users>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<Users, UsersId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<Users>;

  static initModel(sequelize: Sequelize.Sequelize): typeof UsersProfiles {
    return UsersProfiles.init({
    userId: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'users',
        key: 'id'
      },
      field: 'user_id'
    },
    profileId: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'profiles',
        key: 'id'
      },
      field: 'profile_id'
    }
  }, {
    sequelize,
    tableName: 'users_profiles',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "user_id" },
          { name: "profile_id" },
        ]
      },
      {
        name: "profile_id",
        using: "BTREE",
        fields: [
          { name: "profile_id" },
        ]
      },
    ]
  });
  }
}
