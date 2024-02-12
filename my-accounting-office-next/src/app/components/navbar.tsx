import React from 'react';

export interface NavbarProps {
    session: any;
}

export default function Navbar(props: NavbarProps) {
    const session = props.session;
    return (
        <nav className="navbar">
            <div className="container">
                <a href="/" className="navbar-brand">My Accounting Office</a>
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a href="/" className="nav-link">Home</a>
                    </li>
                    {
                        session?.user ?
                            <li className="nav-item">
                                <a href="/api/auth/signout" className="nav-link">Sign out</a>
                            </li>
                            :
                            <li className="nav-item">
                                <a href="/api/auth/signin" className="nav-link">Sign in</a>
                            </li>
                    }
                </ul>
            </div>
        </nav>
    );
}