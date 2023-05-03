import { createContext, useContext, useEffect, useState } from "react";
import getRecommendation from "../api/recommendation";
import {
    getConfigProperty,
} from "../utils/siteUtils";
import { SearchCtx } from "./SearchProvider";

export const HomeRecommendationCtx = createContext({});

const SITECORE_SOURCE = '388218';

export const HomeRecommendationProvider = ({ children }) => {
  const [homeRfkIds, setHomeRfkIds] = useState([]);
  const [homeRecommendations, setHomeRecommendations] = useState([]);
  const [rwsHomeLoading, setHomeRwsLoading] = useState(false);
  const searchCtx = useContext(SearchCtx);
  const { locale, getWidgetData, domainConfig } = searchCtx;
  const { domainId } = domainConfig;

  // @ts-ignore
  useEffect(() => {
    let mounted = true;
    if (mounted) setHomeRwsLoading(true);

    const getHomeRWsSearch = async ({ id = '', rfk_id }) => {
      console.debug('Search ::: Get Home RWs Data');
      const params = {
				entity: 'content',
				rfkId: rfk_id,
				locale,
				recommendations: {
					content: {
						fields: [
							'id',
							'name',
							'url',
							'type',
							'creation_date',
						],
					},
				},
				...(id.length > 0 && {
					contentId: id,
				}),
				sources: [SITECORE_SOURCE],
			};

      const response = await getRecommendation(
        getConfigProperty("env"),
        domainId,
        rfk_id,
        params
      );
      const widgetData = (rfk_id.map((item) => getWidgetData(response.data.widgets, item)));
      if(mounted) setHomeRecommendations(widgetData);
    };

    if (mounted && homeRfkIds.length > 0) { 
      getHomeRWsSearch({ rfk_id: Array.isArray(homeRfkIds) ? homeRfkIds : [homeRfkIds] });
    }

     if (mounted) setHomeRwsLoading(false)

    return () => ( mounted = false )
  }, [homeRfkIds, domainId, getWidgetData, locale]);

  const getHomeRWs = async ({ id, rfk_id }) => {
    console.debug('Search ::: Get Home RWs Data');
    const params = {
			entity: 'content',
			rfkId: rfk_id,
			locale,
			recommendations: {
				content: {
					fields: ['id', 'name', 'image_url', 'url', 'type', 'creation_date'],
				},
			},
			contentId: id,
			sources: [SITECORE_SOURCE],
		};

    const response = await getRecommendation(
      getConfigProperty("env"),
      domainId,
      rfk_id,
      params
    );

    return response.data.widgets; 
  };

  const recommendationContext = {
    rwsHomeLoading,
    homeRecommendations,
    getHomeRWs,
    setHomeRfkIds,
    setHomeRwsLoading,
    setHomeRecommendations
  };

  return (
    <HomeRecommendationCtx.Provider value={recommendationContext}>{children}</HomeRecommendationCtx.Provider>
  );
};
