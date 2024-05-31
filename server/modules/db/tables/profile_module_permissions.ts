import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Modules, ModulesId } from './modules';
import type { ModulesActions, ModulesActionsId } from './modules_actions';
import type { Profiles, ProfilesId } from './profiles';

export interface ProfileModulePermissionsAttributes {
	profileId: string;
	moduleId: string;
	actionId: string;
}

export type ProfileModulePermissionsPk = 'profileId' | 'moduleId' | 'actionId';
export type ProfileModulePermissionsId = ProfileModulePermissions[ProfileModulePermissionsPk];
export type ProfileModulePermissionsCreationAttributes = ProfileModulePermissionsAttributes;

export class ProfileModulePermissions
	extends Model<ProfileModulePermissionsAttributes, ProfileModulePermissionsCreationAttributes>
	implements ProfileModulePermissionsAttributes
{
	declare profileId: string;
	declare moduleId: string;
	declare actionId: string;

	// ProfileModulePermissions belongsTo Modules via moduleId
	module!: Modules;
	getModule!: Sequelize.BelongsToGetAssociationMixin<Modules>;
	setModule!: Sequelize.BelongsToSetAssociationMixin<Modules, ModulesId>;
	createModule!: Sequelize.BelongsToCreateAssociationMixin<Modules>;
	// ProfileModulePermissions belongsTo ModulesActions via actionId
	action!: ModulesActions;
	getAction!: Sequelize.BelongsToGetAssociationMixin<ModulesActions>;
	setAction!: Sequelize.BelongsToSetAssociationMixin<ModulesActions, ModulesActionsId>;
	createAction!: Sequelize.BelongsToCreateAssociationMixin<ModulesActions>;
	// ProfileModulePermissions belongsTo Profiles via profileId
	profile!: Profiles;
	getProfile!: Sequelize.BelongsToGetAssociationMixin<Profiles>;
	setProfile!: Sequelize.BelongsToSetAssociationMixin<Profiles, ProfilesId>;
	createProfile!: Sequelize.BelongsToCreateAssociationMixin<Profiles>;

	static initModel(sequelize: Sequelize.Sequelize): typeof ProfileModulePermissions {
		return ProfileModulePermissions.init(
			{
				profileId: {
					type: DataTypes.CHAR(36),
					allowNull: false,
					primaryKey: true,
					references: {
						model: 'profiles',
						key: 'id',
					},
					field: 'profile_id',
				},
				moduleId: {
					type: DataTypes.CHAR(36),
					allowNull: false,
					primaryKey: true,
					references: {
						model: 'modules',
						key: 'id',
					},
					field: 'module_id',
				},
				actionId: {
					type: DataTypes.CHAR(36),
					allowNull: false,
					primaryKey: true,
					references: {
						model: 'modules_actions',
						key: 'id',
					},
					field: 'action_id',
				},
			},
			{
				sequelize,
				tableName: 'profile_module_permissions',
				timestamps: false,
				indexes: [
					{
						name: 'PRIMARY',
						unique: true,
						using: 'BTREE',
						fields: [{ name: 'profile_id' }, { name: 'module_id' }, { name: 'action_id' }],
					},
					{
						name: 'module_id',
						using: 'BTREE',
						fields: [{ name: 'module_id' }],
					},
					{
						name: 'fk_action_id',
						using: 'BTREE',
						fields: [{ name: 'action_id' }],
					},
				],
			},
		);
	}
}
