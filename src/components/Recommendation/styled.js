import styled, { css } from 'styled-components';

import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';

import { Carousel, ProductCard, theme } from '@sitecore-discover/ui';

const StyledProductRoot = styled(ProductCard.Root)`
  border: ${theme.vars.border.width} solid ${theme.vars.palette.grey['400']};
  box-shadow: 2px 2px 4px ${theme.vars.palette.grey['400']};
  box-sizing: border-box;
  cursor: pointer;
  display: block;
  height: 100%;
  margin: 10px;
  width: 250px;

  &:focus-within {
    border: ${theme.vars.border.width} solid ${theme.vars.palette.primary.main};
  }
  &:hover {
    border: ${theme.vars.border.width} solid ${theme.vars.palette.primary.main};
  }
`;

const StyledProductImage = styled(ProductCard.Image)`
  border-radius: 5%;
  display: block;
  max-height: 100px;
  object-fit: cover;
  width: 100%;
`;

export const StyledPictureContainer = styled.div`
  background-color: #C9C9C9;
  /* background-color: #F8F8F8; */
  border-radius: 5%;
  cursor: default;
  display: flex;
  justify-content: center;
  margin: 20px 10px;

  svg {
    height: 100px;
  }

  img {
    height: 100px;
  }
`;

const StyledBubble = styled.div`
  border-radius: 8px;
  border: none;
  color: #fff;
  cursor: default;
  font-size: 13px;
  display: -webkit-inline-box;
  display: -webkit-inline-flex;
  display: -ms-inline-flexbox;
  display: inline-flex;
  margin-left: 10px;
  padding: 2px 10px 2px 10px;
`;

export const StyledType = styled(StyledBubble)`
  background: #aaa3ec;
`;

export const StyledDate = styled(StyledBubble)`
  background: #C9C9C9;
`;

export const StyledProductDataRow = styled.div`
  text-align: center; 
  padding-top: 5px;
`;

const StyledProductName = styled(ProductCard.Name)`
  font-family: ${theme.vars.typography.fontFamilySystem};
  font-size: ${theme.vars.typography.fontSize5.fontSize};
  font-weight: ${theme.vars.typography.fontSize5.fontWeight};
  line-height: ${theme.vars.typography.fontSize5.lineHeight};
  margin: 0 0 ${theme.vars.spacing.m};
  text-align: center;
`;

const StyledProductContent = styled(ProductCard.Content)`
  color: ${theme.vars.palette.primary.main};
  font-family: ${theme.vars.typography.fontFamilySystem};
  font-size: ${theme.vars.typography.fontSize1.fontSize};
  font-weight: ${theme.vars.typography.fontWeight};
  line-height: ${theme.vars.typography.lineHeight};
  margin: 0;
`;

const StyledProductSku = styled(ProductCard.Sku)`
  color: ${theme.vars.palette.primary.main};
  font-family: ${theme.vars.typography.fontFamilySystem};
  font-size: ${theme.vars.typography.fontSize1.fontSize};
`;

const StyledProductLink = styled.a`
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  color: ${theme.vars.palette.primary.main};
  display: -webkit-box;
  font-size: ${theme.vars.typography.fontSize};
  line-height: ${theme.vars.typography.lineHeight};
  overflow: hidden;
  padding: 0 25px;
  text-decoration: none;
  text-overflow: ellipsis;

  &:hover {
    text-decoration: none;
  }
  &:focus {
    text-decoration: none;
  }
`;

const StyledPrice = styled.span`
  color: ${theme.vars.palette.primary.main};
  font-family: ${theme.vars.typography.fontFamilySystem};
  font-size: ${theme.vars.typography.fontSize4.fontSize};
`;

export const StyledProductCard: any = {
  Link: StyledProductLink,
  Sku: StyledProductSku,
  Content: StyledProductContent,
  Image: StyledProductImage,
  Name: StyledProductName,
  Root: StyledProductRoot,
  Price: StyledPrice,
  Footer: StyledProductDataRow,
  Date: StyledDate,
  Type: StyledType,
};

export const Header = styled.h3`
  color: ${theme.vars.palette.common.black};
  cursor: default;
  display: flex;
  font-family: ${theme.vars.typography.fontFamilySystem};
  font-size: ${theme.vars.typography.fontSize3.fontSize};
`;

/** Carousel styles  */
const containerWidth = '100%';

export const RecommendationContainer = styled.div`
  display: inline-block;
  margin: 10px 0;
  width: 100%;
`;

export const CarouselContainer = styled(Carousel.Root)`
  position: relative;
  max-width: ${containerWidth};
  width: 100%;
`;
export const SliderList = styled(Carousel.Slides)`
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: min-content;
  overflow-x: auto;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
  gap: ${theme.vars.spacing.l};
  // calculate the left padding to apply to the scrolling list
  // so that the carousel starts aligned with the container component
  scroll-padding: max(${theme.vars.spacing.l}, calc((100% - ${containerWidth}) / 2 + ${theme.vars.spacing.l}));
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const Slide = styled(Carousel.Slide)``;

const arrows = css`
  color: ${theme.vars.palette.grey['100']};
  height: 25px;
  vertical-align: middle;
  width: 25px;
`;

const controlButton = css`
  background-color: #6c7ac9;
  border: none;
  color: #fff;
  cursor: pointer;
  height: 100%;
  line-height: 100px;
  padding: 0;
  position: absolute;
  text-align: center;
  top: 0;

  &[aria-disabled='true'] {
    filter: opacity(0.5);
    cursor: not-allowed;
  }

  svg {
    width: 25px;
    height: 25px;
  }

  &:hover:not([aria-disabled='true']) svg {
    color: ${theme.vars.palette.primary.main};
  }
`;

export const NextButton = styled(Carousel.Next)`
  ${controlButton}
  border-radius: ${theme.vars.border.radius} 0 0 ${theme.vars.border.radius};
  right: 0;
`;
export const PrevButton = styled(Carousel.Previous)`
  ${controlButton}
  border-radius: 0 ${theme.vars.border.radius} ${theme.vars.border.radius} 0;
  left: 0;
`;

export const LeftIcon = styled(ChevronLeftIcon)`
  ${arrows}
`;
export const RightIcon = styled(ChevronRightIcon)`
  ${arrows}
`;

export const TooltipContainer = styled.div`
  margin: 2px 6px;
  cursor: pointer;
`;
