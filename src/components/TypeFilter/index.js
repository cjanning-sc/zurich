import React from "react";
import {
    Arrow,
    ArrowWrapper,
    ContentSearchMainFilter,
    MainFilterOptionContainer,
    MainFilterOptionContainerA
} from "./styled";

const Filter = ({text, selected, selectFn}) => (
  <MainFilterOptionContainer>
    <MainFilterOptionContainerA href="#" className={selected ? 'selected' : ''} onClick={() => selectFn(text)}>
      <ArrowWrapper>
        <Arrow></Arrow>
      </ArrowWrapper>
      <p>{text}</p>
    </MainFilterOptionContainerA>
  </MainFilterOptionContainer>
);

const TypeFilter = ({
  types,
  currentType,
  setType,
}) => {
  return (
    <ContentSearchMainFilter>
      <Filter key={`filter-0`} text="All" selected={"All" === currentType} selectFn={setType} />
      {types[0]?.items.slice(0, 6).map((v, index) => (
        <Filter
          key={`${(v.text.toLowerCase()).trim()}-${index + 1}`}
          text={v.text}
          selected={currentType === v.id}
          selectFn={(text) => setType(text, v.id, index)}
        />
      ))}
    </ContentSearchMainFilter>
  );
};

export default TypeFilter;
