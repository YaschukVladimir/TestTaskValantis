import axios from "axios";
import { BASE_URL } from "../utils/const";
import { authorizationString, calculateOffset } from "../utils/utils";
import { LoaderFunc, ProductsIds, SetProductsToStateFunc } from "../utils/types";

export function fetchProductIds(loaderFunc: LoaderFunc, setProductsToState: SetProductsToStateFunc, page: number, productsLimit: number) {
    loaderFunc(true)
    axios
      .post(
        BASE_URL,
        {
          action: 'get_ids',
          params: {
            offset: calculateOffset(page, productsLimit),
            limit: productsLimit,
          },
        },
        {
          headers: {
            'X-Auth': authorizationString,
          },
        }
      )
      .then((response) => {
        const productIds = response.data.result
        fetchProducts(productIds, loaderFunc, setProductsToState)
        loaderFunc(false)
      })
      .catch((error) => {
        console.error('Error fetching product IDs:', error)
        loaderFunc(false)
      })
  }

  function fetchProducts(productIds: ProductsIds, loaderFunc: LoaderFunc, setProductsToState: SetProductsToStateFunc) {
    loaderFunc(true)

    axios
      .post(
        BASE_URL,
        {
          action: 'get_items',
          params: { ids: productIds },
        },
        {
          headers: {
            'X-Auth': authorizationString,
          },
        }
      )
      .then((response) => {
        const products = response.data.result
        // const uniqueProducts = removeDuplicates(products, 'id')
        setProductsToState(products)
        // console.log('uniqueProducts products', uniqueProducts)
        loaderFunc(false)
      })
      .catch((error) => {
        console.error('Error fetching products:', error)
        loaderFunc(false)
      })
  }