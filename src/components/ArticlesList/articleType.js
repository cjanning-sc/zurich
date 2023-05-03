import { ArticleIcon } from './styled';
import article from './images/article.png';
import blogs from './images/blogs.png';
import news from './images/news.png';
import events from './images/events.png';
import webinars from './images/webinars.png';

const imgLookup = {
  blogs,
  news,
  events,
  webinars,
};

const getArticleImg = (type) => {
  return imgLookup[type] || article;
};

const ArticleType = ({type}) => (
  <ArticleIcon>
    <img src={getArticleImg(type)} />
  </ArticleIcon>
);

export default ArticleType;
