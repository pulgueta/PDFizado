'use client'

import { PriceCards } from "@/components/prices/card-details"
import { useCountry } from "@/hooks"

const Pricing = () => {
    const country = useCountry()

    return (
        <div className="min-h-[calc(100vh-80px)] p-4 bg-white dark:bg-[#1C1917] relative">
            <div className="w-full md:w-11/12 mx-auto my-16">
                <h1 className="text-center text-3xl md:text-5xl font-black mb-8 md:mb-8">Tenemos 3 planes para que puedas utilizar <span className="text-primary">PDF</span>izado</h1>
                <p className="text-center text-muted-foreground mb-8">*Precio en {country === 'CO' ? 'COP' : 'USD'}</p>
                <div className="flex flex-col md:flex-row md:flex-wrap w-full mx-auto gap-8">
                    <PriceCards />
                </div>
            </div>
        </div>
    )
}
export default Pricing