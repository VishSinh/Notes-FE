"use client";

import Link from "next/link"
import { useEffect, useState } from "react"
import UserService from "@/service/api/userService"
import PageLoader from "@/components/ui/pageLoader";

export default function Profile() {

    const [isLoading, setIsLoading] = useState(true);

    const [userProfile, setUserProfile] = useState({ name: "", bio: "", profilePicture: "", age: 0, userIdHash: "" });

    useEffect(() => {

        async function fetchUserDetails() {
            // Fetch user details
            const { success, message } = await UserService.getOwnDetails();
            if (!success) { console.log("Error fetching user details: " + message); return; }

            let response = message;

            // Set user details
            setUserProfile({
                name: response.name,
                bio: response.bio,
                profilePicture: response.profile_picture,
                age: response.age,
                userIdHash: response.user_id_hash,
                noOfNotes: response.no_of_notes
            });

            setIsLoading(false);

        }

        if (localStorage.getItem("userIdHash") == undefined || localStorage.getItem("userIdHash") == "false") { window.location.href = "/"; return; }

        fetchUserDetails();


    }, []);

    const handleOnLogout = () => {
        localStorage.removeItem('userIdHash')
        localStorage.removeItem('token')
        localStorage.removeItem('isAdmin')
        localStorage.removeItem('detailsExist')

        window.location.href = '/'
        
    }


    return (
        (
            isLoading
                ?
                <PageLoader />
                :
                <div className="flex flex-col h-screen">
                    <div className="flex items-center border-b h-14 px-4">
                        <Link className="flex items-center gap-2 font-semibold text-lg md:text-xl" href="/">
                            Notes
                        </Link>
                        <nav className="hidden md:flex items-center ml-auto gap-4 md:gap-8">
                            <Link href="/dashboard" className="text-sm font-medium text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50">
                                Dashboard
                            </Link>
                            <button onClick={handleOnLogout} className="text-sm font-medium text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50">
                                Logout
                            </button>
                        </nav>
                    </div>
                    <div className="flex h-screen flex-col items-center justify-center gap-6 bg-gradient-to-br ">

                        <img
                            alt="Avatar"
                            className="rounded-full border-4 border-white dark:border-green-500 mb-24"
                            height="150"
                            src={userProfile.profilePicture}
                            style={{
                                aspectRatio: "150/150",
                                objectFit: "cover",
                            }}
                            width="150"
                        />
                        <div className="space-y-1 text-center">
                            <h1 className="font-bold text-4xl kCream">{userProfile.name}</h1>
                            <p className="text-1xl text-gray-200 dark:text-gray-300">{userProfile.age} years old</p>
                        </div>

                        <div className="flex items-center gap-2">
                            <h1>Notes count: { userProfile.noOfNotes }</h1>
                        </div>
                        <div className="text-1xl prose prose-sm  max-w-md text-center text-gray-200 dark:prose-invert dark:text-gray-300">
                            <p>
                                {userProfile.bio}
                            </p>
                        </div>
                    </div>
                </div>
        )
    )
}


