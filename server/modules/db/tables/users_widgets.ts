import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Users, UsersId } from './users';
import type { Widgets, WidgetsId } from './widgets';

export interface UsersWidgetsAttributes {
	id: string;
	userId: string;
	widgetId: string;
	columnPosition: number;
	rowPosition: number;
}

export type UsersWidgetsPk = 'id';
export type UsersWidgetsId = UsersWidgets[UsersWidgetsPk];
export type UsersWidgetsCreationAttributes = UsersWidgetsAttributes;

export class UsersWidgets
	extends Model<UsersWidgetsAttributes, UsersWidgetsCreationAttributes>
	implements UsersWidgetsAttributes
{
	declare id: string;
	declare userId: string;
	declare widgetId: string;
	declare columnPosition: number;
	declare rowPosition: number;

	// UsersWidgets belongsTo Users via userId
	user!: Users;
	getUser!: Sequelize.BelongsToGetAssociationMixin<Users>;
	setUser!: Sequelize.BelongsToSetAssociationMixin<Users, UsersId>;
	createUser!: Sequelize.BelongsToCreateAssociationMixin<Users>;
	// UsersWidgets belongsTo Widgets via widgetId
	widget!: Widgets;
	getWidget!: Sequelize.BelongsToGetAssociationMixin<Widgets>;
	setWidget!: Sequelize.BelongsToSetAssociationMixin<Widgets, WidgetsId>;
	createWidget!: Sequelize.BelongsToCreateAssociationMixin<Widgets>;

	static initModel(sequelize: Sequelize.Sequelize): typeof UsersWidgets {
		return UsersWidgets.init(
			{
				id: {
					type: DataTypes.CHAR(36),
					allowNull: false,
					primaryKey: true,
				},
				userId: {
					type: DataTypes.CHAR(36),
					allowNull: false,
					references: {
						model: 'users',
						key: 'id',
					},
					field: 'user_id',
				},
				widgetId: {
					type: DataTypes.CHAR(36),
					allowNull: false,
					references: {
						model: 'widgets',
						key: 'id',
					},
					field: 'widget_id',
				},
				columnPosition: {
					type: DataTypes.INTEGER,
					allowNull: false,
					field: 'column_position',
				},
				rowPosition: {
					type: DataTypes.INTEGER,
					allowNull: false,
					field: 'row_position',
				},
			},
			{
				sequelize,
				tableName: 'users_widgets',
				timestamps: false,
				indexes: [
					{
						name: 'PRIMARY',
						unique: true,
						using: 'BTREE',
						fields: [{ name: 'id' }],
					},
					{
						name: 'user_id',
						using: 'BTREE',
						fields: [{ name: 'user_id' }],
					},
					{
						name: 'widget_id',
						using: 'BTREE',
						fields: [{ name: 'widget_id' }],
					},
				],
			},
		);
	}
}
