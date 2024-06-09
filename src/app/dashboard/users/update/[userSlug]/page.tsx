"use client"

import { useEffect, useState } from 'react'
import NavbarDashboard from '@/components/dashboard/navbar-dashboard'
import SidebarDashboard from '@/components/dashboard/sidebar-dashboard'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { dataRole } from '@/lib/data-items'
import { axiosInstance } from '@/lib/axios'
import { useMutation, useQuery } from 'react-query'
import Image from 'next/image'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { useFetchAccessToken } from '@/hooks/token/useFetchAccessToken'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import useUserStore from '@/stores/userStore'
import { LucideLoader2 } from 'lucide-react'

export default function UpdateUserPage({ params }: { params: { userSlug: string } }) {
    const router = useRouter();
    const { userData } = useUserStore((state) => state);
    const { data: dataToken } = useFetchAccessToken();

    const { data: dataUser, isLoading: dataUserIsLoading } = useQuery({
        queryKey: ["dataSingleUser", params.userSlug],
        queryFn: async () => {
            const response = await axiosInstance.get(`/auth/users/${params.userSlug}`);
            return response?.data?.data;
        },
        onError: (error) => {
            console.log(error);
        }
    })

    const [profileImage, setProfileImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(dataUser?.profile_picture_url || []);

    const formSchema = z.object({
        username: z.string(),
        email: z.string(),
        role: z.string(),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });

    const changeProfileImages = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProfileImage(e.target.files[0]);
    }

    useEffect(() => {
        form.setValue("username", dataUser?.username || "");
        form.setValue("email", dataUser?.email || "");
        form.setValue("role", dataUser?.role || "");
    }, [form, form.setValue, dataUser])

    useEffect(() => {
        if (profileImage !== null) {
            setPreviewImage(URL.createObjectURL(profileImage));
        } else {
            setPreviewImage(dataUser?.profile_picture_url || []);
        }
    }, [profileImage, dataUser])


    const { mutate: onUpdateUser, isLoading: updateUserIsLoading } = useMutation({
        mutationKey: ["updateUser"],
        mutationFn: async (values: z.infer<typeof formSchema>) => {
            const formData = new FormData();

            for (const field in values) {
                formData.append(field, (values as never)[field]);
            }

            formData.append("profile_picture", profileImage);

            const response = await axiosInstance.patch(`/auth/user/${params.userSlug}`, formData);
            return response?.data?.message;
        },
        onSuccess: (data) => {
            toast.success(data);
            router.push("/dashboard/users");
        },
        onError: (error) => {
            toast.error(error.response.data.message);
            console.log(error);

        }
    })


    const onSubmit = (values: z.infer<typeof formSchema>) => {
        onUpdateUser(values);
    }

    if (dataUserIsLoading) {
        return (
            <div className="flex h-screen">
                <LucideLoader2 className="m-auto animate-spin" size={100} />
            </div>
        )
    }

    return (
        <main>
            <NavbarDashboard />
            <SidebarDashboard />

            <div className="p-4 sm:ml-64">
                <div className="p-4 mt-14 md:mb-6">
                    <h1 className="text-2xl md:text-3xl font-bold">Update User</h1>
                </div>

                <div className="mx-5">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" encType="multipart/form-data">
                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Username</FormLabel>
                                        <FormControl>
                                            <Input placeholder="John Doe" {...field} />
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
                                            <Input placeholder="your@email.com" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="role"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Role</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={dataUser?.role || ""}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a role ..." />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {dataRole.map((role) => (
                                                    <SelectItem key={role.id} value={role.name}>{role.name}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="profile_picture"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Profile Picture</FormLabel>
                                        <div className="preview-image mt-20 flex gap-4">
                                            <Image src={previewImage} width={200} height={200} alt="profile_image" />
                                        </div>
                                        <FormControl>
                                            <Input placeholder="Input your images ..." {...field} type="file" onChange={changeProfileImages} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" className="w-full md:w-32">{updateUserIsLoading ? (<LucideLoader2 size={16} className="animate-spin" />) : "Save"}</Button>
                        </form>
                    </Form>
                </div>
            </div>
        </main>
    )
}
