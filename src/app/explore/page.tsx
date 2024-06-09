"use client"

import InfoTips from "@/components/ui/info-tips"
import Header from "@/components/ui/header"
import Footer from "@/components/ui/footer"
import Link from "next/link"
import Image from "next/image"
import { useSearchParams } from "next/navigation"
import { useQuery } from "react-query"
import { axiosInstance } from "@/lib/axios"
import * as z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { colorItems, sizeItems, styleItems, typeItems } from "@/lib/data-items"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { useFilterStore } from "@/stores/filterStore"
import toast from "react-hot-toast"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { ProductProps } from "@/types/product-types"
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { LucideX } from "lucide-react"

export default function ExplorePage() {
    const query = useSearchParams();
    const [colorID, setColorID] = useState<number>(0);
    const [sizeID, setSizeID] = useState<number>(0);
    const [selectedColor, setSelectedColor] = useState<string>("");
    const [selectedSize, setSelectedSize] = useState<string>("");
    const [sortPriceID, setSortPriceID] = useState<number>(0);
    const [sortPrices, setSortPrices] = useState<boolean>(false);
    const [pages, setPages] = useState<number>(1);
    const limitPage = 5;
    const [isFiltered, setIsFiltered] = useState<boolean>(false);
    const { filterData, setFilterData } = useFilterStore((state) => state);
    const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

    const formSchema = z.object({
        type: z.string(),
        minPrice: z.coerce.number(),
        maxPrice: z.coerce.number(),
        style: z.string(),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            type: "",
            minPrice: 0,
            maxPrice: 0,
            style: "",
        }
    });

    const changeSelectedColor = (index: number, color: string) => {
        setColorID(index);
        setSelectedColor(color);
    }

    const changeSelectedSize = (index: number, size: string) => {
        setSizeID(index);
        setSelectedSize(size);
    }

    const changeSelectedSortPrices = (index: number, val: boolean) => {
        setSortPriceID(index);
        setSortPrices(val);
    }

    const handlePageChange = (newPage: number) => {
        setPages(Math.min(Math.max(newPage, 1), dataExplore?.pageCount));
    };

    const renderPaginationButtons = () => {
        const buttons = [];
        const visiblePages = 5;
        const startPage = Math.max(Math.min(dataExplore?.currentPage - Math.floor(visiblePages / 2), dataExplore?.pageCount - visiblePages + 1), 1);
        const endPage = Math.min(startPage + visiblePages - 1, dataExplore?.pageCount);

        for (let i = startPage; i <= endPage; i++) {
            const isActive = i === dataExplore?.currentPage;
            buttons.push(
                <button
                    key={i}
                    className={`flex justify-center items-center w-6 h-6 p-2 rounded-md text-[0.65rem] font-medium ${isActive ? 'bg-graySecondary text-black' : 'text-gray-500 hover:bg-graySecondary'
                        }`}
                    onClick={() => handlePageChange(i)}
                >
                    {i}
                </button>
            );
        }

        return buttons;
    };


    const { data: dataExplore, isLoading: isExploreLoading } = useQuery({
        queryKey: ['exploreData', query.get("search"), filterData, pages, isFiltered],
        queryFn: async () => {
            const allColor = colorItems.map((item) => item.id);
            const allSize = sizeItems.map((item) => item.id);

            if (!isFiltered) {
                const searchQuery = query.get("search") || "";
                const category = query.get("category") || "";

                const result = await axiosInstance.get(`/products?page=${pages}&limit=${limitPage}&search=${searchQuery}&category=${category}`);
                return result?.data;
            } else {
                const searchQuery = query.get("search") || "";
                const category = query.get("category") || "";
                const type = filterData?.type || "";
                const minPrice = filterData?.minPrice || "";
                const maxPrice = filterData?.maxPrice || "";
                const sortPrice = filterData?.sortPriceValue || "";
                const color = filterData?.selectedColor || "";
                const size = filterData?.selectedSize || "";
                const style = filterData?.style || "";

                const result = await axiosInstance.get(`/products?search=${searchQuery}&category=${category}&type=${type}&minPrice=${minPrice}&maxPrice=${maxPrice}&sortPrice=${sortPrice}&style=${style}&colors=${color || allColor}&sizes=${size || allSize}&page=${pages}&limit=${limitPage}`);

                return result?.data;
            }
        }
    });

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        const sortPriceValue = sortPrices ? "desc" : "asc";

        const filterData = {
            ...values,
            selectedColor,
            selectedSize,
            sortPriceValue
        };

        setFilterData(filterData);
        setIsFiltered(true);
        toast.success("Filters applied!");
    }

    const applyFilter = async () => {
        await form.handleSubmit(onSubmit)();
        setDrawerOpen(false);
    }

    return (
        <main>
            <InfoTips />
            <Header />
            <nav className="flex space-x-2 items-center justify-between mx-10 md:mx-16 mt-6 md:mt-8">
                <div className="flex items-center space-x-2">
                    <Link href="/">
                        <h1 className="text-sm font-light hover:underline">Home</h1>
                    </Link>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                    <h1 className="text-sm font-light hover:underline">Explore</h1>
                </div>
                <Drawer open={drawerOpen}>
                    <DrawerTrigger asChild>
                        <button onClick={() => setDrawerOpen(true)} className="bg-slate-100 p-2 rounded-full hover:bg-slate-200 md:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-black">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 13.5V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 9.75V10.5" /></svg>
                        </button>
                    </DrawerTrigger>
                    <DrawerContent className="h-full">
                        <DrawerHeader className="flex justify-between items-center mx-5">
                            <DrawerTitle>Filter</DrawerTitle>
                            <button onClick={() => setDrawerOpen(false)} className="flex justify-center items-center rounded-full w-10 h-10 hover:bg-slate-100"><LucideX /></button>
                        </DrawerHeader>
                        <ScrollArea className="max-w-md mx-10">
                            <Form {...form}>
                                <form>
                                    <FormField
                                        control={form.control}
                                        name="type"
                                        render={({ field }) => {
                                            return (
                                                <FormItem
                                                    className="my-4 mr-2"
                                                >
                                                    <FormControl>
                                                        <RadioGroup onValueChange={field.onChange} defaultValue={field.value}>
                                                            {typeItems.map((item) => (
                                                                <div key={item.id} className="flex justify-between items-center w-full">
                                                                    <Label className="text-xs text-gray-500 cursor-pointer" htmlFor={item.id} >{item.label}</Label>
                                                                    <RadioGroupItem value={item.id} id={item.id} />
                                                                </div>
                                                            ))}
                                                        </RadioGroup>
                                                    </FormControl>
                                                </FormItem>
                                            )
                                        }}
                                    />
                                    <hr className="my-4" />
                                    <div>
                                        <h1 className="text-sm font-bold">Price</h1>
                                        <div className="flex justify-center items-center space-x-3 mt-2">
                                            <FormField
                                                control={form.control}
                                                name="minPrice"
                                                render={({ field }) => (
                                                    <FormItem className="w-1/2">
                                                        <FormLabel htmlFor="minPrice" className="text-xs text-gray-500 font-medium">Min</FormLabel>
                                                        <FormControl>
                                                            <Input id="minPrice" className="w-full p-2.5 mt-1 text-xs text-gray-900 font-medium border rounded-lg bg-gray-50 outline-none" placeholder="Min price" {...field} type="number" />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <hr className="w-3 border-gray-400 rounded-full border-[0.5px] mt-6" />
                                            <FormField
                                                control={form.control}
                                                name="maxPrice"
                                                render={({ field }) => (
                                                    <FormItem className="w-1/2">
                                                        <FormLabel htmlFor="maxPrice" className="text-xs text-gray-500 font-medium">Max</FormLabel>
                                                        <FormControl>
                                                            <Input id="maxPrice" className="w-full p-2.5 mt-1 text-xs text-gray-900 font-medium border rounded-lg bg-gray-50 outline-none" placeholder="Max price" {...field} type="number" />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                    </div>
                                    <hr className="my-4" />
                                    <div>
                                        <h1 className="text-sm font-bold">Sort Prices</h1>
                                        <div className="flex gap-4 mt-4">
                                            <button type="button" key={1} onClick={() => changeSelectedSortPrices(1, false)} className={`text-xs text-gray-500 bg-graySecondary py-2.5 px-5 rounded-lg hover:text-gray-800 hover:border hover:border-slate-500 ${sortPriceID === 1 && "border border-black"}`}>Lowest Price</button>
                                            <button type="button" key={2} onClick={() => changeSelectedSortPrices(2, true)} className={`text-xs text-gray-500 bg-graySecondary py-2.5 px-5 rounded-lg hover:text-gray-800 hover:border hover:border-slate-500 ${sortPriceID === 2 && "border border-black"}`}>Highest Price</button>
                                        </div>
                                    </div>
                                    <hr className="my-4" />
                                    <div>
                                        <h1 className="text-sm font-bold">Colors</h1>
                                        <div className="flex items-center flex-wrap gap-4 mt-4">
                                            {colorItems.map((colors, index) => (
                                                <button type="button" onClick={() => changeSelectedColor(index, colors.id)} key={index} style={{ backgroundColor: `${colors.color === "army" ? "#4B5320" : colors.color}` }} className={`w-10 h-10 rounded-full cursor-pointer ${colorID === index && "border border-black"} ${colors.color === "white" && colorID !== index ? "border-2 border-slate-300" : ""}`}></button>
                                            ))}
                                        </div>
                                    </div>
                                    <hr className="my-4" />
                                    <div>
                                        <h1 className="text-sm font-bold">Sizes</h1>
                                        <div className="flex flex-wrap gap-2 mt-4">
                                            {sizeItems.map((size, index) => (
                                                <button type="button" onClick={() => changeSelectedSize(index, size.id)} key={index} className={`text-xs text-gray-500 bg-graySecondary py-1.5 px-4 rounded-full hover:text-gray-800 hover:border hover:border-slate-500 ${sizeID === index && "border border-slate-500 text-gray-800"}`}>{size.id === "s" ? "Small" : size.id === "m" ? "Medium" : size.id === "l" ? "Large" : size.id === "xl" ? "X-Large" : size.id === "xxl" ? "2X-Large" : size.id === "xxxl" ? "3X-Large" : ""}</button>
                                            ))}
                                        </div>
                                    </div>
                                    <hr className="my-4" />
                                    <div>
                                        <h1 className="text-sm font-bold">Dress Style</h1>
                                        <FormField
                                            control={form.control}
                                            name="style"
                                            render={({ field }) => {
                                                return (
                                                    <FormItem
                                                        className="my-4 mr-2"
                                                    >
                                                        <FormControl>
                                                            <RadioGroup onValueChange={field.onChange} defaultValue={field.value}>
                                                                {styleItems.map((item) => (
                                                                    <div key={item.id} className="flex justify-between items-center w-full">
                                                                        <Label className="text-xs text-gray-500 cursor-pointer" htmlFor={item.id} >{item.label}</Label>
                                                                        <RadioGroupItem value={item.id} id={item.id} />
                                                                    </div>
                                                                ))}
                                                            </RadioGroup>
                                                        </FormControl>
                                                    </FormItem>
                                                )
                                            }}
                                        />
                                    </div>
                                    <button type="button" onClick={() => {
                                        setFilterData({});
                                        form.reset();
                                        setIsFiltered(false);
                                        toast.success("Reset Successfull")
                                        setDrawerOpen(false);
                                    }} className="w-full py-3 mt-4 text-xs font-medium bg-white border rounded-full hover:bg-slate-100">Reset</button>
                                </form>
                            </Form>
                        </ScrollArea>
                        <DrawerFooter>
                            <button type="button" onClick={applyFilter}
                                className="w-full py-3 mt-4 text-xs font-medium text-white bg-black rounded-full hover:bg-gray-900">Apply Filter</button>
                        </DrawerFooter>
                    </DrawerContent>
                </Drawer>
            </nav>
            <section className="flex md:space-x-3 mx-10 md:mx-16 mt-8 mb-40">
                <div className="w-1/4 h-full p-4 border rounded-xl hidden md:block">
                    <div className="flex justify-between items-center">
                        <h1 className="text-sm font-bold">Filters</h1>
                        <button className="p-1 rounded-lg hover:bg-gray-100">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-500">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 13.5V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 9.75V10.5" /></svg>
                        </button>
                    </div>
                    <hr className="my-4" />
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField
                                control={form.control}
                                name="type"
                                render={({ field }) => {
                                    return (
                                        <FormItem
                                            className="my-4 mr-2"
                                        >
                                            <FormControl>
                                                <RadioGroup onValueChange={field.onChange} defaultValue={field.value}>
                                                    {typeItems.map((item) => (
                                                        <div key={item.id} className="flex justify-between items-center w-full">
                                                            <Label className="text-xs text-gray-500 cursor-pointer" htmlFor={item.id} >{item.label}</Label>
                                                            <RadioGroupItem value={item.id} id={item.id} />
                                                        </div>
                                                    ))}
                                                </RadioGroup>
                                            </FormControl>
                                        </FormItem>
                                    )
                                }}
                            />
                            <hr className="my-4" />
                            <div>
                                <h1 className="text-sm font-bold">Price</h1>
                                <div className="flex justify-center items-center space-x-3 mt-2">
                                    <FormField
                                        control={form.control}
                                        name="minPrice"
                                        render={({ field }) => (
                                            <FormItem className="w-1/2">
                                                <FormLabel htmlFor="minPrice" className="text-xs text-gray-500 font-medium">Min</FormLabel>
                                                <FormControl>
                                                    <Input id="minPrice" className="w-full p-2.5 mt-1 text-xs text-gray-900 font-medium border rounded-lg bg-gray-50 outline-none" placeholder="Min price" {...field} type="number" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <hr className="w-3 border-gray-400 rounded-full border-[0.5px] mt-6" />
                                    <FormField
                                        control={form.control}
                                        name="maxPrice"
                                        render={({ field }) => (
                                            <FormItem className="w-1/2">
                                                <FormLabel htmlFor="maxPrice" className="text-xs text-gray-500 font-medium">Max</FormLabel>
                                                <FormControl>
                                                    <Input id="maxPrice" className="w-full p-2.5 mt-1 text-xs text-gray-900 font-medium border rounded-lg bg-gray-50 outline-none" placeholder="Max price" {...field} type="number" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                            <hr className="my-4" />
                            <div>
                                <h1 className="text-sm font-bold">Sort Prices</h1>
                                <div className="flex gap-4 mt-4">
                                    <button type="button" key={1} onClick={() => changeSelectedSortPrices(1, false)} className={`text-xs text-gray-500 bg-graySecondary py-2.5 px-5 rounded-lg hover:text-gray-800 hover:border hover:border-slate-500 ${sortPriceID === 1 && "border border-black"}`}>Lowest Price</button>
                                    <button type="button" key={2} onClick={() => changeSelectedSortPrices(2, true)} className={`text-xs text-gray-500 bg-graySecondary py-2.5 px-5 rounded-lg hover:text-gray-800 hover:border hover:border-slate-500 ${sortPriceID === 2 && "border border-black"}`}>Highest Price</button>
                                </div>
                            </div>
                            <hr className="my-4" />
                            <div>
                                <h1 className="text-sm font-bold">Colors</h1>
                                <div className="flex items-center flex-wrap gap-4 mt-4">
                                    {colorItems.map((colors, index) => (
                                        <button type="button" onClick={() => changeSelectedColor(index, colors.id)} key={index} style={{ backgroundColor: `${colors.color === "army" ? "#4B5320" : colors.color}` }} className={`w-10 h-10 rounded-full cursor-pointer ${colorID === index && "border border-black"} ${colors.color === "white" && colorID !== index ? "border-2 border-slate-300" : ""}`}></button>
                                    ))}
                                </div>
                            </div>
                            <hr className="my-4" />
                            <div>
                                <h1 className="text-sm font-bold">Sizes</h1>
                                <div className="flex flex-wrap gap-2 mt-4">
                                    {sizeItems.map((size, index) => (
                                        <button type="button" onClick={() => changeSelectedSize(index, size.id)} key={index} className={`text-xs text-gray-500 bg-graySecondary py-1.5 px-4 rounded-full hover:text-gray-800 hover:border hover:border-slate-500 ${sizeID === index && "border border-slate-500 text-gray-800"}`}>{size.id === "s" ? "Small" : size.id === "m" ? "Medium" : size.id === "l" ? "Large" : size.id === "xl" ? "X-Large" : size.id === "xxl" ? "2X-Large" : size.id === "xxxl" ? "3X-Large" : ""}</button>
                                    ))}
                                </div>
                            </div>
                            <hr className="my-4" />
                            <div>
                                <h1 className="text-sm font-bold">Dress Style</h1>
                                <FormField
                                    control={form.control}
                                    name="style"
                                    render={({ field }) => {
                                        return (
                                            <FormItem
                                                className="my-4 mr-2"
                                            >
                                                <FormControl>
                                                    <RadioGroup onValueChange={field.onChange} defaultValue={field.value}>
                                                        {styleItems.map((item) => (
                                                            <div key={item.id} className="flex justify-between items-center w-full">
                                                                <Label className="text-xs text-gray-500 cursor-pointer" htmlFor={item.id} >{item.label}</Label>
                                                                <RadioGroupItem value={item.id} id={item.id} />
                                                            </div>
                                                        ))}
                                                    </RadioGroup>
                                                </FormControl>
                                            </FormItem>
                                        )
                                    }}
                                />
                            </div>
                            <button type="submit" className="w-full py-3 mt-4 text-xs font-medium text-white bg-black rounded-full hover:bg-gray-900">Apply Filter</button>
                            <button type="button" onClick={() => {
                                setFilterData({});
                                form.reset();
                                setIsFiltered(false);
                                toast.success("Reset Successfull")
                            }} className="w-full py-3 mt-4 text-xs font-medium bg-white border rounded-full hover:bg-slate-100">Reset</button>
                        </form>
                    </Form>
                </div>
                <div className="w-full md:w-3/4 md:px-5">
                    <div className="flex justify-between items-center">
                        <h1 className="text-2xl font-bold">Explore</h1>
                        <p className="text-xs text-gray-500">{`Showing 1-${limitPage} of ${dataExplore?.total} Products`}</p>
                    </div>
                    <div className="flex flex-wrap gap-6 py-6">
                        {dataExplore?.data?.length <= 0 ? (
                            <h1>There Are No Products</h1>
                        ) :
                            dataExplore?.data?.map((product: ProductProps) => (
                                <Link href={`/detail/${product.slug}`} key={product.id} className="w-[45%] md:w-[17rem] h-full rounded-2xl cursor-pointer">
                                    <div className="w-full">
                                        <div className="bg-grayCard w-full md:h-[17rem] rounded-2xl overflow-hidden mb-4">
                                            <Image src={product.images_url[0]} alt="outfit" width={300} height={300} className="" />
                                        </div>
                                        <h1 className="text-sm md:text-base font-semibold">{product.title}</h1>
                                        <h1 className="text-sm md:text-xl font-bold">Rp. {product.price.toLocaleString()}</h1>
                                    </div>
                                </Link>
                            ))
                        }
                        {isExploreLoading && <h1>Loading ...</h1>}
                    </div>
                    <hr className="my-6" />
                    <div className="flex justify-between items-center">
                        <button onClick={() => handlePageChange(dataExplore?.currentPage - 1)} disabled={dataExplore?.currentPage === 1} className={`border flex gap-2 text-xs font-semibold py-2 px-3 rounded-lg hover:bg-gray-100 ${dataExplore?.prevPage === null && "bg-gray-100 cursor-not-allowed"}`}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
                            Previous</button>
                        <div className="flex gap-2">
                            {renderPaginationButtons()}
                        </div>
                        <button onClick={() => handlePageChange(dataExplore?.currentPage + 1)} disabled={dataExplore?.currentPage === dataExplore?.pageCount} className={`border flex gap-2 text-xs font-semibold py-2 px-3 rounded-lg hover:bg-gray-100 ${dataExplore?.nextPage === null && "bg-gray-100 cursor-not-allowed"}`}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
                            Next</button>
                    </div>
                </div>
            </section>
            <Footer />
        </main>
    )
}
