import axios from "axios";
import merge from 'lodash.merge';
import { getConfigProperty } from '../utils/siteUtils';

export const getArticle = (domainId, rfkid, id) => {

    let content = {}, entity;

    return axios({
        url: `https://discover.sitecorecloud.io/discover/v2/${domainId}`,
        method: 'post',
        data: merge(
            {},
            {
                context: {
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
                                ...(entity !== '' && { entity: 'content' }),
                                rfk_id: rfkid,
                                search: {
                                    ...(content !== '' && {
                                        content: content,
                                    }),
                                    filter: {
                                        type: "eq",
                                        name: "job_id",
                                        value: id
                                    },
                                },
                            }
                        ],
                    },
                }),
            }
        ),
    });
};

export default getArticle;
