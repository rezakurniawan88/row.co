"use client"

import Link from "next/link"
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { LucideLoader2, LucideMailCheck } from "lucide-react"
import { useState } from "react"
import { useMutation } from "react-query"
import { axiosInstance } from "@/lib/axios"
import toast from "react-hot-toast"

export default function ForgotPasswordPage() {
    const [resetSuccess, setResetSuccess] = useState<boolean>(false);
    const [emailReset, setEmailReset] = useState<string>("");

    const formSchema = z.object({
        email: z.string().email()
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
        }
    });

    const { mutate: onForgotPassword, isLoading: forgotPasswordLoading } = useMutation({
        mutationKey: ["forgot-password"],
        mutationFn: async (values: z.infer<typeof formSchema>) => {
            const response = await axiosInstance.patch("/auth/forgot-password", values);
            return response?.data?.message;
        },
        onSuccess: (data) => {
            setResetSuccess(true);
            toast.success(data);
        },
        onError: (error) => {
            toast.error(error.response.data.message);
            console.log(error);
        }
    })

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        onForgotPassword(values);
        setEmailReset(values.email);
    }

    return (
        <main>
            <div className="flex flex-col h-screen mx-10 md:mx-0 lg:py-0">
                <div className="flex flex-auto items-center justify-center">
                    <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
                        {resetSuccess ? (
                            <div className="flex flex-col justify-center items-center p-6 space-y-4 md:space-y-6 md:p-16">
                                <LucideMailCheck className="w-10 h-10" />
                                <h1 className="text-2xl font-bold">Check your email</h1>
                                <p className="text-sm text-center">We've sent instructions on how to reset your password to <span className="font-bold text-gray-600">{emailReset}</span></p>
                                <p onClick={() => setResetSuccess(false)} className="text-sm font-semibold text-gray-500 text-center hover:underline hover:text-blue-800">
                                    Resend link
                                </p>
                            </div>
                        ) : (
                            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                <div className="flex flex-col items-center justify-center gap-2">
                                    <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                                        Forgot your password ?
                                    </h1>
                                    <p className="text-xs text-slate-400 font-semibold">Your password will be reset by email</p>
                                </div>
                                <Form {...form}>
                                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                        <FormField
                                            control={form.control}
                                            name="email"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Email</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Enter your email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 focus:outline-orange-400 block w-full p-2.5" type="email" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <Button type="submit" className="w-full text-white bg-black hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center hover:bg-gray-900">{forgotPasswordLoading ? (<LucideLoader2 size={16} className="animate-spin" />) : "Next"}</Button>
                                        <p className="text-sm font-light text-gray-500">
                                            Go back to <Link href="/auth/login" className="font-medium text-primary-600 hover:text-gray-800 hover:underline">Login</Link>
                                        </p>
                                    </form>
                                </Form>
                            </div>
                        )}
                    </div>
                </div>
                <h1 className="text-center text-sm p-5">{`ROW.CO © ${new Date().getFullYear()}, All rights reserved`}</h1>
            </div>
        </main>
    )
}
