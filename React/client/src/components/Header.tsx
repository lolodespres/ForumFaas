import * as React from 'react';

export interface IHeaderProps {
}

export function Header (props: IHeaderProps) {
  return (
    <header id="navbar">
      <a href="/"><img className="logo" src="/images/LOGO.png" alt="logo" /></a>
      <nav>
        <div className="btnf">
          <a href="/forum/home"><button>Forum</button></a>
        </div>
        <a href="/auth/signup"><img src="/images/codicon_account.png" alt="icon signup" /></a>
        {/* {{#if isLog}} */}
          <a href="/auth/logout"><img
              src="/images/ant-design_logout-outlined.png"
              alt="icon login"
            /></a>
        {/* {{else}} */}
          <a href="/auth/login"><img
              src="/images/ant-design_login-outlined.png"
              alt="icon login"
            /></a>
        {/* {{/if}} */}
      </nav>
    </header>
  );
}
