
import { useContext } from "react";
import { SearchCtx } from '../../hooks/SearchProvider';
import { FaMinus } from 'react-icons/fa';
import { ClearButton, IconButton } from './styled';

const FacetClear = ({ id }) => {
    const { facetTypesSelected, clearFacet } = useContext(SearchCtx);
    const display = facetTypesSelected[id] && facetTypesSelected[id].length;

    if (display) {
        const onClick = () => {
            clearFacet(id);
        };

        return (
            <ClearButton>
                <IconButton aria-label="Expand filter" onClick={onClick}>
                    <FaMinus />
                </IconButton>
            </ClearButton>
        );
    } else {
        return null;
    }

};

export default FacetClear;