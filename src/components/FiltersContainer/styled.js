import styled from "styled-components";

export const ContentSearchFilterContainer = styled.div`
    background-color: initial;
    border-bottom: initial;
    color: ${(props) => props.theme?.color || "#000"};
    font-family: inherit;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    margin-bottom: 0;
    margin-top: 20px;
    min-height: initial;
    padding-top: 0;
    text-align: left;
    white-space: inherit;
    width: 100%;
`;

export const SourceOptions = styled.div`
    display: inline-flex;
    float: left;
    width: 50%;

    label {
        padding-right: 8px;
        padding-top: 8px;
        vertical-align: middle;
    }

    .react-select-container {
        width: 300px;
    }
`;

export const LocaleOptions = styled.div`
    display: inline-flex;
    float: right;
    margin: auto 5px;
    position: relative;

    img {
        padding-right: 8px;
        vertical-align: middle;
        filter: brightness(0) saturate(100%) invert(8%) sepia(0) saturate(1211%)
        hue-rotate(166deg) brightness(101%) contrast(87%);
    }
`;