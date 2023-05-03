import React, { useContext } from 'react';
import { FaInfoCircle } from "react-icons/fa";
import Tooltip from "react-simple-tooltip"
import { RecommendationCtx } from "../../hooks/RecommendationProvider";
import {
  CarouselContainer,
  Header,
  LeftIcon,
  NextButton,
  PrevButton,
  RecommendationContainer,
  RightIcon,
  Slide,
  SliderList,
  StyledPictureContainer,
  StyledProductCard,
  TooltipContainer
} from './styled';
import { entityAppear, widgetClick } from '../../api/events';
import defaultImage from './images/default_img.png'; // relative path to image 
import { HomeRecommendationCtx } from '../../hooks/RecommendationHomeProvider';
import {css} from "styled-components"

const getRwTitle = (rfk_id) => {
  switch(rfk_id) {
    case 'rfkid_1':
      return 'Top Viewed Content for You';
    case 'rfkid_2':
      return 'Recently Added Content';
    case 'rfkid_3':
    return 'Recently Viewed Content';
    case 'rfkid_31':
      return 'Similar Content';
    case 'rfkid_32':
      return 'Top Viewed Content for the Same Content Type';
    case 'rfkid_33':
      return 'Other Types of Content Recently Added';
    default:
      return 'Recommendations';
  }
}

const getRWTooltip = (rfk_id) => {
  switch(rfk_id) {
    case 'rfkid_1':
      return 'Displays top content documents ranked by 7 day views and personalized based on recently viewed content';
    case 'rfkid_2':
      return 'Shows the newest content documents added to the source based on the last modified attribute';
    case 'rfkid_3':
    return 'Displays recently viewed content by the user in the last 30 days sorted by recency';
    case 'rfkid_31':
      return 'Shows similar content documents to the context based on textual matchings of type, title and subtitle';
    case 'rfkid_32':
      return 'Shows content documents of the same type as the context documents ranked by 30 day views';
    case 'rfkid_33':
      return 'Displays content documents of different type as that of the context and ranks them by both 30 day views stats and newness using the last modified attribute';
    default:
      return 'Sitecore Recommendations';
  }
}

export const RecommendationCarousel = ({ containerId = '', rfk_id = '', productsCount = 0, list = [], title = '' }) => {
  // Article's RWs
  const recommendationCtx = useContext(RecommendationCtx);
  const { getRWs, setArticleKey, setRwsLoading } = recommendationCtx;
  // Home RWs
  const homeRecommendationCtx = useContext(HomeRecommendationCtx);
  const { getHomeRWs, setHomeRwsLoading } = homeRecommendationCtx;

  if (!(productsCount > 0 && list.length > 0)) {
    return  <></>;
  }
  
  return (
    <RecommendationContainer>
      {<Header>{getRwTitle(rfk_id)}<Tooltip className="tooltip" padding={10} placement="top" fontSize="13px" customCss={css`white-space: nowrap;`} content={getRWTooltip(rfk_id)}><TooltipContainer><FaInfoCircle></FaInfoCircle></TooltipContainer></Tooltip></Header>}
      <CarouselContainer>
        <SliderList>
          {list.map((p, index) => (
            <Slide key={`slide-${index}`}>
              <StyledProductCard.Root product={p}>
                {
                  (p.image_url) ? 
                  <StyledPictureContainer>
                    <StyledProductCard.Image />
                  </StyledPictureContainer> : 
                  <StyledPictureContainer>
                    <img src={defaultImage} alt={p.title}></img>
                  </StyledPictureContainer>
                }
                <StyledProductCard.Content>
                  <StyledProductCard.Sku />
                  <StyledProductCard.Name>
                    <StyledProductCard.Link 
                      href={p.url} 
                      target="_blank" 
                      rel="noreferrer" 
                      data-item={JSON.stringify(p)}
                      data-index={index}
                      data-rfkid={rfk_id}
                      onClick={(e) => {
                        console.debug('Search ::: Widget Click Entity fired');
                        widgetClick({
                            value: {
                                rfk_id: e.currentTarget.getAttribute('data-rfkid'),
                                index: e.currentTarget.getAttribute('data-index'),
                                entities: [
                                    {
                                      id: JSON.parse(e.currentTarget.getAttribute('data-item')).id,
                                      entity_type: 'content',
                                      entity_subtype: 'article',
                                    },
                                ],
                            },
                        });
                        entityAppear({
                          value: {
                            rfk_id: e.currentTarget.getAttribute('data-rfkid'),
                            entities: [
                              {
                                id: JSON.parse(e.currentTarget.getAttribute('data-item')).id,
                                source_id: JSON.parse(e.currentTarget.getAttribute('data-item')).source_id,
                                title,
                                entity_type: 'content',
                                entity_subtype: 'article',
                              },
                            ],
                          },
                        });
                        const homeRws = ['rfkid_1', 'rfkid_2', 'rfkid_3'],
                        articleRws = ['rfkid_31', 'rfkid_32', 'rfkid_33'];
                        const artId = JSON.parse(e.currentTarget.getAttribute('data-item')).id;
                        setRwsLoading(true);
                        setArticleKey(containerId);
                        setTimeout(() => {
                          getRWs({ id: artId, rfk_id: articleRws });
                          setArticleKey('');
                          setRwsLoading(false);
                        }, 1200);
                        setTimeout(() => {
                          setHomeRwsLoading(true);
                          getHomeRWs({ rfk_id: homeRws});
                          setHomeRwsLoading(false);
                        }, 500);
                      }} 
                    >
                      {p.title}
                    </StyledProductCard.Link>
                  </StyledProductCard.Name>
                  <StyledProductCard.Footer>
                    <StyledProductCard.Type>{p.type}</StyledProductCard.Type>
                    <StyledProductCard.Date>{p.creation_date && (p.creation_date).substring(0, 10)}</StyledProductCard.Date>
                  </StyledProductCard.Footer>
                </StyledProductCard.Content>
              </StyledProductCard.Root>
            </Slide>
          ))}
        </SliderList>

        <PrevButton aria-label="Show previous demo" tabIndex={-1}>
          <LeftIcon />
        </PrevButton>

        <NextButton aria-label="Show next demo" tabIndex={-1}>
          <RightIcon />
        </NextButton>
      </CarouselContainer>
    </RecommendationContainer>
  );
};

export default RecommendationCarousel;
