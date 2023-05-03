import parse from "html-react-parser";
import React, { useContext, useState } from "react";
import { FaArrowDown } from "react-icons/fa";
import { Presence } from "@sitecore-discover/ui";
import RelatedQuestionsAccordion from "../RelatedQuestions/RelatedQuestionsAccordion";
import ArticleType from "./articleType";

import {
    ArticleDescription,
    RecommendationExtension,
    ArticleFileTypeBubble,
    ArticleItemTitle,
    ArticleItemWrapper,
    ArticleSubtitle,
    ArticleTypeBubble,
    ArtileListWrapper,
    DownloadWrapper,
    LoaderAnimation,
    MinusButton,
    PlusButton,
} from './styled';
import { RecommendationCtx } from "../../hooks/RecommendationProvider";
import RecommendationList from '../RecommendationList'

const relatedQuestionsIndex = 3;

const ArticleItem = ({ includeSku, className, onClick, ...product }) => {
  const { id, title, highlight, description, type, subtitle, image_url, url, file_type, parent_url } =
    product;

  const convertDescriptionToString = (value) => value.join("...");
  const convertTitleToString = (value) => value.join(" ");

  return (
		<>
			<ArticleItemTitle>
				<h2>
					<ArticleType type={type} />
					<a
						href={(file_type === 'pdf') ? parent_url : url}
						target='_blank'
						onClick={() => onClick(product)}
						rel='noreferrer'
					>
						{' '}
						{highlight && highlight.title
							? parse(convertTitleToString(highlight.title))
							: title}{' '}
					</a>
					<ArticleTypeBubble>{type}</ArticleTypeBubble>
          {
            file_type && file_type === 'pdf' && 
            (<><ArticleFileTypeBubble>{file_type}</ArticleFileTypeBubble><DownloadWrapper href={url}><FaArrowDown></FaArrowDown></DownloadWrapper></>)
          }

          
				</h2>
			</ArticleItemTitle>
			{subtitle && <ArticleSubtitle>{subtitle}</ArticleSubtitle>}
			<ArticleDescription>
				{image_url && (
					<img
						src={image_url}
						alt={title}
					/>
				)}
				{highlight && highlight.description
					? parse(convertDescriptionToString(highlight.description))
					: description}
			</ArticleDescription>
			<RecommendationContainer id={id} />
		</>
  );
};

const ArticlesList = ({
	products = [],
	onProductClick,
	loaded,
	loading,
	currentPage,
}) => {
	const ready = loaded && !loading;
	return (
		<ArtileListWrapper>
			{ready &&
				products.map((product, index) => {
					if (
						relatedQuestionsIndex <= products.length &&
						index === relatedQuestionsIndex
					) {
						return <RelatedQuestionsAccordion key={`${product.id}_${index}`}></RelatedQuestionsAccordion>;
					}
					return (
						<ArticleItemWrapper key={`${product.id}_${index}`}>
							<ArticleItem
								{...product}
								onClick={(product) =>
									onProductClick(product, index, products, currentPage)
								}
							/>
						</ArticleItemWrapper>
					);
				})}
			{ready && relatedQuestionsIndex > products.length && (
				<RelatedQuestionsAccordion ></RelatedQuestionsAccordion>
			)}
		</ArtileListWrapper>
	);
};

const RecommendationContainer = ({ id }) => {
  const [showRecs, setShowRecs] = useState(false);
  // Article's RWs
  const recommendationCtx = useContext(RecommendationCtx);
  const { articleKey, rwsLoading, recommendations, getRWs, setArticleKey } = recommendationCtx;

  if (rwsLoading && articleKey === id ) {
    return (<Presence present={true}>
      <LoaderAnimation
        aria-busy={true}
        aria-hidden={!true}
        focusable="false"
        role="progressbar"
        viewBox="0 0 20 20"
      >
        <path d="M7.229 1.173a9.25 9.25 0 1 0 11.655 11.412 1.25 1.25 0 1 0-2.4-.698 6.75 6.75 0 1 1-8.506-8.329 1.25 1.25 0 1 0-.75-2.385z" />
      </LoaderAnimation>
    </Presence>);
  }

  return (
    <RecommendationExtension>
      {
        !showRecs && (
           <PlusButton
              key={`${id}_plusbutton`}
              onClick={async () => {
                setArticleKey(id);
                await getRWs({ id, rfk_id: ['rfkid_31', 'rfkid_32', 'rfkid_33'] });
                setArticleKey('');
                setShowRecs(!showRecs);
              }}
            >
              +
            </PlusButton>
        )
      }
      {
        showRecs && (
          <MinusButton onClick={() => setShowRecs(!showRecs)}>
            -
          </MinusButton>
        )
      }
      <div>
        { 
          (showRecs && !rwsLoading && recommendations && recommendations.length > 0 && 
            (recommendations.map((p, index) => (<RecommendationList containerId={id} key={`${p.rfk_id}_${index}`} {...p} > </RecommendationList>))))
        }
      </div>
    </RecommendationExtension>
  );
};

export default ArticlesList;
