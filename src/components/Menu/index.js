import { trim } from 'lodash';
import React from 'react';
import {
  Link,
} from "react-router-dom";
import {StyledBurger, StyledMenu} from './styled';

export const BurgerButton = ({open, setOpen}) => {
  return (
    <StyledBurger open={open} onClick={() => setOpen(!open)}>
      <div />
      <div />
      <div />
    </StyledBurger>
  )
}

const Menu = ({ menuItems = [], open }) => {
  return (
    <StyledMenu open={open}>
      {menuItems.map(({title, url, logo}, index) => {
      ;
        return (
        <Link
          key={`${trim(title.toLowerCase())}-${index}`}
          to={url}
        >
          <div>
            <img src={logo} alt={title}/> <span aria-label={title}>{title}</span>
          </div>
        </Link>
        )})}
      </StyledMenu>
  )
}
export default Menu;
