import { useEffect, useState } from "react";
import { useCountry } from ".";

export const usePrice = (price: number) => {
    const [formattedPrice, setFormattedPrice] = useState<string>('')

    const country = useCountry()

    useEffect(() => {
        if (country === 'CO') {
            setFormattedPrice(new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(price).replace(',00', ''))
        } else {
            setFormattedPrice(new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price === 25000 ? 7 : 15).replace('.00', ''))
        }
    }, [country, price])

    return formattedPrice
}