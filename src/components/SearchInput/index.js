import { useEffect, useRef } from "react";
import { CloseIcon, GlassIcon, LoadingIcon } from './icons';
import {
  ContentSearchInput,
  ContentSearchInputWrapper,
  ContentSearchInputWrapperBox,
  WrapperBoxInput
} from './styled';
import './styles.css';

const SearchInput = ({
  loading,
  keyphrase,
  changeKeyphrase,
  changePreviousKeyphrase,
}) => {
  const usePrevious = (value) => {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  };

  const onInputChange = (event) => {
    const {
      target: { value = "" },
    } = event;
    changePreviousKeyphrase(prevValue);
    changeKeyphrase(value);
  };

  const prevValue = usePrevious(keyphrase);

  return (
    <div className="knowledgeCenterResourcesSearch  ">
      {keyphrase === "" && <GlassIcon />}
      <div className="knowledgeCenterResourcesSearch-input">
        <input type="text" placeholder="Search" value={keyphrase} onChange={onInputChange} />
        <div className="d-md-block">
          <span className="search-logo">
            <span> Powered by</span>
            <a target="_blank" className="logo-link" href="/products/search">
              <img src="https://wwwsitecorecom.azureedge.net/-/media/sitecoresite/images/icons/newnavigation/products/search-horizontal-color-black-txt.svg?md=20221012T213412Z" alt="Powered by" className="search-logo-img" />
            </a>
          </span>
        </div>
      </div>
      <span className="knowledgeCenterResourcesSearch-button" role="button" aria-label="Search">
        <span className="knowledgeCenterResourcesSearch-button-search">
        </span>
      </span>
      {keyphrase !== "" && <CloseIcon onclick={() => changeKeyphrase("")} />}
    </div>
  );
};

export default SearchInput;
