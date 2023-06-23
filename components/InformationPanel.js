import React from 'react';
import CityPicker from "@/components/CityPicker";
import Image from "next/image";
import {weatherCodeToString} from "@/lib/WhetherCodeToString";
import {MoonIcon, SunIcon} from "@heroicons/react/20/solid";

function InformationPanel({city, lat, long, results}) {


    return (
        <div className={"p-10 bg-blue-500  bg-gradient-to-br from-[#394F68] to-[#183B7E] "}>
            <div className={"pb-5  text-white"}>
                <h1 className={"text-4xl font-bold pb-2"}>{decodeURI(city)}</h1>
                <p className={"text-sm text-gray-400"}>Long/Lat : {long} , {lat}</p>
            </div>
            <CityPicker />
            <hr className="my-8"/>
            <div className={"my-5 flex items-center justify-between  text-white"}>
                <div className={""}>
                    <p className="text-sm">
                        {
                            new Date().toLocaleString("en-GB", {
                                weekday: "long",
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            })
                        }
                    </p>
                    <p className="text-sm font-extralight">
                        Timezone :
                        {
                            Intl.DateTimeFormat().resolvedOptions().timeZone
                        }
                    </p>
                </div>
                <p className={"text-sm font-bold"}>
                    {new Date().toLocaleTimeString()}
                </p>
            </div>
            <hr className="mt-8 mb-4"/>
            <div className={"flex justify-between items-center  text-white"}>
                <div>
                    <Image
                        width={75}
                        height={75}
                        src={`https://www.weatherbit.io/static/img/icons/${weatherCodeToString[results.current_weather.weathercode]?.icon}.png`}
                        alt={`https://www.weatherbit.io/static/img/icons/${weatherCodeToString[results.current_weather.weathercode]?.icon}.png`}
                    />

                    <div className={"flex justify-between items-center  gap-8"}>
                        <p className={"text-4xl font-semibold"}>{`${results.current_weather.temperature?.toFixed(1)} °C`}</p>
                        <p className={"text-lg font-extralight"}>
                            {weatherCodeToString[results.current_weather.weathercode]?.label}
                        </p>
                    </div>
                </div>


            </div>
            <div className={"flex flex-col gap-2 mt-4 text-gray-400"}>
                <div className={"flex items-center  px-4 border border-[#6F90CD]  rounded-md py-2 bg-[#405885]"}>
                    <SunIcon className={"w-8 h-8"}/>
                    <div className={"flex justify-between items-center flex-1 pl-3"}>

                        <p className={"font-extralight"}>Sunrise</p>
                        <p className={"font-semibold"}>{new Date(results.daily.sunrise[0]).toLocaleTimeString()}</p>

                    </div>
                </div>
                <div className={"flex items-center  px-4 border border-[#6F90CD]  rounded-md py-2 bg-[#405885]"}>
                    <MoonIcon className={"w-8 h-8"}/>
                    <div className={"flex justify-between items-center flex-1 pl-3"}>

                        <p className={"font-extralight"}>Sunset</p>
                        <p className={"font-semibold"}>{new Date(results.daily.sunset[0]).toLocaleTimeString()}</p>

                    </div>
                </div>
            </div>


        </div>
    );
}

export default InformationPanel;
