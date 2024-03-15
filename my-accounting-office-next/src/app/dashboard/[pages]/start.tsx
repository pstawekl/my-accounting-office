'use client'
import React, { useEffect, useState } from "react";
import { Session } from "next-auth";

interface StartDashboardProps {
    session: Session | null;
}

export default function StartDashboard(props: StartDashboardProps) {
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

    return (
        <div className="start">
            <div className="start-title">
                Witaj {user?.name}
            </div>
            <div className="start-subtitle">
                Jesteś na pulpicie startowym aplikacji. Wybierz odpowiednią zakładkę z menu po lewej stronie i rozpocznij pracę.
            </div>
        </div>
    )
}