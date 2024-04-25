"use client";

import Link from "next/link"
import { useEffect, useState } from "react"
import UserService from "@/service/api/userService"
import PageLoader from "@/components/ui/pageLoader";

export default function Profile() {

    const [isLoading, setIsLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);
    const [userProfile, setUserProfile] = useState({ name: "", bio: "", profilePicture: "", age: 0, userIdHash: "", isUserAdmin: false });


    useEffect(() => {

        async function fetchUserDetails() {
            const toFindUserIdHash = localStorage.getItem("profile");

            setIsAdmin(localStorage.getItem("isAdmin") === "true");


            const { success, message } = await UserService.getUserDetails(toFindUserIdHash);
            if (!success) { console.log("Error fetching user details: " + message); return; }

            let response = message;

            setUserProfile({
                name: response.name,
                bio: response.bio,
                profilePicture: response.profile_picture,
                age: response.age,
                userIdHash: response.user_id_hash,
                isUserAdmin: response.is_user_admin
            });

            setIsLoading(false);
            // localStorage.removeItem("profile");

        }

        if (localStorage.getItem("userIdHash") == undefined || localStorage.getItem("userIdHash") == "false") { window.location.href = "/"; return; }


        fetchUserDetails();


    }, []);

    const handlePromoteUser = async () => {
        const { success, message } = await UserService.promoteUser(userProfile.userIdHash);
        if (!success) { console.log("Error promoting user: " + message); return; }

        setUserProfile({ ...userProfile, isUserAdmin: true });
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

                        </nav>
                    </div>
                    <div className="flex h-screen flex-col items-center justify-center gap-6 bg-gradient-to-br ">

                        <img
                            alt="Avatar"
                            className="rounded-full border-4 border-white dark:border-green-500 mb-24"
                            height="150"
                            src={userProfile.profilePicture}
                            style={{ aspectRatio: "150/150", objectFit: "cover" }}
                            width="150"
                        />
                        <div className="space-y-1 text-center">
                            <h1 className="font-bold text-4xl kCream">{userProfile.name}</h1>
                            <p className="text-1xl text-gray-200 dark:text-gray-300">{userProfile.age} years old</p>
                        </div>

                        <div className="text-1xl prose prose-sm  max-w-md text-center text-gray-200 dark:prose-invert dark:text-gray-300">
                            <p>
                                {userProfile.bio}
                            </p>
                        </div>

                        {/* Give space and make a button to promote user */}
                        <div className="h-16"></div>
                        {
                            isAdmin && !userProfile.isUserAdmin &&

                            <button
                                className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg"
                                onClick={handlePromoteUser}
                            >
                                Promote to Admin
                            </button>

                        }
                    </div>
                </div>
        )
    )
}


