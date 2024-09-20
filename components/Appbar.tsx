'use client';

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Music } from "lucide-react"
import { motion } from "framer-motion"

export function Appbar() {
    const session = useSession();

    return <div className="flex justify-between px-20 bg-gray-950 ">
        <Link className="flex items-center justify-center" href="#">
            <Music className="h-6 w-6 text-purple-500" />
            <span className="ml-2 text-3xl font-bold text-white">Sanzy</span>
          </Link>
          <nav className="hidden md:flex space-x-8 mt-4 ">
            <Link className="text-sm font-medium hover:text-purple-400 text-xl font-bold transition-colors text-white" href="#features">
              Features
            </Link>
            <Link className="text-sm font-medium hover:text-purple-400 text-xl font-bold transition-colors text-white" href="#popular">
              Popular Streams
            </Link>
            <Link className="text-sm font-medium hover:text-purple-400 text-xl font-bold transition-colors text-white" href="#faq">
              FAQ
            </Link>
          </nav>

          <div className="p-3 rounded-full">
            {session.data?.user && <Button 
                    className="px-6 bg-purple-600 hover:bg-purple-700"
                    onClick={()=>signOut()}
                >Logout</Button>}
                {!session.data?.user && <Button 
                    className="px-6 bg-purple-600 hover:bg-purple-700"
                    onClick={()=>signIn()}
                >Signin</Button>}
          </div>
          
        
    </div>
}