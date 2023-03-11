// React / Redux
import { useState, useEffect } from 'react'


export const useTimestampConverter = (timestamp: number) => {
    const [convertedTime, setConvertedTime] = useState("")
  
    useEffect(() => {
      const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ]
  
      const date = new Date(timestamp)
      const day = date.getDate()
      const month = months[date.getMonth()]
      const hours = date.getHours()
      const minutes = date.getMinutes()
      const formattedHours = hours < 10 ? `0${hours}` : hours
      const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes
  
      setConvertedTime(`${day} ${month} at ${formattedHours}:${formattedMinutes}`)
    }, [timestamp])
  
    return convertedTime
  }