export type LoaderFunc = React.Dispatch<React.SetStateAction<boolean>>;

export type ProductsIds = ProductId[];

export type ProductId = string;

// export type SetProductsToStateFunc = (arg: ProductsIds) => void;

export type SetProductsToStateFunc = React.Dispatch<React.SetStateAction<never[]>>

export type Product = {
    brand: string | null,
    id: string,
    price: number,
    product: string,
}

export type Products = Product[];