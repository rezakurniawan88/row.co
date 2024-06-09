import { ProductProps } from "./product-types";

export type DataBrandProps = {
    email: string;
    id: number;
    products: ProductProps[];
    profile_picture_url: string;
    slug: string;
    username: string;
}