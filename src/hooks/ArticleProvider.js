import { createContext, useContext, useState } from "react";
import getSearch from "../api/search";
import {
    getConfigProperty,
    getLocaleData
} from "../utils/siteUtils";
import { SearchCtx } from "./SearchProvider";

export const ArticleCtx = createContext({});

export const ArticleProvider = ({ children }) => {
  const [similarItems, setSimilarItems] = useState([]);
  const [similarLoading, setSimilarLoading] = useState(false);
  const searchCtx = useContext(SearchCtx);
  const { locale, sources, sort, domainConfig, getWidgetData } = searchCtx;
  const { domainId, rfkid } = domainConfig;

  const getArticles = async ( id ) => {
    console.debug('Search ::: Get Articles Data');
    setSimilarLoading(true);
      const params = {
      page: 1,
      entity: 'content',
      content: {
        fields: [
          'id',
          'name',
          'image_url',
          'description',
          'subtitle',
          'type',
          'url',
        ],
      },
      personalization: {
        fields: ['name', 'type'],
        ids: [id],
      },
      resultPerPage: 5,
      sort,
      ...(locale && {
        locale: getLocaleData(locale.value),
      }),
      ...(sources && {
        sources: sources ? sources.map(({ value }) => value) : [],
      }),
	  };

    const similarArticlesResponse = await getSearch(
      getConfigProperty("env"),
      domainId,
      rfkid,
      params
    );

    const {
      content = [],
    } = getWidgetData(similarArticlesResponse.data.widgets, rfkid);

    setSimilarItems(content);
    setSimilarLoading(false);
  };

  const articleContext = {
    domainConfig,
    similarLoading,
    similarItems,
    getArticles,
  };

  return (
    <ArticleCtx.Provider value={articleContext}>{children}</ArticleCtx.Provider>
  );
};
