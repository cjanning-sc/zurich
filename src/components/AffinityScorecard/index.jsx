import { getConfigProperty, getDomainKey } from '../../utils/siteUtils';
import * as React from 'react';
import { useEffect, useState } from "react";
//import { useLocation } from 'react-router-dom';
import discover from '../../images/discover.png';
import sitecore from '../../images/sitecore.png';
import './styles.css';

function AffinityScorecard() {
    const domain = getDomainKey();
    const uuid = getConfigProperty('userId');
    const dispUUID = uuid.split('-')[5];//getConfigProperty('userId').substring(0, 40) + '...';

    const [isOpen, setIsOpen] = useState(false);
    //const location = useLocation();
    const [updateCDP, setUpdateCDP] = useState(false);
    //const [cdpUpdated, setCDPUpdated] = useState(false);
    //const [universalID, setUniversalID] = useState(null);

    const [userProfile, setUserProfile] = useState([]);
    const [affinities, setAffinities] = useState([]);
    const [keywords, setKeywords] = useState([]);
    const [views, setViews] = useState([]);
    //const [categories, setCategories] = useState([]);

    const [err, setErr] = useState(null);
    const [isErr, setIsErr] = useState(false);
    const [errStyle, setErrStyle] = useState('');

    useEffect(() => {
        //getProfile();
        console.log("useEffect()");
        //return () => clearTimeout(getProfile())
    }, []);

    function getProfile() {
        setTimeout(() => {
            try {
                console.log('Loading Affinity Scorecard for ' + uuid);
                const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        domain_hash: domain,
                        id: uuid,
                        id_type: 'uuid',
                        request: {
                            entities: [
                                {
                                    entity_type: 'content',
                                    events: ['views', 'conversions'],
                                    affinity: [],
                                    keyword: [],
                                    category: []
                                }
                            ]
                        }
                    })
                };

                fetch(`https://data-user-profile.prod.rfksrv.com/user-profile/v4/` + domain, requestOptions)
                    .then(response => response.json())
                    .then((data) => {
                        //console.log(data);
                        setUserProfile(data);
                        setAffinities(buildAffinities(data));
                        setKeywords(buildKeywords(data));
                        setViews(buildViews(data));
                        //setCategories(buildCategory(data));
                        //if (setUpdateCDP && universalID != null) {
                        //    buildCDP(data);
                        //}
                    })
            } catch (error) {
                console.log("error", error);
            }
        }, 500);
    }

    function buildAffinities(data) {
        if (data.entities) {
            const affinity = Object.entries(data.entities[0].affinity);
            var affinities = [];
            if (affinity.length > 1) {
                for (var i = 0; i < affinity.length; i++) {
                    var affinityValues = [];
                    var name = affinity[i][0];
                    var values = affinity[i][1];
                    if (values != null) {
                        values = values.sort((a, b) => b.score - a.score);
                        for (var v = 0; v < values.length; v++) {
                            var score = Number(values[v].score).toFixed(3);
                            var val = values[v].value;
                            affinityValues[v] = { val, score };
                        }
                        affinities.push({ name, affinityValues })
                    }
                }
            }
            return affinities;
        }
    }

    function buildKeywords(data) {
        if (data.entities) {
            const keyword = Object.entries(data.entities[0].keyword.sp);
            var keywords = [];
            if (keyword) {
                if (keyword.length > 0) {
                    for (var i = 0; i < keyword.length; i++) {
                        var kwObject = keyword[i][1];
                        var kwArray = Object.entries(kwObject);
                        for (var j = 0; j < kwArray.length; j++) {
                            if (kwArray[j][0] === 'kw') {
                                keywords.push(kwArray[j][1]);
                            }
                        }

                    }
                }
            }
            return keywords.toString();
        }
    }

    function buildViews(data) {
        if (data.entities) {
            const view = Object.entries(data.entities[0].events.views);
            if (view) {
                var values = view.sort((a, b) => b.n - a.n);
                var top = values['0'];
                var topVal = top[1].ut;
                var topViews = top[1].n;
                return topVal + ' (' + topViews + ')';
            }
        }
    }

    /*
    function buildCategory(data) {
        if (data.category.views) {
            const category = Object.entries(data.category.views);
            if (category) {
                var values = category.sort((a, b) => b.n - a.n);
                var top = values['0'];
                var topVal = top[1].cid;
                var topViews = top[1].n;
                return topVal + ' (' + topViews + ')';
            }
        }
    }

    function buildCDP(data) {
        if (data.affinity) {
            const affinities = Object.entries(data.affinity);
            if (affinities.length > 0) {
                console.log('Updaing CDP profile for ' + universalID);
                for (var i = 0; i < affinities.length; i++) {
                    var affinity = affinities[i];
                    if (affinity[1] != null && affinity[1].length > 0) {
                        var name = affinity[0];
                        var values = affinity[1];
                        values = values.sort((a, b) => b.score - a.score);

                        var jsonObj = "";
                        jsonObj += `{`;
                        jsonObj += `"key": "` + name + `",`;
                        for (var v = 0; v < values.length; v++) {
                            var score = Number(values[v].score).toFixed(3);
                            var val = values[v].value;
                            jsonObj += `"` + val + `":` + score;
                            if (v < values.length - 1) {
                                jsonObj += `,`;
                            }
                        }
                        jsonObj += `}`;

                        var myHeaders = new Headers();
                        myHeaders.append("Accept", "application/json");
                        myHeaders.append("Authorization", "Basic cHFzU0lPUEF4aE1DOXpKTEpTWk5GVVJQTnFBTElGd2Q6SkdyMHA2UTZMZ3ltUkxrenU0VEt4NGE3QmE4QW9TejA=");
                        myHeaders.append("Content-Type", "application/json");

                        var requestOptions = {
                            method: 'POST',
                            headers: myHeaders,
                            body: jsonObj,
                            redirect: 'follow'
                        };

                        var url = 'https://api.boxever.com/v2/guests/' + universalID + '/ext' + properCase(name);
                        try {
                            fetch(url, requestOptions);
                            //const data = await response.json();                            
                            setCDPUpdated(true);
                            console.log('CDP updated: ' + name);
                            setIsErr(false);
                        } catch (err) {
                            setCDPUpdated(false);
                            setIsErr(true);
                            setErr(err);
                            console.log(err);
                        }
                    }
                }
                if (setCDPUpdated) {
                    console.log('CDP update complete.');
                }
            }
        }
    }

    function properCase(str) {
        return str.replace(/(^|\s)\S/g, function (t) { return t.toUpperCase() });
    }
    */

    const toggleExtension = (event) => {
        if (!isOpen) {
            //getProfile();
            clearTimeout(getProfile());
        }
        setIsOpen(!isOpen);
    }

    const handleSubmit = (event) => {
        const cdpID = event.target.universalIDInput.value;
        event.preventDefault();
        if (cdpID.length === 0 || cdpID.length < 30) {
            //setUpdateCDP(false);
            setIsErr(true);
            setErrStyle('errorShow');
            setErr('Sitecore Universal ID required');
            throw new Error('Sitecore Universal ID required.');
        } else {
            //setUpdateCDP(true);
            setIsErr(false);
            setErrStyle('errorHide');
            //setUniversalID(cdpID);
            return true;
        }
    };

    const cancelCDP = (event) => {
        setUpdateCDP(false);
        event.target.form[0].value = '';
    }

    if (userProfile) {
        if (!isOpen) {
            return (
                <div id="toggleLogo"><img className='blinkImage' src={discover} onClick={toggleExtension} alt='Discover Logo' /></div>
            );
        } else {
            return (
                <div id="extension">
                    <div id="toggleClose" onClick={toggleExtension}><span>X</span></div>
                    <div id="title"><img src={discover} alt='Discover Logo' /><span>Affinity Scorecard</span></div>
                    <div id="header">Powered by Sitecore Discover</div>
                    <div id="scorecard">
                        <div id="uuid"><b>UUID:&nbsp;</b>{dispUUID == null ? 'n/a' : dispUUID}</div>
                        <div id="message" className={affinities != null && affinities.length > 1 ? "hideMe" : "showMe"}>Browsing behavior not available</div>

                        <div id="affinities" className={affinities != null && affinities.length > 1 ? "showMe" : "hideMe"}>
                            <div id="affinityTable">
                                {affinities != null && affinities.map((affinity, index) => {
                                    return (
                                        <div key={index}>
                                            <div className="name">{affinity.name}</div>
                                            {
                                                affinities != null && affinity.affinityValues.map((value, index) => {
                                                    return (
                                                        <div className="affinityValues" key={index}>
                                                            <div className={value.score >= .5 ? "val high" : "val"}>{value.val}</div>
                                                            <div className={value.score >= .5 ? "score high" : "score"}>{value.score}</div>
                                                        </div>
                                                    );
                                                })
                                            }
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <div id="keyword" className={keywords != null && keywords.length > 1 ? "showMe" : "hideMe"}>
                            <table className="infoTable">
                                <tbody>
                                    <tr className="infoRow">
                                        <td className="infoCellOne">Search history:
                                        </td>
                                        <td className="infoCellTwo">{keywords}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div id="view" className={views != null && views.length > 1 ? "showMe" : "hideMe"}>
                            <table className="infoTable">
                                <tbody>
                                    <tr className="infoRow">
                                        <td className="infoCellOne">Top Content (views):
                                        </td>
                                        <td className="infoCellTwo">{views}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        {/* <div id="category" className={categories != null && categories.length > 1 ? "showMe" : "hideMe"}>
                            <table className="infoTable">
                                <tbody>
                                    <tr className="infoRow">
                                        <td className="infoCellOne">Top Category (views):
                                        </td>
                                        <td className="infoCellTwo">{categories}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div> */}

                    </div>
                    <div id="cdp">
                        <form onSubmit={handleSubmit} className={affinities != null && affinities.length > 1 ? "showMe" : "hideMe"}>
                            <div className={isErr ? "errorHide" : "errorShow"}>&nbsp;</div>
                            <div className={errStyle}>{err}</div>
                            <div id="cdpInputs">
                                <img src={sitecore} alt='Sitecore Logo' />
                                <span>Universal ID:</span>
                                <input id="cdpInput" type="text" name="universalIDInput" disabled={updateCDP} />
                                <input type="submit" value="Connect" className={!updateCDP ? "showMe cdpButton" : "hideMe cdpButton"} />
                                <input type="button" value="Cancel" onClick={cancelCDP} className={updateCDP ? "showMe cdpButton" : "hideMe cdpButton"} />
                            </div>
                        </form>
                    </div>
                </div>
            );
        }
    }
}

export default AffinityScorecard;