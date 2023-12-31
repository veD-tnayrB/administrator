import type { Sequelize } from "sequelize";
import { Modules as _Modules } from "./modules";
import type { ModulesAttributes, ModulesCreationAttributes } from "./modules";
import { Profiles as _Profiles } from "./profiles";
import type { ProfilesAttributes, ProfilesCreationAttributes } from "./profiles";
import { Users as _Users } from "./users";
import type { UsersAttributes, UsersCreationAttributes } from "./users";
import { Widgets as _Widgets } from "./widgets";
import type { WidgetsAttributes, WidgetsCreationAttributes } from "./widgets";

export {
  _Modules as Modules,
  _Profiles as Profiles,
  _Users as Users,
  _Widgets as Widgets,
};

export type {
  ModulesAttributes,
  ModulesCreationAttributes,
  ProfilesAttributes,
  ProfilesCreationAttributes,
  UsersAttributes,
  UsersCreationAttributes,
  WidgetsAttributes,
  WidgetsCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  const Modules = _Modules.initModel(sequelize);
  const Profiles = _Profiles.initModel(sequelize);
  const Users = _Users.initModel(sequelize);
  const Widgets = _Widgets.initModel(sequelize);


  return {
    Modules: Modules,
    Profiles: Profiles,
    Users: Users,
    Widgets: Widgets,
  };
}
