import { useQuery } from "@apollo/client";
import { GET_CATEGORY, GET_ITEMS, GET_MERCHANT } from "./schema.gql";

 
export const useMerchant = (merchantId) => {
    const { loading, error, data } = useQuery(GET_MERCHANT, {
      variables: { merchant_id: merchantId },
      skip: !merchantId, 
    });
  
    return { loading, error, merchant: data?.merchant };
  };


export const useCategories = (branchId) => {
  const { loading, error, data } = useQuery(GET_CATEGORY, {
    variables: { id: branchId },
    skip: !branchId, 
  });

  return { loading, error, categories: data?.branch?.categories || [] };
};


 

export const useItems = (merchantId, categoryId, branchId) => {
  const { loading, error, data } = useQuery(GET_ITEMS, {
    variables: { merchantId, categoryId, branchId },
    skip: !merchantId || !categoryId || !branchId,
  });
  return { loading, error, items: data?.items?.data || [] };
};
 



