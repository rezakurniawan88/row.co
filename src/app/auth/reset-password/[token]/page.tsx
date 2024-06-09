"use client"

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { LucideEye, LucideEyeOff, LucideLoader2 } from "lucide-react"
import { useState } from "react"
import { useMutation } from "react-query"
import { axiosInstance } from "@/lib/axios"
import toast from "react-hot-toast"
import { useRouter } from 'next/navigation'

export default function ResetPasswordPage({ params }: { params: { token: string } }) {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

    const formSchema = z.object({
        newPassword: z.string(),
        confirmPassword: z.string(),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            newPassword: "",
            confirmPassword: "",
        }
    });

    const { mutate: onResetPassword, isLoading: resetPasswordLoading } = useMutation({
        mutationKey: ["reset-password"],
        mutationFn: async (values: z.infer<typeof formSchema>) => {
            const response = await axiosInstance.patch(`/auth/reset-password/${params.token}`, values);
            return response?.data?.message;
        },
        onSuccess: (data) => {
            router.push("/auth/login");
            toast.success(data);
        },
        onError: (error) => {
            toast.error(error.response.data.message);
            console.log(error);

        }
    })

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        onResetPassword(values);
    }

    return (
        <main>
            <div className="flex flex-col h-screen mx-10 md:mx-0 lg:py-0">
                <div className="flex flex-auto items-center justify-center">
                    <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <div className="flex flex-col items-center justify-center gap-2">
                                <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                                    Reset Password
                                </h1>
                                <p className="text-xs text-slate-400 font-semibold">Create your new password to reset the password</p>
                            </div>
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                    <FormField
                                        control={form.control}
                                        name="newPassword"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>New Password</FormLabel>
                                                <FormControl>
                                                    <div className="relative">
                                                        <Input placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 focus:outline-orange-400 block w-full p-2.5" type={showPassword ? "text" : "password"} {...field} >
                                                        </Input>
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
                                    <Button type="submit" className="w-full text-white bg-black hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center hover:bg-gray-900">{resetPasswordLoading ? (<LucideLoader2 size={16} className="animate-spin" />) : "Reset Password"}</Button>
                                </form>
                            </Form>
                        </div>
                    </div>
                </div>
                <h1 className="text-center text-sm p-5">{`ROW.CO © ${new Date().getFullYear()}, All rights reserved`}</h1>
            </div>
        </main>
    )
}
