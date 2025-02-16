package repository

import (
	modules "github.com/veD-tnayrB/administrator/internal/module/models"
)

func (r *PermissionRepository) GetUserPermissions(userId string) ([]*modules.ModuleAction, error) {
	query := "SELECT ma.id as id, ma.module_id as moduleId, ma.name as name, ma.description as description, ma.time_created as timeCreated, ma.time_updated as timeUpdated FROM users_profiles up JOIN profile_module_permissions pmp ON up.profile_id = pmp.profile_id JOIN modules_actions ma ON pmp.action_id = ma.id JOIN modules m ON ma.module_id = m.id WHERE up.user_id = ?"
	rows, err := r.DB.Query(query, userId)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	moduleActions := []*modules.ModuleAction{}
	for rows.Next() {
		moduleAction := modules.ModuleAction{}
		err := rows.Scan(&moduleAction.Id, &moduleAction.ModuleId, &moduleAction.Name, &moduleAction.Description, &moduleAction.TimeCreated, &moduleAction.TimeUpdated)
		if err != nil {
			return nil, err
		}

		moduleActions = append(moduleActions, &moduleAction)
	}

	return moduleActions, nil
}
