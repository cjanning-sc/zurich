import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import styled, {keyframes} from 'styled-components';

const slideUpAndFade = keyframes({
    '0%': { opacity: 0, transform: 'translateY(2px)' },
    '100%': { opacity: 1, transform: 'translateY(0)' },
  });
  
  const slideRightAndFade = keyframes({
    '0%': { opacity: 0, transform: 'translateX(-2px)' },
    '100%': { opacity: 1, transform: 'translateX(0)' },
  });
  
  const slideDownAndFade = keyframes({
    '0%': { opacity: 0, transform: 'translateY(-2px)' },
    '100%': { opacity: 1, transform: 'translateY(0)' },
  });
  
  const slideLeftAndFade = keyframes({
    '0%': { opacity: 0, transform: 'translateX(2px)' },
    '100%': { opacity: 1, transform: 'translateX(0)' },
  });

  
const StyledItem = styled(DropdownMenuPrimitive.Item)`
    all: unset;
    color: #6f6f6f;
    cursor: pointer;
    font-size: 13px;
    line-height: 1;
    display: flex;
    align-items: center;
    height: 25px;
    position: relative;
    user-select: none;
    border-radius: 3px;
    padding: 0px 5px 0px 25px;
    margin: 5px 0;

    &:hover {
        background-color: #bcc3ca;
    }

    &.selected {
        font-weight: 700;
        :hover {
            background-color: transparent;
        }

    }
`;
const StyledContent = styled(DropdownMenuPrimitive.DropdownMenuContent)`
    min-width: 120px;
    background-color: #FFF;
    padding: 8px;
    border: 1px solid #bcc3ca;
    box-shadow: rgb(22 23 24 / 35%) 0px 10px 38px -10px, rgb(22 23 24 / 20%) 0px 10px 20px -15px;

    @media (prefers-reduced-motion: no-preference) {
        & {
            animation-duration:400ms;
            animation-timing-function:cubic-bezier(0.16, 1, 0.3, 1);
            animation-fill-mode:forwards;
            will-change:transform, opacity
        }
        &[data-state="open"][data-side="top"]{
            animation-name: ${slideDownAndFade};
        }
        &[data-state="open"][data-side="right"]{
            animation-name: ${slideLeftAndFade};
        }
        &[data-state="open"][data-side="bottom"]{
            animation-name: ${slideUpAndFade};
        }
        &[data-state="open"][data-side="bottom"]{
            animation-name: ${slideRightAndFade};
        }
    }
`;
const StyledLabel = styled(DropdownMenuPrimitive.Label)`
    color: #6f6f6f;
    font-size: 13px;
    font-weight: 700;
    margin: 5px 0;
`;
export const IconButton = styled.button`
    all: unset;
    cursor: pointer;
    font-family: inherit;
    height: 20px;
    width: 20px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: ${props => props.theme.filterActionColor};
    background-color: transparent;
    box-shadow: rgba(0, 0, 0, 0.14) 0px 2px 10px;
    border-radius: 50%;
    border: 2px solid ${props => props.theme.filterActionColor};

    svg {
        width: 10px;
        height: 15px;
    }
`;
export const DropdownMenu = DropdownMenuPrimitive.Root;
export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
export const DropdownMenuContent = StyledContent;
export const DropdownMenuItem = StyledItem;
export const DropdownMenuLabel = StyledLabel;
