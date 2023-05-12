import styled from 'styled-components';

export const SearchSeparator = styled.div`
    grid-area: separator;
    
    width: 100%;
    margin-top: 20px;
`
;

export const SortOptions = styled.div`
  display: inline-flex;
  float: right;
  position: relative;

  label {
    padding-right: 8px;
    padding-top: 8px;
    vertical-align: middle;
    width: 70px;
  }
`;

export const SearchContainer = styled.div`
    display: grid;
    grid-template-columns: 0.6fr 1.44fr;
    grid-template-rows: min-content 1fr;
    gap: 0px 0px;
    grid-auto-flow: row;
    margin-left: 16%;
    margin-right: 16%;

    justify-items: center; 
    align-items: center; 

    grid-template-areas:
        "searchbar searchbar"
        "separator separator"
        "noresults noresults"
        "suggestions suggestions"
        "relatedquestions relatedquestions"
        "filters results"
        "footer footer";

    color: #313a45;
    font-family: "Lato", "Helvetica Neue", Helvetica, Arial, sans-serif, sans-serif;
    transition: all 0.25s ease-in-out;

    @media (max-width: 650px) {
        max-width: 100%;
    }
`;

export const SearchInputBar = styled.div`
    grid-area: searchbar;
    width: 80%;

    & .searchWrapper {
        background: #fff;
        border: 1px solid #bcc3ca;
        padding: 0;
        max-width: 900px;
        margin: auto;

        div {
            height: auto;
        }
        div:nth-child(1) {
            order: 3;
        }

        div:nth-child(2) {
            order: 1;
        }

        div:nth-child(3) {
            order: 2;
        }

        input {
            color: #67768b;
            height: 40px;
        }

        .icon_search {
            border-left: 1px solid #bcc3ca;
            text-align: center;
            width: 60px;
        }

        svg {
            color: #1d4f76;
            width: 20px;
            height: 20px;
        }
    }
`;

export const FacetsBar = styled.div`
    grid-area: filters;
    justify-self: end; 
    align-self: start;
    width: 100%;
    border-top: 2px solid #cecece;
    padding-right: 25px;
    padding-top: 15px;
`;

export const FacetsBar1 = styled.div`
    grid-area: facetbar;
`;

export const Content = styled.div`
    grid-area: results;
    justify-self: start; 
    align-self: start;
    width: 100%;
    border-left: 2px solid #cecece;
    background: #f6f6f6;
    padding: 25px;
    border-top: 2px solid #cecece;
`;

export const PaginationContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 1rem 0;
`;

export const SearchResultHeader = styled.div`
    display: flex;
    justify-content: space-between;
    min-height: 30px;
    overflow: hidden;
`;

export const Footer = styled.div`
    grid-area: footer;
    background-color: #fff;
    height: 75px;
`