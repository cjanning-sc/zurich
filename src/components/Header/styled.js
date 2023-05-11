import styled from 'styled-components';

export const HeaderWrapper = styled.div`
    position: sticky;
    top: 0;
    width: 100%;
    align-items: center;
    z-index: 999998;
    height: 100px;
    background-color: ${props => props.theme.headerColor};
    box-shadow: 0 1px 3px #999;
    display: flex;
    column-gap: 20px;
    justify-content: space-evenly;    
    color: ${props => props.theme.headerFont};
    font-weight: 700;
    font-size: 30px;
    text-align: left
`;

export const LogoWrapper = styled.div`
    margin-left:15%;
    display: block;
    color: white;
    text-align: center;
    width: 200px;
    font-weight:bold;
    font-family: Helvetica;
    font-size: 16px;
    img {
        height: 32px;
    }
`

export const NavItemsList = styled.ul`
    display: flex;
    list-style: none;

    li {
        padding-left: 10px;
        a {
            color: ${props => props.theme.menuFontColor};
        }
        a.selected,
        a:hover {
            color: ${props => props.theme.menuFontColorHover};
            text-decoration: underline;
        }
    }
`;

export const StyledLabel = styled.div`
	background-color: hsl(0, 0%, 95%);
    display: flex:
    justify-content: space-evenly;
    align-items: center;
	color: #313a45;
	font-size: 12px;
	min-width: 39em;
    border-radius: 2px;
    border-color: lightgray;
	padding: 5px;
    font-weight: normal;
`;

const Button = styled.button`
	background-color: transparent;
	border: unset;
	color: red;
	cursor: pointer;
	float: right;
`;

export const StyledImg = styled.div`
	svg {
		height: 20px;
		vertical-align: sub;
	}

	&:hover {
		transform: scale(1.25);
		transition: all 0.2s ease-in-out;
	}
`;

export const RefreshButton = styled(Button)`
`;

export const CopyButton = styled(Button)`
`;

NavItemsList.defaultProps = {
    theme: {
        menuFontColor: '#313a45',
        menuFontColorHover: '#6c7ac9'
    }
}