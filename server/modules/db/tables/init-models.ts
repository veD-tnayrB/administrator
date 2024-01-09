import type { Sequelize } from "sequelize";
import { AccessTokens as _AccessTokens } from "./access_tokens";
import type { AccessTokensAttributes, AccessTokensCreationAttributes } from "./access_tokens";
import { ApiModules as _ApiModules } from "./api_modules";
import type { ApiModulesAttributes, ApiModulesCreationAttributes } from "./api_modules";
import { Modules as _Modules } from "./modules";
import type { ModulesAttributes, ModulesCreationAttributes } from "./modules";
import { Notifications as _Notifications } from "./notifications";
import type { NotificationsAttributes, NotificationsCreationAttributes } from "./notifications";
import { Permissions as _Permissions } from "./permissions";
import type { PermissionsAttributes, PermissionsCreationAttributes } from "./permissions";
import { ProfileApiModulePermissions as _ProfileApiModulePermissions } from "./profile_api_module_permissions";
import type { ProfileApiModulePermissionsAttributes, ProfileApiModulePermissionsCreationAttributes } from "./profile_api_module_permissions";
import { ProfileModulePermissions as _ProfileModulePermissions } from "./profile_module_permissions";
import type { ProfileModulePermissionsAttributes, ProfileModulePermissionsCreationAttributes } from "./profile_module_permissions";
import { Profiles as _Profiles } from "./profiles";
import type { ProfilesAttributes, ProfilesCreationAttributes } from "./profiles";
import { Users as _Users } from "./users";
import type { UsersAttributes, UsersCreationAttributes } from "./users";
import { UsersNotifications as _UsersNotifications } from "./users_notifications";
import type { UsersNotificationsAttributes, UsersNotificationsCreationAttributes } from "./users_notifications";
import { UsersProfiles as _UsersProfiles } from "./users_profiles";
import type { UsersProfilesAttributes, UsersProfilesCreationAttributes } from "./users_profiles";
import { Widgets as _Widgets } from "./widgets";
import type { WidgetsAttributes, WidgetsCreationAttributes } from "./widgets";

export {
  _AccessTokens as AccessTokens,
  _ApiModules as ApiModules,
  _Modules as Modules,
  _Notifications as Notifications,
  _Permissions as Permissions,
  _ProfileApiModulePermissions as ProfileApiModulePermissions,
  _ProfileModulePermissions as ProfileModulePermissions,
  _Profiles as Profiles,
  _Users as Users,
  _UsersNotifications as UsersNotifications,
  _UsersProfiles as UsersProfiles,
  _Widgets as Widgets,
};

export type {
  AccessTokensAttributes,
  AccessTokensCreationAttributes,
  ApiModulesAttributes,
  ApiModulesCreationAttributes,
  ModulesAttributes,
  ModulesCreationAttributes,
  NotificationsAttributes,
  NotificationsCreationAttributes,
  PermissionsAttributes,
  PermissionsCreationAttributes,
  ProfileApiModulePermissionsAttributes,
  ProfileApiModulePermissionsCreationAttributes,
  ProfileModulePermissionsAttributes,
  ProfileModulePermissionsCreationAttributes,
  ProfilesAttributes,
  ProfilesCreationAttributes,
  UsersAttributes,
  UsersCreationAttributes,
  UsersNotificationsAttributes,
  UsersNotificationsCreationAttributes,
  UsersProfilesAttributes,
  UsersProfilesCreationAttributes,
  WidgetsAttributes,
  WidgetsCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  const AccessTokens = _AccessTokens.initModel(sequelize);
  const ApiModules = _ApiModules.initModel(sequelize);
  const Modules = _Modules.initModel(sequelize);
  const Notifications = _Notifications.initModel(sequelize);
  const Permissions = _Permissions.initModel(sequelize);
  const ProfileApiModulePermissions = _ProfileApiModulePermissions.initModel(sequelize);
  const ProfileModulePermissions = _ProfileModulePermissions.initModel(sequelize);
  const Profiles = _Profiles.initModel(sequelize);
  const Users = _Users.initModel(sequelize);
  const UsersNotifications = _UsersNotifications.initModel(sequelize);
  const UsersProfiles = _UsersProfiles.initModel(sequelize);
  const Widgets = _Widgets.initModel(sequelize);

  Profiles.belongsToMany(Users, { as: 'userIdUsers', through: UsersProfiles, foreignKey: "profileId", otherKey: "userId" });
  Users.belongsToMany(Profiles, { as: 'profileIdProfiles', through: UsersProfiles, foreignKey: "userId", otherKey: "profileId" });
  ProfileApiModulePermissions.belongsTo(ApiModules, { as: "apiModule", foreignKey: "apiModuleId"});
  ApiModules.hasMany(ProfileApiModulePermissions, { as: "profileApiModulePermissions", foreignKey: "apiModuleId"});
  ProfileModulePermissions.belongsTo(Modules, { as: "module", foreignKey: "moduleId"});
  Modules.hasMany(ProfileModulePermissions, { as: "profileModulePermissions", foreignKey: "moduleId"});
  ProfileApiModulePermissions.belongsTo(Permissions, { as: "permission", foreignKey: "permissionId"});
  Permissions.hasMany(ProfileApiModulePermissions, { as: "profileApiModulePermissions", foreignKey: "permissionId"});
  ProfileModulePermissions.belongsTo(Permissions, { as: "permission", foreignKey: "permissionId"});
  Permissions.hasMany(ProfileModulePermissions, { as: "profileModulePermissions", foreignKey: "permissionId"});
  ProfileApiModulePermissions.belongsTo(Profiles, { as: "profile", foreignKey: "profileId"});
  Profiles.hasMany(ProfileApiModulePermissions, { as: "profileApiModulePermissions", foreignKey: "profileId"});
  ProfileModulePermissions.belongsTo(Profiles, { as: "profile", foreignKey: "profileId"});
  Profiles.hasMany(ProfileModulePermissions, { as: "profileModulePermissions", foreignKey: "profileId"});
  UsersProfiles.belongsTo(Profiles, { as: "profile", foreignKey: "profileId"});
  Profiles.hasMany(UsersProfiles, { as: "usersProfiles", foreignKey: "profileId"});
  AccessTokens.belongsTo(Users, { as: "user", foreignKey: "userId"});
  Users.hasMany(AccessTokens, { as: "accessTokens", foreignKey: "userId"});
  UsersNotifications.belongsTo(Users, { as: "user", foreignKey: "userId"});
  Users.hasMany(UsersNotifications, { as: "usersNotifications", foreignKey: "userId"});
  UsersProfiles.belongsTo(Users, { as: "user", foreignKey: "userId"});
  Users.hasMany(UsersProfiles, { as: "usersProfiles", foreignKey: "userId"});

  return {
    AccessTokens: AccessTokens,
    ApiModules: ApiModules,
    Modules: Modules,
    Notifications: Notifications,
    Permissions: Permissions,
    ProfileApiModulePermissions: ProfileApiModulePermissions,
    ProfileModulePermissions: ProfileModulePermissions,
    Profiles: Profiles,
    Users: Users,
    UsersNotifications: UsersNotifications,
    UsersProfiles: UsersProfiles,
    Widgets: Widgets,
  };
}
