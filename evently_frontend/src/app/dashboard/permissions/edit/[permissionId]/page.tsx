'use client';
import { showToast } from "@/components/ToastMessage";
import { Permission } from "@/types";
import { useParams, useRouter } from "next/navigation";
import {  useEffect, useState } from "react";
import api from "../../../../../../lib/axios";
import Loading from "@/app/loading";
import { ToastContainer } from "react-toastify";
import Form from "@/components/Form";


interface FormData {
    name: string;
}
const EditPermission = () => {
    const router = useRouter();
    const { permissionId } = useParams();
    const [, setPermission] = useState<Permission | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const [formData, setFormData] = useState<FormData>({
        name: "",
    });
    const [formLoading, setFormLoading] = useState<boolean>(false);

    useEffect(() => {
        if (permissionId) {
            const fetchPermission = async () => {
                try {
                    const response = await api.get(`permissions/${permissionId}`);
                    const permission = response.data.permission;
                    setPermission(permission);
                    setFormData({
                        name: permission.name || "",
                    });
                } catch (err) {
                    console.log(err);
                    showToast.error("Failed to fetch permission");
                } finally {
                    setLoading(false);
                }
            };

            fetchPermission();
        }
    }, [permissionId]);

    const handleSubmit = async (data: FormData) => {
        setFormLoading(true);
        try {
            const formattedData = {
                ...data,
            };
            await api.put(`permissions/${permissionId}`, formattedData);
            showToast.success("Permission updated successfully!");
            setTimeout(() => {
                router.push("/dashboard/permissions");
            }, 2000);
        } catch (err) {
            console.log(err);
            showToast.error("Failed to update permission");
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
            onClick: () => router.push("/dashboard/permissions"),
        },
    ];

    return (
        <div className="p-6">
            <ToastContainer />
            <h3 className="text-2xl font-bold mb-4">Edit Permission</h3>
            <Form<FormData>
                Input={inputs}
                onSubmit={handleSubmit}
                loading={formLoading}
                addButton={extraButtons}
            />
        </div>
    );
};

export default EditPermission;
