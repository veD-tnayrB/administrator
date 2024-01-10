import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { ApiModules, ApiModulesId } from './api_modules';
import type { ProfileApiModulePermissions, ProfileApiModulePermissionsId } from './profile_api_module_permissions';

export interface ApiRoutesAttributes {
  id: string;
  path: string;
  method: string;
  apiModuleId: string;
}

export type ApiRoutesPk = "id";
export type ApiRoutesId = ApiRoutes[ApiRoutesPk];
export type ApiRoutesCreationAttributes = ApiRoutesAttributes;

export class ApiRoutes extends Model<ApiRoutesAttributes, ApiRoutesCreationAttributes> implements ApiRoutesAttributes {
  id!: string;
  path!: string;
  method!: string;
  apiModuleId!: string;

  // ApiRoutes belongsTo ApiModules via apiModuleId
  apiModule!: ApiModules;
  getApiModule!: Sequelize.BelongsToGetAssociationMixin<ApiModules>;
  setApiModule!: Sequelize.BelongsToSetAssociationMixin<ApiModules, ApiModulesId>;
  createApiModule!: Sequelize.BelongsToCreateAssociationMixin<ApiModules>;
  // ApiRoutes hasMany ProfileApiModulePermissions via apiRouteId
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

  static initModel(sequelize: Sequelize.Sequelize): typeof ApiRoutes {
    return ApiRoutes.init({
    id: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      primaryKey: true
    },
    path: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    method: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    apiModuleId: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      references: {
        model: 'api_modules',
        key: 'id'
      },
      field: 'api_module_id'
    }
  }, {
    sequelize,
    tableName: 'api_routes',
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
        name: "api_module_id",
        using: "BTREE",
        fields: [
          { name: "api_module_id" },
        ]
      },
    ]
  });
  }
}
