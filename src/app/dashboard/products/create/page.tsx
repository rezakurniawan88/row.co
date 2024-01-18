"use client"

import { useState } from 'react'
import NavbarDashboard from '@/components/dashboard/navbar-dashboard'
import SidebarDashboard from '@/components/dashboard/sidebar-dashboard'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Checkbox } from '@/components/ui/checkbox'
import { sizeItems, colorItems } from '@/lib/data-items'
import { axiosInstance } from '@/lib/axios'
import { useMutation } from 'react-query'
import Image from 'next/image'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'


export default function CreateProductPage() {
    const router = useRouter();
    const [multipleImages, setMultipleImages] = useState<File[]>([]);

    const formSchema = z.object({
        title: z.string().min(2).max(100),
        price: z.string(),
        description: z.string().min(2).max(400),
        category: z.string().min(3).max(20),
        colors: z.array(z.string()),
        sizes: z.array(z.string()),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            price: "0",
            description: "",
            category: "",
            colors: [],
            sizes: [],
        }
    });

    const changeMultipleImages = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            Array.from(e.target.files).map((image) => {
                setMultipleImages((prev) => prev.concat(image));
            });
        }
    }

    const createProductFn = async (values: any) => {
        const formData = new FormData();

        for (const field in values) {
            formData.append(field, (values as never)[field]);
        }

        for (const image of multipleImages) {
            formData.append("images", image);
        }

        console.log("formData", ...formData);

        const response = await axiosInstance.post("/product", formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });

        return response?.data?.message;
    }

    const { mutate: createProduct } = useMutation({
        mutationKey: ['createProduct'],
        mutationFn: createProductFn,
        onSuccess: (data) => {
            toast.success(data);
            router.push('/dashboard/products');
            // alert("Berhasil menambahkan data");
        },
        onError: (err) => {
            if (err.response.data.error === "Unexpected field") {
                toast.error("Maximum 3 images allowed");
            } else {
                toast.error(err.response.data.error);
            }
        }
    })

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        console.log("file", multipleImages);
        console.log(values);
        createProduct(values);
    }

    return (
        <main>
            <NavbarDashboard />
            <SidebarDashboard />

            <div className="p-4 sm:ml-64">
                <div className="p-4 mt-14 mb-6">
                    <h1 className="text-3xl font-bold">Create Product</h1>
                </div>

                <div className="mx-5">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" encType="multipart/form-data">
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Title</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Input your title ..." {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="price"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Price</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Input your price ..." {...field} type="number" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Input your description ..." {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="category"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Category</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Input your category ..." {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="colors"
                                render={() => (
                                    <FormItem>
                                        <div className="mb-4">
                                            <FormLabel className="text-base">Colors</FormLabel>
                                        </div>
                                        <div className="flex flex-col space-y-3">
                                            {colorItems.map((item) => (
                                                <FormField
                                                    key={item.id}
                                                    control={form.control}
                                                    name="colors"
                                                    render={({ field }) => {
                                                        return (
                                                            <FormItem
                                                                key={item.id}
                                                                className="flex space-x-1 space-y-0"
                                                            >
                                                                <FormControl>
                                                                    <Checkbox
                                                                        checked={field.value?.includes(item.id)}
                                                                        onCheckedChange={(checked) => {
                                                                            return checked
                                                                                ? field.onChange([...field.value, item.id])
                                                                                : field.onChange(
                                                                                    field.value?.filter(
                                                                                        (value) => value !== item.id
                                                                                    )
                                                                                )
                                                                        }}
                                                                    />
                                                                </FormControl>
                                                                <FormLabel className="flex items-center gap-1 font-normal">
                                                                    <div style={{ "backgroundColor": `${item.color}` }} className={`w-5 h-5 rounded-full ml-1 ${item.id === "white" && "border border-gray-800"}`}></div>
                                                                    {item.label}
                                                                </FormLabel>
                                                            </FormItem>
                                                        )
                                                    }}
                                                />
                                            ))}
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="sizes"
                                render={() => (
                                    <FormItem>
                                        <div className="mb-4">
                                            <FormLabel className="text-base">Sizes</FormLabel>
                                        </div>
                                        <div className="flex space-x-3">
                                            {sizeItems.map((item) => (
                                                <FormField
                                                    key={item.id}
                                                    control={form.control}
                                                    name="sizes"
                                                    render={({ field }) => {
                                                        return (
                                                            <FormItem
                                                                key={item.id}
                                                                className="flex flex-row items-start space-x-1 space-y-0"
                                                            >
                                                                <FormControl>
                                                                    <Checkbox
                                                                        checked={field.value?.includes(item.id)}
                                                                        onCheckedChange={(checked) => {
                                                                            return checked
                                                                                ? field.onChange([...field.value, item.id])
                                                                                : field.onChange(
                                                                                    field.value?.filter(
                                                                                        (value) => value !== item.id
                                                                                    )
                                                                                )
                                                                        }}
                                                                    />
                                                                </FormControl>
                                                                <FormLabel className="font-normal">
                                                                    {item.label}
                                                                </FormLabel>
                                                            </FormItem>
                                                        )
                                                    }}
                                                />
                                            ))}
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="image"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Images</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Input your images ..." {...field} type="file" multiple onChange={changeMultipleImages} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {/* <div className="bg-blue-400">
                                {multipleImages.map((image) => (
                                    <img src={image} alt="image" />
                                ))}
                            </div> */}
                            <Button type="submit">Submit</Button>
                        </form>
                    </Form>
                </div>
            </div>
        </main>
    )
}
