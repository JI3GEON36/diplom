'use server';

import { prisma } from "@/prisma/prisma-client";
import { CheckoutFormValues } from "@/shared/components/shared/checkout/checkout-form-schema";
import PayOrderTemplate from "@/shared/components/shared/email-templates/pay-order";
import { VerificationUserTemplate } from "@/shared/components/shared/verif-email/verification-user";
import { getUserSession } from "@/shared/lib/get-user-session";
import { sendEmail } from "@/shared/lib/sendEmail";
import { OrderStatus, Prisma } from "@prisma/client";
import { hashSync } from "bcrypt";
import { cookies } from "next/headers";
import React from "react";

export default async function createOrder(data: CheckoutFormValues) {
    try {
        const cookieStore = cookies();
        const token = (await cookieStore).get('token')?.value

        if(!token) {
           throw new Error('token not founded')
        }

    const userCart = await prisma.cart.findFirst({
      include: {
        user: true,
        items: {
          include: {
            productItem: {
              include: {
                product: true,
              },
            },
          },
        },
      },
      where: {
        token: token,
      },
    });

    if(!userCart) {
        throw new Error('UserCart is not founded')
    }
    
    if(userCart?.totalAmount == 0) {
        throw new Error('Cart is empty')
    }

    const order = await prisma.order.create({
      data: {
        token:token,
        fullName: data.firstName + ' ' + data.lastName,
        email: data.email,
        phone: data.phone,
        address: data.address,
        comment: data.comment,
        totalAmount: userCart.totalAmount,
        status: OrderStatus.PENDING,
        items: JSON.stringify(userCart.items),
      },
    });

    await prisma.cart.update({
        where:{
            id:userCart.id
        },
        data:{
            totalAmount:0
        }
    })

    await prisma.cartItem.deleteMany({
        where:{
           cartId: userCart.id 
        }
    })

    await sendEmail(
        data.email, 
        'NIKITA DAUN HELL YEAH OPIUM/ Оплатите заказ №' + order.id, 
        React.createElement(PayOrderTemplate, {
        orderId:order.id,
        totalAmount:order.totalAmount,
        paymentUrl:'/'
       })
    )
    
    return 'https://online.sberbank.ru'

    } catch (e) {
        console.log(e)
    }
} 

export async function updateUserInfo(body: Prisma.UserUpdateInput) {
  try {
    const currentUser = await getUserSession();

    if (!currentUser) {
      throw new Error('Пользователь не найден');
    }

    const findUser = await prisma.user.findFirst({
      where: {
        id: Number(currentUser.id),
      },
    });

    await prisma.user.update({
      where: {
        id: Number(currentUser.id),
      },
      data: {
        fullName: body.fullName,
        email: body.email,
        password: body.password ? hashSync(body.password as string, 10) : findUser?.password,
      },
    });
  } catch (err) {
    console.log('Error [UPDATE_USER]', err);
    throw err;
  }
}

export async function registerUser(body: Prisma.UserCreateInput) {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: body.email,
      },
    });

    if (user) {
      if (!user.verified) {
        throw new Error('Почта не подтверждена');
      }

      throw new Error('Пользователь уже существует');
    }

    const createdUser = await prisma.user.create({
      data: {
        fullName: body.fullName,
        email: body.email,
        password: hashSync(body.password, 10),
      },
    });

    const code = Math.floor(100000 + Math.random() * 900000).toString();

    await prisma.verificationCode.create({
      data: {
        code,
        userId: createdUser.id,
      },
    });

    await sendEmail(
      createdUser.email,
      'Next Pizza / 📝 Подтверждение регистрации',
      React.createElement(VerificationUserTemplate, {
        code
      }),
    );
  } catch (err) {
    console.log('Error [CREATE_USER]', err);
    throw err;
  }
}
