import React from 'react';


import fetchWeatherQuery from "@/graphql/queries/fetchWeatherQueries";
import {ApolloClient, InMemoryCache} from "@apollo/client";
import ColloutCard from "@/components/ColloutCard";
import StatCard from "@/components/StatCard";
import InformationPanel from "@/components/InformationPanel";
import TempChart from "@/components/TempChart";
import RainChart from "@/components/RainChart";
import HumadityChart from "@/components/HumadityChart";



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
                daily: "temperature_2m_max,temperature_2m_min,sunset,sunrise",
                hourly: "precipitation_probability,temperature_2m,uv_index,relativehumidity_2m",
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


    const {data} = await getData(lat, long)
    const results = data?.myQuery
    // console.log("results  ------  ", results)

    const dataToSend = cleanData(results,city)



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
                                  metric={`${results.daily.temperature_2m_max[0]?.toFixed(1)} °C`}
                                  color={"orange"}
                        />
                        <StatCard title={"Minimum Temperature"}
                                  metric={`${results.daily.temperature_2m_min[0]?.toFixed(1)} °C`}
                                  color={"blue"}
                        />


                        <div>
                            <StatCard title={"UV Index"}
                                      metric={results.hourly.uv_index[12]?.toFixed(1)}
                                      color={"red"}
                            />
                            {
                                Number(results.hourly.uv_index[12])  > 5  ?  <ColloutCard message={"UV Index is too high wear a SPF"} warning/> :
                                     <ColloutCard message={"UV Index is Normal levels "} />
                            }
                        </div>
                        <div className={"flex gap-4"}>
                            <StatCard title={"Wind Direction"}
                                      metric={`${results.current_weather.winddirection?.toFixed(1)}°`}
                                      color={"cyan"}
                            />
                            <StatCard title={"Wind Speed"}
                                      metric={`${results.current_weather.windspeed?.toFixed(1)} m/s`}
                                      color={"violet"}
                            />

                        </div>
                    </div>

                    <TempChart className={" p-4 lg:px-10"} results={results}/>
                    <RainChart className={" p-4 lg:px-10"} results={results}/>
                    <HumadityChart className={" p-4 lg:px-10"} results={results}/>

                </div>


            </div>


        </div>
    );
}

export default weather;