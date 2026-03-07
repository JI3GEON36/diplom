import { Controller, useFormContext } from "react-hook-form"
import { AddressInput } from "../address-input"
import { FormTextarea } from "../form-components/form-textarea"
import { WhiteBlock } from "../white-block"
import { ErrorText } from "../error-text"

interface Props {
    className?:string
}

const CheckoutAddressForm:React.FC<Props> = ({className}) => {
    const {control} = useFormContext();
    return (
    <WhiteBlock className={className} title="3. Адрес доставки">
         <div className="flex flex-col gap-5">
            <Controller 
            control={control}
            name="address"
            render={({field, fieldState}) => <>
            <AddressInput onChange={field.onChange}/>
            {fieldState.error?.message && <ErrorText text={fieldState.error.message} />}
            </>}
            />
            <FormTextarea name="comment" className="text-base" placeholder="Комментарий к заказу" rows={5} />
        </div>
    </WhiteBlock>
    )
}

export default CheckoutAddressForm;