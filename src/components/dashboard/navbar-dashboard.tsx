export default function NavbarDashboard() {
    return (
        <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200">
            <div className="px-3 py-3 lg:px-5 lg:pl-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center justify-between w-full">
                        <div className="flex">
                            <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200">
                                <span className="sr-only">Open sidebar</span>
                                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                                </svg>
                            </button>
                            <h1 className="text-black ml-2 md:mr-24 self-center text-xl font-bold sm:text-2xl whitespace-nowrap">ROW.CO</h1>
                        </div>

                        <button className="flex gap-4 items-center text-gray-900 bg-transparent font-medium rounded-lg text-sm text-center break-all" type="button">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 rounded-full cursor-pointer"><path d="M18 20a6 6 0 0 0-12 0" /><circle cx="12" cy="10" r="4" /><circle cx="12" cy="12" r="10" /></svg>
                            <div className="flex gap-4 items-center">
                                <div className="text-left">
                                    <p className="text-gray-900 text-xs font-bold">Admin</p>
                                    <p className="text-[10px] text-[#44435C] font-medium">Administrator</p>
                                </div>
                                <svg className="w-4 h-4" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                            </div>
                        </button>

                        <div className="w-44 bg-white rounded divide-y divide-gray-100 shadow absolute top-14 right-6">
                            <div className="py-3 px-4 text-xs text-gray-900">
                                <div>Admin</div>
                                <div className="font-medium truncate">admin@gmail.com</div>
                            </div>
                            <button className="w-full flex py-1.5 hover:bg-gray-100">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mt-1 ml-3 mr-1 text-[rgba(220,38,38,0.7)]" fill="none" viewBox="0 0 28 28" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                                <p className="py-1 text-xs text-red-600 font-medium">Log out</p>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}
