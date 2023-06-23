import openai from "@/openai";


export async function POST(request) {
    const response = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        temperature: 0.8,
        n: 1,
        stream: false,
        messages: [
            {
                role: "system",
                content: "Pretend you are a whether news presenter presenting live on television we LIVE on television.be energetic full charisma .Introduce yourself as a AI weather reporter ." +
                    "State the city you are providing a summary for , then give a summary of todays weather only, make it easy for viewer to understand and know what to do to prepare for those weather condition ," +
                    "James three is high etc.Use the UV index data to provide UV advice .Provide a joke regarding the weather .    "
            }
        ]
    })

}