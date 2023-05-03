import styled from 'styled-components';

export const SvgIcon = styled.div`
font-size: 1rem;
color: #212529;
text-align: left;
font-family: Calibri,AvenirNextR,Arial,Sans-Serif;
font-weight: 400;
font-style: normal;
box-sizing: border-box;
width: 24px;
position: absolute;
display: flex;
left: 30px;
top: 50%;
transform: translate(-50%,-50%);
line-height: 1;
cursor: pointer;
opacity: 1;
transition: opacity .2s cubic-bezier(1,0,0,1) .3s;  
`;

export const ContentSearchInput = styled.div`
    display: inline-flex;
    flex: 1;
    margin: 20px auto;
    width: 100%;
`;

export const ContentSearchInputWrapper = styled.div`
    background: ${props => props.inputTheme.backgroundColor};
    display: flex;
    flex-grow: 1;
    padding: 10px;
`;

ContentSearchInputWrapper.defaultProps = {
    inputTheme: {
        backgroundColor: '#f6f6f6'
    }
}

export const ContentSearchInputWrapperBox = styled.div`
    background: 0 0;
    box-sizing: border-box;
    height: 48px;
    position: relative;
    width: 100%;
`;

export const WrapperBoxInput = styled.input`
    background: 0 0;
    border: none;
    box-sizing: border-box;
    display: block;
    font-family: arial, sans-serif;
    font-size: 16px;
    height: 48px;
    line-height: 24px;
    padding: 12px 49px 12px 12px;
    text-align: left;
    text-indent: 0;
    white-space: pre;
    width: 100%;

    &:focus {
      border: none;
      outline: none;
    }
`;
