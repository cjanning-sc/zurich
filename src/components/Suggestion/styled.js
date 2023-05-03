import styled from 'styled-components';

export const SuggestionWrapper = styled.div`
    grid-area: suggestions;
    font-size: 16px;
	width: 90%;
	margin-top: 10px;
	margin-bottom: 20px;

	justify-items: center; 
	align-items: center; 

    ul {
      display: inline-flex;
      margin: 0;
      padding-inline-start: 10px;
    }
`;

export const SuggestionWrapperLabel = styled.span`
    padding: 0px;
`;

export const SuggestionWrapperLi = styled.li`
	background: ${(props) => props.theme?.backgroundColor || '#5548d9'};
	border-radius: 8px;
	border: none;
	color: #fff;
	display: inline-flex;
	flex-direction: column;
	justify-content: center;
	margin-right: 10px;
	padding: 5px 10px 5px 10px;
	text-align: center;

	a {
		color: #fff;
	}
`;
