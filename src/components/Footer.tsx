import Image from "next/image"
import Visa from "../../public/img/brands/Visa.png"
import Mastercard from "../../public/img/brands/Mastercard.png"
import Paypal from "../../public/img/brands/Paypal.png"
import ApplePay from "../../public/img/brands/applepay.png"
import GooglePay from "../../public/img/brands/googlepay.png"

export default function Footer() {
    return (
        <footer className="relative bg-graySecondary pt-32 px-20 mt-24">
            <div className="absolute -top-1/4 w-[90%] flex justify-between bg-black py-10 px-20 rounded-2xl">
                <h1 className="text-white text-4xl font-black">STAY UPTO DATE ABOUT<br /> OUR LATEST OFFERS</h1>
                <div className="w-1/3">
                    <form>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-500">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                                </svg>
                            </div>
                            <input type="email" id="email" className="block w-full p-3 pl-11 text-xs text-gray-900 border rounded-full outline-none" placeholder="Enter your email address" required />
                        </div>
                        <button type="submit" className="w-full bg-white rounded-full p-2.5 mt-4 text-sm font-medium">Subscribe To Newsletter</button>
                    </form>
                </div>
            </div>

            <div className="flex">
                <div className="w-2/6">
                    <h1 className="font-black text-3xl">ROW.CO</h1>
                    <div className="w-2/3">
                        <p className="text-xs opacity-60 my-4">We have clothes that suits your style and which you’re proud to wear. From women to men.</p>
                    </div>
                    <div className="flex gap-2">
                        <button className="p-2 rounded-full bg-white border border-opacity-20 group hover:bg-black">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter text-black group-hover:text-white"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" /></svg>
                        </button>
                        <button className="p-2 rounded-full bg-white border border-opacity-20 group hover:bg-black">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook text-black group-hover:text-white"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
                        </button>
                        <button className="p-2 rounded-full bg-white border border-opacity-20 group hover:bg-black">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram text-black group-hover:text-white"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
                        </button>
                        <button className="p-2 rounded-full bg-white border border-opacity-20 group hover:bg-black">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-github text-black group-hover:text-white"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
                        </button>
                    </div>
                </div>

                <div className="w-2/3 flex gap-24 justify-center">
                    <div>
                        <h1 className="font-semibold tracking-[0.3rem] mb-3">COMPANY</h1>
                        <ul className="text-sm leading-9 opacity-60">
                            <li>About</li>
                            <li>Features</li>
                            <li>Works</li>
                            <li>Career</li>
                        </ul>
                    </div>
                    <div>
                        <h1 className="font-semibold tracking-[0.3rem] mb-3">HELP</h1>
                        <ul className="text-sm leading-9 opacity-60">
                            <li>Customer Support</li>
                            <li>Delivery Details</li>
                            <li>Term & Conditions</li>
                            <li>Privacy Police</li>
                        </ul>
                    </div>
                    <div>
                        <h1 className="font-semibold tracking-[0.3rem] mb-3">FAQ</h1>
                        <ul className="text-sm leading-9 opacity-60">
                            <li>Account</li>
                            <li>Manage Deliveries</li>
                            <li>Orders</li>
                            <li>Payments</li>
                        </ul>
                    </div>
                    <div>
                        <h1 className="font-semibold tracking-[0.3rem] mb-3">RESOURCES</h1>
                        <ul className="text-sm leading-9 opacity-60">
                            <li>Free Delivery</li>
                            <li>Development</li>
                            <li>How To Buy</li>
                            <li>Payments</li>
                        </ul>
                    </div>
                </div>
            </div>

            <hr className="h-[1px] my-8 bg-black border-0 opacity-10"></hr>

            <div className="flex justify-between items-center pb-10">
                <h1 className="text-xs">ROW.CO © 2023, All rights reserved</h1>
                <div className="flex gap-2">
                    <button className="bg-white py-1 px-2 rounded-md">
                        <Image src={Visa} alt="apple-pay" width={25} height={25} />
                    </button>
                    <button className="bg-white py-1 px-2 rounded-md">
                        <Image src={Mastercard} alt="apple-pay" width={25} height={25} />
                    </button>
                    <button className="bg-white py-1 px-2 rounded-md">
                        <Image src={Paypal} alt="apple-pay" width={25} height={25} />
                    </button>
                    <button className="bg-white py-1 px-2 rounded-md">
                        <Image src={ApplePay} alt="apple-pay" width={25} height={25} />
                    </button>
                    <button className="bg-white py-1 px-2 rounded-md">
                        <Image src={GooglePay} alt="apple-pay" width={25} height={25} />
                    </button>
                </div>
            </div>

        </footer>
    )
}
