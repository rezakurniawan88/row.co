import { LucideLoader2 } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog";
import { useLogout } from "@/hooks/users/useLogout";

export default function Logout() {
    const { mutate: onLogout, isLoading: logoutIsLoading } = useLogout();

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <div className="flex items-center hover:bg-slate-200 p-2 rounded-md cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mt-1 mr-1 text-[rgba(220,38,38,0.7)]" fill="none" viewBox="0 0 28 28" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <h1 className="text-xs md:text-sm text-red-500 hover:text-red-500">Log out</h1>
                </div>
            </AlertDialogTrigger>
            <AlertDialogContent className="max-w-md md:max-w-xl">
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure to logout?</AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction className="bg-red-500 hover:bg-red-800" onClick={() => onLogout()}>{logoutIsLoading ? (<LucideLoader2 size={16} className="animate-spin" />) : "Logout"}</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
