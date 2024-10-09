import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface TotalsAttributes {
	users?: number;
	notifications?: number;
	profiles?: number;
	id: string;
}

export type TotalsPk = 'id';
export type TotalsId = Totals[TotalsPk];
export type TotalsOptionalAttributes = 'users' | 'notifications' | 'profiles';
export type TotalsCreationAttributes = Optional<TotalsAttributes, TotalsOptionalAttributes>;

export class Totals extends Model<TotalsAttributes, TotalsCreationAttributes> implements TotalsAttributes {
	declare users?: number;
	declare notifications?: number;
	declare profiles?: number;
	declare id: string;

	static initModel(sequelize: Sequelize.Sequelize): typeof Totals {
		return Totals.init(
			{
				users: {
					type: DataTypes.INTEGER,
					allowNull: true,
					defaultValue: 0,
				},
				notifications: {
					type: DataTypes.INTEGER,
					allowNull: true,
					defaultValue: 0,
				},
				profiles: {
					type: DataTypes.INTEGER,
					allowNull: true,
					defaultValue: 0,
				},
				id: {
					type: DataTypes.STRING(255),
					allowNull: false,
					primaryKey: true,
				},
			},
			{
				sequelize,
				tableName: 'totals',
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
