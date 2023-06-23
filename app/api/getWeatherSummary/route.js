import openai from "@/openai";
import {NextResponse} from "next/server";


export async function POST(request) {
    const {weatherData} = await request.json();

    const response = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        temperature: 0.8,
        n: 1,
        stream: false,
        messages: [
            {
                role: "system",
                content: "Pretend you are a whether news presenter presenting live on radio we LIVE on television.be energetic full charisma .Introduce yourself as a AI weather reporter ." +
                    "State the city you are providing a summary for , then give a summary of todays weather only, make it easy for viewer to understand and know what to do to prepare for those weather condition ," +
                    "James three is high etc.Use the UV index data to provide UV advice .Provide a joke regarding the weather .    "
            }, {
                role: "user",
                content: `Hi there ,can i get a summary of todays weather , use the following information to get th
                e weather data ${JSON.stringify(weatherData)}`,

            }
        ],

    });
    const {data} = response
    // console.log("DATA : ",data)

    return NextResponse.json(data.choices[0].message)


}