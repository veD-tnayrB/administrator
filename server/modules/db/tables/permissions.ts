import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { ProfileApiModulePermissions, ProfileApiModulePermissionsId } from './profile_api_module_permissions';
import type { ProfileModulePermissions, ProfileModulePermissionsId } from './profile_module_permissions';

export interface PermissionsAttributes {
  id: string;
  name: string;
}

export type PermissionsPk = "id";
export type PermissionsId = Permissions[PermissionsPk];
export type PermissionsCreationAttributes = PermissionsAttributes;

export class Permissions extends Model<PermissionsAttributes, PermissionsCreationAttributes> implements PermissionsAttributes {
  id!: string;
  name!: string;

  // Permissions hasMany ProfileApiModulePermissions via permissionId
  profileApiModulePermissions!: ProfileApiModulePermissions[];
  getProfileApiModulePermissions!: Sequelize.HasManyGetAssociationsMixin<ProfileApiModulePermissions>;
  setProfileApiModulePermissions!: Sequelize.HasManySetAssociationsMixin<ProfileApiModulePermissions, ProfileApiModulePermissionsId>;
  addProfileApiModulePermission!: Sequelize.HasManyAddAssociationMixin<ProfileApiModulePermissions, ProfileApiModulePermissionsId>;
  addProfileApiModulePermissions!: Sequelize.HasManyAddAssociationsMixin<ProfileApiModulePermissions, ProfileApiModulePermissionsId>;
  createProfileApiModulePermission!: Sequelize.HasManyCreateAssociationMixin<ProfileApiModulePermissions>;
  removeProfileApiModulePermission!: Sequelize.HasManyRemoveAssociationMixin<ProfileApiModulePermissions, ProfileApiModulePermissionsId>;
  removeProfileApiModulePermissions!: Sequelize.HasManyRemoveAssociationsMixin<ProfileApiModulePermissions, ProfileApiModulePermissionsId>;
  hasProfileApiModulePermission!: Sequelize.HasManyHasAssociationMixin<ProfileApiModulePermissions, ProfileApiModulePermissionsId>;
  hasProfileApiModulePermissions!: Sequelize.HasManyHasAssociationsMixin<ProfileApiModulePermissions, ProfileApiModulePermissionsId>;
  countProfileApiModulePermissions!: Sequelize.HasManyCountAssociationsMixin;
  // Permissions hasMany ProfileModulePermissions via permissionId
  profileModulePermissions!: ProfileModulePermissions[];
  getProfileModulePermissions!: Sequelize.HasManyGetAssociationsMixin<ProfileModulePermissions>;
  setProfileModulePermissions!: Sequelize.HasManySetAssociationsMixin<ProfileModulePermissions, ProfileModulePermissionsId>;
  addProfileModulePermission!: Sequelize.HasManyAddAssociationMixin<ProfileModulePermissions, ProfileModulePermissionsId>;
  addProfileModulePermissions!: Sequelize.HasManyAddAssociationsMixin<ProfileModulePermissions, ProfileModulePermissionsId>;
  createProfileModulePermission!: Sequelize.HasManyCreateAssociationMixin<ProfileModulePermissions>;
  removeProfileModulePermission!: Sequelize.HasManyRemoveAssociationMixin<ProfileModulePermissions, ProfileModulePermissionsId>;
  removeProfileModulePermissions!: Sequelize.HasManyRemoveAssociationsMixin<ProfileModulePermissions, ProfileModulePermissionsId>;
  hasProfileModulePermission!: Sequelize.HasManyHasAssociationMixin<ProfileModulePermissions, ProfileModulePermissionsId>;
  hasProfileModulePermissions!: Sequelize.HasManyHasAssociationsMixin<ProfileModulePermissions, ProfileModulePermissionsId>;
  countProfileModulePermissions!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof Permissions {
    return Permissions.init({
    id: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'permissions',
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