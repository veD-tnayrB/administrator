import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { ProfileApiModulePermissions, ProfileApiModulePermissionsId } from './profile_api_module_permissions';

export interface ApiModulesAttributes {
  id: string;
  name: string;
  timeCreated?: Date;
  timeUpdated?: Date;
}

export type ApiModulesPk = "id";
export type ApiModulesId = ApiModules[ApiModulesPk];
export type ApiModulesOptionalAttributes = "timeCreated" | "timeUpdated";
export type ApiModulesCreationAttributes = Optional<ApiModulesAttributes, ApiModulesOptionalAttributes>;

export class ApiModules extends Model<ApiModulesAttributes, ApiModulesCreationAttributes> implements ApiModulesAttributes {
  id!: string;
  name!: string;
  timeCreated?: Date;
  timeUpdated?: Date;

  // ApiModules hasMany ProfileApiModulePermissions via apiModuleId
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

  static initModel(sequelize: Sequelize.Sequelize): typeof ApiModules {
    return ApiModules.init({
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
    tableName: 'api_modules',
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
