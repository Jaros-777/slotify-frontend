import { useEffect } from "react";
import { useCheckIsLogged } from "../../../Admin/components/utlis/checkIsLoged";

export const UserProfile = ()=>{

    // const { checkIsLogged, isAuthLoading } = useCheckIsLogged();

    // useEffect(() => {

    //     (async () => {
    //         const token = await checkIsLogged();
    //     })();
    // }, [])

    // if (isAuthLoading) {
    //     return <p className="mt-20">Checking authentication...</p>;
    // }

    return(
        <>
        <p>User profile</p>
        </>
    )
}