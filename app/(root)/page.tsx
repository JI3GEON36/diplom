import Container from "@/shared/components/shared/container";
import Filters from "@/shared/components/shared/filters";
import ProductGroupList from "@/shared/components/shared/product-group-list";
import { Title } from "@/shared/components/shared/title";
import TopBar from "@/shared/components/shared/top-bar";
import { Suspense } from "react";
import { findPizzas, GetSearchParams } from "@/shared/lib/find-pizzas";

export default async function Home({searchParams} : {searchParams:Promise<GetSearchParams>}) {
  const params = await searchParams;
  const categories = await findPizzas(params);

  return (
    <>
    <Container className="mt-10">
      <Title size={'lg'} text="Каталог" className="font-extrabold" />
    </Container>
     <TopBar categories={categories.filter((category) => category.products.length > 0)}/>

    <Container className="mt-10 pb-14">
    <div className="flex gap-15">

      {/*фильтрация */}
      <div className="w-62.5">
      <Suspense>
      <Filters />
      </Suspense>
      </div>
      {/*фильтрация */}

      {/*список товаров */}
      <div className="flex-1">
        <div className="flex flex-col gap-16">
        {categories.map((category) =>
          category.products.length > 0 && (
          <ProductGroupList 
          key={category.id} 
          categoryId={category.id}
          title={category.name} 
          items={category.products} />
          )
        )}
        </div>
      </div>
      {/*список товаров */}
    

    </div>
    </Container>
    </>
  );
}
