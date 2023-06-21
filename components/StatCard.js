'use client'
import React from 'react';
import {Card, Metric,Text} from "@tremor/react";

function StatCard({title,metric,color}) {
    return (
        <Card  decoration={"top"} decorationColor={color}>
        <Text>{title}</Text>
        <Metric>{metric}</Metric>
        </Card>
    );
}

export default StatCard;
