import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { ApiModules, ApiModulesId } from './api_modules';
import type { Permissions, PermissionsId } from './permissions';
import type { Profiles, ProfilesId } from './profiles';

export interface ProfileApiModulePermissionsAttributes {
  id: string;
  profileId: string;
  apiModuleId: string;
  permissionId: string;
  timeCreated?: Date;
  timeUpdated?: Date;
}

export type ProfileApiModulePermissionsPk = "id";
export type ProfileApiModulePermissionsId = ProfileApiModulePermissions[ProfileApiModulePermissionsPk];
export type ProfileApiModulePermissionsOptionalAttributes = "timeCreated" | "timeUpdated";
export type ProfileApiModulePermissionsCreationAttributes = Optional<ProfileApiModulePermissionsAttributes, ProfileApiModulePermissionsOptionalAttributes>;

export class ProfileApiModulePermissions extends Model<ProfileApiModulePermissionsAttributes, ProfileApiModulePermissionsCreationAttributes> implements ProfileApiModulePermissionsAttributes {
  id!: string;
  profileId!: string;
  apiModuleId!: string;
  permissionId!: string;
  timeCreated?: Date;
  timeUpdated?: Date;

  // ProfileApiModulePermissions belongsTo ApiModules via apiModuleId
  apiModule!: ApiModules;
  getApiModule!: Sequelize.BelongsToGetAssociationMixin<ApiModules>;
  setApiModule!: Sequelize.BelongsToSetAssociationMixin<ApiModules, ApiModulesId>;
  createApiModule!: Sequelize.BelongsToCreateAssociationMixin<ApiModules>;
  // ProfileApiModulePermissions belongsTo Permissions via permissionId
  permission!: Permissions;
  getPermission!: Sequelize.BelongsToGetAssociationMixin<Permissions>;
  setPermission!: Sequelize.BelongsToSetAssociationMixin<Permissions, PermissionsId>;
  createPermission!: Sequelize.BelongsToCreateAssociationMixin<Permissions>;
  // ProfileApiModulePermissions belongsTo Profiles via profileId
  profile!: Profiles;
  getProfile!: Sequelize.BelongsToGetAssociationMixin<Profiles>;
  setProfile!: Sequelize.BelongsToSetAssociationMixin<Profiles, ProfilesId>;
  createProfile!: Sequelize.BelongsToCreateAssociationMixin<Profiles>;

  static initModel(sequelize: Sequelize.Sequelize): typeof ProfileApiModulePermissions {
    return ProfileApiModulePermissions.init({
    id: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      primaryKey: true
    },
    profileId: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      references: {
        model: 'profiles',
        key: 'id'
      },
      field: 'profile_id'
    },
    apiModuleId: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      references: {
        model: 'api_modules',
        key: 'id'
      },
      field: 'api_module_id'
    },
    permissionId: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      references: {
        model: 'permissions',
        key: 'id'
      },
      field: 'permission_id'
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
    tableName: 'profile_api_module_permissions',
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
        name: "profile_id",
        using: "BTREE",
        fields: [
          { name: "profile_id" },
        ]
      },
      {
        name: "api_module_id",
        using: "BTREE",
        fields: [
          { name: "api_module_id" },
        ]
      },
      {
        name: "permission_id",
        using: "BTREE",
        fields: [
          { name: "permission_id" },
        ]
      },
    ]
  });
  }
}
