import { Session, getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/options";
import Dashboard from "./dashboard";
import Loading from "../[components]/loading";

export enum dashboardPageTypes {
    start = "start",
    settings = "settings",
    clients = "clients",
    invoices = "invoices",
    clientsAccounts = "clientsAccounts"
}

export default async function DashboardPage() {
    const session: Session | null = await getServerSession(authOptions);

    const user = session?.user;

    if (user)
        return (
            <Dashboard session={session} />
       ); else return <Loading />;
}