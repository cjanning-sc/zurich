import styled, { keyframes } from 'styled-components';

export const ArtileListWrapper = styled.ul`
    box-sizing: border-box;
    padding-inline-start: 0px;
    position: relative;
    width: 100%;
    
`;

export const ArticleItemWrapper = styled.div`
    border-bottom: 1px solid #CCCC;
    display: inline-block;
    list-style: none;
    margin-top: 10px;
    padding-bottom: 20px;
    width: 100%;
`;

export const ArticleItemTitle = styled.div`
    color: ${(props) => props.theme?.fontColor || "#313a45"};
    font-family: "Lato", "Helvetica Neue", Helvetica, Arial, sans-serif,
      sans-serif;
    font-size: 15px;
    font-weight: normal;

    h2 {
      font-weight: normal;
    }

    &:hover {
      color: #5548d9;
    }
`;

export const ArticleTypeBubble = styled.div`
	background: ${(props) => props.theme?.backgroundColor || '#aaa3ec'};
	border-radius: 8px;
	border: none;
	color: #fff;
  cursor: default;
	font-size: 13px;
	display: inline-flex;
	margin-left: 10px;
	padding: 2px 10px 2px 10px;

	a {
		color: #fff;
	}
`;

export const DownloadWrapper = styled.a`
    color: #000;
    cursor: pointer;
	  padding: 2px 10px 2px 10px;
    font-size: 1.3rem;
    vertical-align: bottom;

    &:hover {
      color: #000;
    }
`;

export const ArticleFileTypeBubble = styled(ArticleTypeBubble)`
	background: #f00;
  color: #fff;
  font-weight: bold;
`;

export const ArticleIcon = styled.div`
    display: inline-flex;
    height: 30px;
    vertical-align: middle;
    width: 30px;
`;

export const ArticleDescription = styled.div`
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
  color: #313a45;
  display: block;
  display: -webkit-box;
  font-size: 14px;
  line-height: 2rem;
  max-height: 8rem;
  overflow: hidden !important;
  text-overflow: ellipsis;

  img {
    float: left;
    padding: 15px;
    width: 200px;
  }
`;

export const ArticleSubtitle = styled.div`
    color: #313a45;
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 10px;
`;

export const RecommendationExtension = styled.div`
    
`;

const ArticleButton = styled.button`
  background-color: #fff;
  border-radius: 50%;
  border: 1px solid #6c7ac9;
  color: #6c7ac9;
  cursor: pointer;
  display: flex;
  font-size: 30px;
  height: 30px;
  line-height: 28px;
  margin: 12px auto 0 auto;
  padding: 1px 5px;
  width: 30px;
`;

export const PlusButton = styled(ArticleButton)`

`;

export const MinusButton = styled(ArticleButton)`
  line-height: 23px;
  justify-content: center;
`

export const SubArticleTitle = styled.h2`
    border-button: 2px solid #cccc;
`;

export const SubArticleSectionHeader = styled.div`
    h2 {
        margin: auto auto 5px auto;
        position: relative;
        text-align: center;
    }
    svg {
        width: 25px;
    }
`;

export const CloseIconContainer = styled.div`
    position: absolute;
    right: 2%;
    top: 2%;
`;

export const SubArticleHeaderLine = styled.div`
    margin: 0 auto;
    width: 17em;
    height: 2px;
    margin-bottom: 10px;
    border-bottom: 2px solid #7b7b7b;
`;

export const SubArticleItemWrapper = styled.div`
    border-bottom: 1px solid #cccc;
    display: inline-block;
    list-style: none;
    margin-top: 10px;
    width: 100%;
`;

export const SubArticleItemTitle = styled.div`
    color: ${props => props.theme?.fontColor || '#313a45'};
    font-family: "Lato", "Helvetica Neue", Helvetica, Arial, sans-serif, sans-serif;
    font-size: 13px;
    font-weight: normal;

    &:hover {
      color: #5548d9;
    }
`;

export const SubArticleDescription = styled.div`
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
  color: #313a45;
  display: block;
  display: -webkit-box;
  font-size: 13px;
  line-height: 1.5rem;
  max-height: 8rem;
  overflow: hidden !important;
  text-overflow: ellipsis;

  img {
    float: left;
    padding: 0 10px 10px 0;
    width: 150px;
  }
`;

export const ArticleRecsContainer = styled.div`
  padding: 10px;
`;

const Rotate = keyframes`
  from {
      transform: rotate(0deg);
  }
  to {
      transform: rotate(360deg);
  }
`;

export const LoaderAnimation = styled.svg`
  animation: ${Rotate} 2s linear infinite;
  display: block;
  fill: #6c7ac9;
  height: 50px;
  margin: auto;
  width: 50px;
`;
