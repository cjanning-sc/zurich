import styled from 'styled-components';

export const ContentSearchMainFilter = styled.div`
    background-color: initial;
    border-bottom: initial;
    color: ${(props) => props.theme?.color || "#000"};
    display: inline-flex;
    font-family: inherit;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    margin-bottom: 0;
    min-height: initial;
    padding-top: 0;
    text-align: left;
    white-space: inherit;
    width: 80%;
`;

export const ArrowWrapper = styled.div`
    bottom: -11px;
    display: none;
    left: 0;
    position: absolute;
    text-align: center;
    width: 100%;
`;

export const MainFilterOptionContainer = styled.div`
    border: initial;
    cursor: pointer;
    cursor: pointer;
    display: inline-block;
    font-size: 15px;
    height: initial;
    margin-bottom: initial;
    margin: initial;
    padding: initial;
    text-decoration: none;
    text-transform: initial;
    vertical-align: middle;
    white-space: normal;
    width: auto;

    a.selected,
    a:hover {
      background-color: ${props => props.theme?.backgroundColor || '#5548d9'};
      border-color: ${props => props.theme?.borderColor || '#5548d9'};
      color: ${props => props.theme?.color || '#FFF'};
      position: relative;
    }

    a.selected ${ArrowWrapper},
    a:hover ${ArrowWrapper} {
      display: block;
    }

    a.selected p,
    a:hover p {
      color: ${props => props.theme?.hoverPColor || '#FFF'};
    }   
`;

export const MainFilterOptionContainerA = styled.a`
    border: solid 1px #ccc;
    color: inherit;
    cursor: pointer;
    display: inline-block;
    font-size: inherit;
    height: initial;
    margin-right: 18px;
    padding: 5px 25px;
    text-decoration: initial;
    text-transform: initial;
    vertical-align: initial;
    white-space: initial;

    p {
      color: #000;
      font-family: inherit;
      font-size: 14px;
      height: initial;
      margin-bottom: 0;
      margin-top: 0;
      text-transform: capitalize;
    }
`;

export const Arrow = styled.div`
    border-left: 10px solid ${props => props.theme?.borderLeftColor || '#0000'};
    border-right: 10px solid ${props => props.theme?.borderRightColor || '#0000'};
    border-top: 10px solid ${props => props.theme?.borderTopColor || '#5548d9'};
    display: block !important;
    height: 0;
    margin-left: auto !important;
    margin-right: auto !important;
    width: 0;
`;
