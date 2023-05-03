import styled from 'styled-components';

export const ResultPerPageContainer = styled.div`
    display: flex;
    align-items: center;

    ul {
        align-items: center;
        display: flex;
        flex-wrap: wrap;
        list-style: none;
        margin: 0;
        padding: 0;   
    }
    
    ul button {
        font-size: 15px;
        line-height: 15px;
        align-items: center;
        display: inline-flex;
        cursor: pointer;
        vertical-align: middle;
        background: #fff;
        border-radius: ${props => props.theme.pagination_borderRadius};
        border: 1px solid ${props => props.theme.pagination_anchorBorderColor};
        color: ${props => props.theme.pagination_anchorColor};
        padding: 10px;
        margin: 0 3px;
    }
    
    .pagination__link {
        font-weight: bold;
    }
    
    ul .perPageSelected {
        background: ${props => props.theme.pagination_activeLinkBackgroundColor};
        color: ${props => props.theme.pagination_activeLinkColor};
    }
`;

export const ResultPerPageLeftLabel = styled.span`
`;

export const ResultPerPageRightLabel = styled.span`
`;

ResultPerPageContainer.defaultProps = {
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
