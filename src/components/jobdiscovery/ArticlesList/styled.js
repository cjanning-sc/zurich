import styled, { keyframes } from 'styled-components';

export const ArtileListWrapper = styled.ul`
    color: #313a45;
    font-size: 15px;
    list-style: none;
    margin: 0;
    padding: 0;
`;

export const ArticleItemWrapper = styled.li`
    align-items: flex-start;
    border-bottom: 1px dashed #ccc;
    display: flex;
    flex-direction: row;
    padding: 10px;
`;

export const ArticleImageWrapper = styled.div`
    padding-right: 15px;
    img {
        width: 190px;
    }
`;

export const ArticleContentWrapper = styled.div`
    width: 100%;
`;

export const ArticleTitleWrapper = styled.div`
    width: 100%;
    vertical-align: middle;
    font-size: 1.3em;
    margin-top: 10px;
    margin-bottom: 10px;
    margin-left: 0;
    margin-right: 0;
    font-weight: bold;
    color: #132c6e;
    a {
        color: #132c6e;
    }
`;

export const ArticleIconContentWrapper = styled.div`
    align-items: center;
    display: flex;
    color: #6f6f6f;
    padding-bottom: 5px;
    svg {
        width: 15px;
    }

    span {
        padding-left: 5px;
        flex: 20px;
    }
}    
`;

export const ArticleContent = styled.div`
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;

    &:before {
        display: block;
        content: "";
        height: 1px;
        width: 50px;
        background: #d2d2d2;
        margin: 5px 0 10px 0;
    }
    
`;

export const ArticleLocationWrapper = styled.div`
    color: #6f6f6f;
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
