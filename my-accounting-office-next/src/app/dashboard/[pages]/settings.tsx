'use client';
import Loading from "@/app/[components]/loading";
import { Session } from "next-auth";
import React, { useEffect, useState } from "react"

interface SettingsProps {
    session: Session | null;
}

export default function Settings(props: SettingsProps) {
    const [user, setUser] = useState<{
        name?: string | null
        email?: string | null
        image?: string | null
      }>();

    useEffect(() => {
        if (props.session) {
            setUser(props.session?.user);
        }
    }, [])

    if (user)
    return (
        <div className="settings">
            <div>Nazwa użytkownika: {user.name}</div>
            <div>Email: {user.email}</div>
            <div>Zdjęcie użytkownika: {user.image}</div>
        </div>
    ); 
    else return <Loading />
}