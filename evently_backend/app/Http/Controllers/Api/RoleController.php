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
        $validatedData = $request->validate([
            'name' => [
                'required',
                'string',
                'unique:roles,name'
            ],
            'guard_name' => 'nullable|string|in:web,sanctum' // Allow only 'web' or 'sanctum'
        ]);

        // Default to 'web' if not provided
        $validatedData['guard_name'] = $validatedData['guard_name'] ?? 'web';

        $role = Role::create($validatedData);

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

    // Fetch role with its permissions
    public function addPermissionToRole($roleId)
    {
        $role = Role::with('permissions')->findOrFail($roleId);
        $permissions = Permission::all();
        $rolePermissions = $role->permissions->pluck('id')->toArray();

        return response()->json([
            'role' => $role,
            'permissions' => $permissions,
            'rolePermissions' => $rolePermissions
        ]);
    }

    // Assign multiple permissions to a role
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
