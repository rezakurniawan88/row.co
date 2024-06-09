"use client"

import NavbarDashboard from "@/components/dashboard/navbar-dashboard";
import SidebarDashboard from "@/components/dashboard/sidebar-dashboard";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { LucideEdit, LucideLoader2, LucideTrash2 } from "lucide-react";
import Link from "next/link";
import { useFetchAccessToken } from "@/hooks/token/useFetchAccessToken";
import LoadingPage from "@/components/ui/loading";
import { useFetchUsers } from "@/hooks/users/useFetchUsers";
import { useMutation } from "react-query";
import { axiosInstance } from "@/lib/axios";
import toast from "react-hot-toast";
import ModalUser from "@/components/modal/modal-user";
import { UserProps } from "@/types/user-types";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export default function UsersPage() {
    const { isLoading: loadingToken } = useFetchAccessToken();
    const { data: dataUsers, refetch: refetchUsers } = useFetchUsers();

    const { mutate: onDeleteUser, isLoading: deleteUserIsLoading } = useMutation({
        mutationKey: ["deleteUser"],
        mutationFn: async (userId) => {
            const response = await axiosInstance.delete(`/auth/user/${userId}`);
            return response?.data?.message;
        },
        onSuccess: (data) => {
            toast.success(data);
            refetchUsers();
        },
        onError: (error) => {
            toast.error(error?.response?.data?.message);
        }
    })

    return (
        <main className="relative h-screen">
            <NavbarDashboard />
            <SidebarDashboard />

            <div className="p-4 sm:ml-64">
                <div className="flex items-center justify-between p-4 mt-14">
                    <h1 className="text-2xl md:text-3xl font-bold">Users</h1>
                    <ModalUser />
                </div>

                <ScrollArea className="mb-10">
                    <Table className="relative shadow-md sm:rounded-lg mt-6">
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID</TableHead>
                                <TableHead>Username</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Role</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {dataUsers?.map((user: UserProps, index: number) => (
                                <TableRow key={user.id}>
                                    <TableCell className="text-xs md:text-sm font-medium">{index + 1}</TableCell>
                                    <TableCell className="text-xs md:text-sm">{user.username}</TableCell>
                                    <TableCell className="text-xs md:text-sm">{user.email}</TableCell>
                                    <TableCell className="text-xs md:text-sm">{user.role}</TableCell>
                                    <TableCell className="space-y-1 md:space-y-0 md:space-x-2">
                                        <Link href={`/dashboard/users/update/${user.slug}`}>
                                            <button className="bg-blue-500 p-2 text-white rounded-md hover:bg-blue-700"><LucideEdit size={16} /></button>
                                        </Link>
                                        <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                                <button className="bg-red-500 p-2 text-white rounded-md hover:bg-red-700"><LucideTrash2 size={16} /></button>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent className="max-w-md md:max-w-xl">
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                        This action cannot be undone. This will permanently delete and remove your data from our servers.
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                    <AlertDialogAction className="bg-red-500 hover:bg-red-600" onClick={() => onDeleteUser(user.id)}>{deleteUserIsLoading ? (<LucideLoader2 size={16} className="animate-spin" />) : "Delete"}</AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <ScrollBar orientation="horizontal" />
                </ScrollArea>
            </div>

            {loadingToken ? (<LoadingPage />) : null}
        </main>
    )
}
