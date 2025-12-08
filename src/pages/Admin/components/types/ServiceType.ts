export interface ServiceType {
  id: string;
  name: string;
  price: number;
  duration:number;
  description: string;
  isEditable:boolean;
  servicePictureURL:string | null
}