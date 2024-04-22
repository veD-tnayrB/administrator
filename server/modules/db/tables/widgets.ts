import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface WidgetsAttributes {
	id: string;
	active?: number;
	identifier?: string;
	metadata?: string;
	order?: number;
	timeUpdated?: Date;
	timeCreated?: Date;
}

export type WidgetsPk = 'id';
export type WidgetsId = Widgets[WidgetsPk];
export type WidgetsOptionalAttributes = 'active' | 'identifier' | 'metadata' | 'order' | 'timeUpdated' | 'timeCreated';
export type WidgetsCreationAttributes = Optional<WidgetsAttributes, WidgetsOptionalAttributes>;

export class Widgets extends Model<WidgetsAttributes, WidgetsCreationAttributes> implements WidgetsAttributes {
	declare id: string;
	declare active?: number;
	declare identifier?: string;
	declare metadata?: string;
	declare order?: number;
	declare timeUpdated?: Date;
	declare timeCreated?: Date;

	static initModel(sequelize: Sequelize.Sequelize): typeof Widgets {
		return Widgets.init(
			{
				id: {
					type: DataTypes.CHAR(36),
					allowNull: false,
					primaryKey: true,
				},
				active: {
					type: DataTypes.BOOLEAN,
					allowNull: true,
				},
				identifier: {
					type: DataTypes.STRING(255),
					allowNull: true,
				},
				metadata: {
					type: DataTypes.TEXT,
					allowNull: true,
				},
				order: {
					type: DataTypes.INTEGER,
					allowNull: true,
				},
				timeUpdated: {
					type: DataTypes.DATE,
					allowNull: true,
					field: 'time_updated',
				},
				timeCreated: {
					type: DataTypes.DATE,
					allowNull: true,
					field: 'time_created',
				},
			},
			{
				sequelize,
				tableName: 'widgets',
				timestamps: false,
				indexes: [
					{
						name: 'PRIMARY',
						unique: true,
						using: 'BTREE',
						fields: [{ name: 'id' }],
					},
				],
			}
		);
	}
}
