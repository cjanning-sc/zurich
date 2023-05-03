import Select from "react-select";
import SemanticSearchToogle from "../SemanticSearchToogle";
import {
    ContentSearchFilterContainer,
    LocaleOptions,
    SourceOptions
} from "./styled";

const LocaleSelector = ({ localeTypes, onLocaleChange, currentLocale }) => {
  return (
    <LocaleOptions>
      <img
        src="https://wwwsitecorecom.azureedge.net/-/media/newnavigation/icon-language.svg"
        alt="Locale Selector"
      />
      <Select
        value={currentLocale}
        onChange={onLocaleChange}
        options={localeTypes}
      />
    </LocaleOptions>
  );
};

const Source = ({ multiSourceValue, sourceTypes, onSourceChange }) => {
  return (
    <SourceOptions>
      <label>Sources:</label>
      <Select
        className="react-select-container"
        name="sources"
        placeholder="Sources"
        value={multiSourceValue}
        options={sourceTypes}
        onChange={onSourceChange}
        isMulti
      />
    </SourceOptions>
  );
};

const FiltersContainer = ({
  onLocaleChange,
  currentLocale,
  multiSourceValue,
  onSourceChange,
  onRfkFlagsChange,
}) => {
  return (
    <ContentSearchFilterContainer>
      {multiSourceValue && (
        <Source
          multiSourceValue={multiSourceValue}
          sourceTypes={[
            { value: "388218", label: "Sitecore" },
            { value: "390565", label: "Symposium" },
          ]}
          onSourceChange={onSourceChange}
        />
      )}
      <LocaleSelector
        localeTypes={[
          {
            value: "en",
            label: "English",
          },
          {
            value: "es",
            label: "Español",
          },
          {
            value: "de",
            label: "Deutsch",
          },
          {
            value: "it",
            label: "Italiano",
          },
          {
            value: "fr",
            label: "Français",
          },
          {
            value: "zh",
            label: "中文",
          },
          {
            value: "da",
            label: "Dansk",
          },
          {
            value: "ja",
            label: "日本語 ",
          },
        ]}
        onLocaleChange={onLocaleChange}
        currentLocale={currentLocale}
      />
      <SemanticSearchToogle
        label="Semantic Search"
        onRfkFlagsChange={onRfkFlagsChange}
      />
    </ContentSearchFilterContainer>
  );
};

export default FiltersContainer;
