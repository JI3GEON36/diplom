import { FormProvider, useForm } from "react-hook-form";
import { formLoginSchema, TLoginFormValues } from "./schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Title } from "../../../title";
import FormInput from "../../../form-components/form-input";
import { Button } from "@/shared/components/ui/button";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";

interface Props {
    onClose?:VoidFunction
}

const LoginForm = ({onClose}: Props) => {
    const form = useForm<TLoginFormValues>({
        resolver:zodResolver(formLoginSchema),
        defaultValues: {
            email:'',
            password:''
        }
    })

    async function onsubmit(data: TLoginFormValues) {
       try {
        const resp = await signIn("credentials", {
            ...data,
            redirect:false
        })

        if(!resp?.ok) {
            throw Error()
        } else {
            toast.success("Вы успешно вошли в аккаунт")

            onClose?.()
        }
       } catch (e) {
        console.error('ERROR LOGIN', e)
        toast.error('Не удалось войти в аккаунт')
       }
    }

    return <FormProvider {...form}>
       <form className="flex flex-col gap-5" onSubmit={form.handleSubmit(onsubmit)}> 
            <div className="flex justify-between items-center">
                <div className="mr-2">
                <Title text="Вход в аккаунт" size="md" className="font-bold" />
                <p className="text-gray-400">Введит почту</p>
                </div>
                <img src={"/assets/images/phone-icon.png"} alt="phone-icon" width={60} height={60}/>
            </div>

            <FormInput name="email" label="E-mail" required/>
            <FormInput name="password" label="E-Пароль" type="password" required/>

            <Button loading={form.formState.isSubmitting} className="h-12 text-base" type="submit">
                Войти
            </Button>
       </form>
    </FormProvider>
}

export default LoginForm;

