
import { useState, useContext } from 'react';
import { SearchCtx } from '../../hooks/SearchProvider';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa';
import { CollapseButton, ExpandButton, IconButton } from './styled';

const expandFilter = (id) => {
    document.getElementById(id).style.display = 'block';
};

const collapseFilter = (id) => {
    document.getElementById(id).style.display = 'none';
};

const FacetToggle = ({ id }) => {
    const { facetTypesSelected } = useContext(SearchCtx);
    const display = facetTypesSelected[id] && facetTypesSelected[id].length;
    const [filterStatus, setFilterStatus] = useState(display ? 'expanded' : 'collapsed');
    const [expandClass, setExpandClass] = useState('show');
    const [collapseClass, setCollapseClass] = useState('hide');

    const handleClick = () => {
        if (filterStatus === 'collapsed') {
            setExpandClass('hide');
            setCollapseClass('show');
            setFilterStatus('expanded');
            expandFilter(id);
        } else {
            setExpandClass('show');
            setCollapseClass('hide');
            setFilterStatus('collapsed');
            collapseFilter(id);
        }
    };

    return (
        <div>
            <ExpandButton>
                <IconButton aria-label="Expand filter" onClick={handleClick} className={expandClass}>
                    <FaArrowDown />
                </IconButton>
            </ExpandButton>
            <CollapseButton>
                <IconButton aria-label="Collapse filter" onClick={handleClick} className={collapseClass}>
                    <FaArrowUp />
                </IconButton>
            </CollapseButton>
        </div >
    );
};

export default FacetToggle;