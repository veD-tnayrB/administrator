import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { ProfileModulePermissions, ProfileModulePermissionsId } from './profile_module_permissions';

export interface PermissionsAttributes {
  id: string;
  name: string;
  timeCreated?: Date;
  timeUpdated?: Date;
}

export type PermissionsPk = "id";
export type PermissionsId = Permissions[PermissionsPk];
export type PermissionsOptionalAttributes = "timeCreated" | "timeUpdated";
export type PermissionsCreationAttributes = Optional<PermissionsAttributes, PermissionsOptionalAttributes>;

export class Permissions extends Model<PermissionsAttributes, PermissionsCreationAttributes> implements PermissionsAttributes {
  id!: string;
  name!: string;
  timeCreated?: Date;
  timeUpdated?: Date;

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
