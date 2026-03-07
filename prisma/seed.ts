import { categories, products } from "./constants";
import {prisma} from "./prisma-client";
import { hashSync } from "bcrypt";
import { Prisma } from "@prisma/client";

const randomDecimalNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) * 10 + min * 10) / 10;
};

const generateProductItem = ({
  productId,
  type,
  size,
}: {
  productId: number;
  type?: 1 | 2;
  size?: 500 | 1000 | 2000;
}) => {
  return {
    productId,
    price: randomDecimalNumber(190, 600),
    type,
    size,
  } as Prisma.ProductItemUncheckedCreateInput;
};


async function up() {
    await prisma.user.createMany({
        data:[
            {
                fullName: 'User TEST',
                email:'user@test.ru',
                password:hashSync('111111',  10),
                verified: new Date(),
                role: 'USER'
            },
            {
                fullName: 'Admin TEST',
                email:'admin@test.ru',
                password:hashSync('111111',  10),
                verified: new Date(),
                role: 'ADMIN'
            }
        ]
    });

    await prisma.category.createMany({
        data: categories
    })

    await prisma.flavor.createMany({
    data: [
      { name: 'Клубника', imageUrl: 'https://avatars.mds.yandex.net/i?id=9d9af4fe903207e8864d2447bfc7d36c_l-5858870-images-thumbs&n=13' },
      { name: 'Шоколад', imageUrl: 'https://pcdn.goldapple.ru/p/p/19000347070/web/696d674d61696e5064708ddc5abe1da6713.jpg' },
      { name: 'Ваниль', imageUrl: 'https://ir.ozone.ru/s3/multimedia-f/6821737215.jpg' },
      { name: 'Банановый пудинг', imageUrl: 'https://avatars.mds.yandex.net/i?id=cfcd0adc67c85a6290063e9220f8e978c5718a0d-12679713-images-thumbs&n=13' },
      { name: 'Кокос', imageUrl: 'https://ir.ozone.ru/s3/multimedia-1-t/7051588553.jpg' },
      { name: 'Без вкуса', imageUrl: 'https://m.media-amazon.com/images/I/71XuNLV3uVL._AC_UL800_QL65_.jpg' },
    ]
  });

  const flavors = await prisma.flavor.findMany();


    await prisma.product.createMany({
        data: products
    })

const protein1 = await prisma.product.create({
    data: {
      name: 'Протеин1',
      imageUrl:
        'https://avatars.mds.yandex.net/get-mpic/12438903/2a00000193d0f32e8c614415dca25ae13174/orig',
      categoryId: 1,
    },
  });

  const protein2 = await prisma.product.create({
    data: {
      name: 'Протеин2',
      imageUrl:
        'https://avatars.mds.yandex.net/get-mpic/12519262/2a0000019aa673fa1371d393bc076c3ba4aa/orig',
      categoryId: 1,
    },
  });

  const protein3 = await prisma.product.create({
    data: {
      name: 'Протеин3',
      imageUrl:
        'https://avatars.mds.yandex.net/get-mpic/12280826/2a00000193aa6cdc13120e768a852413b9d6/orig',
      categoryId: 1,
    },
  });

// Для Optimum Nutrition
await prisma.productFlavor.create({
  data: {
    productId: 10,
    flavorId: 1,  // Клубника
    imageUrl: 'https://avatars.mds.yandex.net/i?id=9d9af4fe903207e8864d2447bfc7d36c_l-5858870-images-thumbs&n=13'  // ← своя картинка
  }
});

await prisma.productFlavor.create({
  data: {
    productId: 10,
    flavorId: 2,  // Шоколад
    imageUrl: 'https://main-cdn.sbermegamarket.ru/big1/hlr-system/172/057/985/812/210/40/600014840759b0.jpg'  // ← своя картинка
  }
});

await prisma.productFlavor.create({
  data: {
    productId: 10,
    flavorId: 3,  // Ваниль
    imageUrl: 'https://avatars.mds.yandex.net/i?id=1b6de1dfabbc5b7ec108b958dbfcb4e9_l-10848343-images-thumbs&n=13'  // ← своя картинка
  }
});

// Для Dymatize
await prisma.productFlavor.createMany({
  data:[
    {
    productId: 11,
    flavorId: 1,  // Клубника
    imageUrl: 'https://avatars.mds.yandex.net/get-mpic/4377400/img_id3174235824301729141.jpeg/orig'  // ← другая картинка
  },
    {
    productId: 11,
    flavorId: 2,  // Шоколад
    imageUrl: ';https://goods-photos.static1-sima-land.com/items/3998399/0/700.jpg?v=1571218219'  // ← другая картинка
  },
  ]
})

// Для Rule1
await prisma.productFlavor.createMany({
  data: [
    {
    productId: 12,
    flavorId: 1,  // Клубника
    imageUrl: 'https://avatars.mds.yandex.net/i?id=bd9baad9d9dd28110c13e81c932cc2a662d190f9-11375516-images-thumbs&n=13'  // ← третья картинка
  },
   {
    productId: 12,
    flavorId: 2,  // Шоколад
    imageUrl: 'https://main-cdn.sbermegamarket.ru/big1/hlr-system/102/655/187/682/820/58/600013239222b0.jpeg'  // ← третья картинка
  }
]
});

  await prisma.productItem.createMany({
    data: [
            // Протеин 1"
      generateProductItem({ productId: protein1.id, type: 1, size: 500 }),
      generateProductItem({ productId: protein1.id, type: 2, size: 1000 }),
      generateProductItem({ productId: protein1.id, type: 2, size: 2000 }),

      // Протеин2"
      generateProductItem({ productId: protein2.id, type: 1, size: 500 }),
      generateProductItem({ productId: protein2.id, type: 1, size: 1000 }),
      generateProductItem({ productId: protein2.id, type: 1, size: 2000 }),
      generateProductItem({ productId: protein2.id, type: 2, size: 500 }),
      generateProductItem({ productId: protein2.id, type: 2, size: 500 }),
      generateProductItem({ productId: protein2.id, type: 2, size: 1000 }),

      // Протеин 3
      generateProductItem({ productId: protein3.id, type: 1, size: 500 }),
      generateProductItem({ productId: protein3.id, type: 2, size: 1000 }),
      generateProductItem({ productId: protein3.id, type: 2, size: 2000 }),

         // Остальные продукты
      generateProductItem({ productId: 1, type: 1, size: 1000 }),
      generateProductItem({ productId: 1, type: 2, size: 2000 }),

      generateProductItem({ productId: 2, type: 2, size: 2000 }),
      generateProductItem({ productId: 2, type: 2, size: 2000 }),

      generateProductItem({ productId: 3, type: 1, size: 1000 }),
      generateProductItem({ productId: 3, type: 2, size: 500 }),

      generateProductItem({ productId: 4, type: 1, size: 500 }),
      generateProductItem({ productId: 4, type: 2, size: 2000 }),

      generateProductItem({ productId: 5 , type: 1, size: 500}),
      generateProductItem({ productId: 5 , type: 1, size: 1000}),
      generateProductItem({ productId: 5 , type: 2, size: 2000}),

      generateProductItem({ productId: 6, type: 2, size: 500 }),
      generateProductItem({ productId: 6, type: 2, size: 1000 }),
      generateProductItem({ productId: 6, type: 1, size: 1000 }),

      generateProductItem({ productId: 7, type: 1, size: 500 }),
      generateProductItem({ productId: 7, type: 1, size: 2000 }),
      generateProductItem({ productId: 7, type: 2, size: 500 }),

      generateProductItem({ productId: 8 , type: 1, size: 500}),
      generateProductItem({ productId: 8 , type: 1, size: 1000}),
      generateProductItem({ productId: 8 , type: 2, size: 1000}),

      generateProductItem({ productId: 9, type: 2, size: 500 }),
      generateProductItem({ productId: 9, type: 2, size: 2000 }),
      generateProductItem({ productId: 9, type: 1, size: 500 }),
    ]
  })

     await prisma.cart.createMany({
      data: [
        { userId: 1,
          totalAmount:0,
          token: '11111'
        },
         { userId: 2,
          totalAmount:0,
          token: '22222'
        },
      ]
    })
}

async function down() {
    await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;
       await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE`;
          await prisma.$executeRaw`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE`;
                 await prisma.$executeRaw`TRUNCATE TABLE "ProductItem" RESTART IDENTITY CASCADE`;
                  await prisma.$executeRaw`TRUNCATE TABLE "Cart" RESTART IDENTITY CASCADE`;
                   await prisma.$executeRaw`TRUNCATE TABLE "CartItem" RESTART IDENTITY CASCADE`;
                   await prisma.$executeRaw`TRUNCATE TABLE "Flavor" RESTART IDENTITY CASCADE`;
                   await prisma.$executeRaw`TRUNCATE TABLE "ProductFlavor" RESTART IDENTITY CASCADE`;
}

async function main() {
    try {
        await down();
        await up();
    } catch (e) {
        console.error(e);
    }
}

main().then(async () => {
    await prisma.$disconnect();
}).catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
})
