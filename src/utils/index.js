export const capitalazeFirstLetter = (str) =>{
    if(!str) return ''
    return str.charAt(0).toUpperCase() + str.slice(1)
}

const pressure_units = 0.750062

export const getPressureMm = (hpa) =>{
    return Math.round(hpa * pressure_units)
}

export const getTime = (seconds) => {
    return new Date(seconds * 1000).toLocaleTimeString('ru-Ru', {timeZone: 'Atlantic/Reykjavik'})
}