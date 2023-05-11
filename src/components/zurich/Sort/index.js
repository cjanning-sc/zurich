import React, { useContext, useState } from "react";
import { SORT_ASC, SORT_DESC } from '../../../api/search';
import { SearchCtx } from '../../../hooks/SearchProvider';
import { useNonInitialEffect } from '../../../hooks/useNonInitialEffect';
import { useToggleSort } from "../../../hooks/useToggleSort";

import { FaAngleDown, FaAngleUp } from 'react-icons/fa';
import { SortContainer, SortWrapper, SortSelect } from './styled';
import { Select } from "@sitecore-discover/ui";

const SortOptions = ({ label, displayIcon, sortOrder, isSelected, onClick }) => {

    return (<SortContainer className={isSelected ? 'selected' : ''} onClick={onClick}>
        {label}
        {displayIcon && (
            sortOrder === SORT_ASC ? <FaAngleUp /> : <FaAngleDown />
        )}
    </SortContainer>);
}

export const Sort = () => {
    let defaultSorting = SORT_DESC;
    let defaultValue = "";
    const { sort, setSort } = useContext(SearchCtx);

    if (sort && Object.keys(sort.value).length > 0) {
        defaultSorting = sort.value.order;
        defaultValue = sort.value.name;
    }

    const { key, direction, set } = useToggleSort(defaultValue, defaultSorting);
    const sortTypes = [
        { value: '', label: 'Recommended', displayIcon: false },
        { value: 'title_asc', label: 'Title ASC', displayIcon: true },
        { value: 'title_desc', label: 'Title DESC', displayIcon: true },
        { value: 'modified_asc', label: 'Modified ASC', displayIcon: true },
        { value: 'modified_desc', label: 'Modified DESC', displayIcon: true },
    ];

    useNonInitialEffect(() => {
        if (key === '') {
            setSort({ value: {} });
        } else {
            setSort({
                value: {
                    name: key,
                    order: key.includes('asc') ? 'asc' : 'desc'
                }
            });
        }
    }, [key, direction]);

    return (
        <SortWrapper>
            <SortSelect>Sort by:&nbsp;
            <select className={'sort'} onChange={e => set(e.target.value)} defaultValue={key}>
                {sortTypes.map((sortType, index) =>
                    <option
                        key={index}
                        value={sortType.value}
                        //selected={sortType.value === key}
                    >
                        {sortType.label}
                    </option>
                )}
            </select>
            </SortSelect>
        </SortWrapper>
    )
}

export default Sort;
