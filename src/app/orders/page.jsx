"use client"
import Navbar from "../../components/Navbar"
import Image from 'next/image'
import { useEffect, useLayoutEffect, useState } from 'react'
import Link from "next/link"
import { useRouter } from "next/navigation"
import { fetchOrders } from "../actions"
import { Ghost } from "lucide-react"

const Orders = () => {
    const [orders, setOrders] = useState([])
    const [tab, setTab] = useState("")
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(true)
    const [currentOrders, setCurrentOrders] = useState([])

    function formatDate(date) {
        const monthNames = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];

        const day = date.getDate();
        const month = monthNames[date.getMonth()];
        const year = date.getFullYear();
        let hours = date.getHours();
        let minutes = date.getMinutes();

        // Ensure two-digit format for hours and minutes
        hours = hours.toString().padStart(2, '0');
        minutes = minutes.toString().padStart(2, '0');

        // Determine AM/PM
        const ampm = hours >= 12 ? 'PM' : 'AM';

        // Convert to 12-hour format
        hours = (hours % 12) || 12;

        return `${day} ${month}, ${year} at ${hours}:${minutes} ${ampm}`;
    }



    useLayoutEffect(() => {
        const getOrders = async () => {
            if (!localStorage.getItem("token")) return router.push("/login")
            const c = await fetchOrders(localStorage.getItem("token"))
            if (c.success) {
                setOrders(c.orders)
                setCurrentOrders(c.orders)
                setIsLoading(false)
            }
            else {
                router.push("/login")
            }
        }
        getOrders()
    }, [])
    useEffect(() => {
        switch (tab) {
            case "Accepted":
                setCurrentOrders(orders.filter(order => order.orderStatus == "Accepted"))
                break;
            case "Pending":
                setCurrentOrders(orders.filter(order => order.orderStatus == "Pending"))
                break;
            case "Rejected":
                setCurrentOrders(orders.filter(order => order.orderStatus == "Rejected"))
                break;
            case "Cancelled":
                setCurrentOrders(orders.filter(order => order.orderStatus == "Cancelled"))
                break;
            default:
                setCurrentOrders(orders)
                break;
        }
    }, [tab])

    return (<>
        <Navbar />
        <section>
            <div className="mx-auto max-w-screen-xl px-4 mt-10 py-8 sm:px-6 sm:py-12 lg:px-8">
                <div className="mx-auto max-w-3xl">
                    <header className="text-center">
                        <h1 className="text-xl font-bold text-gray-900 sm:text-3xl">Your Orders</h1>
                    </header>


                    <div>

                        <div className="">
                            <div className="border-b border-gray-200">
                                <nav className="-mb-px flex gap-3 overflow-y-scroll tab">
                                    <button
                                        onClick={() => setTab("")}
                                        className={`shrink-0  border-gray-300 border-b-white p-3 text-sm font-medium text-gray-500  ${tab == "" && "text-sky-600 rounded-t-lg border"}`}
                                    >
                                        All
                                    </button>

                                    <button
                                        onClick={() => setTab("Accepted")}
                                        className={`shrink-0  border-gray-300 border-b-white p-3 text-sm font-medium text-gray-500  ${tab == "Accepted" && "text-sky-600 rounded-t-lg border"}`}
                                    >
                                        Accepted
                                    </button>

                                    <button
                                        onClick={() => setTab("Pending")}
                                        className={`shrink-0 border-gray-300 border-b-white p-3 text-sm text-gray-500
                                         font-medium ${tab == "Pending" && "text-sky-600 rounded-t-lg border"}`}
                                    >
                                        Pending
                                    </button>
                                    <button
                                        onClick={() => setTab("Rejected")}
                                        className={`shrink-0 border-gray-300 border-b-white p-3 text-sm text-gray-500
                                         font-medium ${tab == "Rejected" && "text-sky-600 rounded-t-lg border"}`}
                                    >
                                        Rejected
                                    </button>
                                    <button
                                        onClick={() => setTab("Cancelled")}
                                        className={`shrink-0 border-gray-300 border-b-white p-3 text-sm text-gray-500
                                         font-medium ${tab == "Cancelled" && "text-sky-600 rounded-t-lg border"}`}
                                    >
                                        Cancelled
                                    </button>
                                </nav>
                            </div>
                        </div>
                    </div>
                    <div className="mt-8">
                        <ul className="space-y-4">
                            {currentOrders && currentOrders.length > 0 ? currentOrders.map((item, index) => {
                                return <li key={index} className="flex justify-between border-[1px] p-3 rounded-lg shadow-sm hover:scale-[1.02] transition-all hover:shadow-gray-600 items-center gap-4">

                                    <div className="flex items-center space-x-2">
                                        <Image
                                            src={item.item.image}
                                            alt=""
                                            height={64}
                                            width={64}
                                            className="size-16 rounded object-cover"
                                        />
                                        <div className="flex flex-col">
                                            <Link href={`/orders/${item._id}`} className="text-sm hover:underline text-gray-900">{item.item.name}</Link>

                                            <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
                                                <div>
                                                    <dt className="inline">OrderID:{" "}</dt>
                                                    <dd className="inline">{item._id}</dd>
                                                </div>

                                            </dl>
                                            <dl className="mt-0.5 space-y-px font-medium text-[10px] text-gray-600">
                                                <div>
                                                    <dt className="inline">Date:{" "}</dt>
                                                    <dd className="inline ">{formatDate(item.date)}</dd>
                                                </div>

                                            </dl>
                                        </div>
                                    </div>

                                    <div className="flex  flex-col items-center justify-end">
                                        <div className={`${item.orderStatus == "Accepted" ? "text-white bg-green-400 px-3 py-1 rounded-full" : "text-white bg-red-400 px-3 py-1 rounded-full"} text-gray-600 transition`}>
                                            {item.orderStatus}
                                        </div>
                                        <dl className="mt-0.5 space-y-px text-[12px] text-gray-600">
                                            <div>
                                                <dt className="inline">Price:</dt>
                                                <dd className="inline">₹{item.subtotal}</dd>
                                            </div>

                                        </dl>
                                    </div>
                                </li>
                            }) : <><div className='mt-16 flex flex-col items-center gap-2'>
                                <Ghost className='h-8 w-8 text-zinc-800' />
                                <h3 className='font-semibold text-xl'>
                                    Pretty empty around here
                                </h3>
                                <p>No orders yet!</p>
                            </div></>}



                        </ul>

                    </div>
                </div>
            </div>
        </section >
    </>
    )
}

export default Orders