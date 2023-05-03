import styled from 'styled-components';

export const ClearButton = styled.div`
    margin-right: 5px;
    display: inline-flex;
`;

export const IconButton = styled.button`
    all: unset;
    cursor: pointer;
    font-family: inherit;
    height: 20px;
    width: 20px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: ${props => props.theme.filterActionColor};
    background-color: transparent;
    box-shadow: rgba(0, 0, 0, 0.14) 0px 2px 10px;
    border-radius: 50%;
    border: 2px solid ${props => props.theme.filterActionColor};

    svg {
        width: 10px;
        height: 15px;

    }
`;