import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Notifications, NotificationsId } from './notifications';
import type { Users, UsersId } from './users';

export interface SentNotificationsAttributes {
  id: string;
  notificationId: string;
  userId: string;
  status: 'sent' | 'read';
  timeSent?: Date;
  timeUpdated?: Date;
}

export type SentNotificationsPk = "id";
export type SentNotificationsId = SentNotifications[SentNotificationsPk];
export type SentNotificationsOptionalAttributes = "timeSent" | "timeUpdated";
export type SentNotificationsCreationAttributes = Optional<SentNotificationsAttributes, SentNotificationsOptionalAttributes>;

export class SentNotifications extends Model<SentNotificationsAttributes, SentNotificationsCreationAttributes> implements SentNotificationsAttributes {
  id!: string;
  notificationId!: string;
  userId!: string;
  status!: 'sent' | 'read';
  timeSent?: Date;
  timeUpdated?: Date;

  // SentNotifications belongsTo Notifications via notificationId
  notification!: Notifications;
  getNotification!: Sequelize.BelongsToGetAssociationMixin<Notifications>;
  setNotification!: Sequelize.BelongsToSetAssociationMixin<Notifications, NotificationsId>;
  createNotification!: Sequelize.BelongsToCreateAssociationMixin<Notifications>;
  // SentNotifications belongsTo Users via userId
  user!: Users;
  getUser!: Sequelize.BelongsToGetAssociationMixin<Users>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<Users, UsersId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<Users>;

  static initModel(sequelize: Sequelize.Sequelize): typeof SentNotifications {
    return SentNotifications.init({
    id: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      primaryKey: true
    },
    notificationId: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      references: {
        model: 'notifications',
        key: 'id'
      },
      field: 'notification_id'
    },
    userId: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      },
      field: 'user_id'
    },
    status: {
      type: DataTypes.ENUM('sent','read'),
      allowNull: false
    },
    timeSent: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      field: 'time_sent'
    },
    timeUpdated: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      field: 'time_updated'
    }
  }, {
    sequelize,
    tableName: 'sent_notifications',
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
        name: "fk_sent_notifications_user_id",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
      {
        name: "idx_sent_notifications_notification_id",
        using: "BTREE",
        fields: [
          { name: "notification_id" },
        ]
      },
    ]
  });
  }
}
