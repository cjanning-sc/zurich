import { useContext } from "react";
import { SearchCtx } from '../../../hooks/SearchProvider';
import { BreadcrumFacetWrapper, ClearAll, TypeFilterWrapper, TypeFilterHeader, FilterLink, TypeFiltersContainer } from "./styled";

const FilterWrapper = ({facetId, facetLabel, typeId}) => {
    const { filterFacetBy } = useContext(SearchCtx);
    
    const handleClick = (event) => {
        event.stopPropagation();
        filterFacetBy(false, typeId, facetId);
    };
   
    return <FilterLink onClick={handleClick}>{facetLabel} X</FilterLink>
};

const TypeFilter = ({ typeName, typeId, items }) => {
    return (
        <TypeFilterWrapper>
            <TypeFilterHeader>{typeName}:</TypeFilterHeader>
            {items.map((typeItem) => {
                return <FilterWrapper key={typeItem.id} typeId={typeId} facetId={typeItem.id} facetLabel={typeItem.text} />
            })}

        </TypeFilterWrapper>
    );
};
const BreadcrumFacet = () => {
    let content = "";
    const { facetTypesSelected, setFacetTypesSelected, types } = useContext(SearchCtx);
    const displayContent = Object.keys(facetTypesSelected).length > 0;
    
    if (displayContent) {
        content =(<BreadcrumFacetWrapper>
            <TypeFiltersContainer>
                {types && types.length && 
                    types.map(
                        (type, index) =>  {
                                let contentType = "";
                                const facetTypesSelectedByFacet = facetTypesSelected[type.name];
                                if(facetTypesSelectedByFacet) {
                                    const itemsSelected = type.items.filter((element) => facetTypesSelectedByFacet.includes(element.id));

                                    contentType = <TypeFilter key={"type"+index}  typeId={type.name} typeName={type.text} items={itemsSelected}/>
                                }

                                return contentType;
                            }
                    )
                }
            </TypeFiltersContainer>
            <ClearAll onClick={()=>setFacetTypesSelected({})}>
                Clear All Filters
            </ClearAll>
        </BreadcrumFacetWrapper>);

    }
    return content;
}

export default BreadcrumFacet;
