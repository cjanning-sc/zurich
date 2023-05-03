import styled from 'styled-components';

export const ExpandButton = styled.div`
    margin-left: 5px;
    .show {
        display: inline-flex;
    }

    .hide {
        display: none;
    }
`;

export const CollapseButton = styled.div`
    margin-left: 5px;
    .show {
        display: inline-flex;
    }

    .hide {
        display: none;
    }
`;

export const IconButton = styled.button`
    margin-left: 5px;
    all: unset;
    cursor: pointer;
    font-family: inherit;
    height: 20px;
    width: 20px;

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

    .show {
        display: inline-flex;
    }

    .hide {
        display: none;
    }

`;