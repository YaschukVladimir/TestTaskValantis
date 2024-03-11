export type LoaderFunc = React.Dispatch<React.SetStateAction<boolean>>;

export type ProductsIds = ProductId[];

export type ProductId = string;

export type SetProductsToStateFunc = React.Dispatch<React.SetStateAction<Product[]>>;

export type Product = {
    brand: string | null,
    id: string,
    price: number,
    product: string,
};

export type Products = Product[] | [];

export type ParamsType = {
    brand?: string,
    name?: string,
    price?: number
}