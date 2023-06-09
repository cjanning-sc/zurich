import { useState } from 'react';

const FacetValues = ({ values, acumIndex, facetType, onFacetClick }) => {
  return (<ul class="rfk_list">
    ${values.map(({ index: facetValueIndex, text, count, selected }, index) => {
      return (
        <li index={index} data-index={acumIndex + index} data-type={facetType} data-text={text} data-level="0" >
          <div>
            <input
              type="checkbox"
              checked={selected ? 'checked' : ''}
              onClick={ onFacetClick }
            />
            <label title="{text}({count})">{text}<span>({count})</span></label>
          </div>
      </li>);
    })}
  </ul>);
};

const Facet = ({ name, values, index, acumIndex, type, onFacetClick }) => {
  const [toggle, setToggle] = useState(false);
  return (
    <li className="rfk_title" data-toggle={toggle ? '1' : '0'}>
    <div className="rfk_ttitle" data-toggle={toggle ? '1' : '0'} onClick={() => setToggle(!toggle)}>
      <span>{name}</span>
    </div>
    <div className="rfkx_lwrap">
      <FacetValues
        values={values}
        tindex={index}
        acumIndex={acumIndex}
        facetType={type}
        onFacetClick={onFacetClick}
      />
    </div>
  </li>);
};

const FacetList = ({ facets, onFacetClick, onClear }) => {
  let acumIndex = 0;
  return (
    <div className="rfk_facets rfk_ulli">
      <div className="rfk_filterby">
        <span>Filter By</span>
        ${facets.some(({ values = [] }) => values.some(({ selected }) => selected))
          ? (<div className="rfk_clear_filters" onClick={onClear}>Clear All</div>)
          : null}
      </div>
      ${facets.map(({ facetType, values, display_name, selected }, tindex) => {
        const componentHtml = (
          <ul className="facet" data-type="{facetType}" data-sli="0">
            <Facet
              name={display_name}
              index={tindex}
              type={facetType}
              values={values}
              onFacetClick={onFacetClick}
            />
          </ul>);
        acumIndex = acumIndex + values.length;
        return componentHtml;
      })}
  </div>);
};

export default FacetList;