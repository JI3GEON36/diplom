// import { Api } from "@/shared/services/api-client"
// import React from "react"

// export const useIngredients = () => {
//     const [ingredients, setIngredients] = React.useState<Ingredient[]>([])
//     const [loading, setLoading] = React.useState(true)

//      React.useEffect(() => {
//             async function fetchIngredients() {
//                 try {
//                     setLoading(true)
//                     const ingredient = await Api.ingredients.getAll();
//                     setIngredients(ingredient)
//                 } catch (error) {
//                     console.log(error)
//                 } finally {
//                     setLoading(false)
//                 }
//             }
    
//             fetchIngredients();
//         }, [])

//     return {ingredients, loading}
// }