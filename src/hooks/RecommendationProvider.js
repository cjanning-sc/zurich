import { createContext, useContext, useEffect, useState } from "react";
import getRecommendation from "../api/recommendation";
import {
    getConfigProperty,
} from "../utils/siteUtils";
import { SearchCtx } from "./SearchProvider";

export const RecommendationCtx = createContext({});

const SITECORE_SOURCE = '388218';

export const RecommendationProvider = ({ children }) => {
  const [rfkIds, setRfkIds] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [rwsLoading, setRwsLoading] = useState(false);
  const [articleKey, setArticleKey] = useState('');
  const searchCtx = useContext(SearchCtx);
  const { locale, getWidgetData, domainConfig } = searchCtx;
  const { domainId } = domainConfig;

  // @ts-ignore
  useEffect(() => {
    let mounted = true;
    if (mounted) setRwsLoading(true);

    const getRWsSearch = async ({ id = '', rfk_id }) => {
      console.debug('Search ::: Get RWs Data');
      
      const params = {
				entity: 'content',
				rfkId: rfk_id,
				locale,
				recommendations: {
					content: {
						fields: [
							'id',
							'name',
							'image_url',
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
      if(mounted) setRecommendations(widgetData);
    };

    if (mounted && rfkIds.length > 0) { 
      getRWsSearch({ rfk_id: Array.isArray(rfkIds) ? rfkIds : [rfkIds] });
    }

     if (mounted) setRwsLoading(false)

    return () => ( mounted = false )
  }, [rfkIds, domainId, getWidgetData, locale]);

  const getRWs = async ({ id, rfk_id }) => {
    console.debug('Search ::: Get RWs Data');
    setRwsLoading(true);
    
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

    setRecommendations(rfk_id.map((item) => getWidgetData(response.data.widgets, item)));
    setRwsLoading(false);
  };

  const recommendationContext = {
    rwsLoading,
    articleKey,
    recommendations,
    getRWs,
    setRfkIds,
    setArticleKey,
    setRwsLoading
  };

  return (
    <RecommendationCtx.Provider value={recommendationContext}>{children}</RecommendationCtx.Provider>
  );
};
