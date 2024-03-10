import axios from "axios";
import { BASE_URL } from "../utils/const";
import { authorizationString, calculateOffset } from "../utils/utils";
import { LoaderFunc, Product, ProductsIds, SetProductsToStateFunc } from "../utils/types";

const сachedProducts = new Map<string, Product>();

export function fetchProductIds(loaderFunc: LoaderFunc, setProductsToState: SetProductsToStateFunc, page: number, productsLimit: number):void {
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
        const productIds = response.data.result;

        fetchProducts(productIds, loaderFunc, setProductsToState);
      })
      .catch((error) => {
        console.error('Error fetching product IDs:', error)
        loaderFunc(false)
      })
  }

  function fetchProducts(productIds: ProductsIds, loaderFunc: LoaderFunc, setProductsToState: SetProductsToStateFunc):void {
    loaderFunc(true)
    const resultProducts: Product[] = [];
    const idsToFetch: string[] = [];
    productIds.forEach((id) => {
      if (сachedProducts.has(id)) {
        resultProducts.push(сachedProducts.get(id));
      } else {
        idsToFetch.push(id);
      }
    })

    if (idsToFetch.length) {
      axios
      .post(
        BASE_URL,
        {
          action: 'get_items',
          params: { ids: idsToFetch },
        },
        {
          headers: {
            'X-Auth': authorizationString,
          },
        }
      )
      .then((response) => {
        const products: Product[] = response.data.result;
        products.forEach((product) => {
          сachedProducts.set(product.id, product);
        })
        setProductsToState([...products, ...resultProducts]);
        loaderFunc(false);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
        loaderFunc(false);
      })
    } else {
      setProductsToState(resultProducts);
      loaderFunc(false);
    }
  }

export function fetchFilteredProductsbyPrice(loaderFunc: LoaderFunc, setProductsToState: SetProductsToStateFunc, price: number ):void {
  loaderFunc(true);
  axios
  .post(
    BASE_URL,
    {
      action: 'filter',
      params: {'price': price}
  },
    {
      headers: {
        'X-Auth': authorizationString,
      },
    }
  )
  .then((response) => {
    const productIds = response.data.result;
    fetchProducts(productIds, loaderFunc, setProductsToState);
  })
  .catch((error) => {
    console.error('Error fetching product IDs:', error);
    loaderFunc(false);
  })
}

export function fetchFilteredProductsbyBrand(loaderFunc: LoaderFunc, setProductsToState: SetProductsToStateFunc, brand: string ): void {
  loaderFunc(true);
  axios
  .post(
    BASE_URL,
    {
      action: 'filter',
      params: {'brand': brand}
  },
    {
      headers: {
        'X-Auth': authorizationString,
      },
    }
  )
  .then((response) => {
    const productIds = response.data.result;
    fetchProducts(productIds, loaderFunc, setProductsToState);
  })
  .catch((error) => {
    console.error('Error fetching product IDs:', error);
    loaderFunc(false);
  })
}

export function fetchFilteredProductsbyName(loaderFunc: LoaderFunc, setProductsToState: SetProductsToStateFunc, name: string ): void {
  loaderFunc(true);
  axios
  .post(
    BASE_URL,
    {
      action: 'filter',
      params: {'name': name}
  },
    {
      headers: {
        'X-Auth': authorizationString,
      },
    }
  )
  .then((response) => {
    const productIds = response.data.result
    fetchProducts(productIds, loaderFunc, setProductsToState);
  })
  .catch((error) => {
    console.error('Error fetching product IDs:', error);
    loaderFunc(false)
  })
}
