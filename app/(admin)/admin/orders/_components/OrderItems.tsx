export const OrderItems = ({ items }: { items: any }) => {
  const parsed = typeof items === 'string' ? JSON.parse(items) : items

  if (!parsed || !Array.isArray(parsed) || parsed.length === 0) {
    return <p className="text-gray-500">Нет товаров в заказе</p>
  }

  return (
    <div className="divide-y">
      {parsed.map((item: any, idx: number) => (
        <div key={idx} className="flex justify-between py-2">
          <div>
            {/* Имя — внутри productItem.product */}
            <p className="font-medium">{item.productItem?.product?.name || 'Товар'}</p>
            <p className="text-sm text-gray-500">
              {item.productItem?.size && `${item.productItem.size} г, `}
              {/* Вкус — надо доставать отдельно, его тут нет! */}
            </p>
          </div>
          <div className="text-right">
            <p>{item.productItem?.price || 0} ₽</p>
            <p className="text-sm text-gray-500">x {item.quantity || 1}</p>
          </div>
        </div>
      ))}
      <div className="flex justify-between pt-4 font-bold">
        <span>Итого</span>
        <span>
          {parsed.reduce((acc: number, i: any) => 
            acc + (i.productItem?.price || 0) * (i.quantity || 1), 0
          )} ₽
        </span>
      </div>
    </div>
  )
}