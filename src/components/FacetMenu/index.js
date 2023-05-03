
import { useContext } from 'react';
import { FaBars } from 'react-icons/fa';
import { HiSortAscending, HiSortDescending } from 'react-icons/hi';
import { SearchCtx } from '../../hooks/SearchProvider';
import { SORT_TYPE_COUNT, SORT_TYPE_TEXT, SORT_ASC, SORT_DESC } from '../../api/search';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, IconButton } from './styled';


const DropdownMenuSortItem = ({ label, displayIcon, sortType, sortOrder, handleClick, isSelected}) => {
    return (
        <DropdownMenuItem className={isSelected?'selected': ''} disabled={isSelected} onSelect={(event)=> handleClick(event, sortType, sortOrder)}>
            {displayIcon && sortOrder === SORT_ASC && <HiSortAscending />}
            {displayIcon && sortOrder === SORT_DESC && <HiSortDescending />}
            {label}
        </DropdownMenuItem>
        )
};
const isSortSelected = (id, sortType, order, sortByList) => {
    return (!sortByList[id] && sortType === SORT_TYPE_COUNT && order === SORT_DESC) || (sortByList[id] && sortByList[id].sortType === sortType && sortByList[id].sortOrder === order);
}
const FacetMenu = ({ id }) => {
    const { facetSortBy, facetTypesSort } = useContext(SearchCtx);
    const handleClick = (event,sortType, sort) => {
        facetSortBy(id, sortType, sort);
    };

    return (
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
                <IconButton aria-label="Customise options">
                    <FaBars />
                </IconButton>
            </DropdownMenuTrigger>

            <DropdownMenuContent>
                <DropdownMenuLabel>Sort By:</DropdownMenuLabel>
                    <DropdownMenuSortItem handleClick={handleClick} isSelected={isSortSelected(id, SORT_TYPE_TEXT, SORT_ASC, facetTypesSort)}  label="Label ASC" sortType={SORT_TYPE_TEXT} sortOrder={SORT_ASC} displayIcon={true}/>
                    <DropdownMenuSortItem handleClick={handleClick} isSelected={isSortSelected(id, SORT_TYPE_TEXT, SORT_DESC, facetTypesSort)} label="Label DESC" sortType={SORT_TYPE_TEXT} sortOrder={SORT_DESC} displayIcon={true}/>
                    <DropdownMenuSortItem handleClick={handleClick} isSelected={isSortSelected(id, SORT_TYPE_COUNT, SORT_ASC, facetTypesSort)} label="Occurrences ASC" sortType={SORT_TYPE_COUNT} sortOrder={SORT_ASC} displayIcon={true}/>
                    <DropdownMenuSortItem handleClick={handleClick} isSelected={isSortSelected(id, SORT_TYPE_COUNT, SORT_DESC, facetTypesSort)} label="Occurrences DESC" sortType={SORT_TYPE_COUNT} sortOrder={SORT_DESC} displayIcon={true}/>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default FacetMenu;