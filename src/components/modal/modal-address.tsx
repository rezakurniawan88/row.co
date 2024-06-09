"use client"

import { useEffect } from 'react'
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
import useUserStore from '@/stores/userStore';
import useFetchAddressByUserId from '@/hooks/addresses/useFetchAddressByUserId';
import { useAddressStore } from '@/stores/addressStore';
import { ScrollArea } from '../ui/scroll-area';

function ModalAddress({ widthBtn }: { widthBtn: string }) {
  const { modalOpen, setModalOpen, editMode, setEditMode, dataAddressById } = useAddressStore((state) => state);
  const { userData } = useUserStore((state) => state);
  const { data: dataAddress, refetch: refetchAddress } = useFetchAddressByUserId();

  const formSchema = z.object({
    name: z.string().min(2).max(100),
    mobileNumber: z.coerce.number(),
    email: z.string().email(),
    country: z.string().min(3).max(50),
    city: z.string(),
    zip: z.coerce.number(),
    address: z.string(),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      mobileNumber: 0,
      email: "",
      country: "",
      city: "",
      zip: 0,
      address: "",
    }
  });

  const { mutate: onAddAddress } = useMutation({
    mutationKey: ['addAddress', userData?.userId],
    mutationFn: async (values: z.infer<typeof formSchema>) => {
      const data = { ...values, userId: userData?.userId };

      const response = await axiosInstance.post('/address', data);
      return response?.data?.message;
    },
    onSuccess: (data) => {
      toast.success(data);
      setModalOpen(false);
      refetchAddress();
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    }
  });

  const { mutate: onUpdateAddress } = useMutation({
    mutationKey: ['updateAddress', userData?.userId, dataAddressById?.id],
    mutationFn: async (values: z.infer<typeof formSchema>) => {
      const data = { ...values, userId: userData?.userId };
      const response = await axiosInstance.patch(`/address/${dataAddressById?.id}`, data);
      return response?.data?.message;
    },
    onSuccess: (data) => {
      toast.success(data);
      setModalOpen(false);
      setEditMode(false);
      refetchAddress();
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    }
  });

  useEffect(() => {
    if (editMode) {
      form.setValue("name", dataAddressById?.name || "");
      form.setValue("mobileNumber", dataAddressById?.mobileNumber || 0);
      form.setValue("email", dataAddressById?.email || "");
      form.setValue("country", dataAddressById?.country || "");
      form.setValue("city", dataAddressById?.city || "");
      form.setValue("zip", dataAddressById?.zip || 0);
      form.setValue("address", dataAddressById?.address || "");
    } else {
      form.reset();
    }

  }, [form, form.setValue, dataAddressById, editMode]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (editMode) {
      onUpdateAddress(values);
    } else {
      onAddAddress(values);
    }
  };

  return (
    <Dialog open={modalOpen} onOpenChange={() => setModalOpen(!modalOpen)}>
      <DialogTrigger asChild>
        <Button onClick={() => setEditMode(false)} className={`bg-black text-white text-xs rounded-lg hover:bg-gray-900 mt-6 ${dataAddress?.length === 0 || dataAddress === undefined && "hidden"} ${widthBtn}`}>Add +</Button>
      </DialogTrigger>
      <DialogContent className="max-w-md md:max-w-2xl h-[90%] md:h-4/5 overflow-y-scroll no-scrollbar">
        <DialogHeader>
          <DialogTitle className="text-sm md:text-lg">Create New Address</DialogTitle>
          <DialogDescription className="text-xs md:text-sm">
            Add your new address here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea>
          <Form {...form}>
            <form className="w-full flex flex-col md:flex-row md:gap-8" encType="multipart/form-data">
              <div className="w-full md:w-1/2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold text-xs md:text-sm">Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" className="text-xs md:text-sm py-1" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="mobileNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold text-xs md:text-sm">Mobile Number</FormLabel>
                      <FormControl>
                        <Input placeholder="+1234567890" className="text-xs md:text-sm" {...field} type="number" />
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
                      <FormLabel className="font-semibold text-xs md:text-sm">Email</FormLabel>
                      <FormControl>
                        <Input placeholder="johndoe@gmail.com" type="email" className="text-xs md:text-sm" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold text-xs md:text-sm">Country</FormLabel>
                      <FormControl>
                        <Input placeholder="Japan" className="text-xs md:text-sm" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-full md:w-1/2">
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold text-xs md:text-sm">City</FormLabel>
                      <FormControl>
                        <Input placeholder="Tokyo" className="text-xs md:text-sm" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="zip"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold text-xs md:text-sm">ZIP</FormLabel>
                      <FormControl>
                        <Input placeholder="900100" className="text-xs md:text-sm" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold text-xs md:text-sm">Address</FormLabel>
                      <FormControl>
                        <Input placeholder="St. Goodway" className="text-xs md:text-sm" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </form>
          </Form>
        </ScrollArea>
        <Button onClick={form.handleSubmit(onSubmit)} className="w-full bg-black text-white text-xs rounded-lg hover:bg-gray-900 md:mt-6">{editMode ? "Update Address" : "Save Address"}</Button>
      </DialogContent>
    </Dialog>
  )
}

export default ModalAddress;