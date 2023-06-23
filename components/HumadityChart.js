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

        "Relative Humadity (%)":results.hourly?.relativehumidity_2m[index],


    }))
    // console.log("chartData : ",chartData)

    const dataFormatter = (number) => `${number} °C`;
    return (
        <Card className={"mt-4"}>
            <Title>Relative Humadity</Title>
            <AreaChart
                className="h-72 mt-6"
                data={chartData}
                index="time"
                showLegend
                categories={["Relative Humadity (%)"]}
                colors={["teal"]}
                minValue={0}
                yAxisWidth={40}

                valueFormatter={dataFormatter}

            />
        </Card>
    );
}

export default TempChart;