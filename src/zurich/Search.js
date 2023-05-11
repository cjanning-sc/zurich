import { useContext } from "react";
import { ThemeProvider } from 'styled-components';
import { entityAppear } from '../api/events'
import Facet from "../components/Facet";
import Header from '../components/Header';
import Loader from '../components/Loader';
import logo from '../components/Loader/images/sitecore.png';
import ArticlesList from '../components/zurich/ArticlesList';
import BreadcrumFacet from '../components/zurich/BreadcrumFacet';
import NoResult from '../components/zurich/NoResult';
import Sort from '../components/zurich/Sort';
import Pagination from '../components/Pagination';
import QuerySummary from '../components/QuerySummary';
import ResultPerPage from '../components/ResultPerPage';
import SearchInput from '../components/SearchInput';
import { SearchCtx, SearchProvider } from '../hooks/SearchProvider';
import { Content, FacetsBar, PaginationContainer, SearchContainer, SearchInputBar, SearchResultHeader, SearchSeparator } from './styled';
import Suggestion from "../components/Suggestion";

import { HomeRecommendationProvider } from "../hooks/RecommendationHomeProvider";
import { RecommendationProvider } from "../hooks/RecommendationProvider";

const theme = {
    headerColor: 'white',
    headerFont: '#2167ae',
    backgroundColor: 'white',
    filterColor: '#2167ae',
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
    domainId: '73137685',
    customerId: '89392734',
    rfkid: 'rfkid_7',
    domainResultPerPageDefault: 10,
    domainSourceDefault: { value: '833913', label: 'Zurich' },
    domainHighlightDefault: {
        fields: ['name', 'description'],
        fragment_size: 100,
        pre_tag: '<b style="background-color:yellow">',
        post_tag: '</b>',
    },
    domainSortDefault: 'Recommended',
    domainFacetTypesList: ['type', 'cat1', 'cat2', 'cat3', 'cat4', 'cat5', 'cat6', 'month', 'status'],
    domainFacetTypesInfo: {
        type: {
            text: 'Type',
        },
        cat1: {
            text: 'Subcategory 1',
        },
        cat2: {
            text: 'Subcategory 2',
        },
        cat3: {
            text: 'Subcategory 3',
        },
        cat4: {
            text: 'Subcategory 4',
        },
        cat5: {
            text: 'Subcategory 5',
        },
        cat6: {
            text: 'Subcategory 6',
        },
        month: {
            text: 'Modified Month',
        },
        status: {
            text: 'Status'
        }
    },
    domainRelevance: [
        { name: 'name', analyzer: 'sitecore_standard', weight: 5 }
    ],
    domainSuggestion: [{ name: 'name_context_aware' }],
    resultPerPageList: [10, 25, 50, 100],
    personalization: {
        fields: ['type', 'cat1', 'name'],
    },
    domainEntity: 'content',
};

function ZurichSearchPage() {
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
                {suggestions.length > 0 && !totalProducts && (
                    <Suggestion
                        suggestions={suggestions}
                        suggestionClick={setKeyphrase}
                    />
                )}
                {!loading && <SearchSeparator></SearchSeparator>}
                {!loading && totalProducts > 0 && (
                    <FacetsBar>
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
                                    { id, source_id, type, name, cat1, cat2 },
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
                                                    cat1,
                                                    cat2, 
                                                    type,
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
            <div style={{width:'100%',borderTop:'1px solid #cecece',height:'75px',backgroundColor:'#f6f6f6'}}></div>
        </div>
    );
};

export default ZurichSearchPage;
