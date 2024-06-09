import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import Image from 'next/image';
import { useMutation } from 'react-query';
import { axiosInstance } from '@/lib/axios';
import useUserStore from '@/stores/userStore';
import toast from 'react-hot-toast';
import { LucideLoader2 } from 'lucide-react';
import { useFetchAccessToken } from '@/hooks/token/useFetchAccessToken';

const ImageUploader = () => {
    const [file, setFile] = useState(null);
    const [fileDataUrl, setFileDataUrl] = useState(null);
    const [modalImageOpen, setModalImageOpen] = useState<boolean>(false);
    const { userData } = useUserStore((state) => state);
    const { refetch: refetchUserData } = useFetchAccessToken();

    const handleInputChange = (e) => {
        const newFile = e.target.files[0];
        setFile(newFile);
    };

    const { mutate: onUploadImage, isLoading: uploadIsLoading } = useMutation({
        mutationKey: ["image-upload", userData?.userId],
        mutationFn: async () => {
            const formData = new FormData();
            formData.append("profile_picture", file);

            const result = await axiosInstance.patch(`/auth/user/change-profile-picture/${userData?.userId}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });

            return result?.data?.message;
        },
        onSuccess: (data) => {
            toast.success(data);
            setModalImageOpen(false);
            refetchUserData();
        },
        onError: (error) => {
            toast.error(error.response.data.message);
            console.log(error);
        }
    })

    useEffect(() => {
        if (!file) {
            return;
        }

        const reader = new FileReader()
        reader.onloadend = () => {
            setFileDataUrl(reader.result)
        }
        reader.readAsDataURL(file)
    }, [file])

    return (
        <Dialog open={modalImageOpen} onOpenChange={() => setModalImageOpen(!modalImageOpen)}>
            <DialogTrigger asChild>
                <Button variant="outline" className="font-normal text-xs">Change Image</Button>
            </DialogTrigger>
            <DialogContent className="max-w-md md:max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Change Profile Picture</DialogTitle>
                    <DialogDescription>
                        Select your image to change your profile picture.
                    </DialogDescription>
                    <section className="items-center">
                        <div className="overflow-hidden items-center">
                            <div className="px-4 py-4 md:py-6">
                                <div
                                    id="image-preview"
                                    className={`max-w-sm p-6 md:mb-4 bg-gray-100 border-dashed border-2 border-gray-400 rounded-lg items-center mx-auto text-center cursor-pointer ${file ? '' : 'border-dashed border-2 border-gray-400'
                                        }`}
                                >
                                    <input
                                        id="upload"
                                        type="file"
                                        className="hidden"
                                        accept="image/*"
                                        onChange={handleInputChange}
                                    />
                                    {fileDataUrl ? (
                                        <label htmlFor="upload" className="cursor-pointer">
                                            <div className="flex justify-center items-center">
                                                <Image src={fileDataUrl} alt="profile-image" width={200} height={200} />
                                            </div>
                                        </label>
                                    ) : (
                                        <label htmlFor="upload" className="cursor-pointer">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke-width="1.5"
                                                stroke="currentColor"
                                                className="w-8 h-8 text-gray-700 mx-auto mb-4"
                                            >
                                                <path
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                                                />
                                            </svg>
                                            <h5 className="mb-2 text-lg md:text-xl font-bold tracking-tight text-gray-700">
                                                Upload picture
                                            </h5>
                                            <p className="font-normal text-xs md:text-sm text-gray-400 md:px-6">
                                                Choose photo size should be less than <b className="text-gray-600">2mb</b>
                                            </p>
                                            <p className="font-normal text-xs md:text-sm text-gray-400 md:px-6">
                                                and should be in <b className="text-gray-600">JPG, PNG, or GIF</b> format.
                                            </p>
                                        </label>
                                    )}
                                </div>
                            </div>
                        </div>
                    </section>
                </DialogHeader>
                <Button onClick={() => onUploadImage()} className="w-full bg-black text-white text-xs rounded-lg hover:bg-gray-900">{uploadIsLoading ? (<LucideLoader2 size={16} className="animate-spin" />) : "Change Image"}</Button>
            </DialogContent>
        </Dialog>
    );
};

export default ImageUploader;