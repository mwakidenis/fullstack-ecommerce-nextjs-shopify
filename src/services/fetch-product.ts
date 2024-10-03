import { shopify, shopifyAdmin } from "@/lib/shopify";

export async function getProducts() {
  try {
    const products = await shopify.product.fetchAll();
    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    // throw error; // Re-throw the error for proper handling in the calling component
    return [];
  }
}

export async function getProduct(handle: string) {
  try {
    const product = await shopify.product.fetchByHandle(handle);
    return product;
  } catch (error) {
    console.error("Error fetching product details", error);
    throw error;
  }
}

// const productQuery = `
//   query ProductQuery($id: ID!) {
//     product(id: $id) {
//       id
//       title
//       handle
//     }
//   }
// `;

// const shopQuery = `
//   query shop {
//     shop {
//       name
//     }
//   }
// `;

// const query = `
//     {
//       products(first: 10) {
//         edges {
//           node {
//             id
//             title
//             handle
//             variants(first: 1) {
//               edges {
//                 node {
//                   price
//                 }
//               }
//             }
//           }
//         }
//       }
//     }
//   `;

// export async function getProducts() {
//   try {
//     // const products = await shopifyAdmin.product.list();
//     const products = await shopifyAdmin.request(query);
//     return products;
//   } catch (error) {
//     console.error("Error fetching productssss:", error);
//     throw error; // Re-throw the error for proper handling in the calling component
//   }
// }

// export async function getProduct(handle: string) {
//   try {
//     const product = await shopifyAdmin.request(productQuery, {
//       variables: {
//         // id: "gid://shopify/Product/9626848854309",
//         id: handle
//         // handle: handle
//       }
//     });
//     return product;
//   } catch (error) {
//     console.error("Error fetching product details", error);
//     throw error;
//   }
// }
