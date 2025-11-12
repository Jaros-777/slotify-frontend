import axios, { type AxiosResponse } from "axios";
import { useData } from "../../../../AppRouter";
import { useCallback, useState } from "react";


export const useLoadServiceData = () => {

    const { serviceData, setServiceData, userToken } = useData()
    const [isDataLoading, setIsDataLoading] = useState(true)


    const loadServiceData = useCallback(async (token?: string | null) => {
        setIsDataLoading(true)
        const activeToken = token ?? userToken

        await axios.get("http://localhost:8080/service",
            {
                headers: {
                    'Authorization': `Bearer ${activeToken}`
                }
            }
        )
            .then(function (response) {
                afterResponseFunctions(response)

            }).catch(function (error) {
                console.log(error);
            })
            
    }, [serviceData])

    const afterResponseFunctions = (response: AxiosResponse) => {
        const sorted = [...response.data].sort((a, b) => a.name.localeCompare(b.name));

        const indexOfnotAssignetElement = sorted.findIndex(s => s.isEditable === false);
        const [notAssignetElement] = sorted.splice(indexOfnotAssignetElement, 1)
        sorted.unshift(notAssignetElement)

        setServiceData(sorted);
        setIsDataLoading(false)
    }
    return { loadServiceData, isDataLoading };

}