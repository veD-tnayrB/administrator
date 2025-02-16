package repository

import (
	module "github.com/veD-tnayrB/administrator/internal/module/models"
)

func (r *PermissionRepository) GetProfilePermissions(profileId string) ([]*module.ModuleAction, error) {
	query := "SELECT ma.id as id, ma.module_id as moduleId, ma.name as name, ma.description as description, ma.time_created as timeCreated, ma.time_updated as timeUpdated FROM profile_module_permissions pmp JOIN module_actions ma ON pmp.action_id = ma.id WHERE pmp.profile_id = ?"
	rows, err := r.DB.Query(query, profileId)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	moduleActions := []*module.ModuleAction{}
	for rows.Next() {
		moduleAction := module.ModuleAction{}
		err := rows.Scan(&moduleAction.Id, &moduleAction.ModuleId, &moduleAction.Name, &moduleAction.Description, &moduleAction.TimeCreated, &moduleAction.TimeUpdated)
		if err != nil {
			return nil, err
		}

		moduleActions = append(moduleActions, &moduleAction)
	}

	return moduleActions, nil
}
