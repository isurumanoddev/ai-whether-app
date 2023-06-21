'use client'

import React, {useState} from 'react';
import {Country, City} from "country-state-city";
import Select from "react-select";
import {useRouter} from "next/navigation";
import {LocationCity, Public} from "@mui/icons-material";



const option = Country.getAllCountries().map(country => ({
    value: {
        longitude: country.longitude,
        latitude: country.latitude,
        isoCode: country.isoCode,

    },
    label: country.name
}))

function CityPicker() {
    const router = useRouter()

    const [selectCountry, setSelectCountry] = useState(null)
    const [selectCity, setSelectCity] = useState(null)


    const cityOption = City.getCitiesOfCountry(selectCountry?.value.isoCode).map(city => ({
        value: {
            longitude: city.longitude,
            latitude: city.latitude,
            name: city.name,
            stateCode: city.stateCode,
            countryCode: city.countryCode,
        },
        label: city.name
    }))


    const handleSelectedCountry = (option) => {
        setSelectCountry(option)
        setSelectCity(null)
    };
    const handleSelectedCity = (option) => {
        console.log("option ", option)
        setSelectCity(option)
        router.push(`/location/${option.value.name}/${option.value.longitude}/${option.value.latitude}`)

    };

    return (
        <div className={"space-y-4"}>

            <div className={"space-y-2"}>
                <div className={"flex gap-2 items-center text-white text-sm "}>
                    <Public className={"text-white"}/>
                    <label htmlFor="country">Country</label>
                </div>
                <Select
                    className={"text-sm rounded-lg"}
                    value={selectCountry}
                    options={option}
                    onChange={handleSelectedCountry}

                />
            </div>
            {selectCountry &&
                      <div className={"space-y-2"}>
                <div className={"flex gap-2 items-center text-white text-sm "}>
                    <LocationCity className={"text-white"}/>
                    <label htmlFor="country">City</label>
                </div>
                <Select
                    className={"text-sm rounded-lg"}

                    value={selectCity}
                    options={cityOption}
                    onChange={handleSelectedCity}

                />

            </div>


            }




        </div>
    );
}

export default CityPicker;
// stepzen start --dashboard=local
// stepzen start --dir=./ --endpoint=api/original-jellyfish --dashboard=local --port=5005