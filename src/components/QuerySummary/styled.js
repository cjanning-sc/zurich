import styled from 'styled-components';

export const MainQuerySummary = styled.span`
    color: ${(props) => props.theme.primaryFontColor};
    font-family: "Lato", "Helvetica Neue", Helvetica, Arial, sans-serif,
        sans-serif;
    font-size: 14px;
    display: inline-flex;
`;

export const SummaryHighlight = styled.span`
    font-weight: bold;
`;

MainQuerySummary.defaultProps = {
    theme: {
        primaryFontColor: '#000'
    }
}
