interface Props {
  orderId: number;
  totalAmount: number;
  paymentUrl: string;
}


const PayOrderTemplate:React.FC<Props> = ({orderId, totalAmount, paymentUrl}) => {
    return (
    <div>
        <h1>Заказ #{orderId}</h1>

        <p>Оплатите заказ на сумму {totalAmount} перейдите по <a href={paymentUrl}>этой ссылке</a> для оплаты заказа.</p>
    </div>
    )
}

export default PayOrderTemplate;