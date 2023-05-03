import React from "react";
import { ThemeProvider } from "styled-components";
import Header from "../../components/Header";
import Search from "../../components/Search";
import { HomeRecommendationProvider } from "../../hooks/RecommendationHomeProvider";
import { RecommendationProvider } from "../../hooks/RecommendationProvider";
import { SearchProvider } from "../../hooks/SearchProvider";
import { getConfigProperty } from "../../utils/siteUtils";

const theme = {};

const config = {
	domainId: '76547973',
	rfkid: 'rfkid_7',
	domainResultPerPageDefault: 10,
	domainSourceDefault: { value: '824079', label: 'Sitecore' },
	domainHighlightDefault: {
		fields: ['category', 'name'],
		fragment_size: 100,
		pre_tag: '<b>',
		post_tag: '</b>',
	},
	domainSortDefault: 'Recommended',
	domainFacetTypesList: ['type'],
	domainFacetTypesInfo: {
		type: {
			text: 'Type',
		},
	},
	domainRelevance: [
		{ name: 'name', analyzer: 'sitecore_standard', weight: 5 },
		{ name: 'category', analyzer: 'sitecore_standard', weight: 1 },
		{ name: 'city', analyzer: 'sitecore_standard', weight: 2 },
	],
	domainSuggestion: [{ name: 'name_context_aware' }],
	personalization: {
		fields: ['category', 'city'],
	},
	domainEntity: 'content'
};

function SitecoreSearchPage() {
	return (
		<>
			<ThemeProvider theme={theme}>
				<SearchProvider domainConfig={config}>
					<Header />
					{/* <HomeRecommendationProvider>
						<RecommendationProvider> 
							<Search keyphrase='test' />
					 </RecommendationProvider>
					</HomeRecommendationProvider> */}
				</SearchProvider>
			</ThemeProvider>
		</>
	);
}

export default SitecoreSearchPage;
