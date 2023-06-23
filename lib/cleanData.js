const cleanData = (data, city) => {
    const {current_weather, timezone, hourly, hourly_units, timezone_abbreviation,} = data
    const {temperature, time, windspeed, winddirection, weathercode} = current_weather
    const {apparent_temperature, precipitation_probability, temperature_2m, uv_index} = hourly

    return {
        current_weather: {
            temperature, time, windspeed, winddirection, weathercode
        },
        hourly: {
            precipitation_probability:precipitation_probability.slice(0,24),
            temperature_2m:temperature_2m.slice(0,24),
            uv_index: uv_index.slice(0, 24),

        },
        timezone,
        hourly_units,
        timezone_abbreviation,
        city

    }
}