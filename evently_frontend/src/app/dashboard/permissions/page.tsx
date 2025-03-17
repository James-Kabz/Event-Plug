"use client";
import React, { useEffect, useState } from "react";
import api from "../../../../lib/axios";
import Loading from "../loading";
import { ToastContainer } from "react-toastify";
import { showToast } from "@/components/ToastMessage";
import "react-toastify/dist/ReactToastify.css";
import Table from "@/components/Table";
import { Permission, Role } from "@/types";
import { useRouter } from "next/navigation";


const PermissionsPage: React.FC = () => {
    const [permissions, setPermissions] = useState<Permission[]>([]);
    const [loading, setLoading] = useState(true);
    const [filteredPermissions, setFilteredPermissions] = useState<Permission[]>([]);
    // const [, setSearch] = useState<string>("");
    const router = useRouter();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await api.get("/permissions");
                if (Array.isArray(response.data.permissions)) {
                    setPermissions(response.data.permissions);
                    setFilteredPermissions(response.data.permissions);
                } else {
                    setPermissions([]);
                    console.error("Unexpected response format:", response.data);
                }
            } catch (err) {
                console.error("Failed to load permissions:", err);
                showToast.error("Failed to load permissions");
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const handleDelete = async (confirmDelete: Role) => {
        if (confirmDelete) {
            try {
                await api.delete(`/permissions/${confirmDelete.id}`);
                setPermissions(permissions.filter((permission) => permission.id !== confirmDelete.id));
                setFilteredPermissions(
                    filteredPermissions.filter((permission) => permission.id !== confirmDelete.id)
                );
                showToast.success("Permission deleted successfully");
            } catch (err) {
                console.error("Failed to delete permission:", err);
                showToast.error("Failed to delete permission");
            }
        }
    };

    // const handleSearch = (value: string) => {
    //     setSearch(value);
    //     if (value.trim() === "") {
    //         setFilteredUsers(permissions);
    //     } else {
    //         const filtered = permissions.filter((permission) =>
    //             permission.name.toLowerCase().includes(value.toLowerCase())
    //         );
    //         setFilteredUsers(filtered);
    //     }
    // };

    const handleEdit = (permission: Role) => {
        showToast.info("Editing permission...");
        console.log("Redirect to edit permission:", permission.id);
        router.push(`/dashboard/permissions/edit/${permission.id}`); // Uncomment if using `useRouter`
    };

    if (loading) return <Loading />;

    const columns = [{ header: "Name", accessor: "name" }];

    return (
        <div>
            <ToastContainer />
            {filteredPermissions.length === 0 ? (
                <div className="text-center p-4">
                    <p>No permissions available at the moment.</p>
                </div>
            ) : (
                <Table<Permission>
                    columns={columns}
                    data={permissions}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    // onView={handleView}
                />
            )}
        </div>
    );
};

export default PermissionsPage;
