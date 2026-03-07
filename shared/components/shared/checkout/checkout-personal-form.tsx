import { Input } from "../../ui/input"
import FormInput from "../form-components/form-input"
import { WhiteBlock } from "../white-block"

interface Props {
    className?:string,
}

const CheckoutPersonalForm:React.FC<Props> = ({className}) => {
    return (
        <WhiteBlock className={className} title="2. Персональные данные">
            <div className="grid grid-cols-2 gap-5">
                <FormInput className="text-base" placeholder="Имя"     name="firstName"/>
                <FormInput className="text-base" placeholder="Фамилия" name="lastName"/>
                <FormInput className="text-base" placeholder="E-mail"  name="email"/>
                <FormInput className="text-base" placeholder="Телефон" name="phone"/>     
            </div>  
        </WhiteBlock>
    )
}

export default CheckoutPersonalForm;