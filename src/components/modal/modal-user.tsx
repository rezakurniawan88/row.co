"use client"

import { useState } from 'react'
import { useForm } from 'react-hook-form';
import * as z from "zod"
import { zodResolver } from '@hookform/resolvers/zod';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useMutation } from 'react-query';
import { axiosInstance } from '@/lib/axios';
import toast from 'react-hot-toast';
import { LucideEye, LucideEyeOff } from 'lucide-react';
import { useFetchUsers } from '@/hooks/users/useFetchUsers';
import useUserStore from '@/stores/userStore';

function ModalUser() {
    const { modalOpen, setModalOpen } = useUserStore((state) => state);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
    const [fileImage, setFileImage] = useState(null);
    const { refetch: refetchUsers } = useFetchUsers();

    const formSchema = z.object({
        username: z.string().min(2).max(50),
        email: z.string().email(),
        password: z.string().min(8),
        // password: z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/, {
        //     message: "Password must contain at least 8 characters, an uppercase letter, a lowercase letter, a number, and a special character (!@#$%^&*).",
        // }),
        confirmPassword: z.string().min(8),
        role: z.string()
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
            role: "USER"
        }
    });

    const { mutate: onRegister } = useMutation({
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
            setFileImage(null);
            setModalOpen(false);
            refetchUsers();
        },
        onError: (error) => {
            toast.error(error.response.data.message);
        }
    });

    const handleInputChange = (e) => {
        const newFile = e.target.files[0];
        setFileImage(newFile);
    };


    const onSubmit = (values: z.infer<typeof formSchema>) => {
        onRegister(values);
    }

    return (
        <Dialog open={modalOpen} onOpenChange={() => setModalOpen(!modalOpen)}>
            <DialogTrigger asChild>
                <Button onClick={() => setFileImage(null)} className="font-medium bg-blue-500 text-white py-2 px-4 text-sm rounded-md hover:bg-blue-700">+ Add User</Button>
            </DialogTrigger>
            <DialogContent className="max-w-md md:max-w-xl">
                <DialogHeader>
                    <DialogTitle>Create New User</DialogTitle>
                    <DialogDescription>
                        Add your new user here. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
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

                        <Button type="submit" className="w-full text-white bg-black hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center hover:bg-gray-900">Create an Account</Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default ModalUser;