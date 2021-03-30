import React, { useEffect, useState } from 'react';
import axios from "axios";
import Card from './Card';

const Countries = () => {
    const [data, setData] = useState([]);
    const [sortedData, setSortedData] = useState([]);
    const [playOne, setPlayOne] = useState(true);
    const [rangeValue, setRangeValue] = useState(40);

    useEffect(() => {
        if(playOne){
            axios.get("https://restcountries.eu/rest/v2/all?fields=name;population;region;capital;flag")
            .then((res) => {
                setData(res.data);
                setPlayOne(false);
            });
        }


        const sortedCountry = () => {
            const countryObj = Object.keys(data).map((i) => data[i]);
            const sortedArray = countryObj.sort((a, b) => {
                return b.population - a.population;
            });
            sortedArray.length = rangeValue;
            setSortedData(sortedArray)
        }
        sortedCountry();
    }, [data, playOne, rangeValue]);

    return (
        <div className="countries">
            <ul className="countries-list">
                {sortedData.map((country) => (
                    <Card country={country} key={country.name} />
                ))}
            </ul>
        </div>
    );
};

export default Countries;