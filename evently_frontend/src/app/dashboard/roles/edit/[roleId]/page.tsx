'use client';
import { showToast } from "@/components/ToastMessage";
import { Role } from "@/types";
import { useParams, useRouter } from "next/navigation";
import {  useEffect, useState } from "react";
import api from "../../../../../../lib/axios";
import Loading from "@/app/loading";
import { ToastContainer } from "react-toastify";
import Form from "@/components/Form";


interface FormData {
    name: string;
}
const EditRole = () => {
    const router = useRouter();
    const { roleId } = useParams();
    const [, setRole] = useState<Role | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const [formData, setFormData] = useState<FormData>({
        name: "",
    });
    const [formLoading, setFormLoading] = useState<boolean>(false);

    useEffect(() => {
        if (roleId) {
            const fetchRole = async () => {
                try {
                    const response = await api.get(`roles/${roleId}`);
                    const role = response.data.role;
                    setRole(role);
                    setFormData({
                        name: role.name || "",
                    });
                } catch (err) {
                    console.log(err);
                    showToast.error("Failed to fetch role");
                } finally {
                    setLoading(false);
                }
            };

            fetchRole();
        }
    }, [roleId]);

    const handleSubmit = async (data: FormData) => {
        setFormLoading(true);
        try {
            const formattedData = {
                ...data,
            };
            await api.put(`roles/${roleId}`, formattedData);
            showToast.success("Role updated successfully!");
            setTimeout(() => {
                router.push("/dashboard/roles");
            }, 2000);
        } catch (err) {
            console.log(err);
            showToast.error("Failed to update Role");
        } finally {
            setFormLoading(false);
        }
    };

    if (loading) {
        return <Loading />;
    }

    const inputs = [
        {
            label: "name",
            type: "text",
            value: formData.name,
        },
    ];
    const extraButtons = [
        {
            label: "Back",
            type: "button",
            onClick: () => router.push("/dashboard/roles"),
        },
    ];

    return (
        <div className="p-6">
            <ToastContainer />
            <h3 className="text-2xl font-bold mb-4">Edit Role</h3>
            <Form<FormData>
                Input={inputs}
                onSubmit={handleSubmit}
                loading={formLoading}
                addButton={extraButtons}
            />
        </div>
    );
};

export default EditRole;
