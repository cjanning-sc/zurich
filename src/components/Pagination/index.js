import { useContext } from "react";
import ReactPaginate from 'react-paginate';
import { pageClick } from '../../api/events';
import { SearchCtx } from '../../hooks/SearchProvider';
import { PaginationContainer } from './styled';

const Pagination = (props) => {
    const {
      breakLabel="...", 
      pageRangeDisplayed = 3, 
      previousLabel = "← Previous", 
      nextLabel = "Next →", 
      marginPagesDisplayed = 1
    } = props;
    const searchCtx = useContext(SearchCtx);
    const { results, currentPage, setCurrentPage, totalProducts, resultPerPage, domainConfig, getRequest } = searchCtx;

    const handlePageClick = (e) => {
        setCurrentPage(e.selected);
      };

    return(
        <PaginationContainer>
            <ReactPaginate
              breakLabel={breakLabel}
              onPageChange={handlePageClick}
              pageRangeDisplayed={pageRangeDisplayed}
              marginPagesDisplayed={marginPagesDisplayed}
              initialPage={currentPage}
              pageCount={results > 0 ? totalProducts / resultPerPage : 0}
              renderOnZeroPageCount={null}
              previousLabel={previousLabel}
              nextLabel={nextLabel}
              onClick={({event}) => {
                console.debug('Search ::: pageClick fired');
                pageClick({
                  value: {
                      rfk_id: domainConfig.rfkid,
                      request: getRequest(), 
                      filters: [{
                        name: event.target.name,
                        display_name: [
                          event.target.innerText
                        ],
                      }]
                  }
                })
              }}
              containerClassName={"pagination"}
              previousLinkClassName={"pagination__link"}
              nextLinkClassName={"pagination__link"}
              disabledClassName={"pagination__link--disabled"}
              activeClassName={"pagination__link--active"}
            />
        </PaginationContainer>
    );
};

export default Pagination;