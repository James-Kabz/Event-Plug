<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Permission;

class PermissionController extends Controller
{
    public function createPermission(Request $request)
    {
        $request->validate([
            'name' => [
                'required',
                'string',
                'unique:permissions,name'
            ],
        ]);

        $permission = Permission::create([
            'name' => $request->name,
        ]);

        return response()->json([
            'message' => 'Permission created successfully.',
            'permission' => $permission,
        ]);
    }

    public function getPermission($id)
    {
        $permission = Permission::find($id);
        return response()->json([
            'permission' => $permission,
        ]);
    }

    public function getPermissions()
    {
        $permissions = Permission::all();
        return response()->json([
            'permissions' => $permissions,
        ]);
    }

    public function editPermission(Request $request, Permission $permission)
    {
        $request->validate([
            'name' => [
                'required',
                'string',
                "unique:permissions,name,{$permission->id}"
            ],
        ]);

        $permission->update([
            'name' => $request->name
        ]);

        $permission->refresh(); // Ensures fresh data is returned

        return response()->json([
            'message' => 'Permission updated successfully.',
            'permission' => $permission,
        ]);
    }

    public function deletePermission($id)
    {
        $permission = Permission::find($id);
        $permission->delete();
        return response()->json([
            'message' => 'Permission deleted successfully.',
        ]);
    }
}
