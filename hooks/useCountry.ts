import { useEffect, useState } from "react"

export const useCountry = () => {
    const [country, setCountry] = useState<string>("")

    useEffect(() => {
        fetch("https://extreme-ip-lookup.com/json/")
            .then(res => res.json())
            .then(data => setCountry(data.countryCode))
            .catch(() => setCountry("CO"))
    }, [])

    return country
}