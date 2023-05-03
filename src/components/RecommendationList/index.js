import React from 'react';
import { RecommendationCarousel } from '../Recommendation';

const RecommendationList = ({ containerId, rfk_id, total_item = 0, content }) => {
  if (!total_item) return <div></div>;

  return (
    <>
      <RecommendationCarousel containerId={containerId} rfk_id={rfk_id} productsCount={total_item} list={content} />
    </>
  );
};

export default RecommendationList;
