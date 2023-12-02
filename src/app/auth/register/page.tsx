import Footer from "@/components/Footer";
import Header from "@/components/Header";
import InfoTips from "@/components/InfoTips";
import Link from "next/link";

export default function page() {
    return (
        <main>
            <InfoTips />
            <Header />
            <div className="flex flex-col items-center justify-center px-6 mb-40 mx-auto md:h-screen lg:py-0">
                <h1 className="flex items-center mb-6 text-3xl font-bold text-black">ROW.CO</h1>
                <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-800 md:text-xl">
                            Create and account
                        </h1>
                        <form className="space-y-4 md:space-y-6" >
                            <div>
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Username</label>
                                <input type="text" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 focus:outline-orange-400 block w-full p-2.5" placeholder="Your name" required />
                            </div>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Email</label>
                                <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 focus:outline-orange-400 block w-full p-2.5" placeholder="name@email.com" required />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                                <input type="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 focus:outline-orange-400 block w-full p-2.5" required />
                            </div>
                            <button type="submit" className="w-full text-white bg-black hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center hover:bg-gray-900">Create an account</button>
                            <p className="text-sm font-light text-gray-500">
                                Already have an account? <Link href="/auth/login" className="font-medium text-primary-600 hover:text-gray-800 hover:underline ">Login here</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    )
}
