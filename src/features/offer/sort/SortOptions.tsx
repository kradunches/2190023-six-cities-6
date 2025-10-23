import React, { useState } from 'react';

export type SortType = 'Popular' | 'Price: low to high' | 'Price: high to low' | 'Top rated first';

type SortOptionsProps = {
    activeSort: SortType;
    onSortChange: (sort: SortType) => void;
};

const SORT_OPTIONS: SortType[] = [
    'Popular',
    'Price: low to high',
    'Price: high to low',
    'Top rated first',
];

export const SortOptions: React.FC<SortOptionsProps> = React.memo(({ activeSort, onSortChange }) => {
    const [opened, setOpened] = useState(false);

    return (
        <form className="places__sorting" action="#" method="get">
            <span className="places__sorting-caption">Sort by &nbsp;</span>
            <span
                className="places__sorting-type"
                tabIndex={0}
                onClick={() => setOpened((prev) => !prev)}
                data-testid="sort-type"
            >
                {activeSort}
                <svg className="places__sorting-arrow" width="7" height="4">
                    <use xlinkHref="#icon-arrow-select" />
                </svg>
            </span>
            <ul className={`places__options places__options--custom${opened ? ' places__options--opened' : ''}`}>
                {SORT_OPTIONS.map((option) => (
                    <li
                        key={option}
                        className={`places__option${option === activeSort ? ' places__option--active' : ''}`}
                        tabIndex={0}
                        onClick={() => {
                            onSortChange(option);
                            setOpened(false);
                        }}
                        data-testid={`sort-option-${option}`}
                    >
                        {option}
                    </li>
                ))}
            </ul>
        </form>
    );
});