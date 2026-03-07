import { PizzaSize, PizzaType } from "@/shared/contansts/pizza";
import { CheckoutItem } from "../checkout-item";
import { WhiteBlock } from "../white-block";
import getCartItemDetails from "@/shared/lib/get-cart-item-details";
import { CartStateitem } from "@/shared/lib/get-cart-details";
import { CheckoutItemSkeleton } from "../skeletons/checkout-item-skeleton";

interface Props {
    items:CartStateitem[],
    onClickCountButton:(id: number, quantity: number, type: "plus" | "minus") => void,
    removeCartItem:(id:number) => void,
    className?:string
}

const CheckoutCart:React.FC<Props> = ({items, className, onClickCountButton, removeCartItem}) => {
    
return (
    <WhiteBlock title="1. Корзина" className={className}>
                <div className="flex flex-col gap-5">
                    {items.map((item) => (
                    <CheckoutItem
                    key={item.id} 
                    id={item.id}
                    imageUrl={item.imageUrl}
                    name={item.name}
                    details={getCartItemDetails(
                        item.ingredients,
                        item.type as PizzaType,
                        item.pizzaSize as PizzaSize,
                      )}
                    price={item.price}
                    quantity={item.quantity}
                    disabled={item.disabled}
                    onClickCountButton={(type) => onClickCountButton(item.id, item.quantity, type)}
                    onClickRemove={() => removeCartItem(item.id)}
                    />
                    ))}
                </div>
            </WhiteBlock>
)
}

export default CheckoutCart;