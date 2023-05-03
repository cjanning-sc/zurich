import { useContext } from "react";
import { FaCheck } from 'react-icons/fa';
import { facetClick } from '../../api/events';
import { SearchCtx } from '../../hooks/SearchProvider';
import FacetClear from "../FacetClear";
import FacetMenu from '../FacetMenu';
import FacetToggle from "../FacetToggle";

import {
    ButtonContainer, 
    Checkbox,
    CheckboxIndicator,
    FilterCheckboxContainer,
    Label,
    TypeFilterWrapper,
    TypeParent,
    TypeHeader,
} from './styled';

const hideDiv = {
    display: 'none'
};

const showDiv = {
    display: 'block'
};

const FilterCheckbox = ({ index, id, text, displayCount, count, selected, selectFn }) => (
    <FilterCheckboxContainer>
        <Checkbox index={index} checked={selected} onCheckedChange={() => selectFn(text, index)} id={`checkbox${id}`}>
            <CheckboxIndicator>
                <FaCheck />
            </CheckboxIndicator>
        </Checkbox>
        <Label htmlFor={`checkbox${id}`}>{text} {displayCount && <span>{count}</span>}</Label>
    </FilterCheckboxContainer>
);

const FilterWrapper = ({ index, displayCount, typeItem, typeParentName, parent }) => {
    const facetTypeName = typeItem.id;
    const { facetTypesSelected, filterFacetBy, getRequest, domainConfig } = useContext(SearchCtx);
    const isSelected = facetTypesSelected[typeParentName] && facetTypesSelected[typeParentName].includes(facetTypeName);

    const handleClick = (text, index) => {
        filterFacetBy(!isSelected, typeParentName, facetTypeName);
        console.debug('Search ::: facetClick fired');
        facetClick({
            value: {
                rfk_id: domainConfig.rfkid,
                request: getRequest(),
                filters: [{
                    name: typeParentName,
                    value: [
                        facetTypeName
                    ],
                    display_name: [
                        text
                    ],
                    facet_position: index,
                }]
            }
        });
    };

    return <FilterCheckbox index={index} text={typeItem.text} id={facetTypeName} displayCount={displayCount} selected={isSelected} count={typeItem.count} selectFn={handleClick} />
};

const TypeFilter = ({ displayCount, type, selected }) => {
    let divStyle = hideDiv;
    if (type) {
        const display = selected[type.name] && selected[type.name].length;
        if (display) {
            divStyle = showDiv;
        }
    }
    return (
        type && (
            <TypeFilterWrapper>
                <TypeParent>
                    <TypeHeader>
                        <h2>{type.text}</h2>
                        <ButtonContainer>
                            <FacetClear id={type.name} />
                            <FacetMenu id={type.name} />
                            <FacetToggle id={type.name} />
                        </ButtonContainer>
                    </TypeHeader>
                    <div id={type.name} style={divStyle}>
                        {type.items.map((typeItem, index) => {
                            return <FilterWrapper
                                index={index}
                                key={typeItem.id}
                                typeParentName={type.name}
                                typeItem={typeItem}
                                displayCount={displayCount}
                            />
                        })}
                    </div>
                </TypeParent>
            </TypeFilterWrapper>
        )
    )
};

export const Facet = ({ displayCount }) => {
    const searchCtx = useContext(SearchCtx);
    const { types, facetTypesSelected } = searchCtx;
    return (
        types && types.length &&
        types.map(
            (type, index) => (
                <TypeFilter key={"type_" + index} displayCount={displayCount} type={type} selected={facetTypesSelected} />
            )
        )
    );
};

export default Facet;
