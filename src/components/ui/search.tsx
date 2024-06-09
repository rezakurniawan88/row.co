"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { LucideSearch } from "lucide-react"
import { Form, FormControl, FormField, FormItem } from "./form"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function Search() {
    const [modalOpen, isModalOpen] = useState<boolean>(false);
    const router = useRouter();

    const formSchema = z.object({
        searchQuery: z.string()
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            searchQuery: "",
        }
    });

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        router.push(`/explore?search=${values.searchQuery}`);
        isModalOpen(false);
    }

    return (
        <Dialog open={modalOpen} onOpenChange={() => isModalOpen(!modalOpen)}>
            <DialogTrigger asChild>
                <Button variant="ghost" className="p-3 mr-1 rounded-full hover:bg-slate-100 hover:bg-opacity-80">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md md:max-w-xl">
                <DialogHeader>
                    <DialogTitle>Search product</DialogTitle>
                    <DialogDescription>
                        Find what you`re looking for.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 md:space-y-8">
                        <FormField
                            control={form.control}
                            name="searchQuery"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <div className="flex items-center space-x-2">
                                            <div className="grid flex-1 gap-2">
                                                <Input id="search" placeholder="Search ..." className="flex-1 text-xs md:text-base" {...field} />
                                            </div>
                                            <Button type="submit" className="px-3">
                                                <LucideSearch size={18} />
                                            </Button>
                                        </div>
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </form>
                </Form>
                <DialogFooter className="md:justify-end mt-2 md:mt-6">
                    <h1 className="text-[0.6rem] md:text-xs">{`ROW.CO © ${new Date().getFullYear()}, All rights reserved`}</h1>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
