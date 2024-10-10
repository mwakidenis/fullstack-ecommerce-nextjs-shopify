import { gql } from "graphql-request";

export const GET_CART_QUERY = gql`
  query getCart($id: ID!) {
    node(id: $id) {
      ... on Checkout {
        id
        webUrl
        lineItems(first: 250) {
          edges {
            node {
              id
              title
              variant {
                id
                title
                price {
                  amount
                }
                product {
                  handle
                }
                image {
                  src
                }
              }
              quantity
            }
          }
        }
        totalPriceV2 {
          amount
        }
      }
    }
  }
`;

export const CREATE_CART_MUTATION = gql`
  mutation checkoutCreate($input: CheckoutCreateInput!) {
    checkoutCreate(input: $input) {
      checkout {
        id
        webUrl
        lineItems(first: 250) {
          edges {
            node {
              id
              title
              variant {
                id
                title
                price {
                  amount
                }
                product {
                  handle
                }
                image {
                  src
                }
              }
              quantity
            }
          }
        }
        totalPriceV2 {
          amount
        }
      }
      checkoutUserErrors {
        field
        message
      }
    }
  }
`;

export const ADD_TO_CART_MUTATION = gql`
  mutation checkoutLineItemsAdd(
    $checkoutId: ID!
    $lineItems: [CheckoutLineItemInput!]!
  ) {
    checkoutLineItemsAdd(checkoutId: $checkoutId, lineItems: $lineItems) {
      checkout {
        id
        webUrl
        lineItems(first: 250) {
          edges {
            node {
              id
              title
              variant {
                id
                title
                price {
                  amount
                }
                product {
                  handle
                }
                image {
                  src
                }
              }
              quantity
            }
          }
        }
        totalPriceV2 {
          amount
        }
      }
      checkoutUserErrors {
        field
        message
      }
    }
  }
`;

export const REMOVE_FROM_CART_MUTATION = `
  mutation checkoutLineItemsRemove($checkoutId: ID!, $lineItemIds: [ID!]!) {
    checkoutLineItemsRemove(checkoutId: $checkoutId, lineItemIds: $lineItemIds) {
      checkout {
        id
        webUrl
        lineItems(first: 25) {
          edges {
            node {
              id
              title
              quantity
              variant {
                id
                title
                priceV2 {
                  amount
                }
                product {
                  handle
                }
                image {
                  src
                }
              }
            }
          }
        }
        totalPriceV2 {
          amount
        }
      }
      checkoutUserErrors {
        field
        message
      }
    }
  }
`;

export const UPDATE_CART_MUTATION = `
  mutation checkoutLineItemsUpdate($checkoutId: ID!, $lineItems: [CheckoutLineItemUpdateInput!]!) {
    checkoutLineItemsUpdate(checkoutId: $checkoutId, lineItems: $lineItems) {
      checkout {
        id
        webUrl
        lineItems(first: 25) {
          edges {
            node {
              id
              title
              quantity
              variant {
                id
                title
                priceV2 {
                  amount
                }
                product {
                  handle
                }
                image {
                  src
                }
              }
            }
          }
        }
        totalPriceV2 {
          amount
        }
      }
      checkoutUserErrors {
        field
        message
      }
    }
  }
`;