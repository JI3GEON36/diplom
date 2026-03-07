import {z} from 'zod'

export const passwordSchema = z.string().min(6, {message:'введите корректный пароль'})

export const formLoginSchema = z.object({
    email:z.email({message:'Введите корректную почту'}),
    password:passwordSchema
})

export const formRegisterSchema = formLoginSchema.merge(
    z.object({
        fullName: z.string().min(2, {message: 'Введите имя и фамилию'}),
        confirmedPassword:passwordSchema
    })
).refine(data => data.password === data.confirmedPassword, {
    message:'Пароли не совпадают',
    path:['confirmedPassword']
})

export type TLoginFormValues = z.infer<typeof formLoginSchema>
export type TRegisterFormValues = z.infer<typeof formRegisterSchema>