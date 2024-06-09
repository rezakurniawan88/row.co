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
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import { LucideEye, LucideEyeOff, LucideLoader2 } from "lucide-react"
import { useState } from "react"

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const router = useRouter();

    const formSchema = z.object({
        email: z.string().email(),
        password: z.string(),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    });

    const { mutate: onLogin, isLoading: loginIsLoading } = useMutation({
        mutationKey: ["login"],
        mutationFn: async (values: z.infer<typeof formSchema>) => {
            const response = await axiosInstance.post("/auth/login", values, {
                withCredentials: true
            });
            return response.data.message
        },
        onSuccess: (data) => {
            toast.success(data);
            router.push("/");
        },
        onError: (error) => {
            toast.error(error.response.data.message);
        }
    })

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        onLogin(values);
    }

    return (
        <main>
            <div className="flex flex-col items-center justify-center px-6 md:mb-40 mx-auto h-screen lg:py-0">
                <h1 className="flex items-center mb-6 text-3xl font-bold text-black">ROW.CO</h1>
                <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                            Log in to your account
                        </h1>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                                                            <LucideEye size={18} className=" text-gray-400 hover:text-gray-800" />
                                                        )}
                                                    </Button>
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Link href="/auth/forgot-password" className="text-xs text-gray-500 font-medium hover:text-gray-800 hover:underline">Forgot password ?</Link>
                                <Button type="submit" className="w-full text-white bg-black hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center hover:bg-gray-900">{loginIsLoading ? (<LucideLoader2 size={16} className="animate-spin" />) : "Login"}</Button>
                                <p className="text-sm font-light text-gray-500">
                                    Don't have an account yet? <Link href="/auth/register" className="font-medium hover:text-gray-800 hover:underline">Register</Link>
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
