import { Flavor } from "@prisma/client";

export interface CartItemProps {
  id:number
  imageUrl: string;
  name: string;
  details:string,
  price: number;
  disabled:boolean,
  quantity: number;
  flavor: Flavor;
}
