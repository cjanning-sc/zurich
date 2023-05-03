import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getConfigProperty, getDomainKey } from '../../utils/siteUtils';
import getArticle from '../../api/article';
import { ThemeProvider } from 'styled-components';
import Header from '../../components/Header';
import './styles.css';

const rfkid = 'rfkid_7';
const getWidgetData = (data, rfkId) => data.find((item) => item['rfk_id'] === rfkId);

const theme = {
    headerColor: 'black',
    backgroundColor: 'white',
    filterColor: 'black',
    filterFontSize: '16px',
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

const Article = () => {
    const { id } = useParams();
    const [content, setContent] = useState([]);

    useEffect(() => {
        async function setArticle() {
            let response = await getArticle('76547973', rfkid, id);
            let widgetData = await getWidgetData(response.data.widgets, rfkid);
            setContent(widgetData.content[0]);
        }
        setArticle();
    }, [id]);

    return (
        <>
            <ThemeProvider theme={theme}>
                <Header />
                <div id="primary">
                    <div id="main">
                        <h2 className="article">{content.name}</h2>
                        <div className="row">
                            <div className="col-md-8 jobContent">
                                <div>
                                    <div style={{ float: 'right' }}><button>Apply Now</button></div>
                                    <h3>Job ID: {content.job_id}</h3>
                                </div>
                                <ul className="jobDetails">
                                    <li><strong>Category:&nbsp;</strong>&nbsp;{content.category}</li>
                                    <li><strong>Location:&nbsp;</strong>&nbsp;{content.city}, {content.state}, {content.country}</li>
                                    <li><strong>Citizenship Required:&nbsp;</strong>&nbsp;{content.citizenship}</li>
                                    <li><strong>Clearance Type:&nbsp;</strong>&nbsp;{content.clearance}</li>
                                    <li><strong>Telecommute:&nbsp;</strong>&nbsp;{content.telecommute}</li>
                                    <li><strong>Shift:&nbsp;</strong>&nbsp;{content.job_shift}</li>
                                    <li><strong>Travel Required:&nbsp;</strong>&nbsp;{content.travel_required}</li>
                                    <li><strong>Relocation Assistance:&nbsp;</strong>&nbsp;{content.relocation}</li>
                                    <li><strong>Positions Available:&nbsp;</strong>&nbsp;{content.positions}</li>
                                </ul>
                                <br></br>
                                <div className="description">
                                    <div dangerouslySetInnerHTML={{ __html: content.description }} />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div id="sidebar-buttons">
                                test
                            </div>
                        </div>
                    </div>
                </div>
            </ThemeProvider>
        </>
    );
}

export default Article;