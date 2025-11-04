import axios from "axios";
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
                const sorted = [...response.data].sort((a, b) => a.name.localeCompare(b.name));
                setServiceData(sorted);
                setIsDataLoading(false)

            }).catch(function (error) {
                console.log(error);
            })

    }, [serviceData])
    return { loadServiceData,isDataLoading };

}