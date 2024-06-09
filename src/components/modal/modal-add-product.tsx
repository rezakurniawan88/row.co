import { useState } from "react"
import { useForm } from 'react-hook-form';
import * as z from "zod"
import { zodResolver } from '@hookform/resolvers/zod';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { useMutation } from "react-query";
import useUserStore from "@/stores/userStore";
import { axiosInstance } from "@/lib/axios";
import { useFetchAccessToken } from "@/hooks/token/useFetchAccessToken";
import toast from "react-hot-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { categoryItems, colorItems, sizeItems, styleItems, typeItems } from "@/lib/data-items";
import { Checkbox } from "../ui/checkbox";
import { LucideLoader2 } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";

type ModalAddProductProps = {
    modalOpen: boolean;
    setModalOpen: (data: boolean) => void;
    refetchProducts: () => void;
}

export default function ModalAddProduct({ modalOpen, setModalOpen, refetchProducts }: ModalAddProductProps) {
    const [multipleImages, setMultipleImages] = useState<File[]>([]);
    const { userData } = useUserStore((state) => state);
    const { data: dataToken } = useFetchAccessToken();

    const formSchema = z.object({
        title: z.string().min(2).max(100),
        price: z.coerce.number(),
        description: z.string().min(2).max(400),
        category: z.string(),
        type: z.string(),
        style: z.string(),
        colors: z.array(z.string()),
        sizes: z.array(z.string()),
        productStock: z.coerce.number(),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            price: 0,
            description: "",
            category: "",
            type: "",
            style: "",
            colors: [],
            sizes: [],
            productStock: 0,
        }
    });

    const changeMultipleImages = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            Array.from(e.target.files).map((image) => {
                setMultipleImages((prev) => prev.concat(image));
            });
        }
    }

    const { mutate: createProduct, isLoading: createProductIsLoading } = useMutation({
        mutationKey: ['createProduct', userData?.userId],
        mutationFn: async (values: any) => {
            const formData = new FormData();

            for (const field in values) {
                formData.append(field, (values as never)[field]);
            }

            for (const image of multipleImages) {
                formData.append("images", image);
            }

            formData.append("userId", userData?.userId);

            const response = await axiosInstance.post("/product", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${dataToken}`
                }
            });

            return response?.data?.message;
        },
        onSuccess: (data) => {
            toast.success(data);
            setModalOpen(false);
            refetchProducts();
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
        createProduct(values);
    }

    return (
        <Dialog open={modalOpen} onOpenChange={() => setModalOpen(!modalOpen)}>
            <DialogTrigger asChild>
                <Button className="bg-black text-white text-xs rounded-lg hover:bg-gray-900">Create New +</Button>
            </DialogTrigger>
            <DialogContent className="max-w-md md:max-w-3xl h-[90%] md:h-full overflow-y-scroll no-scrollbar">
                <DialogHeader>
                    <DialogTitle>Create New Product</DialogTitle>
                    <DialogDescription>
                        Add your new product here. Click create when you're done.
                    </DialogDescription>
                </DialogHeader>
                <ScrollArea>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} encType="multipart/form-data">
                            <div className="flex flex-col md:flex-row gap-4 md:gap-8">
                                <div className="w-full md:w-1/2 space-y-2 md:space-y-0">
                                    <FormField
                                        control={form.control}
                                        name="title"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-xs md:text-sm">Title</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Input your title ..." className="text-xs md:text-sm" {...field} />
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
                                                <FormLabel className="text-xs md:text-sm">Price</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Input your price ..." {...field} className="text-xs md:text-sm" type="number" />
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
                                                <FormLabel className="text-xs md:text-sm">Description</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Input your description ..." className="text-xs md:text-sm" {...field} />
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
                                                <FormLabel className="text-xs md:text-sm">Category</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select a category ..." className="text-xs md:text-sm" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {categoryItems.map((category, index) => (
                                                            <SelectItem key={index} className="text-xs md:text-sm" value={category.id}>{category.label}</SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="type"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-xs md:text-sm">Type</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select a type ..." className="text-xs md:text-sm" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {typeItems.map((type, index) => (
                                                            <SelectItem key={index} className="text-xs md:text-sm" value={type.id}>{type.label}</SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="style"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-xs md:text-sm">Style</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select a style ..." className="text-xs md:text-sm" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {styleItems.map((style, index) => (
                                                            <SelectItem key={index} className="text-xs md:text-sm" value={style.id}>{style.label}</SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="w-full md:w-1/2 space-y-2">
                                    <FormField
                                        control={form.control}
                                        name="colors"
                                        render={() => (
                                            <FormItem>
                                                <div className="mb-2">
                                                    <FormLabel className="text-xs md:text-sm">Colors</FormLabel>
                                                </div>
                                                <div className="flex flex-col space-y-2">
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
                                                                        <FormLabel className="flex items-center gap-1 font-normal text-xs md:text-sm">
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
                                                <div className="mb-2">
                                                    <FormLabel className="text-xs md:text-sm">Sizes</FormLabel>
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
                                                                        <FormLabel className="font-normal text-xs md:text-sm">
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
                                        name="productStock"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Product Stock</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Input your stock ..." {...field} type="number" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        name="image"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Product Images</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Input your images ..." {...field} type="file" multiple onChange={changeMultipleImages} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                            <Button type="submit" className="w-full bg-black text-white text-xs rounded-lg hover:bg-gray-900 mt-6">{createProductIsLoading ? (<LucideLoader2 size={16} className="animate-spin" />) : "Create Product"}</Button>
                        </form>
                    </Form>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    )
}
