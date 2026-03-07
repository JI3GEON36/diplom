'use client'

import CheckoutSidebar from "@/shared/components/shared/checkout-sidebar";
import Container from "@/shared/components/shared/container";
import { Title } from "@/shared/components/shared/title";
import { useCart } from "@/shared/hooks/use-cart";
import {useForm, SubmitHandler, FormProvider} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import CheckoutCart from "@/shared/components/shared/checkout/checkout-cart";
import CheckoutPersonalForm from "@/shared/components/shared/checkout/checkout-personal-form";
import CheckoutAddressForm from "@/shared/components/shared/checkout/checkout-address-form";
import { checkoutFormSchema, CheckoutFormValues } from "@/shared/components/shared/checkout/checkout-form-schema";
import { cn } from "@/shared/lib/utils";
import createOrder from "@/app/actions";
import toast from "react-hot-toast";
import React from "react";

export default function CheckoutPage() {

    const {totalAmount, items, updateItemQuantity, removeCartItem, loading } = useCart();
    const [Submitting, setSubmitting] = React.useState(false)
    const form = useForm<CheckoutFormValues>({
        resolver:zodResolver(checkoutFormSchema),
        defaultValues:{
            email:'',
            firstName:'',
            lastName:'',
            phone:'',
            address:'',
            comment:'',
        }

    })

    const onClickCountButton = (id:number, quantity: number, type: 'plus' | 'minus') => {
        const newQuantity = type == 'plus' ? quantity + 1 : quantity - 1

        updateItemQuantity(id,newQuantity)
    }

    const onSubmit = async (data:CheckoutFormValues) => {
        try {
            setSubmitting(true)
            const url = await createOrder(data)

            toast.success("Заказ успешно создан!")

            if(url) {
                location.href = url;
            }
        } catch (e) {
            toast.error("Не удалось создать зака")
            setSubmitting(false)
            console.log(e)
        }
    }

    return (
        <Container className="mt-10">
            <Title text="Оформление заказа" className="font-extrabold mb-8 text-[36px]"/>
        
        <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex gap-10">
                <div className="flex flex-col gap-10 flex-1 mb-20">

                    <CheckoutCart 
                    items={items}
                    onClickCountButton={onClickCountButton}
                    removeCartItem={removeCartItem}
                    />

                    <CheckoutPersonalForm className={cn({'opacity-40 pointer-events-none': loading})}/>

                    <CheckoutAddressForm className={cn({'opacity-40 pointer-events-none': loading})}/>

                </div>

            {/*Правая часть*/}
            <CheckoutSidebar loading={loading || Submitting} totalAmount={totalAmount}/>

            </div>
        </form>
        </FormProvider>

        </Container>
    )
}