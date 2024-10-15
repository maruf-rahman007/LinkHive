import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import prisma from './prisma';
import { checkExistingUser, isEmailMethod } from '@/hooks/helper/authHelper';

export const NEXT_AUTH = {
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { label: 'Email', type: 'text', placeholder: 'Email' },
                password: { label: 'Password', type: 'password', placeholder: 'Password' },
                name: { label: 'name', type: 'text', placeholder: 'Name' },
            },
            async authorize(credentials: any) {
                console.log("Received credentials:", credentials);

                // Handle login flow
                if (credentials.isLogin === 'true') {
                    const user = await checkExistingUser(credentials.email);
                    if (user && isEmailMethod(user)) {
                        const isPasswordValid = await bcrypt.compare(credentials.password, user.password || "");
                        if (isPasswordValid) {
                            // ✅ Changed: Return a valid user object for successful login
                            return {
                                id: user.id,
                                name: user.name,
                                email: user.email,
                            };
                        } else {
                            throw new Error("Password does not match, please try again.");
                        }
                    } else {
                        throw new Error("No user found with this email address.");
                    }
                } else {
                    // Handle signup flow
                    const existingUser = await checkExistingUser(credentials.email);
                    if (existingUser) {
                        throw new Error("User with the same email address already exists.");
                    }

                    const hashedPassword = await bcrypt.hash(credentials.password, 10);
                    try {
                        const newUser = await prisma.user.create({
                            data: {
                                email: credentials.email,
                                name: credentials.name,
                                password: hashedPassword,
                                method: "email-cred",
                            }
                        });

                        // ✅ Changed: Return the new user object after signup
                        return {
                            id: newUser.id,
                            name: newUser.name,
                            email: newUser.email,
                        };
                    } catch (error) {
                        throw new Error("Failed to create user");
                    }
                }
            },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        jwt: async ({ user, token }: any) => {
            if (user) {
                // ✅ Changed: Adding user ID to token
                token.uid = user.id;
            }
            return token;
        },
        session: ({ session, token }: any) => {
            if (session.user) {
                // ✅ Changed: Adding token user ID to session user
                session.user.id = token.uid;
            }
            return session;
        },
        signIn: async ({ user, account }: any) => {
            if (account.provider === 'google') {
                try {
                    const { email, id, name, image } = user;
                    const existingUser = await checkExistingUser(email);
                    if (!existingUser) {
                        const newUser = await prisma.user.create({
                            data: {
                                email,
                                name,
                                googleId: id,
                                image,
                                method: 'google'
                            }
                        });
                        // ✅ Changed: Return true for successful sign-in
                        return true;
                    } else {
                        if (existingUser.method !== 'google') {
                            throw new Error("User with the same email exists with a different sign-in method.");
                        }
                        // ✅ Changed: Return true if user exists with the same method
                        return true;
                    }
                } catch (error) {
                    console.error("Error in signIn callback:", error);
                    throw new Error("Failed to sign in with Google.");
                }
            }
            // ✅ Changed: Return a boolean for credentials provider
            return account.provider === 'credentials';
        }
    },
    pages: {
        signIn: "/signin",
        error: '/signin'
    },
    debug: true,
};
