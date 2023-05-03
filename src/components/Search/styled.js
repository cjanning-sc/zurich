
import styled, { keyframes } from 'styled-components';

export const RfkFullPageSearch = styled.div`
    flex: 0 0 100%;
    max-width: 100%;
    padding-top: 10px;
    position: relative;
`;

export const RfkLi = styled.div`
    width: 100%;
`;

export const RfkSp = styled.div`
    display: flex;
    margin: 0 auto;
    max-width: 1260px;
    width: 100%;
    z-index: 99999;
`;

export const SuggestionsSortContainer = styled.div`
    display: inline-flex;
    width: 100%;
    margin-top: 20px; 
    margin-bottom: 30px;
`;

export const StyledPaginateContainer = styled.div`
	.pagination {
		cursor: pointer;
		display: flex;
		justify-content: space-between;
		list-style: none;
		margin: 40px auto 30px auto;
		width: 60%;
	}

	.pagination a {
		border-radius: 5px;
		border: 1px solid #6c7ac9;
		color: #6c7ac9;
		padding: 10px;
	}

	.pagination__link {
		font-weight: bold;
	}

	.pagination__link--active a {
		background: #6c7ac9;
		color: #fff;
	}

	.pagination__link--disabled a {
		border: 1px solid #c9c9c9;
		color: #c9c9c9;
		cursor: default;
	}
`;

export const EmptyResults = styled.div`
  display: flex;
  font-size: 20px;
  flex-direction: column;
  align-items: center;

  svg {
    margin: 20px auto;
    width: 128px;
  }
`;

export const SortOptions = styled.div`
  display: inline-flex;
  float: right;
  position: relative;

  label {
    padding-right: 8px;
    padding-top: 8px;
    vertical-align: middle;
    width: 70px;
  }
`;

const Rotate = keyframes`
  from {
      transform: rotate(0deg);
  }
  to {
      transform: rotate(360deg);
  }
`;

export const LoaderAnimation = styled.svg`
  animation: ${Rotate} 2s linear infinite;
  display: block;
  fill: #6c7ac9;
  height: 50px;
  margin: auto;
  width: 50px;
`;
