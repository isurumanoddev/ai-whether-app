'use client'

import {Card, Divider, Subtitle, Text} from "@tremor/react";
import CityPicker from "@/components/CityPicker";

export default function Home() {


    return (
        <main className="min-h-screen text-gray-600 p-10
        bg-gradient-to-br from-[#394F68] to-[#183B7E] flex flex-col justify-center items-center
        ">
            <Card className={"  max-w-4xl bg-opacity-90   bg-white  rounded-lg shadow-lg p-4"}>
                <Text className={"text-5xl text-center font-bold mb-10 animate-pulse"}>Whether AI</Text>

                <Subtitle className={"text-sm text-center"}>Powered by Next js ,Open AI ,Tailwind CSS ,Tremor 2.0 + More
                    !</Subtitle>

                <Divider className={"my-10 "}/>

                <Card className="rounded-lg ring-gray-200 bg-gradient-to-br from-[#394F68] to-[#183B7E] ">
                    <CityPicker/>
                </Card>

            </Card>


        </main>
    );
}
