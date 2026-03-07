import CheckoutItemDetails from "./checkout-item-details";
import { WhiteBlock } from "./white-block";
import { ArrowRight, Package, Percent, Truck } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/shared/lib/utils";
import { Skeleton } from "../ui/skeleton";

interface Props {
    totalAmount:number,
    className?:string
    loading?:boolean,
}

const CheckoutSidebar:React.FC<Props> = ({totalAmount,className, loading}) => {

    const VAT = 15;
    const DELIVERY_PRICE = 250;
    const vatPrice = (totalAmount * VAT)/100;
    const totalPrice = totalAmount + vatPrice + DELIVERY_PRICE

return (
        <div className="w-112.5">
            <WhiteBlock className={cn("p-6 sticky top-4", className)}>
                <div className="flex flex-col gap-1">
                    <span className="text-xl">Итого</span>
                    {loading ? <Skeleton className="w-full h-8"/> :<span className="text-[34px] font-extrabold">{totalPrice} Р</span>}
                </div>

            <CheckoutItemDetails 
            title={
                <div className="flex items-center">
                <Package size={18} className="mr-2 text-gray-400"/>
                Стоимость товаров:
                </div>
            } 
            value={loading ? <Skeleton className="h-6 w-14" /> :`${totalAmount} p`}/>
            <CheckoutItemDetails 
            title={
                <div className="flex items-center">
                <Percent size={18} className="mr-2 text-gray-400"/>
                Налоги:
                </div>
            }  
            value={loading ? <Skeleton className="h-6 w-14" /> : `${vatPrice} p`}/>
            <CheckoutItemDetails 
            title={
                <div className="flex items-center">
                <Truck size={18} className="mr-2 text-gray-400"/>
                доставка:
                </div>
            }  
            value={loading ?<Skeleton className="h-6 w-14" /> : `${DELIVERY_PRICE} p`}/>


            <Button loading={loading} type="submit" className="w-full h-14 rounded-2xl mt-6 text-base font-bold" >
                Перейти к оплате
                <ArrowRight className="w-5 ml-2"/>
            </Button>
            </WhiteBlock>
           </div>
    )
}

export default CheckoutSidebar;