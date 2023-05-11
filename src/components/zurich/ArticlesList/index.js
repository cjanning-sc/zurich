import { FaRegCalendar } from "react-icons/fa";
import parse from "html-react-parser";
import React, { useContext, useState } from "react";
import { Presence } from "@sitecore-discover/ui";
import RelatedQuestionsAccordion from "../../RelatedQuestions/RelatedQuestionsAccordion";
import './styles.css';

import { RecommendationCtx } from "../../../hooks/RecommendationProvider";
import RecommendationList from "../../RecommendationList";

import {
	ArticleContentWrapper,
	ArticleIconContentWrapper,
	ArticleItemWrapper,
	ArticleLocationWrapper,
	ArticleTitleWrapper,
	ArtileListWrapper,
	RecommendationExtension,
	LoaderAnimation,
	MinusButton,
	PlusButton
} from './styled';

const relatedQuestionsIndex = 3;

const ArticleDate = ({ children }) => {
	return (
		<ArticleIconContentWrapper>
			<FaRegCalendar color="#b2b2b2" size="25px" />
			<span>{children}</span>
		</ArticleIconContentWrapper>
	)
};

const convertTitleToString = (value) => value.join(" ");

const shortenDescription = (value) => {
	let desc = value;
	if (value.length > 300) {
		desc = value.substring(0, 300) + '...';
	}
	return desc;
}

const ArticleItem = ({ key, includeSku, className, onClick, ...product }, index) => {
	const {
		id,
		url,
		job_id,
		last_modified,
		name,
		cat1,
		type,
		image_url,
		highlight,
		description
	} = product;

	return (
		<ArticleItemWrapper>
			<ArticleContentWrapper>
				<table cellSpacing='' width='100%'>
					<tbody>
						<tr>
							{image_url &&
								<td rowSpan={2}>
									<div className="LeftCol">
										<img src={image_url} alt={job_id} />
									</div>
								</td>
							}
							<td style={{paddingLeft:'10px'}}>
								<div className="fieldTitle">
									<a
										href={url}
										alt={name}
										onClick={() => onClick(product)}
										target="_blank"
										rel="noreferrer"
									>
										{' '}
										{highlight && highlight.name
											? parse(convertTitleToString(highlight.name))
											: name}{''}
									</a>
								</div>
							</td>
						</tr>
						{description &&
							<tr>
								<td style={{paddingLeft:'10px'}}>
									{' '}
										{highlight && highlight.description
											? shortenDescription(parse(convertTitleToString(highlight.description)))
											: shortenDescription(description)}{''}
								</td>
							</tr>
						}
					</tbody>
				</table>
				{type && <div style={{ width: '50%', float: 'left', marginTop: '20px' }}><b>Type:&nbsp;</b>{type}</div>}
				{cat1 && <div style={{ width: '50%', textAlign: 'right', float: 'right', marginTop: '20px' }}><b>Subcategory:&nbsp;</b>{cat1}</div>}
			</ArticleContentWrapper>
			{/* <RecommendationContainer id={id} /> */}
		</ArticleItemWrapper>
	);
};

function isOddEven(n) {
	if ((n ^ 1) === (n + 1)) {
		return true;
	} else {
		return false;
	}
}

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
					//	if (relatedQuestionsIndex <= products.length && index === relatedQuestionsIndex) {
					//		return <RelatedQuestionsAccordion key={`${product.id}_${index}`}></RelatedQuestionsAccordion>;
					//	}
					return (
						<div key={`${product.id}_${index}`} className={isOddEven(index) ? 'even' : 'odd'}>
							<ArticleItem {...product} onClick={(product) => onProductClick(product, index, products, currentPage)} rowNun={index} />
						</div>
					)
				})}
			{/* {ready && relatedQuestionsIndex > products.length && (
				<RelatedQuestionsAccordion ></RelatedQuestionsAccordion>
			)} */}
		</ArtileListWrapper>
	);
};

const RecommendationContainer = ({ id }) => {
	const [showRecs, setShowRecs] = useState(false);
	// Article's RWs
	const recommendationCtx = useContext(RecommendationCtx);
	const { articleKey, rwsLoading, recommendations, getRWs, setArticleKey } = recommendationCtx;
	//console.log(recommendationCtx);

	if (rwsLoading && articleKey === id) {
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
