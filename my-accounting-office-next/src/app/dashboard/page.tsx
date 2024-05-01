'use client'
import { Session } from "next-auth";
import Dashboard from "./dashboard";
import Loading from "../[components]/loading";
import { useEffect, useState } from "react";

export enum dashboardPageTypes {
    start = "start",
    settings = "settings",
    clients = "clients",
    invoices = "invoices",
    clientsAccounts = "clientsAccounts"
}

export default function DashboardPage() {
    const [session, setSession] = useState<Session | null>(null);

    useEffect(() => {
        fetch('/api/user-session/get', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json()).then(
            data => {
                const session: Session = data.session;
                setSession(session);
            }
        ).catch(error => {
            console.error('Błąd podczas pobierania sesji użytkownika:', error);
        });
    }, [])

    if (session)
        return <Dashboard session={session as Session} />
    else
        return <Loading />;
}