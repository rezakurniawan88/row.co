import { UserProps } from "./user-types";

export type ProductProps = {
    category: string;
    colors: string[];
    description: string;
    id: number;
    images: string[];
    images_url: string[];
    price: number;
    productSold: number;
    productStock: number;
    sizes: string[];
    slug: string;
    style: string;
    title: string;
    type: string;
    userId: number;
    user: UserProps;
}