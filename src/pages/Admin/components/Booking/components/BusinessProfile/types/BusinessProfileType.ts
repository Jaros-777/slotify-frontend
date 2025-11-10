
export interface BusinessProfileType{
    id?:number,
    name: string,
    slogan: string,
    description:string,
    email: string,
    phone:number | undefined,
    websiteURL: string,
    facebookURL:string
}