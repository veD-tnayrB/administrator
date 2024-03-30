import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface NotificationsAttributes {
  id: string;
  title?: string;
  description?: string;
  icon?: string;
  status?: string;
  frecuency?: string;
  timeCreated?: Date;
  timeUpdated?: Date;
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
      allowNull: true
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
