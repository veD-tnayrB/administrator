import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { ProfileModulePermissions, ProfileModulePermissionsId } from './profile_module_permissions';
import type { ProfilesNotifications, ProfilesNotificationsId } from './profiles_notifications';
import type { Users, UsersId } from './users';
import type { UsersProfiles, UsersProfilesId } from './users_profiles';

export interface ProfilesAttributes {
	id: string;
	name?: string;
	description?: string;
	timeCreated?: Date;
	timeUpdated?: Date;
}

export type ProfilesPk = 'id';
export type ProfilesId = Profiles[ProfilesPk];
export type ProfilesOptionalAttributes = 'name' | 'description' | 'timeCreated' | 'timeUpdated';
export type ProfilesCreationAttributes = Optional<ProfilesAttributes, ProfilesOptionalAttributes>;

export class Profiles extends Model<ProfilesAttributes, ProfilesCreationAttributes> implements ProfilesAttributes {
	declare id: string;
	declare name?: string;
	declare description?: string;
	declare timeCreated?: Date;
	declare timeUpdated?: Date;

	// Profiles hasMany ProfileModulePermissions via profileId
	profileModulePermissions!: ProfileModulePermissions[];
	getProfileModulePermissions!: Sequelize.HasManyGetAssociationsMixin<ProfileModulePermissions>;
	setProfileModulePermissions!: Sequelize.HasManySetAssociationsMixin<
		ProfileModulePermissions,
		ProfileModulePermissionsId
	>;
	addProfileModulePermission!: Sequelize.HasManyAddAssociationMixin<
		ProfileModulePermissions,
		ProfileModulePermissionsId
	>;
	addProfileModulePermissions!: Sequelize.HasManyAddAssociationsMixin<
		ProfileModulePermissions,
		ProfileModulePermissionsId
	>;
	createProfileModulePermission!: Sequelize.HasManyCreateAssociationMixin<ProfileModulePermissions>;
	removeProfileModulePermission!: Sequelize.HasManyRemoveAssociationMixin<
		ProfileModulePermissions,
		ProfileModulePermissionsId
	>;
	removeProfileModulePermissions!: Sequelize.HasManyRemoveAssociationsMixin<
		ProfileModulePermissions,
		ProfileModulePermissionsId
	>;
	hasProfileModulePermission!: Sequelize.HasManyHasAssociationMixin<
		ProfileModulePermissions,
		ProfileModulePermissionsId
	>;
	hasProfileModulePermissions!: Sequelize.HasManyHasAssociationsMixin<
		ProfileModulePermissions,
		ProfileModulePermissionsId
	>;
	countProfileModulePermissions!: Sequelize.HasManyCountAssociationsMixin;
	// Profiles hasMany ProfilesNotifications via profileId
	profilesNotifications!: ProfilesNotifications[];
	getProfilesNotifications!: Sequelize.HasManyGetAssociationsMixin<ProfilesNotifications>;
	setProfilesNotifications!: Sequelize.HasManySetAssociationsMixin<ProfilesNotifications, ProfilesNotificationsId>;
	addProfilesNotification!: Sequelize.HasManyAddAssociationMixin<ProfilesNotifications, ProfilesNotificationsId>;
	addProfilesNotifications!: Sequelize.HasManyAddAssociationsMixin<ProfilesNotifications, ProfilesNotificationsId>;
	createProfilesNotification!: Sequelize.HasManyCreateAssociationMixin<ProfilesNotifications>;
	removeProfilesNotification!: Sequelize.HasManyRemoveAssociationMixin<
		ProfilesNotifications,
		ProfilesNotificationsId
	>;
	removeProfilesNotifications!: Sequelize.HasManyRemoveAssociationsMixin<
		ProfilesNotifications,
		ProfilesNotificationsId
	>;
	hasProfilesNotification!: Sequelize.HasManyHasAssociationMixin<ProfilesNotifications, ProfilesNotificationsId>;
	hasProfilesNotifications!: Sequelize.HasManyHasAssociationsMixin<ProfilesNotifications, ProfilesNotificationsId>;
	countProfilesNotifications!: Sequelize.HasManyCountAssociationsMixin;
	// Profiles belongsToMany Users via profileId and userId
	userIdUsers!: Users[];
	getUserIdUsers!: Sequelize.BelongsToManyGetAssociationsMixin<Users>;
	setUserIdUsers!: Sequelize.BelongsToManySetAssociationsMixin<Users, UsersId>;
	addUserIdUser!: Sequelize.BelongsToManyAddAssociationMixin<Users, UsersId>;
	addUserIdUsers!: Sequelize.BelongsToManyAddAssociationsMixin<Users, UsersId>;
	createUserIdUser!: Sequelize.BelongsToManyCreateAssociationMixin<Users>;
	removeUserIdUser!: Sequelize.BelongsToManyRemoveAssociationMixin<Users, UsersId>;
	removeUserIdUsers!: Sequelize.BelongsToManyRemoveAssociationsMixin<Users, UsersId>;
	hasUserIdUser!: Sequelize.BelongsToManyHasAssociationMixin<Users, UsersId>;
	hasUserIdUsers!: Sequelize.BelongsToManyHasAssociationsMixin<Users, UsersId>;
	countUserIdUsers!: Sequelize.BelongsToManyCountAssociationsMixin;
	// Profiles hasMany UsersProfiles via profileId
	usersProfiles!: UsersProfiles[];
	getUsersProfiles!: Sequelize.HasManyGetAssociationsMixin<UsersProfiles>;
	setUsersProfiles!: Sequelize.HasManySetAssociationsMixin<UsersProfiles, UsersProfilesId>;
	addUsersProfile!: Sequelize.HasManyAddAssociationMixin<UsersProfiles, UsersProfilesId>;
	addUsersProfiles!: Sequelize.HasManyAddAssociationsMixin<UsersProfiles, UsersProfilesId>;
	createUsersProfile!: Sequelize.HasManyCreateAssociationMixin<UsersProfiles>;
	removeUsersProfile!: Sequelize.HasManyRemoveAssociationMixin<UsersProfiles, UsersProfilesId>;
	removeUsersProfiles!: Sequelize.HasManyRemoveAssociationsMixin<UsersProfiles, UsersProfilesId>;
	hasUsersProfile!: Sequelize.HasManyHasAssociationMixin<UsersProfiles, UsersProfilesId>;
	hasUsersProfiles!: Sequelize.HasManyHasAssociationsMixin<UsersProfiles, UsersProfilesId>;
	countUsersProfiles!: Sequelize.HasManyCountAssociationsMixin;

	static initModel(sequelize: Sequelize.Sequelize): typeof Profiles {
		return Profiles.init(
			{
				id: {
					type: DataTypes.CHAR(36),
					allowNull: false,
					primaryKey: true,
				},
				name: {
					type: DataTypes.STRING(255),
					allowNull: true,
				},
				description: {
					type: DataTypes.TEXT,
					allowNull: true,
				},
				timeCreated: {
					type: DataTypes.DATE,
					allowNull: true,
					field: 'time_created',
				},
				timeUpdated: {
					type: DataTypes.DATE,
					allowNull: true,
					field: 'time_updated',
				},
			},
			{
				sequelize,
				tableName: 'profiles',
				timestamps: false,
				indexes: [
					{
						name: 'PRIMARY',
						unique: true,
						using: 'BTREE',
						fields: [{ name: 'id' }],
					},
				],
			}
		);
	}
}
