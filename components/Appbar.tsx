"use client"; // Make sure this is a client component
import { useRouter } from "next/navigation";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from 'lucide-react';

export const Appbar = () => {
    const router = useRouter();
    const { data: session } = useSession();
    const [isMenuOpen, setIsMenuOpen] = useState(false); 

    const handleSignOut = async () => {
        await signOut({ redirect: false });
        router.push('/');
    };

    return (
        <header className="p-4 md:p-6 bg-gradient-to-r from-purple-300 via-pink-300 to-orange-300">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-2xl md:text-3xl font-bold">
                    <Link href="/">LinkHive</Link>
                </h1>
                <nav className="hidden md:flex space-x-6">
                    {!session?.user && (
                        <>
                            <Link href="#features" className="hover:text-purple-600 transition-colors">Features</Link>
                            <Link href="#pricing" className="hover:text-purple-600 transition-colors">Pricing</Link>
                            <Link href="#faq" className="hover:text-purple-600 transition-colors">FAQ</Link>
                        </>
                    )}
                </nav>

                {session?.user ? (
                    <div className="hidden md:flex items-center">
                        <button
                            className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded mr-4"
                            onClick={handleSignOut}
                        >
                            Logout
                        </button>
                        <Image
                            src={session.user.image || 'https://ui-avatars.com/api/?name=User&size=40&background=007BFF&color=fff'}
                            alt="User Avatar"
                            width={40}
                            height={40}
                            className="rounded-full cursor-pointer"
                            onClick={handleSignOut}
                        />
                    </div>
                ) : (
                    <button className="hidden md:block bg-white text-purple-600 px-4 py-2 rounded-full font-semibold hover:bg-purple-100 transition-colors" onClick={() => signIn()}>
                        Get Started
                    </button>
                )}

                
                <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            
            {isMenuOpen && (
                <nav className="md:hidden bg-gray-800 text-white mt-2 p-4 rounded">
                    {!session?.user && (
                        <>
                            <Link href="#features" className="block py-2 hover:text-purple-200 transition-colors">Features</Link>
                            <Link href="#pricing" className="block py-2 hover:text-purple-200 transition-colors">Pricing</Link>
                            <Link href="#faq" className="block py-2 hover:text-purple-200 transition-colors">FAQ</Link>
                        </>
                    )}
                    {session?.user ? (
                        <button className="block w-full text-left py-2 text-red-500" onClick={handleSignOut}>
                            Logout
                        </button>
                    ) : (
                        <button className="block w-full bg-white text-purple-600 py-2 rounded-full font-semibold hover:bg-purple-100 transition-colors" onClick={() => signIn()}>
                            Get Started
                        </button>
                    )}
                </nav>
            )}
        </header>
    );
};
