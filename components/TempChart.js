'use client'
import React, {useState} from 'react';
import {AreaChart, Card, Title} from "@tremor/react"


function TempChart({results}) {

    const hourData = results?.hourly.time.map(
        time => new Date(time).toLocaleString('en-US', {
            hour: 'numeric',
            hour12: false
        })
    ).slice(0, 24)
     const tempData = results.hourly?.temperature_2m.map(
        temp => temp).slice(0, 24)

    // console.log("results ::: ",results?.hourly["time"])


    const chartData = hourData.map((hour, index) => ({
        time: Number(index+1),

        "UV Index":results.hourly?.uv_index[index],

        "Temperature (C)":tempData[index],

    }))
    // console.log("chartData : ",chartData)

    const dataFormatter = (number) => `${number} °C`;
    return (
        <Card className={"mt-4"}>
            <Title>Temperature and UV Index</Title>
            <AreaChart
                className="h-72 mt-6"
                data={chartData}
                index="time"
                showLegend
                categories={["Temperature (C)","UV Index"]}
                colors={["yellow", "rose"]}
                minValue={0}
                yAxisWidth={40}

                valueFormatter={dataFormatter}

            />
        </Card>
    );
}

export default TempChart;