import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const csrfResponse = await fetch("http://127.0.0.1:8000/sanctum/csrf-cookie", {
      method: "GET",
      credentials: "include",
    });

    console.log("CSRF Response Headers:", csrfResponse.headers); // ✅ Log headers
    console.log("CSRF Cookies:", csrfResponse.headers.get("set-cookie")); // ✅ Log cookies

    const res = await fetch("http://127.0.0.1:8000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    console.log("Login Response:", data); // ✅ Log response data

    return NextResponse.json({ status: 200, message: "success", data });

  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
}
