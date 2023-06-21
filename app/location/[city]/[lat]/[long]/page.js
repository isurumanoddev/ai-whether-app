import React from 'react';


import fetchWeatherQuery from "@/graphql/queries/fetchWeatherQueries";
import {ApolloClient, InMemoryCache} from "@apollo/client";
import ColloutCard from "@/components/ColloutCard";
import StatCard from "@/components/StatCard";
import InformationPanel from "@/components/InformationPanel";
import TempChart from "@/components/TempChart";


async function getData(latitude, longitude) {

    const client = new ApolloClient({
        uri: process.env.API_URL,
        cache: new InMemoryCache(),
        headers: {
            Authorization: `apikey ${process.env.NEXT_PUBLIC_STEPZEN_API_KEY}`
        },


    })
    try {
        return await client.query({
            query: fetchWeatherQuery,
            variables: {
                current_weather: "true",
                daily: "",
                hourly: "",
                latitude: `${latitude}`,
                longitude: `${longitude}`,
                timezone: "GMT",
            },
        })
    } catch (e) {
        console.log("error ", e)
    }


}

async function weather({params: {city, lat, long}}) {





    return (
        <div className={"min-h-screen flex flex-col md:flex-row "}>


            <InformationPanel city={city} lat={lat} long={long} results={results}/>


            <div className={"p-5 flex-1 lg:px-10 "}>
                <div className={"pb-5"}>
                    <div className={"pb-5"}>
                        <h2 className={"text-xl font-bold"}>Today's Overview</h2>
                        <p className={"text-sm text-gray-400"}>Last updated at
                            : {new Date(results.current_weather.time).toLocaleString()}</p>
                    </div>
                    <div className={"m-2 mb-10"}><ColloutCard message={"This is where GPT-3.5 Summary will go !"}
                                                              warning={false}/></div>
                    <div className={"grid  grid-cols-1 lg:grid-cols-2 gap-5 m-2 "}>
                        <StatCard title={"Maximum Temperature"}
                                  metric={`${results.current_weather.temperature?.toFixed(1)} °C`}
                                  color={"orange"}
                        />
                        <StatCard title={"Minimum Temperature"}
                                  metric={`${results.current_weather.temperature?.toFixed(1)} °C`}
                                  color={"blue"}
                        />


                        <div>
                            <StatCard title={"UV Index"}
                                      metric={results.current_weather.temperature?.toFixed(1)}
                                      color={"red"}
                            />
                            {
                                Number(4) > 2 && <ColloutCard message={"UV Index is too high wear a SPF"} warning/>
                            }
                        </div>
                        <div className={"flex gap-4"}>
                            <StatCard title={"Wind Direction"}
                                      metric={results.current_weather.winddirection?.toFixed(1)}
                                      color={"cyan"}
                            />
                            <StatCard title={"Wind Speed"}
                                      metric={`${results.current_weather.windspeed?.toFixed(1)} m/s`}
                                      color={"violet"}
                            />

                        </div>
                    </div>

                    <TempChart className={" p-4 lg:px-10"} results={results}/>
                </div>


            </div>


        </div>
    );
}

export default weather;