"use client"; // Ensure this runs in the client
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { showToast } from "./ToastMessage";
import Link from "next/link";
import api from "../../lib/axios";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
        const res = await api.post(`login`, { email, password }, { headers: { "Content-Type": "application/json" } });

        const data = res.data; // ✅ Correctly extract response data

        if (!(res.status >= 200 && res.status < 300)) {
            throw new Error(data.message || "Login failed");
        }

        console.log("User Role:", data?.user?.role); // ✅ Corrected path
        console.log("User Permissions:", data?.user?.permissions); // ✅ Corrected path

        router.push("/dashboard");
    } catch (error) {
        console.error("Error during login:", error);
        if (axios.isAxiosError(error)) {
            showToast.error(error.response?.data?.message || "Login failed");
        } else {
            showToast.error("An unexpected error occurred");
        }
    } finally {
        setIsLoading(false);
    }
};


  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-gradient-to-r from-yellow-200 to-pink-200 shadow-lg rounded-3xl transform rotate-1 hover:rotate-0 transition-transform duration-300">
      <h2 className="text-3xl font-bold mb-4 text-center text-purple-700 animate-bounce">Welcome Back! 🎉</h2>

      <div className="mb-4">
        <label className="block font-medium text-lg text-purple-600">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border-2 border-purple-300 rounded-lg bg-pink-50 focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block font-medium text-lg text-purple-600">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border-2 border-purple-300 rounded-lg bg-pink-50 focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
          required
        />
      </div>

      <button
        type="submit"
        className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={isLoading} // Disable button when loading
      >
        {isLoading ? (
          <div className="flex items-center">
            <svg
              className="animate-spin h-5 w-5 mr-2 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              ></path>
            </svg>
            Logging in...
          </div>
        ) : (
          'Sign In 🚀'
        )}
      </button>
      <p className="mt-4 text-center text-sm text-purple-700">
        Don’t have an account?{" "}
        <Link href="/register" className="font-medium text-pink-600 hover:text-pink-500 underline">
          Sign up here 🎈
        </Link>
      </p>
    </form>
  );
}