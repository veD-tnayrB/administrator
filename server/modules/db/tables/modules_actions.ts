import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Modules, ModulesId } from './modules';
import type { ProfileModulePermissions, ProfileModulePermissionsId } from './profile_module_permissions';

export interface ModulesActionsAttributes {
  id: string;
  moduleId: string;
  name: string;
  description?: string;
  timeCreated?: Date;
  timeUpdated?: Date;
}

export type ModulesActionsPk = "id";
export type ModulesActionsId = ModulesActions[ModulesActionsPk];
export type ModulesActionsOptionalAttributes = "description" | "timeCreated" | "timeUpdated";
export type ModulesActionsCreationAttributes = Optional<ModulesActionsAttributes, ModulesActionsOptionalAttributes>;

export class ModulesActions extends Model<ModulesActionsAttributes, ModulesActionsCreationAttributes> implements ModulesActionsAttributes {
  id!: string;
  moduleId!: string;
  name!: string;
  description?: string;
  timeCreated?: Date;
  timeUpdated?: Date;

  // ModulesActions belongsTo Modules via moduleId
  module!: Modules;
  getModule!: Sequelize.BelongsToGetAssociationMixin<Modules>;
  setModule!: Sequelize.BelongsToSetAssociationMixin<Modules, ModulesId>;
  createModule!: Sequelize.BelongsToCreateAssociationMixin<Modules>;
  // ModulesActions hasMany ProfileModulePermissions via actionId
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

  static initModel(sequelize: Sequelize.Sequelize): typeof ModulesActions {
    return ModulesActions.init({
    id: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      primaryKey: true
    },
    moduleId: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      references: {
        model: 'modules',
        key: 'id'
      },
      field: 'module_id'
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
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
    tableName: 'modules_actions',
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
        name: "fk_modules_actions_moduleid",
        using: "BTREE",
        fields: [
          { name: "module_id" },
        ]
      },
    ]
  });
  }
}
