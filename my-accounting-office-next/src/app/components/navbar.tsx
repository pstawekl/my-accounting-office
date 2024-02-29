'use client'
import React, { useEffect, useState } from 'react';


export interface NavbarProps {
    session: any;
}

export enum navbarPageTypes {
    home = "home",
    dashboard = "dashboard"
}

export default function Navbar(props: NavbarProps) {
    const [path, setPath] = useState<string>("");
    const session = props.session;
    
    useEffect(() => {
        if (window)
        setPath(window.location.pathname.split("/")[1]);
    }, [])
    

    return (
        <nav className="navbar">
            <div className="container">
                <a href="/" className="navbar-brand">My Accounting Office</a>
                <ul className="navbar-nav">
                    <li className={"nav-item " + (path == "" ? "active" : "")}>
                        <a href="/" className="nav-link">Home</a>
                    </li>
                    {
                        session?.user &&
                        <li className={"nav-item " + (path == "dashboard" ? "active" : "")}>
                            <a href="/dashboard" className="nav-link">Dashboard</a>
                        </li>
                    }
                    {
                        session?.user ?
                            <li className="nav-item login-btn">
                                <a href="/api/auth/signout" className="nav-link">Wyloguj</a>
                            </li>
                            :
                            <li className="nav-item login-btn">
                                <a href="/api/auth/signin" className="nav-link">Zaloguj</a>
                            </li>
                    }
                </ul>
            </div>
        </nav>
    );
}