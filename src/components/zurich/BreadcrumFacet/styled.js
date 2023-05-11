import styled from 'styled-components';

export const ClearAll = styled.a`
    border: none;
    color: #296896;
    cursor: pointer;
    display: inline-block;
    font-size: 14px;
    text-decoration: none;
    margin: 0 0 0 5px;
    flex-shrink: 0;
    padding-left: 5px;
    overflow: visible;
    width: auto;

    &:hover {
        text-decoration: underline;
    }
`;

export const BreadcrumFacetWrapper = styled.div`
    align-items: flex-start;
    display: flex;
    justify-content: space-between;
    padding-bottom: 10px;
    margin-bottom: 10px;
    position: relative;
    overflow: hidden;
    border-bottom: 1px solid #bcc3ca;
`;
export const TypeFiltersContainer = styled.div``;
export const TypeFilterWrapper = styled.div`
    
`;
export const TypeFilterHeader = styled.span`
    color: #67768b;
    display: inline-block;
    font-size: 14px;
    margin-right: 8px;
    padding-bottom: 2px;
`;

export const FilterLink = styled.a`
    color: #296896;
    cursor: pointer;
    display: inline-block;
    font-size: 14px;
    margin-right: 15px;
`;