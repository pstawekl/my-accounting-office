'use client'
import { translateUtils } from '@/middleware';
import { avaibleLanguages } from '@/utils/translateUtils';
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
    const [isLanguageBtnOpen, setIsLanguageBtnOpen] = useState<boolean>(false);

    useEffect(() => {
        if (window)
            setPath(window.location.pathname.split("/")[1]);
    }, [])


    return (
        <nav className="navbar">
            <div className="container">
                <a href="/" className="navbar-brand" id='stdhometitle'>{translateUtils.Translate('stdhometitle')}</a>
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
                    <li className={"nav-dropdown-item language-btn " + (isLanguageBtnOpen ? "active" : "")}
                        onClick={() => setIsLanguageBtnOpen(!isLanguageBtnOpen)}>
                        <span>
                            {
                                translateUtils.GetLanguage() === avaibleLanguages.PL ?
                                    "PL" : "ENG"
                            }
                        </span>
                    </li>
                    {
                        isLanguageBtnOpen &&
                        <div className="language-dropdown">
                            <div onClick={() => {
                                translateUtils.SetLanguage(avaibleLanguages.PL);
                                setIsLanguageBtnOpen(false);
                            }}
                                className="nav-link">
                                PL
                            </div>
                            <div onClick={() => {
                                translateUtils.SetLanguage(avaibleLanguages.ENG);
                                setIsLanguageBtnOpen(false);
                            }}
                                className="nav-link">
                                ENG
                            </div>
                        </div>
                    }
                </ul>
            </div>
        </nav>
    );
}