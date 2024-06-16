import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { ProfilesNotifications, ProfilesNotificationsId } from './profiles_notifications';
import type { SentNotifications, SentNotificationsId } from './sent_notifications';
import type { UsersNotifications, UsersNotificationsId } from './users_notifications';

export interface NotificationsAttributes {
  id: string;
  title?: string;
  description?: string;
  icon?: string;
  status?: string;
  frecuency?: string;
  timeCreated?: Date;
  timeUpdated?: Date;
  endDate: string;
}

export type NotificationsPk = "id";
export type NotificationsId = Notifications[NotificationsPk];
export type NotificationsOptionalAttributes = "title" | "description" | "icon" | "status" | "frecuency" | "timeCreated" | "timeUpdated";
export type NotificationsCreationAttributes = Optional<NotificationsAttributes, NotificationsOptionalAttributes>;

export class Notifications extends Model<NotificationsAttributes, NotificationsCreationAttributes> implements NotificationsAttributes {
  id!: string;
  title?: string;
  description?: string;
  icon?: string;
  status?: string;
  frecuency?: string;
  timeCreated?: Date;
  timeUpdated?: Date;
  endDate!: string;

  // Notifications hasMany ProfilesNotifications via notificationId
  profilesNotifications!: ProfilesNotifications[];
  getProfilesNotifications!: Sequelize.HasManyGetAssociationsMixin<ProfilesNotifications>;
  setProfilesNotifications!: Sequelize.HasManySetAssociationsMixin<ProfilesNotifications, ProfilesNotificationsId>;
  addProfilesNotification!: Sequelize.HasManyAddAssociationMixin<ProfilesNotifications, ProfilesNotificationsId>;
  addProfilesNotifications!: Sequelize.HasManyAddAssociationsMixin<ProfilesNotifications, ProfilesNotificationsId>;
  createProfilesNotification!: Sequelize.HasManyCreateAssociationMixin<ProfilesNotifications>;
  removeProfilesNotification!: Sequelize.HasManyRemoveAssociationMixin<ProfilesNotifications, ProfilesNotificationsId>;
  removeProfilesNotifications!: Sequelize.HasManyRemoveAssociationsMixin<ProfilesNotifications, ProfilesNotificationsId>;
  hasProfilesNotification!: Sequelize.HasManyHasAssociationMixin<ProfilesNotifications, ProfilesNotificationsId>;
  hasProfilesNotifications!: Sequelize.HasManyHasAssociationsMixin<ProfilesNotifications, ProfilesNotificationsId>;
  countProfilesNotifications!: Sequelize.HasManyCountAssociationsMixin;
  // Notifications hasMany SentNotifications via notificationId
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
  // Notifications hasMany UsersNotifications via notificationId
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

  static initModel(sequelize: Sequelize.Sequelize): typeof Notifications {
    return Notifications.init({
    id: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    icon: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    status: {
      type: DataTypes.STRING(50),
      allowNull: true,
      defaultValue: "0"
    },
    frecuency: {
      type: DataTypes.TEXT,
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
    endDate: {
      type: DataTypes.STRING(25),
      allowNull: false,
      field: 'end_date'
    }
  }, {
    sequelize,
    tableName: 'notifications',
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
