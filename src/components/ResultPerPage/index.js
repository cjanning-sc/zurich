import { ResultPerPageContainer, ResultPerPageLeftLabel, ResultPerPageRightLabel} from './styled';
import { SearchCtx } from '../../hooks/SearchProvider';
import { useContext } from "react";

const ResultPerPageItem = ({ pageCount, handleClick, isSelected }) => {
    const handleClickItem = () => {
        handleClick(pageCount);
    }
    return (
        <li>
            <button onClick={handleClickItem} className={isSelected ? "perPageSelected":""}>{pageCount}</button>
        </li>
      )
};

const ResultPerPage = (props) => {
    const {
      textLeft = "",
      textRight = "",
      resultPerPageList = [10, 25, 50, 100],
    } = props;
    const searchCtx = useContext(SearchCtx);
    const { resultPerPage, setResultPerPage, setCurrentPage } = searchCtx;

    const handlePerPageClick = (pageNumber) => {
        setCurrentPage(0);
        setResultPerPage(pageNumber);
      };

    return(
        <ResultPerPageContainer>
            {textLeft && <ResultPerPageLeftLabel>{textLeft}</ResultPerPageLeftLabel>}
            {resultPerPageList && 
                <ul>
                    {
                        resultPerPageList.map(
                            (resultPerPageItem) => (
                                <ResultPerPageItem
                                    key={resultPerPageItem}
                                    pageCount={resultPerPageItem} 
                                    handleClick={handlePerPageClick} 
                                    isSelected={resultPerPage===resultPerPageItem}
                                />
                            )
                        )
                    }
                </ul>
            }
            {textRight && <ResultPerPageRightLabel>{textRight}</ResultPerPageRightLabel>}
        </ResultPerPageContainer>
    );
};

export default ResultPerPage;