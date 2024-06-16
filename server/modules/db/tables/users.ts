import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { AccessTokens, AccessTokensId } from './access_tokens';
import type { Profiles, ProfilesId } from './profiles';
import type { SentNotifications, SentNotificationsId } from './sent_notifications';
import type { UsersNotifications, UsersNotificationsId } from './users_notifications';
import type { UsersProfiles, UsersProfilesId } from './users_profiles';
import type { UsersWidgets, UsersWidgetsId } from './users_widgets';

export interface UsersAttributes {
  id: string;
  active?: number;
  email?: string;
  lastNames?: string;
  names?: string;
  timeCreated?: Date;
  timeUpdated?: Date;
  password?: string;
  profileImg?: string;
  forgetPasswordToken?: string;
}

export type UsersPk = "id";
export type UsersId = Users[UsersPk];
export type UsersOptionalAttributes = "active" | "email" | "lastNames" | "names" | "timeCreated" | "timeUpdated" | "password" | "profileImg" | "forgetPasswordToken";
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
  profileImg?: string;
  forgetPasswordToken?: string;

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
  // Users belongsToMany Profiles via userId and profileId
  profileIdProfiles!: Profiles[];
  getProfileIdProfiles!: Sequelize.BelongsToManyGetAssociationsMixin<Profiles>;
  setProfileIdProfiles!: Sequelize.BelongsToManySetAssociationsMixin<Profiles, ProfilesId>;
  addProfileIdProfile!: Sequelize.BelongsToManyAddAssociationMixin<Profiles, ProfilesId>;
  addProfileIdProfiles!: Sequelize.BelongsToManyAddAssociationsMixin<Profiles, ProfilesId>;
  createProfileIdProfile!: Sequelize.BelongsToManyCreateAssociationMixin<Profiles>;
  removeProfileIdProfile!: Sequelize.BelongsToManyRemoveAssociationMixin<Profiles, ProfilesId>;
  removeProfileIdProfiles!: Sequelize.BelongsToManyRemoveAssociationsMixin<Profiles, ProfilesId>;
  hasProfileIdProfile!: Sequelize.BelongsToManyHasAssociationMixin<Profiles, ProfilesId>;
  hasProfileIdProfiles!: Sequelize.BelongsToManyHasAssociationsMixin<Profiles, ProfilesId>;
  countProfileIdProfiles!: Sequelize.BelongsToManyCountAssociationsMixin;
  // Users hasMany SentNotifications via userId
  sentNotifications!: SentNotifications[];
  getSentNotifications!: Sequelize.HasManyGetAssociationsMixin<SentNotifications>;
  setSentNotifications!: Sequelize.HasManySetAssociationsMixin<SentNotifications, SentNotificationsId>;
  addSentNotification!: Sequelize.HasManyAddAssociationMixin<SentNotifications, SentNotificationsId>;
  addSentNotifications!: Sequelize.HasManyAddAssociationsMixin<SentNotifications, SentNotificationsId>;
  createSentNotification!: Sequelize.HasManyCreateAssociationMixin<SentNotifications>;
  removeSentNotification!: Sequelize.HasManyRemoveAssociationMixin<SentNotifications, SentNotificationsId>;
  removeSentNotifications!: Sequelize.HasManyRemoveAssociationsMixin<SentNotifications, SentNotificationsId>;
  hasSentNotification!: Sequelize.HasManyHasAssociationMixin<SentNotifications, SentNotificationsId>;
  hasSentNotifications!: Sequelize.HasManyHasAssociationsMixin<SentNotifications, SentNotificationsId>;
  countSentNotifications!: Sequelize.HasManyCountAssociationsMixin;
  // Users hasMany UsersNotifications via userId
  usersNotifications!: UsersNotifications[];
  getUsersNotifications!: Sequelize.HasManyGetAssociationsMixin<UsersNotifications>;
  setUsersNotifications!: Sequelize.HasManySetAssociationsMixin<UsersNotifications, UsersNotificationsId>;
  addUsersNotification!: Sequelize.HasManyAddAssociationMixin<UsersNotifications, UsersNotificationsId>;
  addUsersNotifications!: Sequelize.HasManyAddAssociationsMixin<UsersNotifications, UsersNotificationsId>;
  createUsersNotification!: Sequelize.HasManyCreateAssociationMixin<UsersNotifications>;
  removeUsersNotification!: Sequelize.HasManyRemoveAssociationMixin<UsersNotifications, UsersNotificationsId>;
  removeUsersNotifications!: Sequelize.HasManyRemoveAssociationsMixin<UsersNotifications, UsersNotificationsId>;
  hasUsersNotification!: Sequelize.HasManyHasAssociationMixin<UsersNotifications, UsersNotificationsId>;
  hasUsersNotifications!: Sequelize.HasManyHasAssociationsMixin<UsersNotifications, UsersNotificationsId>;
  countUsersNotifications!: Sequelize.HasManyCountAssociationsMixin;
  // Users hasMany UsersProfiles via userId
  usersProfiles!: UsersProfiles[];
  getUsersProfiles!: Sequelize.HasManyGetAssociationsMixin<UsersProfiles>;
  setUsersProfiles!: Sequelize.HasManySetAssociationsMixin<UsersProfiles, UsersProfilesId>;
  addUsersProfile!: Sequelize.HasManyAddAssociationMixin<UsersProfiles, UsersProfilesId>;
  addUsersProfiles!: Sequelize.HasManyAddAssociationsMixin<UsersProfiles, UsersProfilesId>;
  createUsersProfile!: Sequelize.HasManyCreateAssociationMixin<UsersProfiles>;
  removeUsersProfile!: Sequelize.HasManyRemoveAssociationMixin<UsersProfiles, UsersProfilesId>;
  removeUsersProfiles!: Sequelize.HasManyRemoveAssociationsMixin<UsersProfiles, UsersProfilesId>;
  hasUsersProfile!: Sequelize.HasManyHasAssociationMixin<UsersProfiles, UsersProfilesId>;
  hasUsersProfiles!: Sequelize.HasManyHasAssociationsMixin<UsersProfiles, UsersProfilesId>;
  countUsersProfiles!: Sequelize.HasManyCountAssociationsMixin;
  // Users hasMany UsersWidgets via userId
  usersWidgets!: UsersWidgets[];
  getUsersWidgets!: Sequelize.HasManyGetAssociationsMixin<UsersWidgets>;
  setUsersWidgets!: Sequelize.HasManySetAssociationsMixin<UsersWidgets, UsersWidgetsId>;
  addUsersWidget!: Sequelize.HasManyAddAssociationMixin<UsersWidgets, UsersWidgetsId>;
  addUsersWidgets!: Sequelize.HasManyAddAssociationsMixin<UsersWidgets, UsersWidgetsId>;
  createUsersWidget!: Sequelize.HasManyCreateAssociationMixin<UsersWidgets>;
  removeUsersWidget!: Sequelize.HasManyRemoveAssociationMixin<UsersWidgets, UsersWidgetsId>;
  removeUsersWidgets!: Sequelize.HasManyRemoveAssociationsMixin<UsersWidgets, UsersWidgetsId>;
  hasUsersWidget!: Sequelize.HasManyHasAssociationMixin<UsersWidgets, UsersWidgetsId>;
  hasUsersWidgets!: Sequelize.HasManyHasAssociationsMixin<UsersWidgets, UsersWidgetsId>;
  countUsersWidgets!: Sequelize.HasManyCountAssociationsMixin;

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
    },
    profileImg: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'profile_img'
    },
    forgetPasswordToken: {
      type: DataTypes.STRING(36),
      allowNull: true,
      unique: "forget_password_token_UNIQUE",
      field: 'forget_password_token'
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
      {
        name: "forget_password_token_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "forget_password_token" },
        ]
      },
    ]
  });
  }
}
