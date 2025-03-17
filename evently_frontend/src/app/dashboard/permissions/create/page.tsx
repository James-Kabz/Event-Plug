'use client';
import { showToast } from "@/components/ToastMessage";
import { useRouter } from "next/navigation";
import { useState } from "react";
import api from "../../../../../lib/axios";
import { ToastContainer } from "react-toastify";
import Form from "@/components/Form";


interface FormData {
    name: string;
}
const CreatePermissionPage = () => {
    const router = useRouter();
    const [formLoading, setFormLoading] = useState<boolean>(false);
    // const [, setPermission] = useState<Role | null>(null);

    const onSubmit = async (data: FormData) => {
        setFormLoading(true);
        try {
            await api.get("/sanctum/csrf-cookie");
    
            const formattedData = {
                ...data,
                guard_name: "web",
            };
    
            await api.post("permissions", formattedData);
    
            showToast.success("Permission created successfully!");
            setTimeout(() => {
                router.push("/dashboard/permissions");
            }, 2000);
        } catch (err) {
            console.log(err);
            showToast.error("Failed to create permission");
        } finally {
            setFormLoading(false);
        }
    };
    

    const permissionInput = [
        {
            type: "text",
            label: 'name',
            required: true,
        }
    ];
    const extraButtons = [
        {
            label: "Back",
            type: "button",
            onClick: () => router.push("/dashboard/permissions"),
        },
    ];


    return (
        <div className="w-full max-w-5xl mx-auto my-auto text-black bg-white p-4 sm:p-6 rounded-lg shadow">
            <ToastContainer />
            <h2 className="text-2xl font-semibold mb-4">Create Permission</h2>

            <Form<FormData>
                Input= {permissionInput}
                onSubmit={onSubmit}
                loading={formLoading}
                addButton={extraButtons}
                />
        </div>
    )
}

export default CreatePermissionPage;