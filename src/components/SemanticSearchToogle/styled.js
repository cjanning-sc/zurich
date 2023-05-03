import styled from "styled-components";

const ToogleDiv = styled.div`
    margin-right: 8px;
`;

const ToogleLabel = styled.label`
    float: right;
    display: flex;
    margin: 8px;

    /* react-toggle override */
    .ss-toogle.react-toggle--checked .react-toggle-track {
        background-color: #5548d9;
    }
`;

export { ToogleDiv, ToogleLabel };

