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

const getPayRange = (min, max) => {
	if (min && max) {
		if (min < 1000 || max < 1000) {
			return '';
		} else {
			return '$' + min.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') + ' - $' + max.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
		}
	}
};

const ArticleItem = ({ key, includeSku, className, onClick, ...product }, index) => {
	const {
		id,
		job_id,
		creation_date,
		name,
		category,
		job_url,
		city,
		state,
		country,
		highlight,
		pay_minimum,
		pay_maximum,
		business_sector
	} = product;

	return (
		<ArticleItemWrapper>
			<ArticleContentWrapper>
				<ArticleTitleWrapper style={{ width: '100%' }}>
					<div style={{ float: 'right' }}>
						<div className="LearnMore">
							<a href={job_id} onClick={() => onClick(product)} className={'applyButton'} target={'_blank'} rel='noreferrer'>Learn More</a>
						</div>
					</div>
					<div>
						<a
							href={job_id}
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
				</ArticleTitleWrapper>
				<table cellSpacing='0' cellPadding={3} width='100%'>
					<tbody>
						<tr>
							<td>{creation_date && <ArticleDate style={{ textAlign: 'right', width: '100%' }}>{new Date(creation_date).toLocaleDateString('en-US')}</ArticleDate>}</td>
							<td rowSpan={2}></td>
						</tr>
						<tr>
							<td>{category &&
								<ArticleLocationWrapper style={{ fontWeight: 'bold' }}>
									{highlight && highlight.category
										? parse(convertTitleToString(highlight.category))
										: category}{''}
								</ArticleLocationWrapper>}
							</td>
						</tr>
						<tr>
							<td>{business_sector && (<ArticleLocationWrapper>{highlight && highlight.business_sector
								? parse(convertTitleToString(highlight.business_sector))
								: business_sector}{''}</ArticleLocationWrapper>)}</td>
							<td style={{ textAlign: 'right', color: '#6f6f6f' }}>{highlight && highlight.city
								? parse(convertTitleToString(highlight.city))
								: city}{''}, {highlight && highlight.state
									? parse(convertTitleToString(highlight.state))
									: state}{' '}</td>
						</tr>
					</tbody>
				</table>
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
