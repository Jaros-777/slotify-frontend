
export interface BusinessProfileType{
    id?:number,
    businessName: string,
    slogan: string,
    description:string,
    email: string,
    phone:number | undefined,
    websiteURL: string,
    facebookURL:string,
    profilePictureURL:string,
    backgroundPictureURL:string;
    houseNumber?: string;
    street?: string | undefined;
    city?: string;
    locationDescription:string
}