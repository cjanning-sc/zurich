import axios from 'axios';
import merge from 'lodash.merge';
import { getConfigProperty, getLocaleData } from '../utils/siteUtils';

export const getRecommendation = (env, domainId, rfkid, params = {}, config = {}) => {
  let {
    entity, 
    rfkFlags,
    recommendations,
    sources,
    locale,
    contentId, 
  } = params;
  const localeData = locale && getLocaleData(locale.value);

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
					...(contentId &&
						contentId !== '' && {
							ids: {
								content: [contentId],
							},
						}),
				},
				...(rfkid &&
					rfkid.length > 0 && {
						widget: {
							items: rfkid.map((item) => {
								return {
									...(entity !== '' && { entity: entity }),
									...(rfkFlags &&
										rfkFlags.length > 0 && {
											rfk_flags: rfkFlags,
										}),
									rfk_id: item,
									...(recommendations &&
										Object.keys(recommendations).length !== 0 && {
											recommendations,
										}),
									//...(sources &&
									//	sources.length > 0 && {
									//		sources: sources,
									//	}),
								};
							}),
						},
					}),
			}
		),
	});
};

export default getRecommendation;
