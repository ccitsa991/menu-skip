import { gql } from "@apollo/client";

export const GET_MERCHANT = gql`
  query Merchant($merchant_id: String!) {
    merchant(merchant_id: $merchant_id) {
      id
      store_name
      storeLogoUrl
      storeCoverUrl
      branches(includeBranches: true) {
        id
        name
        location {
          latitude
          longitude
        }
      }
    }
  }
`;

export const GET_CATEGORY = gql`
  query Branch($id: ID!) {
    branch(id: $id) {
      categories {
        id
        name
      }
    }
  }
`;

export const GET_ITEMS = gql`
query Items($merchantId: String!, $categoryId: ID!, $branchId: ID!) {
    items(merchant_id: $merchantId, category_id: $categoryId, branch_id: $branchId, paginate: false) {
      __typename
      ... on ItemList {
        data {
          id
          name
          price
          calories
          itemImageUrl
          stock
           addon_groups {
             id
             name
             choices {
             id
             name
            price
           }
            }
        }
      }
    }
  }
`;
