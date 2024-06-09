"use client"

import Link from "next/link"
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useMutation } from "react-query"
import { axiosInstance } from "@/lib/axios"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import { LucideEye, LucideEyeOff, LucideLoader2 } from "lucide-react"
import { useState } from "react"

export default function RegisterPage() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
    const [fileImage, setFileImage] = useState(null);


    const formSchema = z.object({
        username: z.string().min(2).max(50),
        email: z.string().email(),
        password: z.string().min(8),
        confirmPassword: z.string().min(8),
    }).refine(
        (values) => {
            return values.password === values.confirmPassword;
        },
        {
            message: "Confirm password does not match.",
            path: ["confirmPassword"],
        }
    );

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
        }
    });

    const { mutate: onRegister, isLoading: registerIsLoading } = useMutation({
        mutationKey: ['register'],
        mutationFn: async (values: z.infer<typeof formSchema>) => {
            const formData = new FormData();

            for (const field in values) {
                formData.append(field, (values as never)[field]);
            }
            formData.append("profile_picture", fileImage);

            const response = await axiosInstance.post("/auth/register", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            return response.data.message;
        },
        onSuccess: (data) => {
            toast.success(data);
            router.push("/auth/login");
        },
        onError: (error) => {
            toast.error(error.response.data.message);
        }
    })

    const handleInputChange = (e) => {
        const newFile = e.target.files[0];
        setFileImage(newFile);
    };

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        onRegister(values);
    }

    return (
        <main>
            <div className="flex flex-col items-center justify-center px-6 my-10">
                <h1 className="flex items-center mb-6 text-3xl font-bold text-black">ROW.CO</h1>
                <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                            Create an account
                        </h1>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" encType="multipart/form-data">
                                <FormField
                                    control={form.control}
                                    name="username"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Username</FormLabel>
                                            <FormControl>
                                                <Input placeholder="John Doe" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 focus:outline-orange-400 block w-full p-2.5" type="text" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input placeholder="name@email.com" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 focus:outline-orange-400 block w-full p-2.5" type="email" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    <Input placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 focus:outline-orange-400 block w-full p-2.5" type={showPassword ? "text" : "password"} {...field} />
                                                    <Button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute top-0 right-0 bg-transparent hover:bg-transparent">
                                                        {showPassword ? (
                                                            <LucideEyeOff size={18} className="text-gray-400 hover:text-gray-800" />
                                                        ) : (
                                                            <LucideEye size={18} className="text-gray-400 hover:text-gray-800" />
                                                        )}
                                                    </Button>
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="confirmPassword"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Confirm Password</FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    <Input placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 focus:outline-orange-400 block w-full p-2.5" type={showConfirmPassword ? "text" : "password"} {...field} />
                                                    <Button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute top-0 right-0 bg-transparent hover:bg-transparent">
                                                        {showConfirmPassword ? (
                                                            <LucideEyeOff size={18} className="text-gray-400 hover:text-gray-800" />
                                                        ) : (
                                                            <LucideEye size={18} className="text-gray-400 hover:text-gray-800" />
                                                        )}
                                                    </Button>
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    name="profile_picture"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Profile Picture</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Input your images ..." {...field} type="file" onChange={handleInputChange} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <Button type="submit" className="w-full text-white bg-black hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center hover:bg-gray-900">{registerIsLoading ? (<LucideLoader2 size={16} className="animate-spin" />) : "Create an account"}</Button>
                                <p className="text-sm font-light text-gray-500">
                                    Already have an account? <Link href="/auth/login" className="font-medium text-primary-600 hover:text-gray-800 hover:underline">Login</Link>
                                </p>
                            </form>
                        </Form>
                    </div>
                </div>
            </div>
            <h1 className="text-center text-sm p-5">{`ROW.CO © ${new Date().getFullYear()}, All rights reserved`}</h1>
        </main>
    )
}
