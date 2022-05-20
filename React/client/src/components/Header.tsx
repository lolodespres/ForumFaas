import * as React from 'react';
import { Link } from 'react-router-dom';
import "./header.css"
export interface IHeaderProps {
}

export function Header(props: IHeaderProps) {
    return (
        <header id="navbar">
            <a href="/"><img className="logo" src="/images/LOGO.png" alt="logo" /></a>
            <nav>
                <Link to="/forum"><button>Forum</button></Link>
                <Link to="/auth/signup"><img src="/images/codicon_account.png" alt="icon signup" /></Link>
                {/* {{#if isLog}} */}
                <Link to="/auth/logout">
                    <img src="/images/ant-design_logout-outlined.png" alt="icon login" />             </Link>
                {/* {{else}} */}
                <Link to="/auth/login"><img
                    src="/images/ant-design_login-outlined.png"
                    alt="icon login"
                /></Link>
                {/* {{/if}} */}
            </nav>
        </header>
    );
}
