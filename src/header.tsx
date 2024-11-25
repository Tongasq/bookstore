import React from 'react';
import "./header.css"
import { Link } from 'react-router-dom';
function Header() {
  return (
    <header>
      <nav>
        <ul>
          <li><Link to="/">主界面</Link></li>
          <li><Link to="/books">书库</Link></li>
          <li><Link to="/cart">购物车</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
