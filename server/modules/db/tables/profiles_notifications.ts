import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Notifications, NotificationsId } from './notifications';
import type { Profiles, ProfilesId } from './profiles';

export interface ProfilesNotificationsAttributes {
  profileId: string;
  notificationId: string;
}

export type ProfilesNotificationsCreationAttributes = ProfilesNotificationsAttributes;

export class ProfilesNotifications extends Model<ProfilesNotificationsAttributes, ProfilesNotificationsCreationAttributes> implements ProfilesNotificationsAttributes {
  profileId!: string;
  notificationId!: string;

  // ProfilesNotifications belongsTo Notifications via notificationId
  notification!: Notifications;
  getNotification!: Sequelize.BelongsToGetAssociationMixin<Notifications>;
  setNotification!: Sequelize.BelongsToSetAssociationMixin<Notifications, NotificationsId>;
  createNotification!: Sequelize.BelongsToCreateAssociationMixin<Notifications>;
  // ProfilesNotifications belongsTo Profiles via profileId
  profile!: Profiles;
  getProfile!: Sequelize.BelongsToGetAssociationMixin<Profiles>;
  setProfile!: Sequelize.BelongsToSetAssociationMixin<Profiles, ProfilesId>;
  createProfile!: Sequelize.BelongsToCreateAssociationMixin<Profiles>;

  static initModel(sequelize: Sequelize.Sequelize): typeof ProfilesNotifications {
    return ProfilesNotifications.init({
    profileId: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      references: {
        model: 'profiles',
        key: 'id'
      },
      field: 'profile_id'
    },
    notificationId: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      references: {
        model: 'notifications',
        key: 'id'
      },
      field: 'notification_id'
    }
  }, {
    sequelize,
    tableName: 'profiles_notifications',
    timestamps: false,
    indexes: [
      {
        name: "fk_profile",
        using: "BTREE",
        fields: [
          { name: "profile_id" },
        ]
      },
      {
        name: "fk_notification",
        using: "BTREE",
        fields: [
          { name: "notification_id" },
        ]
      },
    ]
  });
  }
}
