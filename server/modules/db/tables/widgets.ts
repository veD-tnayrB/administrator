import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { UsersWidgets, UsersWidgetsId } from './users_widgets';
import type { WidgetsProfiles, WidgetsProfilesId } from './widgets_profiles';

export interface WidgetsAttributes {
  id: string;
  active?: number;
  identifier?: string;
  metadata?: string;
  order?: number;
  timeUpdated?: Date;
  timeCreated?: Date;
  width: number;
  height: number;
}

export type WidgetsPk = "id";
export type WidgetsId = Widgets[WidgetsPk];
export type WidgetsOptionalAttributes = "active" | "identifier" | "metadata" | "order" | "timeUpdated" | "timeCreated" | "width" | "height";
export type WidgetsCreationAttributes = Optional<WidgetsAttributes, WidgetsOptionalAttributes>;

export class Widgets extends Model<WidgetsAttributes, WidgetsCreationAttributes> implements WidgetsAttributes {
  id!: string;
  active?: number;
  identifier?: string;
  metadata?: string;
  order?: number;
  timeUpdated?: Date;
  timeCreated?: Date;
  width!: number;
  height!: number;

  // Widgets hasMany UsersWidgets via widgetId
  usersWidgets!: UsersWidgets[];
  getUsersWidgets!: Sequelize.HasManyGetAssociationsMixin<UsersWidgets>;
  setUsersWidgets!: Sequelize.HasManySetAssociationsMixin<UsersWidgets, UsersWidgetsId>;
  addUsersWidget!: Sequelize.HasManyAddAssociationMixin<UsersWidgets, UsersWidgetsId>;
  addUsersWidgets!: Sequelize.HasManyAddAssociationsMixin<UsersWidgets, UsersWidgetsId>;
  createUsersWidget!: Sequelize.HasManyCreateAssociationMixin<UsersWidgets>;
  removeUsersWidget!: Sequelize.HasManyRemoveAssociationMixin<UsersWidgets, UsersWidgetsId>;
  removeUsersWidgets!: Sequelize.HasManyRemoveAssociationsMixin<UsersWidgets, UsersWidgetsId>;
  hasUsersWidget!: Sequelize.HasManyHasAssociationMixin<UsersWidgets, UsersWidgetsId>;
  hasUsersWidgets!: Sequelize.HasManyHasAssociationsMixin<UsersWidgets, UsersWidgetsId>;
  countUsersWidgets!: Sequelize.HasManyCountAssociationsMixin;
  // Widgets hasMany WidgetsProfiles via widgetId
  widgetsProfiles!: WidgetsProfiles[];
  getWidgetsProfiles!: Sequelize.HasManyGetAssociationsMixin<WidgetsProfiles>;
  setWidgetsProfiles!: Sequelize.HasManySetAssociationsMixin<WidgetsProfiles, WidgetsProfilesId>;
  addWidgetsProfile!: Sequelize.HasManyAddAssociationMixin<WidgetsProfiles, WidgetsProfilesId>;
  addWidgetsProfiles!: Sequelize.HasManyAddAssociationsMixin<WidgetsProfiles, WidgetsProfilesId>;
  createWidgetsProfile!: Sequelize.HasManyCreateAssociationMixin<WidgetsProfiles>;
  removeWidgetsProfile!: Sequelize.HasManyRemoveAssociationMixin<WidgetsProfiles, WidgetsProfilesId>;
  removeWidgetsProfiles!: Sequelize.HasManyRemoveAssociationsMixin<WidgetsProfiles, WidgetsProfilesId>;
  hasWidgetsProfile!: Sequelize.HasManyHasAssociationMixin<WidgetsProfiles, WidgetsProfilesId>;
  hasWidgetsProfiles!: Sequelize.HasManyHasAssociationsMixin<WidgetsProfiles, WidgetsProfilesId>;
  countWidgetsProfiles!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof Widgets {
    return Widgets.init({
    id: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      primaryKey: true
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    identifier: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    metadata: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    order: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    timeUpdated: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'time_updated'
    },
    timeCreated: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'time_created'
    },
    width: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    height: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    }
  }, {
    sequelize,
    tableName: 'widgets',
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
