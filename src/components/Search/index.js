import React, { useContext, useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import Select from "react-select";
import { entityAppear, facetClick, pageClick, widgetClick } from "../../api/events";
import { HomeRecommendationProvider, HomeRecommendationCtx } from "../../hooks/RecommendationHomeProvider";
import { RecommendationCtx } from "../../hooks/RecommendationProvider";
import RecommendationList from '../RecommendationList';
import { SearchCtx } from "../../hooks/SearchProvider";
import Answer from "../Answer";
import ArticlesList from "../ArticlesList";
import FiltersContainer from "../FiltersContainer";
import Loader from "../Loader";
import logo from "../Loader/images/sitecore.png";
import QuerySummary from "../QuerySummary";
import EmptyResultsImg from "../Search/images/emptyResult";
import SearchInput from "../SearchInput";
import Suggestion from "../Suggestion";
import TypeFilter from "../TypeFilter";

import {
	EmptyResults,
	RfkFullPageSearch,
	RfkLi,
	RfkSp,
	SortOptions,
	StyledPaginateContainer,
	SuggestionsSortContainer
} from "./styled";
import { RecommendationContainer } from "../Recommendation/styled";

const ITEMS_PER_PAGE = 10;

const Sort = ({ sortTypes, onSortChange, currentSort }) => {
	return (
		<SortOptions>
			<label>Sort by:</label>
			<Select
				value={currentSort}
				isSearchable={false}
				className="sortSelect"
				onChange={onSortChange}
				options={sortTypes}
			/>
		</SortOptions>
	);
};

const Search = (props) => {
	const [type, setType] = useState("All");
	const searchCtx = useContext(SearchCtx);
	const {
		answerResponse,
		suggestions,
		currentPage,
		setCurrentPage,
		products,
		sort,
		setSort,
		locale,
		setLocale,
		loading,
		keyphrase,
		results,
		setKeyphrase,
		setPreviousKeyphrase,
		totalProducts,
		types,
		resultPerPage,
		filterFacetBy,
		getRequest,
		getWidgetData,
		domainConfig,
		sources,
		setSources,
		emptyResults,
		dt,
		setRfkFlags,
		// TODO: Set sortChoices when API data is solid
		// sortChoices,
	} = searchCtx;
	// Home RWs
	const homeRecommendationCtx = useContext(HomeRecommendationCtx);
	const { getHomeRWs, setHomeRwsLoading, setHomeRecommendations, homeRecommendations, setHomeRfkIds, rwsHomeLoading } = homeRecommendationCtx;
	// Articles RWs
	const recommendationCtx = useContext(RecommendationCtx);
	const { getRWs, rwsLoading } = recommendationCtx;

	// RWs updates
	const updateHomeRWs = (value) => getHomeRWs(value);
	const updateRWs = (value) => getRWs(value);
	const updateLoading = (value) => setHomeRwsLoading(value);
	const setHomeRWs = (value) => setHomeRecommendations(value);

	// @ts-ignore
	useEffect(() => {
		let mounted = true;
		if (mounted) {
			setHomeRfkIds(['rfkid_1', 'rfkid_2', 'rfkid_3']);
		}
		return () => (mounted = false);
	}, [setHomeRfkIds, rwsHomeLoading, rwsLoading]);

	return (
		<RfkFullPageSearch>
			<RfkSp className='rfk_sp rfk-sp'>
				<RfkLi data-page='{page}'>
					<FiltersContainer
						onLocaleChange={setLocale}
						currentLocale={locale}
						multiSourceValue={sources}
						onSourceChange={setSources}
						onRfkFlagsChange={setRfkFlags}
					></FiltersContainer>
					<SearchInput
						loading={loading}
						keyphrase={keyphrase}
						changeKeyphrase={setKeyphrase}
						changePreviousKeyphrase={setPreviousKeyphrase}
					/>
					{suggestions.length > 0 && (
						<Suggestion
							suggestions={suggestions}
							suggestionClick={setKeyphrase}
						/>
					)}
					{
						// @ts-ignore
						!!answerResponse && <Answer answer={answerResponse.answer}></Answer>
					}
					<SuggestionsSortContainer>
						<TypeFilter
							types={types}
							currentType={type}
							setType={(text, type, index) => {
								setType(type ? type : text);
								filterFacetBy(true, 'type', type, true);
								console.debug('Search ::: facetClick fired');
								facetClick({
									value: {
										rfk_id: domainConfig.rfkid,
										request: getRequest(),
										filters: [
											{
												value: [type ? type : ''],
												display_name: [text],
												facet_position: index >= 0 ? index + 1 : 0,
											},
										],
									},
								});
								setCurrentPage(0);
							}}
						/>
						<Sort
							sortTypes={[
								{ value: {}, label: 'Recommended' },
								{
									value: {
										name: 'created',
										order: 'asc',
									},
									label: 'Created ascending',
								},
								{
									value: {
										name: 'created',
										order: 'desc',
									},
									label: 'Created descending',
								},
							]}
							onSortChange={setSort}
							currentSort={sort}
						/>
					</SuggestionsSortContainer>
					{!emptyResults && (
						<QuerySummary
							currentPage={currentPage}
							resultsPerPage={resultPerPage}
							totalResults={totalProducts}
							time={dt}
						/>
					)}

					{loading && !emptyResults && <Loader logo={logo} />}
					{!loading && !emptyResults && (
						<StyledPaginateContainer>
							<ArticlesList
								currentPage={currentPage}
								products={products}
								loaded={!loading}
								loading={loading}
								onProductClick={(
									{ id, name, type, source_id, description },
									index,
									products,
									currentPage
								) => {
									console.debug('Search ::: Widget Click Entity fired');
									widgetClick({
										value: {
											rfk_id: domainConfig.rfkid,
											request: getRequest(),
											index: currentPage * products.length + index + 1,
											entities: [
												{
													id,
													entity_type: 'content',
													entity_subtype: 'article',
												},
											],
										},
									});
									console.debug('Search ::: Appear fired');
									entityAppear({
										value: {
											rfk_id: domainConfig.rfkid,
											request: getRequest(),
											entities: [
												{
													id,
													source_id,
													name,
													entity_type: 'content',
													entity_subtype: 'article',
												},
											],
										},
									});

									const homeRws = ['rfkid_1', 'rfkid_2', 'rfkid_3'],
										articleRws = ['rfkid_31', 'rfkid_32', 'rfkid_33'];
									setTimeout(async () => {
										updateLoading(true);
										const response = await updateHomeRWs({ rfk_id: homeRws });
										setHomeRWs(
											homeRws.map((item) => getWidgetData(response, item))
										);
										updateLoading(false);
									}, 700);
									setTimeout(
										() => updateRWs({ id: id, rfk_id: articleRws }),
										500
									);
								}}
							/>
							<ReactPaginate
								breakLabel='...'
								onPageChange={(e) => {
									setCurrentPage(e.selected);
								}}
								onClick={({ event }) => {
									console.debug('Search ::: pageClick fired');
									pageClick({
										value: {
											rfk_id: domainConfig.rfkid,
											request: getRequest(),
											filters: [
												{
													name: event.target.name,
													display_name: [event.target.innerText],
												},
											],
										},
									});
								}}
								pageRangeDisplayed={3}
								initialPage={currentPage}
								pageCount={Math.ceil(totalProducts / ITEMS_PER_PAGE)}
								previousLabel={'← Previous'}
								nextLabel={'Next →'}
								containerClassName={'pagination'}
								previousLinkClassName={'pagination__link'}
								nextLinkClassName={'pagination__link'}
								disabledClassName={'pagination__link--disabled'}
								activeClassName={'pagination__link--active'}
							/>
							<HomeRecommendationProvider>
								<RecommendationsFooter
									homeRecommendations={homeRecommendations}
								/>
								<br />
								<br />
								<br />
							</HomeRecommendationProvider>
						</StyledPaginateContainer>
					)}
					{emptyResults && (
						<EmptyResults>
							No results
							<EmptyResultsImg />
						</EmptyResults>
					)}
				</RfkLi>
			</RfkSp>
		</RfkFullPageSearch>
	);
};

const RecommendationsFooter = ({ homeRecommendations }) => {
	if (!homeRecommendations || (homeRecommendations && homeRecommendations.length === 0)) return <></>;
	return (<RecommendationContainer id='recs_container'> {homeRecommendations.map((p, index) => (<RecommendationList key={`${p.rfk_id}_${index}`} {...p} > </RecommendationList>))}</RecommendationContainer>);
}

export default Search;
