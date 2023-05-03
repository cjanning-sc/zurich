import React from "react";
import Toggle from "react-toggle";
import "react-toggle/style.css"; // for ES6 modules

import { ToogleDiv, ToogleLabel } from "./styled";

const SemanticSearchToogle = ({ label, onRfkFlagsChange }) => {

  return (
    <ToogleLabel>
      <ToogleDiv>{label}</ToogleDiv>
      <Toggle
        className="ss-toogle"
        icons={false}
        onChange={e => onRfkFlagsChange(e.target.checked ? ["+semsearch"] : [])}
      />
    </ToogleLabel>
  );
};

export default SemanticSearchToogle;



