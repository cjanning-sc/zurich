import {
  SuggestionWrapper,
  SuggestionWrapperLabel,
  SuggestionWrapperLi
} from './styled';

const Suggestion = ({ suggestions, suggestionClick }) => {
  return (
    <SuggestionWrapper>
      <SuggestionWrapperLabel>People also searched for:</SuggestionWrapperLabel>
      <ul>
        {suggestions.map(({ text }, index) => (
          <SuggestionWrapperLi key={index}>
            <a href="#" onClick={() => suggestionClick(text)}>{text}</a>
          </SuggestionWrapperLi>
        ))}
      </ul>
    </SuggestionWrapper>);
};

export default Suggestion;
