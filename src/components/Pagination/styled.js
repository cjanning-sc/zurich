import styled from 'styled-components';

export const PaginationContainer = styled.div`
    .pagination {
        align-items: center;
        display: flex;
        flex-wrap: wrap;
        list-style: none;
        margin: 0;
        padding: 0;   
    }
    
    .pagination a {
        align-items: center;
        border-radius: ${props => props.theme.pagination_borderRadius};
        border: 1px solid ${props => props.theme.pagination_anchorBorderColor};
        color: ${props => props.theme.pagination_anchorColor};
        cursor: pointer;
        display: inline-flex;
        margin: 0 3px;
        padding: 10px;
        vertical-align: middle;
        font-size: 15px;
        line-height: 15px;
    }
    
    .pagination__link {
        font-weight: bold;
    }
    
    .pagination__link--active a {
        background: ${props => props.theme.pagination_activeLinkBackgroundColor};
        color: ${props => props.theme.pagination_activeLinkColor};
    }
    
    .pagination__link--disabled a {
        border: 1px solid ${props => props.theme.pagination_disabledLinkBorderColor};
        color: ${props => props.theme.pagination_disabledLinkColor};
    }
`;


PaginationContainer.defaultProps = {
    theme: {
        pagination_anchorBorderColor: '#6c7ac9',
        pagination_anchorColor: '#6c7ac9',
        pagination_activeLinkBackgroundColor: '#6c7ac9',
        pagination_activeLinkColor: '#fff',
        pagination_borderRadius: '5px',
        pagination_disabledLinkBorderColor: 'rgb(198, 197, 202)',
        pagination_disabledLinkColor: 'rgb(198, 197, 202)',
    }
}

