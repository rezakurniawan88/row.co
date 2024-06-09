import { UserProps } from "./user-types";

export type CartItemProps = {
    category: string;
    colors: string[];
    description: string;
    id: number;
    images: string[];
    images_url: string[];
    price: number;
    productQty: number;
    productSold: number;
    productStock: number;
    selectedColor: string;
    selectedSize: string;
    sizes: string[];
    slug: string;
    style: string;
    title: string;
    type: string;
    user: UserProps;
    userId: number;
};