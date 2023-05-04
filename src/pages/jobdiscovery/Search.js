import { useContext } from "react";
import { ThemeProvider } from 'styled-components';
import { entityAppear, widgetClick } from '../../api/events';
import Facet from "../../components/Facet";
import Header from '../../components/Header';
import Loader from '../../components/Loader';
import logo from '../../components/Loader/images/sitecore.png';
import ArticlesList from '../../components/jobdiscovery/ArticlesList';
import BreadcrumFacet from '../../components/jobdiscovery/BreadcrumFacet';
import NoResult from '../../components/jobdiscovery/NoResult';
import Sort from '../../components/jobdiscovery/Sort';
import Pagination from '../../components/Pagination';
import QuerySummary from '../../components/QuerySummary';
import ResultPerPage from '../../components/ResultPerPage';
import SearchInput from '../../components/SearchInput';
import { SearchCtx, SearchProvider } from '../../hooks/SearchProvider';
import { Content, FacetsBar, PaginationContainer, SearchContainer, SearchInputBar, SearchResultHeader } from './styled';
import Suggestion from "../../components/Suggestion";

import { HomeRecommendationProvider } from "../../hooks/RecommendationHomeProvider";
import { RecommendationProvider } from "../../hooks/RecommendationProvider";

const theme = {
    headerColor: 'black',
    backgroundColor: 'white',
    filterColor: 'black',
    filterFontSize: '18px',
    filterFontColor: '#fff',
    filterActionColor: '#c0b561',
    primaryFontColor: '#67768b',
    secondaryFontColor: '#313a45',
    searchLabelHover: '#e70033',
    menuFontColor: '#555',
    menuFontColorHover: '#d02b27',
    pagination_anchorBorderColor: '#bcc3ca',
    pagination_anchorColor: '#018383',
    pagination_activeLinkBackgroundColor: '#1d4f76',
    pagination_activeLinkColor: '#cddee9',
    pagination_borderRadius: '0',
    pagination_disabledLinkBorderColor: 'rgb(198, 197, 202)',
    pagination_disabledLinkColor: 'rgb(198, 197, 202)',
};

const config = {
    domainId: '76547973',
    rfkid: 'rfkid_7',
    domainResultPerPageDefault: 10,
    domainSourceDefault: { value: '824079', label: 'Jobs' },
    domainHighlightDefault: {
        fields: ['name', 'category', 'city', 'business_sector', 'state'],
        fragment_size: 100,
        pre_tag: '<b style="background-color:yellow">',
        post_tag: '</b>',
    },
    domainSortDefault: 'Recommended',
    domainFacetTypesList: ['category', 'business_sector', 'city', 'state', 'level', 'clearance', 'relocation', 'telecommute', 'job_shift', 'creation_month'],
    domainFacetTypesInfo: {
        category: {
            text: 'Category',
        },
        city: {
            text: 'City',
        },
        state: {
            text: 'State',
        },
        country: {
            text: 'Country',
        },
        level: {
            text: 'Level',
        },
        clearance: {
            text: 'Clearance',
        },
        creation_month: {
            text: 'Created Month',
        },
        business_sector: {
            text: 'Business Sector',
        },
        relocation: {
            text: 'Relocation Eligible',
        },
        telecommute: {
            text: 'Telecommute',
        },
        job_shift: {
            text: 'Shift',
        }
    },
    domainRelevance: [
        { name: 'name', analyzer: 'sitecore_standard', weight: 5 },
        { name: 'category', analyzer: 'sitecore_standard', weight: 2 },
        { name: 'city', analyzer: 'sitecore_standard', weight: 3 },
        { name: 'state', analyzer: 'sitecore_standard', weight: 1 },
        { name: 'business_sector', analyzer: 'sitecore_standard', weight: 1 },
    ],
    domainSuggestion: [{ name: 'name_suggester' }],
    resultPerPageList: [10, 25, 50, 100],
    personalization: {
        fields: ['category', 'city', 'state', 'business_sector'],
    },
    domainEntity: 'content',
};

function JobDiscoverySearchPage() {
    return (
        <>
            <ThemeProvider theme={theme}>
                <SearchProvider domainConfig={config}>
                    <Header />
                    <SearchPage />
                    <HomeRecommendationProvider>
                        <RecommendationProvider />
                    </HomeRecommendationProvider>
                </SearchProvider>
            </ThemeProvider>
        </>
    );
}

const SearchPage = () => {
    const searchCtx = useContext(SearchCtx);
    const { suggestions, loading, currentPage, resultPerPage, time, products, keyphrase, getRequest, setKeyphrase, setPreviousKeyphrase, totalProducts, types, domainConfig } = searchCtx;
    return (
        <div>
            <SearchContainer>
                <SearchInputBar>
                    <SearchInput loading={loading} keyphrase={keyphrase} changeKeyphrase={setKeyphrase} changePreviousKeyphrase={setPreviousKeyphrase} />
                    {loading && <Loader logo={logo} />}
                </SearchInputBar>
                {!loading && !totalProducts && (<NoResult keyphrase={keyphrase} />)}
                {suggestions.length > 0 && (
                    <Suggestion
                        suggestions={suggestions}
                        suggestionClick={setKeyphrase}
                    />
                )}
                {!loading && totalProducts > 0 && (
                    <FacetsBar>
                        <div style={{ marginBottom: '10px', color: '#313a45', fontSize: '16px' }}>Job Filters:</div>
                        <div>
                            {types &&
                                <Facet displayCount={true} />
                            }
                        </div>
                    </FacetsBar>
                )}
                {!loading && totalProducts > 0 && (
                    <Content>
                        <BreadcrumFacet />
                        <SearchResultHeader>
                            <QuerySummary
                                currentPage={currentPage}
                                resultsPerPage={resultPerPage}
                                totalResults={totalProducts}
                                time={time}
                                displayTime={false}
                            />
                            <Sort />
                        </SearchResultHeader>
                        <div>
                            <ArticlesList
                                currentPage={currentPage}
                                products={products}
                                loaded={!loading}
                                loading={loading}
                                onProductClick={(
                                    { id, source_id, url, title, type, description, name, category, city, state },
                                    index,
                                    products,
                                    currentPage
                                ) => {
                                    console.debug('Search ::: Widget Click Entity fired');
                                    entityAppear({
                                        value: {
                                            rfk_id: domainConfig.rfkid,
                                            request: getRequest(),
                                            index: currentPage * products.length + index + 1,
                                            entities: [
                                                {
                                                    id,
                                                    source_id,
                                                    name,
                                                    category,
                                                    city,
                                                    state,
                                                    entity_type: type !== 'products' ? 'content' : 'product',
                                                    entity_subtype: 'article',
                                                },
                                            ],
                                        },

                                    });
                                }}
                            />
                        </div>
                        {
                            <PaginationContainer>
                                <Pagination
                                    breakLabel="..."
                                    pageRangeDisplayed="5"
                                    renderOnZeroPageCount={null}
                                    previousLabel="<"
                                    nextLabel=">"
                                />
                                <ResultPerPage
                                    textLeft="Per page:"
                                    resultPerPageList={config.resultPerPageList}
                                />
                            </PaginationContainer>
                        }
                    </Content>)}
            </SearchContainer>
        </div>
    );
};

export default JobDiscoverySearchPage;
