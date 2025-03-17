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
const CreateRolePage = () => {
    const router = useRouter();
    const [formLoading, setFormLoading] = useState<boolean>(false);
    // const [, setRole] = useState<Role | null>(null);

    const onSubmit = async (data: FormData) => {
        setFormLoading(true);
        try {
            await api.get("/sanctum/csrf-cookie");
    
            const formattedData = {
                ...data,
            };
    
            await api.post("roles", formattedData);
    
            showToast.success("Role created successfully!");
            setTimeout(() => {
                router.push("/dashboard/roles");
            }, 2000);
        } catch (err) {
            console.log(err);
            showToast.error("Failed to create role");
        } finally {
            setFormLoading(false);
        }
    };
    

    const roleInput = [
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
            onClick: () => router.push("/dashboard/roles"),
        },
    ];


    return (
        <div className="w-full max-w-5xl mx-auto my-auto text-black bg-white p-4 sm:p-6 rounded-lg shadow">
            <ToastContainer />
            <h2 className="text-2xl font-semibold mb-4">Create Role</h2>

            <Form<FormData>
                Input= {roleInput}
                onSubmit={onSubmit}
                loading={formLoading}
                addButton={extraButtons}
                />
        </div>
    )
}

export default CreateRolePage;