import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { ModulesActions, ModulesActionsId } from './modules_actions';
import type { ProfileModulePermissions, ProfileModulePermissionsId } from './profile_module_permissions';

export interface ModulesAttributes {
  id: string;
  label?: string;
  to?: string;
  timeCreated?: Date;
  timeUpdated?: Date;
  order?: number;
  icon?: string;
}

export type ModulesPk = "id";
export type ModulesId = Modules[ModulesPk];
export type ModulesOptionalAttributes = "label" | "to" | "timeCreated" | "timeUpdated" | "order" | "icon";
export type ModulesCreationAttributes = Optional<ModulesAttributes, ModulesOptionalAttributes>;

export class Modules extends Model<ModulesAttributes, ModulesCreationAttributes> implements ModulesAttributes {
  id!: string;
  label?: string;
  to?: string;
  timeCreated?: Date;
  timeUpdated?: Date;
  order?: number;
  icon?: string;

  // Modules hasMany ModulesActions via moduleId
  modulesActions!: ModulesActions[];
  getModulesActions!: Sequelize.HasManyGetAssociationsMixin<ModulesActions>;
  setModulesActions!: Sequelize.HasManySetAssociationsMixin<ModulesActions, ModulesActionsId>;
  addModulesAction!: Sequelize.HasManyAddAssociationMixin<ModulesActions, ModulesActionsId>;
  addModulesActions!: Sequelize.HasManyAddAssociationsMixin<ModulesActions, ModulesActionsId>;
  createModulesAction!: Sequelize.HasManyCreateAssociationMixin<ModulesActions>;
  removeModulesAction!: Sequelize.HasManyRemoveAssociationMixin<ModulesActions, ModulesActionsId>;
  removeModulesActions!: Sequelize.HasManyRemoveAssociationsMixin<ModulesActions, ModulesActionsId>;
  hasModulesAction!: Sequelize.HasManyHasAssociationMixin<ModulesActions, ModulesActionsId>;
  hasModulesActions!: Sequelize.HasManyHasAssociationsMixin<ModulesActions, ModulesActionsId>;
  countModulesActions!: Sequelize.HasManyCountAssociationsMixin;
  // Modules hasMany ProfileModulePermissions via moduleId
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

  static initModel(sequelize: Sequelize.Sequelize): typeof Modules {
    return Modules.init({
    id: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      primaryKey: true
    },
    label: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    to: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    timeCreated: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'time_created'
    },
    timeUpdated: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'time_updated'
    },
    order: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    icon: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'modules',
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
