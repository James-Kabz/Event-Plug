<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use DB;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleController extends Controller
{
    // create role
    public function createRole(Request $request)
    {
        $request->validate([
            'name' => [
                'required',
                'string',
                'unique:roles,name'
            ],
        ]);

        $role = Role::create([
            'name' => $request->name,
        ]);

        return response()->json([
            'message' => 'Role created successfully.',
            'role' => $role,
        ]);
    }

    // get role
    public function getRole($id)
    {
        $role = Role::find($id);
        return response()->json([
            'role' => $role,
        ]);
    }

    // get roles
    public function getRoles()
    {
        $roles = Role::all();
        return response()->json([
            'roles' => $roles,
        ]);
    }

    // edit role
    public function editRole(Request $request, Role $role)
    {
        $request->validate([
            'name' => [
                'required',
                'string',
                "unique:roles,name,{$role->id}"
            ],
        ]);

        $role->update([
            'name' => $request->name
        ]);

        return response()->json([
            'message' => 'Role updated successfully.',
            'role' => $role,
        ]);
    }

    // delete role
    public function deleteRole($id)
    {
        $role = Role::find($id);
        $role->delete();
        return response()->json([
            'message' => 'Role deleted successfully.',
        ]);
    }

    // attach permission to role
    public function addPermissionToRole($roleId)
    {
        $role = Role::findOrFail($roleId);
        $permissions = Permission::all(); // Fetch all permissions
        $rolePermissions = $role->permissions->pluck('id')->toArray(); // Get current role permissions

        return response()->json([
            'role' => $role,
            'permissions' => $permissions,
            'rolePermissions' => $rolePermissions
        ]);
    }

    public function givePermissionToRole(Request $request, $roleId)
    {
        $request->validate([
            'permissions' => 'required|array',
            'permissions.*' => 'exists:permissions,id'
        ]);

        $role = Role::findOrFail($roleId);
        $role->syncPermissions($request->permissions);

        return response()->json([
            'message' => 'Permissions assigned successfully.',
            'role' => $role,
            'assignedPermissions' => $role->permissions
        ]);
    }



}
