import axios from "axios";
import merge from 'lodash.merge';
import { getConfigProperty, getLocaleData } from '../utils/siteUtils';

const RESULTS_PER_PAGE = 10;
export const SORT_TYPE_COUNT = "count";
export const SORT_TYPE_TEXT = "text";
export const SORT_ASC = "asc";
export const SORT_DESC = "desc";

/**
 * For Reference, see API documentation https://content-search-api-doc.rfksrv.com/discover-api/dev/redoc/index.html
 * @param {*} domainId
 * @param {String} rfkid
 * @param {Object} [params={}] Aditional params
 * @param {String} [params.facetSortType] - the type of sorting to apply to all the facets. Posible values: "text" or "count". "text" will sort values alphabetically and "count" will sort values based on their amount of occourences
 * @param {String} [params.facetSortOrder] - the sort order to use to all the facets, can be one of "asc" or "desc"
 * @param {Array}  [params.facetTypesList] - Defines the types of facets to compute. 
 *                                           Example: ["type", "focus_area", "publisher", "tags"]
 * @param {Object} [params.facetTypesSelected] - Defines the option selected for each type. 
 *                                               Example: {"focus_area": ["Health"]}
 * @param {Object} [params.facetTypesSort] -  Defines the sort order to use for specific type. 
 *                                            Example: {"type": {"sortType": "text" , "sortOrder": "desc"}} 
 * @param {String} [params.keyphrase] - the keyphrase to use to search content in this request
 * @param {Number} [params.page] - Current page to display
 * @param {Object} [params.sort] - sorting options to be applied. If present, this will override widget sorting settings. (TODO: Review when implement sorting)
 * @param {Object} [params.suggestion] - TODO: See how to send this
 * @param {Number} [params.resultPerPage]
 * @param {Array}  [params.relevance] - represents the textual relevance settings to apply for the request. If present, this will override widget ranking settings. 
 *                                      Example: [
												{
													"name": "title",
													"analyzer": "sitecore_standard",
													"weight": 5
												},
												{
													"name": "content",
													"analyzer": "sitecore_standard",
													"weight": 1
												}
											]
 * @returns 
 */
export const getSearch = (env, domainId, rfkid, params = {}) => {
	let {
		facetSortType = SORT_TYPE_COUNT,
		facetSortOrder = SORT_DESC,
		facetTypesList = [],
		facetTypesSelected = {},
		facetTypesSort = {},
		content = {},
		keyphrase,
		page = 0,
		highlight = {},
		locale,
		sources,
		sort,
		suggestion = [],
		resultPerPage = RESULTS_PER_PAGE,
		relevance = [],
		query = "",
		entity,
		rfkFlags,
		personalization,
		related_questions
	} = params;

	let types = [];
	const localeData = locale && getLocaleData(locale.value);
	const selectedSort = sort && Object.keys(sort.value).length > 0 && sort.value;
	//Generate types param to send to the api
	facetTypesList.forEach((facetType) => {
		const facetTypeSort = facetTypesSort[facetType];

		types.push({
			name: facetType,
			...(facetTypesSelected[facetType] &&
				facetTypesSelected[facetType].length && {
				filter: {
					type: "or", // Can be updated to select "and", "or" values
					values: facetTypesSelected[facetType],
				},
			}),
			...(facetTypeSort && {
				sort: {
					name: facetTypeSort.sortType,
					order: facetTypeSort.sortOrder,
				},
			}),
		});
	});

	return axios({
		//url: `https://api-${env}.rfksrv.com/${domainId}/v2/discover/search-rec`,
		//url: `https://api.rfksrv.com/${domainId}/v2/discover/search-rec`,
		url: `https://discover.sitecorecloud.io/discover/v2/${domainId}`,
		method: 'post',
		data: merge(
			{},
			{
				context: {
					locale: localeData,
					...(getConfigProperty('userId') && {
						user: {
							uuid: getConfigProperty('userId'),
						},
					}),
				},
				...(rfkid &&
					rfkid !== '' && {
					widget: {
						items: [
							{
								...(entity !== '' && { entity: entity }),
								...(rfkFlags &&
									rfkFlags.length > 0 && {
									rfk_flags: rfkFlags,
								}),
								rfk_id: rfkid,
								search: {
									...(content !== '' && {
										content: content,
									}),
									...(personalization && {
										personalization,
									}),
									...(related_questions && {
										related_questions,
									}),
									facet: {
										sort: {
											name: facetSortType,
											order: facetSortOrder,
										},
										...(types.length && { types: types }),
									},
									//filter: {
									//	type: "eq",
									//	name: "job_id",
									//	value: "J2254564"
									//},
									limit: resultPerPage,
									...(keyphrase &&
										keyphrase !== '' && {
										related_questions: {
											highlight: {
												pre_tag: '<b>',
												post_tag: '</b>',
											},
										},
									}),
									offset: page * resultPerPage,
									...(!keyphrase &&
										query !== '' && {
										query: query,
									}),
									...(keyphrase &&
										keyphrase !== '' && {
										query: {
											keyphrase: keyphrase,
											operator: 'and',
											...(highlight &&
												Object.keys(highlight).length !== 0 && {
												highlight: highlight,
											}),
											...(relevance.length && { relevance: relevance }),
										},
									}),
									...(suggestion.length && {
										suggestion: suggestion,
									}),
									sort: {
										choices: true,
										...(selectedSort &&
											Object.keys(selectedSort).length !== 0 && {
											value: [selectedSort],
										}),
									},
								},
								//...(sources &&
								//	sources.length > 0 && {
								//		sources: sources,
								//	}),
							},
						],
					},
				}),
			}
		),
	});
};

export default getSearch;
