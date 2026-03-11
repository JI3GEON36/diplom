import { prisma } from "@/prisma/prisma-client";
import calcCartItemTotalPrice from "./calc-cart-item-total-price";

export const updateCartTotalAmount = async (token: string) => {
  const userCart = await prisma.cart.findFirst({
    where: { token },
    include: {
      items: {
        orderBy: { createdAt: 'desc' },
        include: {
          productItem: {
            include: {
              product: {
                include: {
                  flavors: { include: { flavor: true } }
                }
              }
            }
          }
        }
      }
    }
  });

  if (!userCart) return;

  const totalAmount = userCart.items.reduce((acc, item) => {
    return acc + calcCartItemTotalPrice(item);
  }, 0);

  const updatedCart = await prisma.cart.update({
    where: { id: userCart.id },
    data: { totalAmount },
    include: {
      items: {
        orderBy: { createdAt: 'desc' },
        include: {
          productItem: {
            include: {
              product: {
                include: {
                  flavors: { include: { flavor: true } }
                }
              }
            }
          },
          flavor: true
        }
      }
    }
  });


  updatedCart.items = updatedCart.items.map(item => {
    if (item.flavor && item.productItem?.product?.flavors) {
      const productFlavor = item.productItem.product.flavors.find(
        pf => pf.flavorId === item.flavorId
      );
      if (productFlavor) {
        item.flavor = {
          ...item.flavor,
          imageUrl: productFlavor.imageUrl
        };
      }
    }
    return item;
  });

  return updatedCart;
};