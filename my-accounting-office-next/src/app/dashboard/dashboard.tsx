'use client'

import { Session } from "next-auth";
import Navbar from "../[components]/navbar";
import React, { useEffect, useState } from "react";
import ManageDashboardContent from "./manageDashboardContent";

export enum dashboardPageTypes {
    start = "start",
    settings = "settings",
    clients = "clients",
    invoices = "invoices",
    clientsAccounts = "clientsAccounts"
}

export interface dashboardProps {
    session: Session | null;
}

export default function Dashboard(props: dashboardProps) {
    const [user, setUser] = useState<any>(null);
    useEffect(() => {
        if (props.session) {
            setUser(props.session?.user);
        }
    }, [props.session])

    const [dashboardPage, setDashboardPage] = useState<dashboardPageTypes>(dashboardPageTypes.start);
    const [dashboardContent, setDashboardContent] = useState<JSX.Element>(<div></div>);


    useEffect(() => {
        setDashboardContent(<ManageDashboardContent dashboardPage={dashboardPage} session={props.session} />);
    }, [dashboardPage])

    if (user)
        return (
            <main>
                <Navbar session={props.session} />
                <div className="dashboard">
                    <div className="dashboard-menu">
                        <div className="dashboard-pages">
                            <div className={"dashboard-menu-item " + (dashboardPage == dashboardPageTypes.start ? "active" : "")}
                                onClick={() => { setDashboardPage(dashboardPageTypes.start); }}>
                                <span>Pulpit startowy</span>
                            </div>
                            <div className={"dashboard-menu-item " + (dashboardPage == dashboardPageTypes.invoices ? "active" : "")}
                                onClick={() => setDashboardPage(dashboardPageTypes.invoices)}>
                                <span>Faktury</span>
                            </div>
                            <div className={"dashboard-menu-item " + (dashboardPage == dashboardPageTypes.clients ? "active" : "")}
                                onClick={() => setDashboardPage(dashboardPageTypes.clients)}>
                                <span>Klienci</span>
                            </div>
                            <div className={"dashboard-menu-item " + (dashboardPage == dashboardPageTypes.clientsAccounts ? "active" : "")}
                                onClick={() => setDashboardPage(dashboardPageTypes.clientsAccounts)}>
                                <span>Konta klientów</span>
                            </div>
                        </div>
                        <div className="dashboard-utils">
                            <div className={"account-settings"}>
                                <span className={(dashboardPage == dashboardPageTypes.settings ? "active" : "")} onClick={() => { setDashboardPage(dashboardPageTypes.settings); }}>Ustawienia</span>
                            </div>
                        </div>
                    </div>
                    {
                        dashboardContent
                    }
                </div>
            </main>
        );
}