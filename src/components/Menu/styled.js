import styled from 'styled-components';

export const StyledBurger = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 2rem;
  padding: 0;
  position: fixed;
  right: 1rem;
  width: 2rem;
  z-index: 10;
  
  &:focus {
    outline: none;
  }

  div {
    width: 2rem;
    height: 0.25rem;
    background: ${({open }) => open ? 'red' : 'red'};
    border-radius: 10px;
    transition: all 0.3s linear;
    position: relative;
    transform-origin: 1px;
    
    
    :first-child {
      transform: ${({ open }) => open ? 'rotate(45deg)' : 'rotate(0)'};
    }

    :nth-child(2) {
      opacity: ${({ open }) => open ? '0' : '1'};
      transform: ${({ open }) => open ? 'translateX(20px)' : 'translateX(0)'};
    }

    :nth-child(3) {
      transform: ${({ open }) => open ? 'rotate(-45deg)' : 'rotate(0)'};
    }
  }
  
  &:hover div {
    background: #CCCCCC;
  }
`;

export const StyledMenu = styled.nav`
  background: white;
  box-shadow: -5px 0px 5px 0px #aaaaaa;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 100vh;
  right: 0;
  padding: 80px 30px;;
  position: fixed;
  text-align: left;
  top: 0;
  transition: transform 0.3s ease-in-out;
 
  transform: ${({ open }) => open ? 'translateX(0%)' : 'translateX(100%)'};

  @media (max-width: 576px) {
    width: 100%;
  }

  a {
    color: #000000;
    font-size: 13px;
    font-weight: bold;
    padding: 10px 0;
    text-decoration: none;
    transition: color 0.3s linear;
    div {
      display: inline-flex;
    }
    img {
      width: 20px;
      height: 20px;
    }
    
    span {
      height: 20px;
      padding-top: 3px;
    }
    
    @media (max-width: 576px) {
      font-size: 1.5rem;
      text-align: center;
    }

    &:hover {
      color: #CCCCCC;
    }
  }
`;
