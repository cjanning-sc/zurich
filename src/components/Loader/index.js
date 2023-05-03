import React from 'react';
import { StyledLoader } from './styled';

const Loader = ({ logo }) => (
  <StyledLoader>
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <img src={logo} alt="Loader" />
    </div>
    <div style={{ width: '100%' }}>Loading...</div>
  </StyledLoader>
);

export default Loader;
