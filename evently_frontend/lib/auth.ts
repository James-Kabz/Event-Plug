import CredentialsProvider from 'next-auth/providers/credentials';
import { NextAuthOptions } from 'next-auth';
import axios from 'axios';
import { User } from '@/types';

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'text' },
                password: { label: 'Password', type: 'password' }
            },

            async authorize(credentials) {
                if (!credentials) throw new Error('No credentials provided');

                const { email, password } = credentials;

                try {
                    // 1️⃣ Fetch CSRF Cookie for Laravel Sanctum
                    await fetch('http://127.0.0.1:8000/api/sanctum/csrf-cookie', {
                        method: 'GET',
                        credentials: 'include', // Ensures cookies are sent
                    });

                    // 2️⃣ Attempt Login
                    const res = await fetch('http://127.0.0.1:8000/api/login', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        credentials: 'include', // Required for Laravel Sanctum
                        body: JSON.stringify({ email, password }),
                    });

                    // 3️⃣ Handle Response
                    if (!res.ok) {
                        // Check if response is JSON
                        const contentType = res.headers.get('content-type') || '';
                        if (!contentType.includes('application/json')) {
                            throw new Error(`Unexpected response format: ${await res.text()}`);
                        }

                        const errorData = await res.json();
                        throw new Error(errorData.message || 'Login failed');
                    }

                    const data = await res.json();
                    return data;

                } catch (error) {
                    if (axios.isAxiosError(error)) {
                        throw new Error(error.response?.data?.message || 'Login failed');
                    } else {
                        throw new Error('An unexpected error occurred');
                    }
                }
            }
        })
    ],

    session: { strategy: 'jwt' },

    pages: { signIn: '/login' },

    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.name = user.name;
                token.email = user.email;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user = {
                    id: token.id,
                    name: token.name,
                    email: token.email
                } as User;
            }
            return session;
        }
    },
};

export default authOptions;
