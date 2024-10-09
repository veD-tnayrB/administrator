import * as Sequelize from 'sequelize';
import { DataTypes, Model } from 'sequelize';
import type { Profiles, ProfilesId } from './profiles';
import type { Widgets, WidgetsId } from './widgets';

export interface WidgetsProfilesAttributes {
	id: string;
	widgetId: string;
	profileId: string;
}

export type WidgetsProfilesPk = 'id';
export type WidgetsProfilesId = WidgetsProfiles[WidgetsProfilesPk];
export type WidgetsProfilesCreationAttributes = WidgetsProfilesAttributes;

export class WidgetsProfiles
	extends Model<WidgetsProfilesAttributes, WidgetsProfilesCreationAttributes>
	implements WidgetsProfilesAttributes
{
	declare id: string;
	declare widgetId: string;
	declare profileId: string;

	// WidgetsProfiles belongsTo Profiles via profileId
	profile!: Profiles;
	getProfile!: Sequelize.BelongsToGetAssociationMixin<Profiles>;
	setProfile!: Sequelize.BelongsToSetAssociationMixin<Profiles, ProfilesId>;
	createProfile!: Sequelize.BelongsToCreateAssociationMixin<Profiles>;
	// WidgetsProfiles belongsTo Widgets via widgetId
	widget!: Widgets;
	getWidget!: Sequelize.BelongsToGetAssociationMixin<Widgets>;
	setWidget!: Sequelize.BelongsToSetAssociationMixin<Widgets, WidgetsId>;
	createWidget!: Sequelize.BelongsToCreateAssociationMixin<Widgets>;

	static initModel(sequelize: Sequelize.Sequelize): typeof WidgetsProfiles {
		return WidgetsProfiles.init(
			{
				id: {
					type: DataTypes.CHAR(36),
					allowNull: false,
					primaryKey: true,
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
				profileId: {
					type: DataTypes.CHAR(36),
					allowNull: false,
					references: {
						model: 'profiles',
						key: 'id',
					},
					field: 'profile_id',
				},
			},
			{
				sequelize,
				tableName: 'widgets_profiles',
				timestamps: false,
				indexes: [
					{
						name: 'PRIMARY',
						unique: true,
						using: 'BTREE',
						fields: [{ name: 'id' }],
					},
					{
						name: 'unique_widget_profile',
						unique: true,
						using: 'BTREE',
						fields: [{ name: 'widget_id' }, { name: 'profile_id' }],
					},
					{
						name: 'fk_profile_id',
						using: 'BTREE',
						fields: [{ name: 'profile_id' }],
					},
				],
			}
		);
	}
}
