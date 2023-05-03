import React from 'react';
import {
  MainQuerySummary,
  SummaryHighlight
} from './styled';

const QuerySummary = ({ resultsPerPage, totalResults, time, currentPage, displayTime = true }) => {  
  if (time) {
    const showResultFrom = (currentPage * resultsPerPage) + 1;
    const showResultTo =  showResultFrom + resultsPerPage - 1;
    
    return (
      <div className="query-summary">
        <MainQuerySummary>
          <span>Showing <SummaryHighlight>{showResultFrom}</SummaryHighlight> to
            <SummaryHighlight> {showResultTo < totalResults  ? showResultTo : totalResults} </SummaryHighlight>
            from <SummaryHighlight>{totalResults} </SummaryHighlight> jobs
            {displayTime && (<> in <SummaryHighlight>{time} </SummaryHighlight> milliseconds.</>)}
          </span>
        </MainQuerySummary>
      </div>
    );
  }
  
  return <></>;
};

export default QuerySummary;
