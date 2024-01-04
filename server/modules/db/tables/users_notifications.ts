import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

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
      field: 'notification_id'
    },
    userId: {
      type: DataTypes.CHAR(36),
      allowNull: true,
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
    ]
  });
  }
}
