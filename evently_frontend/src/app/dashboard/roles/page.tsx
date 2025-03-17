"use client";
import React, { useEffect, useState } from "react";
import api from "../../../../lib/axios";
import Loading from "../loading";
import { ToastContainer } from "react-toastify";
import { showToast } from "@/components/ToastMessage";
import "react-toastify/dist/ReactToastify.css";
import Table from "@/components/Table";
import { Role } from "@/types";
import { useRouter } from "next/navigation";

const RolesPage: React.FC = () => {
    const [roles, setRoles] = useState<Role[]>([]);
    const [loading, setLoading] = useState(true);
    const [filteredUsers, setFilteredUsers] = useState<Role[]>([]);
    // const [, setSearch] = useState<string>("");
    const router = useRouter();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await api.get("/roles");
                if (Array.isArray(response.data.roles)) {
                    setRoles(response.data.roles);
                    setFilteredUsers(response.data.roles);
                } else {
                    setRoles([]);
                    console.error("Unexpected response format:", response.data);
                }
            } catch (err) {
                console.error("Failed to load roles:", err);
                showToast.error("Failed to load roles");
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const handleDelete = async (confirmDelete: Role) => {
        if (confirmDelete) {
            try {
                await api.delete(`/roles/${confirmDelete.id}`);
                setRoles(roles.filter((role) => role.id !== confirmDelete.id));
                setFilteredUsers(
                    filteredUsers.filter((role) => role.id !== confirmDelete.id)
                );
                showToast.success("User deleted successfully");
            } catch (err) {
                console.error("Failed to delete role:", err);
                showToast.error("Failed to delete role");
            }
        }
    };

    // const handleSearch = (value: string) => {
    //     setSearch(value);
    //     if (value.trim() === "") {
    //         setFilteredUsers(roles);
    //     } else {
    //         const filtered = roles.filter((role) =>
    //             role.name.toLowerCase().includes(value.toLowerCase())
    //         );
    //         setFilteredUsers(filtered);
    //     }
    // };

    const handleEdit = (role: Role) => {
        showToast.info("Editing role...");
        console.log("Redirect to edit role:", role.id);
        // router.push(`/dashboard/roles/edit/${role.id}`); // Uncomment if using `useRouter`
    };

    const handleManagePermissions = (role: Role) => {
        router.push(`/dashboard/roles/${role.id}/permissions`);
    };
    if (loading) return <Loading />;

    const columns = [{ header: "Name", accessor: "name" }];

    return (
        <div>
            <ToastContainer />
            {filteredUsers.length === 0 ? (
                <div className="text-center p-4">
                    <p>No roles available at the moment.</p>
                </div>
            ) : (
                <Table<Role>
                    columns={columns}
                    data={roles}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    // onView={handleView}
                    onManagePermissions={(role) => handleManagePermissions(role)}
                />
            )}
        </div>
    );
};

export default RolesPage;
