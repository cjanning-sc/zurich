import styled from 'styled-components';

export const SortSelect = styled.div`
select {    
    height: 25px;
    border-radius: ${props => props.theme.pagination_borderRadius};
    border: 1px solid ${props => props.theme.pagination_anchorBorderColor};
    color: ${props => props.theme.pagination_anchorColor};
}
`;

export const SortWrapper = styled.div`
    display: flex;
    flex-shrink: 0;
`;

export const SortContainer = styled.span`
    align-items: center;
    border-bottom: 2px solid #bcc3ca;
    box-align: center;
    color: #313a45;
    display: flex;
    font-size: 12px;
    font-weight: bold;
    padding: 0 5px 10px;
    text-transform: uppercase;

    &:hover {
        cursor: pointer;
    }

    &.selected {
        border-bottom: 2px solid #263e55;
    }
`;

