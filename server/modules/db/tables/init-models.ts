import type { Sequelize } from "sequelize";
import { Notifications as _Notifications } from "./notifications";
import type { NotificationsAttributes, NotificationsCreationAttributes } from "./notifications";

export {
  _Notifications as Notifications,
};

export type {
  NotificationsAttributes,
  NotificationsCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  const Notifications = _Notifications.initModel(sequelize);


  return {
    Notifications: Notifications,
  };
}
