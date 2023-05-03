import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import styled from 'styled-components';

export const TypeParent = styled.div`
    background: #f8f8f8;
    margin: 10px 0;
    max-height: 225px;
    border:1px solid ${props => props.theme.filterColor};
    overflow-y: scroll;
    height:auto;
`;

export const TypeHeader = styled.div`
    position: sticky;
    top: 0;

    background-color: ${props => props.theme.filterColor};
    color: ${props => props.theme.filterFontColor};
    padding: 15px 15px;

    display: flex;
    justify-content: space-between;
    align-items: center;

    h2 {
        font-size: ${props => props.theme.filterFontSize};
        font-weight: 500;
        margin: 0;
    }
`;

const StyledCheckbox = styled(CheckboxPrimitive.Root)`
    all: unset;
    background-color: #FFF;
    width: 18px;
    height: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #ccc;
    margin-right: 5px;
    &:hover { 
        background-color: #ccc;
    }
    &:focus { 
        box-shadow: 0 0 0 2px black; 
        }
`;

const StyledIndicator = styled(CheckboxPrimitive.Indicator)`
    color: #000;
  `;

export const Checkbox = StyledCheckbox;
export const CheckboxIndicator = StyledIndicator;

export const FilterCheckboxContainer = styled.div`
    display: flex;
    align-items: flex-start;
    padding: 7px 20px 7px 20px;

    &:hover {
        cursor: pointer;
        
        label {
            color: ${props => props.theme.searchLabelHover};
        }

        span {
            color: ${props => props.theme.secondaryFontColor};
        }
    }
`;

FilterCheckboxContainer.defaultProps = {
    theme: {
        secondaryFontColor: '#000',
        searchLabelHover: '#000'
    }
};


export const Label = styled.label`
    color: ${props => props.theme.secondaryFontColor};
    
    display: flex;
    flex: 20px;
    font-size: 15px;
    justify-content: space-between;
    line-height: 16px;
    margin-left: 10px;

    &:hover { 
        color: ${props => props.theme.searchLabelHover};
        cursor: pointer;

        span {
            color: ${props => props.theme.secondaryFontColor};
        }
    }

`
Label.defaultProps = {
    theme: {
        secondaryFontColor: '#000',
        searchLabelHover: '#000'
    }
};

export const TypeFilterWrapper = styled.div`
    background: #f8f8f8;
    margin: 10px 0;
`;

export const TypeFilterHeader = styled.div`
    background: #231f20;
    color: #fff;
    padding: 15px 20px;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    h2 {
        font-size: 16px;
        font-weight: 500;
        margin: 0;
    }
`;

export const Button = styled.button`
    color: #1d4f76;
    background: transparent;
    border: 0;
    font-size: 16px;
    margin-right: 5px;

    :hover {
        cursor: pointer;
        color: #cc0d00;
    }
`;

export const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-around;
`;
