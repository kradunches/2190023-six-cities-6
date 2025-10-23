import React from "react";

type CitiesListProps = {
    cities: string[];
    activeCity: string;
    onCityClick: (city: string) => void;
};

export const CitiesList: React.FC<CitiesListProps> = React.memo(({ cities, activeCity, onCityClick }) => {
    return (
        <ul className="locations__list tabs__list">
            {cities.map((city) => (
                <li className="locations__item" key={city}>
                    <a
                        className={`locations__item-link tabs__item ${city === activeCity ? 'tabs__item--active' : ''}`}
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            onCityClick(city);
                        }}
                    >
                      <span>{city}</span>
                    </a>
                </li>  
            ))}
        </ul>
    );
});
