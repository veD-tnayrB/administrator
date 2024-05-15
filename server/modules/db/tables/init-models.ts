import type { Sequelize } from 'sequelize';
import { AccessTokens as _AccessTokens } from './access_tokens';
import type { AccessTokensAttributes, AccessTokensCreationAttributes } from './access_tokens';
import { Modules as _Modules } from './modules';
import type { ModulesAttributes, ModulesCreationAttributes } from './modules';
import { ModulesActions as _ModulesActions } from './modules_actions';
import type { ModulesActionsAttributes, ModulesActionsCreationAttributes } from './modules_actions';
import { Notifications as _Notifications } from './notifications';
import type { NotificationsAttributes, NotificationsCreationAttributes } from './notifications';
import { ProfileModulePermissions as _ProfileModulePermissions } from './profile_module_permissions';
import type {
	ProfileModulePermissionsAttributes,
	ProfileModulePermissionsCreationAttributes,
} from './profile_module_permissions';
import { Profiles as _Profiles } from './profiles';
import type { ProfilesAttributes, ProfilesCreationAttributes } from './profiles';
import { ProfilesNotifications as _ProfilesNotifications } from './profiles_notifications';
import type {
	ProfilesNotificationsAttributes,
	ProfilesNotificationsCreationAttributes,
} from './profiles_notifications';
import { Users as _Users } from './users';
import type { UsersAttributes, UsersCreationAttributes } from './users';
import { UsersNotifications as _UsersNotifications } from './users_notifications';
import type { UsersNotificationsAttributes, UsersNotificationsCreationAttributes } from './users_notifications';
import { UsersProfiles as _UsersProfiles } from './users_profiles';
import type { UsersProfilesAttributes, UsersProfilesCreationAttributes } from './users_profiles';
import { Widgets as _Widgets } from './widgets';
import type { WidgetsAttributes, WidgetsCreationAttributes } from './widgets';

export {
	_AccessTokens as AccessTokens,
	_Modules as Modules,
	_ModulesActions as ModulesActions,
	_Notifications as Notifications,
	_ProfileModulePermissions as ProfileModulePermissions,
	_Profiles as Profiles,
	_ProfilesNotifications as ProfilesNotifications,
	_Users as Users,
	_UsersNotifications as UsersNotifications,
	_UsersProfiles as UsersProfiles,
	_Widgets as Widgets,
};

export type {
	AccessTokensAttributes,
	AccessTokensCreationAttributes,
	ModulesAttributes,
	ModulesCreationAttributes,
	ModulesActionsAttributes,
	ModulesActionsCreationAttributes,
	NotificationsAttributes,
	NotificationsCreationAttributes,
	ProfileModulePermissionsAttributes,
	ProfileModulePermissionsCreationAttributes,
	ProfilesAttributes,
	ProfilesCreationAttributes,
	ProfilesNotificationsAttributes,
	ProfilesNotificationsCreationAttributes,
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
	const Modules = _Modules.initModel(sequelize);
	const ModulesActions = _ModulesActions.initModel(sequelize);
	const Notifications = _Notifications.initModel(sequelize);
	const ProfileModulePermissions = _ProfileModulePermissions.initModel(sequelize);
	const Profiles = _Profiles.initModel(sequelize);
	const ProfilesNotifications = _ProfilesNotifications.initModel(sequelize);
	const Users = _Users.initModel(sequelize);
	const UsersNotifications = _UsersNotifications.initModel(sequelize);
	const UsersProfiles = _UsersProfiles.initModel(sequelize);
	const Widgets = _Widgets.initModel(sequelize);

	Profiles.belongsToMany(Users, {
		as: 'userIdUsers',
		through: UsersProfiles,
		foreignKey: 'profileId',
		otherKey: 'userId',
	});
	Users.belongsToMany(Profiles, {
		as: 'profileIdProfiles',
		through: UsersProfiles,
		foreignKey: 'userId',
		otherKey: 'profileId',
	});
	ModulesActions.belongsTo(Modules, { as: 'module', foreignKey: 'moduleId' });
	Modules.hasMany(ModulesActions, { as: 'modulesActions', foreignKey: 'moduleId' });
	ProfileModulePermissions.belongsTo(Modules, { as: 'module', foreignKey: 'moduleId' });
	Modules.hasMany(ProfileModulePermissions, { as: 'profileModulePermissions', foreignKey: 'moduleId' });
	ProfileModulePermissions.belongsTo(ModulesActions, { as: 'action', foreignKey: 'actionId' });
	ModulesActions.hasMany(ProfileModulePermissions, { as: 'profileModulePermissions', foreignKey: 'actionId' });
	Modules.hasMany(ModulesActions, { as: 'actions', foreignKey: 'moduleId' });
	ProfilesNotifications.belongsTo(Notifications, { as: 'notification', foreignKey: 'notificationId' });
	Notifications.hasMany(ProfilesNotifications, { as: 'profilesNotifications', foreignKey: 'notificationId' });
	UsersNotifications.belongsTo(Notifications, { as: 'notification', foreignKey: 'notificationId' });
	Notifications.hasMany(UsersNotifications, { as: 'usersNotifications', foreignKey: 'notificationId' });
	ProfileModulePermissions.belongsTo(Profiles, { as: 'profile', foreignKey: 'profileId' });
	Profiles.hasMany(ProfileModulePermissions, { as: 'profileModulePermissions', foreignKey: 'profileId' });
	ProfilesNotifications.belongsTo(Profiles, { as: 'profile', foreignKey: 'profileId' });
	Profiles.hasMany(ProfilesNotifications, { as: 'profilesNotifications', foreignKey: 'profileId' });
	UsersProfiles.belongsTo(Profiles, { as: 'profile', foreignKey: 'profileId' });
	Profiles.hasMany(UsersProfiles, { as: 'usersProfiles', foreignKey: 'profileId' });
	AccessTokens.belongsTo(Users, { as: 'user', foreignKey: 'userId' });
	Users.hasMany(AccessTokens, { as: 'accessTokens', foreignKey: 'userId' });
	UsersNotifications.belongsTo(Users, { as: 'user', foreignKey: 'userId' });
	Users.hasMany(UsersNotifications, { as: 'usersNotifications', foreignKey: 'userId' });
	UsersProfiles.belongsTo(Users, { as: 'user', foreignKey: 'userId' });
	Users.hasMany(UsersProfiles, { as: 'usersProfiles', foreignKey: 'userId' });

	return {
		AccessTokens: AccessTokens,
		Modules: Modules,
		ModulesActions: ModulesActions,
		Notifications: Notifications,
		ProfileModulePermissions: ProfileModulePermissions,
		Profiles: Profiles,
		ProfilesNotifications: ProfilesNotifications,
		Users: Users,
		UsersNotifications: UsersNotifications,
		UsersProfiles: UsersProfiles,
		Widgets: Widgets,
	};
}
