"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import PageLoader from '@/components/ui/pageLoader';
import UserService from '@/service/api/userService';

export default function Logs() {

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchLogs() {
            const { success, message } = await UserService.fetchActivityLogs();
            if (!success) { console.log("Error fetching logs: " + message); return; }

            let logs = [];

            for (let i = 0; i < message.length; i++) {
                const date = new Date(message[i].create_date_time);


                logs.push({
                    timeStamp: `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()} ${((date) => {
                        return `${date.getHours() % 12 || 12}:${date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()} ${date.getHours() >= 12 ? 'pm' : 'am'}`;
                    })(date)}`,
                    name: message[i].activity_by_name,
                    activity: message[i].activity
                });
            }

            console.log(logs);

            setData(logs);

            console.log(data);

            setIsLoading(false);
        }

        if (localStorage.getItem("userIdHash") == undefined || localStorage.getItem("userIdHash") == "false") { window.location.href = "/"; return; }

        if (localStorage.getItem("detailsExist") == undefined || localStorage.getItem("detailsExist") == "false") { window.location.href = "/user/details"; return; }

        fetchLogs();
    }, []);

    return (
        (
            isLoading
                ?
                <PageLoader />
                :
                <>
                    <div className="flex items-center border-b h-14 px-4">
                        <Link className="flex items-center gap-2 font-semibold text-lg md:text-xl" href="/">
                            Notes
                        </Link>
                        <nav className="hidden md:flex items-center ml-auto gap-4 md:gap-8">
                            <Link href="/dashboard" className="text-sm font-medium text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50">
                                Dashboard
                            </Link>

                        </nav>
                    </div>
                    <div className="grid min-h-screen items-start px-4 space-y-4 md:items-center md:px-10 lg:space-y-0">
                        <div className="space-y-2">
                            <h1 className="text-3xl font-bold">Activity Logs</h1>
                            <p className="text-gray-500 dark:text-gray-400">Here are the logs of user activity.</p>
                        </div>
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-black">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-md font-medium text-gray-500 uppercase tracking-wider">
                                        TimeStamp
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-md font-medium text-gray-500 uppercase tracking-wider">
                                        Name
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-md font-medium text-gray-500 uppercase tracking-wider">
                                        Activity
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-black divide-y divide-gray-200">
                                {data.map((row, index) => (
                                    <tr key={index}>
                                        <td className="px-6 py-4 whitespace-nowrap">{row.timeStamp}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{row.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{row.activity}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                    </div>
                </>
        )

    )
}