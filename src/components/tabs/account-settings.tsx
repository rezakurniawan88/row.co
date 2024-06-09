import useUserStore from "@/stores/userStore";
import { TabsContent } from "../ui/tabs";
import Link from "next/link";
import { Button } from "../ui/button";
import Image from "next/image";
import ImageUploader from "../image-uploader";

export default function AccountSettings() {
    const { userData } = useUserStore((state) => state);

    return (
        <TabsContent value="account">
            <div className="mt-6 border p-8 rounded-lg">
                <div>
                    <h1 className="text-xl md:text-2xl font-bold">Account Settings</h1>
                    <p className="text-xs md:text-sm text-gray-400">Your account-related information across row.co.</p>
                </div>
                <div className="space-y-4 md:space-y-6 mt-6">
                    <div className="space-y-1">
                        <h1 className="text-sm md:text-base font-semibold">Username</h1>
                        <p className="text-xs md:text-sm font-light">{userData?.username}</p>
                    </div>
                    <div className="space-y-1">
                        <h1 className="text-sm md:text-base font-semibold">Email</h1>
                        <p className="text-xs md:text-sm font-light">{userData?.email}</p>
                    </div>
                    <div className="space-y-2">
                        <h1 className="text-xs md:text-base font-semibold mb-2">Password</h1>
                        <Link href="/auth/forgot-password">
                            <Button variant="outline" className="font-normal text-xs">Change Password</Button>
                        </Link>
                    </div>
                    <div className="space-y-2">
                        <h1 className="text-sm md:text-base font-semibold">Profile Picture</h1>
                        <Image src={userData?.profile_picture_url} alt="profile" width={150} height={150} className="pb-2" />
                        <ImageUploader />
                    </div>
                </div>
            </div>
        </TabsContent>
    )
}
