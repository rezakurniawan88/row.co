import AddressItem from "../item-address";
import ModalAddress from "../modal/modal-address";
import { TabsContent } from "../ui/tabs";

export default function AddressTabs() {
    return (
        <TabsContent value="address">
            <div className="mt-6 border p-8 rounded-lg">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-xl md:text-2xl font-bold">Address List</h1>
                        <p className="text-xs md:text-sm text-gray-400">Here you can manage your address</p>
                    </div>
                    <ModalAddress widthBtn={"w-24"} />
                </div>
                <div className="space-y-4 max-h-96 overflow-y-scroll no-scrollbar">
                    <AddressItem selectedBorder={false} />
                </div>
            </div>
        </TabsContent>
    )
}
