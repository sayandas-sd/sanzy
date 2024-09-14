'use client';

import { signIn, signOut, useSession } from "next-auth/react";

export function Appbar() {
    const session = useSession();

    return <div className="">
        <div className="flex justify-between">
            <div>
                sanzy
            </div>
            <div>
                {session.data?.user && <button 
                    className="p-3 bg-green-400"
                    onClick={()=>signOut()}
                >Logout</button>}
                {!session.data?.user && <button 
                    className="p-3 bg-red-400"
                    onClick={()=>signIn()}
                >Signin</button>}
            </div>
        </div>
    </div>
}