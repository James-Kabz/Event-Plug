"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { showToast } from "@/components/ToastMessage";
import api from "../../../../../../lib/axios";
import { Permission } from "@/types";
import { FaSpinner } from "react-icons/fa"; // Loading spinner

const PermissionsPage = () => {
    const router = useRouter();
    const { roleId } = useParams();
    const [permissions, setPermissions] = useState<Permission[]>([]);
    const [selectedPermissions, setSelectedPermissions] = useState<number[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (roleId) {
            api.get(`/roles/${roleId}/permissions`)
                .then((res) => {
                    setPermissions(res.data.permissions);
                    setSelectedPermissions(res.data.rolePermissions);
                    setLoading(false);
                })
                .catch((err) => {
                    console.error(err);
                    showToast.error("Failed to fetch permissions");
                    setLoading(false);
                });
        }
    }, [roleId]);

    const handlePermissionToggle = (id: number) => {
        setSelectedPermissions((prev) =>
            prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
        );
    };

    const handleSubmit = async () => {
        try {
            await api.post(`/roles/${roleId}/permissions`, { permissions: selectedPermissions });
            showToast.success("Permissions updated successfully");
            router.push("/dashboard/roles"); // Redirect to roles page
        } catch (err) {
            console.error(err);
            showToast.error("Failed to update permissions");
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <FaSpinner className="animate-spin text-4xl text-gray-500" />
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
            <h1 className="text-2xl font-semibold mb-6 text-center">Manage Permissions</h1>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {permissions.map((permission) => (
                    <label key={permission.id} className="flex items-center space-x-2 bg-gray-100 p-3 rounded-md cursor-pointer">
                        <input
                            type="checkbox"
                            className="form-checkbox h-5 w-5 text-blue-500"
                            checked={selectedPermissions.includes(permission.id)}
                            onChange={() => handlePermissionToggle(permission.id)}
                        />
                        <span className="text-gray-800">{permission.name}</span>
                    </label>
                ))}
            </div>

            <div className="flex justify-end mt-6">
                <button
                    onClick={handleSubmit}
                    className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 active:bg-blue-800 transition duration-200"
                >
                    Save Changes
                </button>
            </div>
        </div>
    );
};

export default PermissionsPage;
