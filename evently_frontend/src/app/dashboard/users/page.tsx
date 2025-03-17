"use client";
import React, { useEffect, useState } from "react";
import api from "../../../../lib/axios";
import Loading from "../loading";
import { ToastContainer } from "react-toastify";
import { showToast } from "@/components/ToastMessage";
import "react-toastify/dist/ReactToastify.css";
import Table from "@/components/Table";
import { User } from "@/types";

// type User = {
//   id: number;
//   name: string;
//   email: string;
//   role: string;
// };


const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [, setSearch] = useState<string>("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get("/users");
        if (Array.isArray(response.data.users)) {
          setUsers(response.data.users);
          setFilteredUsers(response.data.users);
        } else {
          setUsers([]);
          console.error("Unexpected response format:", response.data);
        }
      } catch (err) {
        console.error("Failed to load users:", err);
        showToast.error("Failed to load users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (confirmDelete: User) => {
    if (confirmDelete) {
      try {
        await api.delete(`/users/${confirmDelete.id}`);
        setUsers(users.filter((user) => user.id !== confirmDelete.id));
        setFilteredUsers(filteredUsers.filter((user) => user.id !== confirmDelete.id));
        showToast.success("User deleted successfully");
      } catch (err) {
        console.error("Failed to delete user:", err);
        showToast.error("Failed to delete user");
      }
    }
  };

  const handleSearch = (value: string) => {
    setSearch(value);
    if (value.trim() === "") {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter((user) =>
        user.name.toLowerCase().includes(value.toLowerCase()) ||
        user.email.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  };

  const handleEdit = (user: User) => {
    showToast.info("Editing user...");
    console.log("Redirect to edit user:", user.id);
    // router.push(`/dashboard/users/edit/${user.id}`); // Uncomment if using `useRouter`
  };

  if (loading) return <Loading />;

  const columns = [
    { header: "Name", accessor: "name" },
    { header: "Email", accessor: "email" },
    { header: "Role", accessor: "roles" },
  ];

  return (
    <div>
      <ToastContainer />
      {filteredUsers.length === 0 ? (
        <div className="text-center p-4">
          <p>No users available at the moment.</p>
        </div>
      ) : (
        <Table<User>
          columns={columns}
          data={filteredUsers}
          onSearch={handleSearch}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default UsersPage;
