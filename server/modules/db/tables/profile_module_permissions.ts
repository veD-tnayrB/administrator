import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Modules, ModulesId } from './modules';
import type { Permissions, PermissionsId } from './permissions';
import type { Profiles, ProfilesId } from './profiles';

export interface ProfileModulePermissionsAttributes {
  profileId: string;
  moduleId: string;
  permissionId: string;
}

export type ProfileModulePermissionsPk = "profileId" | "moduleId" | "permissionId";
export type ProfileModulePermissionsId = ProfileModulePermissions[ProfileModulePermissionsPk];
export type ProfileModulePermissionsCreationAttributes = ProfileModulePermissionsAttributes;

export class ProfileModulePermissions extends Model<ProfileModulePermissionsAttributes, ProfileModulePermissionsCreationAttributes> implements ProfileModulePermissionsAttributes {
  profileId!: string;
  moduleId!: string;
  permissionId!: string;

  // ProfileModulePermissions belongsTo Modules via moduleId
  module!: Modules;
  getModule!: Sequelize.BelongsToGetAssociationMixin<Modules>;
  setModule!: Sequelize.BelongsToSetAssociationMixin<Modules, ModulesId>;
  createModule!: Sequelize.BelongsToCreateAssociationMixin<Modules>;
  // ProfileModulePermissions belongsTo Permissions via permissionId
  permission!: Permissions;
  getPermission!: Sequelize.BelongsToGetAssociationMixin<Permissions>;
  setPermission!: Sequelize.BelongsToSetAssociationMixin<Permissions, PermissionsId>;
  createPermission!: Sequelize.BelongsToCreateAssociationMixin<Permissions>;
  // ProfileModulePermissions belongsTo Profiles via profileId
  profile!: Profiles;
  getProfile!: Sequelize.BelongsToGetAssociationMixin<Profiles>;
  setProfile!: Sequelize.BelongsToSetAssociationMixin<Profiles, ProfilesId>;
  createProfile!: Sequelize.BelongsToCreateAssociationMixin<Profiles>;

  static initModel(sequelize: Sequelize.Sequelize): typeof ProfileModulePermissions {
    return ProfileModulePermissions.init({
    profileId: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'profiles',
        key: 'id'
      },
      field: 'profile_id'
    },
    moduleId: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'modules',
        key: 'id'
      },
      field: 'module_id'
    },
    permissionId: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'permissions',
        key: 'id'
      },
      field: 'permission_id'
    }
  }, {
    sequelize,
    tableName: 'profile_module_permissions',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "profile_id" },
          { name: "module_id" },
          { name: "permission_id" },
        ]
      },
      {
        name: "module_id",
        using: "BTREE",
        fields: [
          { name: "module_id" },
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
