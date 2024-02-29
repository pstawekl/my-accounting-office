'use client'
import { useEffect, useState } from "react";
import { dashboardPageTypes } from "./page";
import Settings from "./[pages]/settings";
import { Session } from "next-auth";

export default function ManageDashboardContent(props: { dashboardPage: dashboardPageTypes, session: Session | null}) {
    const [dashboardName, setDashboardName] = useState<string>("");

    useEffect(() => {
        switch (props.dashboardPage) {
            case dashboardPageTypes.start:
                setDashboardName("Pulpit startowy");
                break;
            case dashboardPageTypes.settings:
                setDashboardName("Ustawienia");
                break;
            case dashboardPageTypes.clients:
                setDashboardName("Klienci");
                break;
            case dashboardPageTypes.invoices:
                setDashboardName("Faktury");
                break;
            case dashboardPageTypes.clientsAccounts:
                setDashboardName("Konta klientów");
                break;
        }
    }, [props.dashboardPage])

    function manageDashboardContent(): JSX.Element {
        switch (props.dashboardPage) {
            case dashboardPageTypes.start:
                return <div>Start Page Content</div>;
            case dashboardPageTypes.settings:
                return <Settings session={props.session} />;
            case dashboardPageTypes.clients:
                return <div>Clients Page Content</div>;
            case dashboardPageTypes.invoices:
                return <div>Invoices Page Content</div>;
            case dashboardPageTypes.clientsAccounts:
                return <div>Clients Accounts Page Content</div>;
            default:
                return <div>Invalid Page</div>;
        }
    }

    return (
        <div className="dashboard-wrapper">
            <div className="dashboard-wrapper-name">
                {dashboardName}
            </div>
            <div className="dashboard-wrapper-content">
                {manageDashboardContent()}
            </div>
        </div>
    )
}