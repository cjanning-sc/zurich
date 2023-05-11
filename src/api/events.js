import axios from "axios";
import { getConfigProperty } from '../utils/siteUtils';

const HEADERS = {
    'Authorization': '01-76e15934-9b6eb1e5bc814f3f35bb8f6819d52ea8aef5ee46',
    'Content-Type': 'application/json'
},
    CONTEXT = {
        browser: {
            user_agent: window.navigator.userAgent
        },
        //page: {
        //    uri: window.location.href
        //}
    };

const getCommonParams = () => {
    return {
        uuid: getConfigProperty('userId'),
        event_ts: Date.now(),
        client_time_ms: Date.now(),
    };
};

const getCurrentContext = () => {
    return {
        geo: {
            ip: getConfigProperty('ip'),
        },
        page: {
            uri: window.location.href,
            locale_country: getConfigProperty('locale_country'),
            locale_language: getConfigProperty('locale_language'),
        },
        ...CONTEXT,
    };
};

const postEvent = (data, debug) => {
    const params = {
        ckey: getConfigProperty('customerKey'),
        data,
        debug: getConfigProperty('debug') || debug
    };
    return axios({
        method: 'POST',
        url: getConfigProperty(`eventsApiDomain`),
        headers: HEADERS,
        data: params
    });
}

export const entityAppear = (data, debug) =>
    postEvent(
        {
            name: 'entity_page',
            action: 'view',
            value: {
                rfk_id: data.value.rfk_id,
                context: getCurrentContext(),
                request: data.value.request,
                entities: data.value.entities,
            },
            ...getCommonParams(),
        },
        debug
    );

export const facetClick = (data, debug) => postEvent({
    name: 'widget',
    action: 'click',
    action_cause: 'filter',
    value: {
        rfk_id: data.value.rfk_id,
        context: getCurrentContext(),
        request: data.value.request,
        filters: data.value.filters
    },
    ...getCommonParams(),
}, debug);

export const pageClick = (data, debug) => postEvent({
    name: 'page',
    action: 'click',
    value: {
        rfk_id: data.value.rfk_id,
        contents: [],
        context: getCurrentContext(),
        request: data.value.request,
        filters: data.value.filters
    },
    ...getCommonParams(),
}, debug);

export const widgetClick = (data, debug) =>
    postEvent(
        {
            name: 'widget',
            action: 'click',
            action_cause: 'entity',
            value: {
                rfk_id: data.value.rfk_id,
                context: getCurrentContext(),
                request: data.value.request,
                entities: data.value.entities,
                index: data.value.index,
            },
            ...getCommonParams(),
        },
        debug
    );
