import { mapProductType, ProductSize, ProductType } from "../contansts/pizza";

const getCartItemDetails = (
    type?:ProductType,
    size?:ProductSize,

) => {
  const details = [];

  if (size && type) {
    const typeName = mapProductType[type];
    details.push(`${typeName} ${size} см,`);
  }
  
  return details.join(', ')
}

export default getCartItemDetails;