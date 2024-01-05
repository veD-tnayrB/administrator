import type { Sequelize } from "sequelize";
import { AccessTokens as _AccessTokens } from "./access_tokens";
import type { AccessTokensAttributes, AccessTokensCreationAttributes } from "./access_tokens";
import { Modules as _Modules } from "./modules";
import type { ModulesAttributes, ModulesCreationAttributes } from "./modules";
import { Notifications as _Notifications } from "./notifications";
import type { NotificationsAttributes, NotificationsCreationAttributes } from "./notifications";
import { Profiles as _Profiles } from "./profiles";
import type { ProfilesAttributes, ProfilesCreationAttributes } from "./profiles";
import { Users as _Users } from "./users";
import type { UsersAttributes, UsersCreationAttributes } from "./users";
import { UsersNotifications as _UsersNotifications } from "./users_notifications";
import type { UsersNotificationsAttributes, UsersNotificationsCreationAttributes } from "./users_notifications";
import { Widgets as _Widgets } from "./widgets";
import type { WidgetsAttributes, WidgetsCreationAttributes } from "./widgets";

export {
  _AccessTokens as AccessTokens,
  _Modules as Modules,
  _Notifications as Notifications,
  _Profiles as Profiles,
  _Users as Users,
  _UsersNotifications as UsersNotifications,
  _Widgets as Widgets,
};

export type {
  AccessTokensAttributes,
  AccessTokensCreationAttributes,
  ModulesAttributes,
  ModulesCreationAttributes,
  NotificationsAttributes,
  NotificationsCreationAttributes,
  ProfilesAttributes,
  ProfilesCreationAttributes,
  UsersAttributes,
  UsersCreationAttributes,
  UsersNotificationsAttributes,
  UsersNotificationsCreationAttributes,
  WidgetsAttributes,
  WidgetsCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  const AccessTokens = _AccessTokens.initModel(sequelize);
  const Modules = _Modules.initModel(sequelize);
  const Notifications = _Notifications.initModel(sequelize);
  const Profiles = _Profiles.initModel(sequelize);
  const Users = _Users.initModel(sequelize);
  const UsersNotifications = _UsersNotifications.initModel(sequelize);
  const Widgets = _Widgets.initModel(sequelize);

  AccessTokens.belongsTo(Users, { as: "user", foreignKey: "userId"});
  Users.hasMany(AccessTokens, { as: "accessTokens", foreignKey: "userId"});
  UsersNotifications.belongsTo(Users, { as: "user", foreignKey: "userId"});
  Users.hasMany(UsersNotifications, { as: "usersNotifications", foreignKey: "userId"});

  return {
    AccessTokens: AccessTokens,
    Modules: Modules,
    Notifications: Notifications,
    Profiles: Profiles,
    Users: Users,
    UsersNotifications: UsersNotifications,
    Widgets: Widgets,
  };
}
