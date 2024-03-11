import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Notifications, NotificationsId } from './notifications';
import type { Users, UsersId } from './users';

export interface UsersNotificationsAttributes {
  id: string;
  notificationId?: string;
  userId?: string;
  timeCreated?: Date;
  timeUpdated?: Date;
}

export type UsersNotificationsPk = "id";
export type UsersNotificationsId = UsersNotifications[UsersNotificationsPk];
export type UsersNotificationsOptionalAttributes = "notificationId" | "userId" | "timeCreated" | "timeUpdated";
export type UsersNotificationsCreationAttributes = Optional<UsersNotificationsAttributes, UsersNotificationsOptionalAttributes>;

export class UsersNotifications extends Model<UsersNotificationsAttributes, UsersNotificationsCreationAttributes> implements UsersNotificationsAttributes {
  id!: string;
  notificationId?: string;
  userId?: string;
  timeCreated?: Date;
  timeUpdated?: Date;

  // UsersNotifications belongsTo Notifications via notificationId
  notification!: Notifications;
  getNotification!: Sequelize.BelongsToGetAssociationMixin<Notifications>;
  setNotification!: Sequelize.BelongsToSetAssociationMixin<Notifications, NotificationsId>;
  createNotification!: Sequelize.BelongsToCreateAssociationMixin<Notifications>;
  // UsersNotifications belongsTo Users via userId
  user!: Users;
  getUser!: Sequelize.BelongsToGetAssociationMixin<Users>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<Users, UsersId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<Users>;

  static initModel(sequelize: Sequelize.Sequelize): typeof UsersNotifications {
    return UsersNotifications.init({
    id: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      primaryKey: true
    },
    notificationId: {
      type: DataTypes.CHAR(36),
      allowNull: true,
      references: {
        model: 'notifications',
        key: 'id'
      },
      field: 'notification_id'
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
    }
  }, {
    sequelize,
    tableName: 'users_notifications',
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
        name: "fk_users_notifications_user",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
      {
        name: "fk_users_notifications_notification",
        using: "BTREE",
        fields: [
          { name: "notification_id" },
        ]
      },
    ]
  });
  }
}
