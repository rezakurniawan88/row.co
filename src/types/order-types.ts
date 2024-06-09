import { UserProps } from "./user-types";

export type OrderProps = {
    id: number;
    invoiceId: string;
    createdAt: string;
    updatedAt: string;
    status: string;  
    customerInfo: CustomerInfoProps;
    totalPrice: number;
    orderItems: OrderItemProps[];
};
  
type CustomerInfoProps = {
    id: number;
    zip: string;
    city: string;
    name: string;
    email: string;
    userId: number;
    address: string;
    country: string;
    mobileNumber: string;
};

type OrderItemProps = {
    id: number;
    slug: string;
    type: string;
    user: UserProps;
    price: number;
    sizes: string[];
    style: string;
    title: string;
    colors: string[];
    images: string[];
    userId: number;
    category: string;
    images_url: string[];
    productQty: number;
    description: string;
    productSold: number;
    productStock: number;
    selectedSize: string;
    selectedColor: string;
};