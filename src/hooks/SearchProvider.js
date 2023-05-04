import { createContext, useCallback, useEffect, useState } from "react";
import getSearch from "../api/search";
import {
  getConfigProperty,
  getLocaleData,
  getUID,
  setConfig
} from "../utils/siteUtils";

export const SearchCtx = createContext({});

export const SearchProvider = ({ domainConfig, children }) => {
  const {
		domainId,
		domainFacetTypesList,
		domainRelevance,
		domainResultPerPageDefault,
		domainFacetTypesInfo,
		domainSourceDefault,
		domainLocaleDefault,
		domainSortDefault,
		domainSuggestion,
		domainHighlightDefault,
		rfkid,
		personalization,
    domainEntity,
  } = domainConfig;
  if (getConfigProperty("customerKey") !== `156364153-${domainId}`) {
    setConfig("customerKey", `156364153-${domainId}`);
    if(!getUID().includes(domainId)) {
      setConfig("userId", getUID(1));
    }
  }
  setConfig(
		'eventsApiDomain',
//    `https://events-api.staging.rfksrv.com${getConfigProperty('eventsPath')}${getConfigProperty('customerKey')}`
    `https://discover.sitecorecloud.io/event/${getConfigProperty('customerKey')}/v4/publish`
    //`https://events-api.staging.rfksrv.com/event/v4/publish/${getConfigProperty('customerKey')}`
  );
  const [sort, setSort] = useState({
    value: {},
    label: domainSortDefault,
  });
  const [sources, setSources] = useState(domainSourceDefault);
  const [locale, setLocale] = useState(domainLocaleDefault);
  const [types, setTypes] = useState([]); //TODO: Remove, this was used in sitecore...now facets will be used
  const [facetTypesSelected, setFacetTypesSelected] = useState({});
  const [facetTypesSort, setFacetTypesSort] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [keyphrase, setKeyphrase] = useState("");
  const [previousKeyphrase, setPreviousKeyphrase] = useState("");
  const [totalProducts, setTotalProducts] = useState(0);
  const [results, setResults] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);
  const [suggestions, setSuggestions] = useState([]);
  const [time, setTime] = useState(0);
  const [entity, setEntity] = useState(domainEntity);
  const [resultPerPage, setResultPerPage] = useState(
    domainResultPerPageDefault
  );
  const [emptyResults, setEmptyResults] = useState(false);
  const [highlight, setHighlight] = useState(domainHighlightDefault);
  const [dt, setDt] = useState(0);
  const [answerResponse, setAnswer] = useState({});
  const [relatedQuestions, setRelatedQuestions] = useState([]);
  const [sortChoices, setSortChoices] = useState([]);
  const [domainPersonalization, setPersonalization] = useState(personalization);
  const [rfkFlags, setRfkFlags] = useState([]);

  useEffect(() => {
    setLoading(true);
    const startTime = new Date();
    const env = getConfigProperty("env");
    const getData = async () => {
      const params = {
				rfkFlags: rfkFlags,
				facetTypesList: domainFacetTypesList,
				facetTypesSelected: facetTypesSelected,
				facetTypesSort: facetTypesSort,
				keyphrase: keyphrase,
				page: currentPage,
				sort: sort,
				highlight: highlight,
				personalization: domainPersonalization,
				suggestion: domainSuggestion,
				resultPerPage: resultPerPage,
				relevance: domainRelevance,
				locale: locale,
				...(sources && {
					sources: sources.length > 0 ? sources.map(({ value }) => value) : [],
				}),
				entity,
			};

      let response, widgetData;
      try {
        response = await getSearch(env, domainId, rfkid, params);
        widgetData = getWidgetData(response.data.widgets, rfkid);

        if (widgetData.total_item > 0) {
          setEmptyResults(false);
        } else {
          setEmptyResults(true);
        }
      } catch (err) {
        setLoading(false);
        setEmptyResults(true);
        return;
      }

      const {
        content = [],
        total_item,
        suggestion,
        related_questions = [],
        answer,
        sort: { choices },
      } = widgetData;
      const facet = updateResponseFilterFormat(widgetData.facet) || [];

      let types = [];
      const typesKeys = Object.keys(facet);
      typesKeys.forEach((facetItemName) => {
        types.push({
          name: facetItemName,
          text:
            domainFacetTypesInfo[facetItemName] &&
            domainFacetTypesInfo[facetItemName].text,
          display:
            domainFacetTypesInfo[facetItemName] &&
            domainFacetTypesInfo[facetItemName].display,
          items: facet[facetItemName].value,
        });
      });

      setAnswer(answer);
      setRelatedQuestions(related_questions.length && related_questions);      
      setSuggestions((suggestion && suggestion.name_suggester) || []);
      setProducts(content);
      setTypes(types);
      setResults(content.length);
      setTotalProducts(total_item);
      const endTime = new Date();
      setTime(endTime - startTime);
      setDt(response.data.dt);
      setSortChoices(choices);
      setLoading(false);

      if (
        total_item > 0 &&
        (previousKeyphrase !== keyphrase || (!previousKeyphrase && !keyphrase))
      ) {
        setPreviousKeyphrase(keyphrase);
      }
    };
    getData();
  }, [keyphrase, previousKeyphrase, facetTypesSelected, facetTypesSort, sort, locale, highlight, sources, emptyResults, currentPage, resultPerPage, rfkid, domainFacetTypesInfo, domainFacetTypesList, domainId, domainRelevance, domainSuggestion, rfkFlags, domainPersonalization, entity]);

  const updateResponseFilterFormat = (data) => {
    if (!data) return;
    const mappedNames = data.map((item) => [item.name, item]);
    return Object.fromEntries(mappedNames);
  };

  const getWidgetData = (data, rfkId) => data.find((item) => item['rfk_id'] === rfkId);

  const filterFacetBy = useCallback(
    (isSelected, typeParentName, facetTypeName, cleanSelected) => {
      const facetTypesSelectedCopy = Object.assign(
        {},
        cleanSelected ? {} : facetTypesSelected
      );
      if (!facetTypesSelectedCopy[typeParentName]) {
        facetTypesSelectedCopy[typeParentName] = [];
      }

      if (facetTypeName) {
        if (isSelected) {
          facetTypesSelectedCopy[typeParentName].push(facetTypeName);
        } else {
          //remove element from array
          facetTypesSelectedCopy[typeParentName] = facetTypesSelectedCopy[
            typeParentName
          ].filter(function (ele) {
            return ele !== facetTypeName;
          });

          if (!facetTypesSelectedCopy[typeParentName].length) {
            delete facetTypesSelectedCopy[typeParentName];
          }
        }
      }

      setFacetTypesSelected(facetTypesSelectedCopy);
    },
    [facetTypesSelected]
  );

  const facetSortBy = useCallback(
    (type, sortType, sortOrder) => {
      const facetSortBy = Object.assign({}, facetTypesSort);

      facetSortBy[type] = {
        sortType: sortType,
        sortOrder: sortOrder,
      };
      setFacetTypesSort(facetSortBy);
    },
    [facetTypesSort]
  );

  const clearFacet = useCallback(
    (typeParentName) => {
      const facetTypesSelectedCopy = Object.assign({}, facetTypesSelected);

      if (facetTypesSelectedCopy[typeParentName]) {
        delete facetTypesSelectedCopy[typeParentName];
      }

      setFacetTypesSelected(facetTypesSelectedCopy);
    },
    [facetTypesSelected]
  );

  const getRequest = () => {
    return {
      keyword: keyphrase,
      modified_keyword: previousKeyphrase,
      num_results: results,
      total_results: totalProducts,
      page_size: resultPerPage,
    };
  };

  const seachContext = {
    domainConfig,
    sort,
    setSort,
    locale,
    setLocale,
    sources,
    setSources,
    emptyResults,
    types,
    setTypes,
    facetTypesSelected,
    setFacetTypesSelected,
    facetTypesSort,
    setFacetTypesSort,
    products,
    setProducts,
    previousKeyphrase,
    setPreviousKeyphrase,
    keyphrase,
    setKeyphrase,
    currentPage,
    setCurrentPage,
    time,
    setTime,
    totalProducts,
    setTotalProducts,
    results,
    setResults,
    suggestions,
    setSuggestions,
    loading,
    resultPerPage,
    setResultPerPage,
    filterFacetBy,
    clearFacet,
    facetSortBy,
    getRequest,
    dt,
    answerResponse,
    relatedQuestions,
    rfkFlags,
    setRfkFlags,
    getWidgetData,
    // TODO: Set sortChoices when API data is solid
     sortChoices
  };

  return (
    <SearchCtx.Provider value={seachContext}>{children}</SearchCtx.Provider>
  );
};;
