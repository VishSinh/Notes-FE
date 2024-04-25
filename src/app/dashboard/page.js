"use client";

import { useEffect, useState } from "react";

import Link from "next/link"
import Note from "@/app/dashboard/note"
import Navbar from "@/components/ui/header";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import NotesService from "@/service/api/notesService";
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import PageLoader from "@/components/ui/pageLoader";

export default function Dashboard() {

    // state variables
    const ownNotes = useAppSelector((state) => state.ownNotes);
    const exploreNotes = useAppSelector((state) => state.exploreNotes);
    const dispatch = useAppDispatch();

    // local state variables
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [section, setSection] = useState("mine");
    const [isLoading, setIsLoading] = useState(true)
    const [isAdmin, setIsAdmin] = useState(false);

    const toggleModal = () => { setIsModalOpen(!isModalOpen); };

    useEffect(() => {

        if (localStorage.getItem("userIdHash") == undefined || localStorage.getItem("userIdHash") == "false") { window.location.href = "/"; return; }

        if (localStorage.getItem("detailsExist") == undefined || localStorage.getItem("detailsExist") == "false") { window.location.href = "/user/details"; return; }

        setIsAdmin(localStorage.getItem("isAdmin") === "true");

        async function fetchNotes() {
            const { success, message } = await NotesService.fetchOwnNotes(dispatch);

            if (!success) console.log("Error fetching notes: " + message);

            setIsLoading(false);
        }

        fetchNotes();
    }, [])

    async function handleSubmit(event) {
        event.preventDefault();

        const formData = Object.fromEntries(new FormData(event.currentTarget));

        (formData.visibility === "on") ? formData.visibility = true : formData.visibility = false;

        const { success, message } = await NotesService.createNote(
            formData.title,
            formData.description,
            formData.visibility,
            dispatch
        );

        if (success) {
            console.log("Note created successfully");
            toggleModal();
        } else {
            console.log("Error creating note: " + message);
        }
    }



    async function clickExplore() {
        setSection("explore");

        const { success, message } = await NotesService.fetchNotes(dispatch);

        if (!success) console.log("Error fetching notes: " + message);
    }

    async function clickMine() {
        setSection("mine");

        const { success, message } = await NotesService.fetchOwnNotes(dispatch);

        if (!success) console.log("Error fetching notes: " + message);
    }



    return (
        (isLoading ? <PageLoader /> :
            <div key="1" className="flex flex-col min-h-screen w-full">
                <div className="flex items-center  h-20 px-4 bg-black">
                    <Link className="flex items-center gap-2 font-semibold text-3xl my-5" href="/">
                        Notes Nexus
                    </Link>
                    <nav className="hidden md:flex items-center ml-auto gap-4 md:gap-12">
                        {isAdmin && (<Link
                            className="text-md font-medium text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                            href="/logs">
                            Logs
                        </Link>)}
                        <Link
                            className="text-md font-medium text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                            href="/user/profile">
                            Profile
                        </Link>
                        <button
                            className="text-md font-medium text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                            onClick={toggleModal}>
                            <div className="flex">
                                <div className="flex-row"><NoteAddIcon /></div>
                                <div className="flex-row px-2">New Note</div>

                            </div>
                        </button>
                    </nav>
                </div>
                <main className="flex-1 overflow-y-auto p-4 md:gap-8 md:p-6">
                    <div className="flex items-center mb-4 w-full">
                        <button className={`font-semibold w-full text-lg md:text-3xl ${section == 'mine' ? 'kBlack1' : 'bg-transparent'} hover:bg-neutral-700 border border-gray-300 text-white py-2 px-4 rounded ml-auto mr-5`}
                            onClick={clickMine}
                        >
                            Mine
                        </button>
                        <button className={`font-semibold w-full text-lg md:text-3xl ${section != 'mine' ? 'kBlack1' : 'bg-transparent'} hover:bg-neutral-700 border border-gray-300 text-white py-2 px-4 rounded mr-auto ml-5`}
                            onClick={clickExplore}
                        >
                            Explore
                        </button>

                    </div>
                    {
                        section == "mine"
                            ?
                            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                                {ownNotes.map((note) => (
                                    <Note
                                        key={note.id}
                                        note={note}
                                        user={true}
                                    />
                                ))}
                            </div>
                            :
                            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                                {exploreNotes.map((note) => (
                                    <Note
                                        key={note.id}
                                        note={note}
                                        user={false}
                                    />
                                ))}
                            </div>
                    }


                </main>



                {/* Modal */}
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none">
                        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        <div className="relative z-50 bg-black rounded-lg shadow-lg w-3/4 p-12 ">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4 w-1/4">
                                    <label htmlFor="title" className="block text-lg font-medium text-white-700">Title</label>
                                    <input
                                        type="text"
                                        id="title"
                                        name="title"
                                        className="mt-1 text-gray-900 p-4 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm h-10"
                                        placeholder="Enter title"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="description" className="block text-lg font-medium text-white-700">Description</label>
                                    <textarea
                                        id="description"
                                        name="description"
                                        rows="3"
                                        className="mt-1 text-gray-900 p-4 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm h-32"
                                        placeholder="Enter description"
                                    ></textarea>
                                </div>
                                <div className="flex items-center mb-4">
                                    <input
                                        id="visibility"
                                        name="visibility"
                                        type="checkbox"
                                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                    />
                                    <label htmlFor="visibility" className="ml-2 block text-sm text-white-900">
                                        Visible to others
                                    </label>
                                </div>
                                <div className="flex justify-end">
                                    <button type="button" onClick={toggleModal} className="px-4 py-2 mr-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:bg-gray-300">
                                        Cancel
                                    </button>
                                    <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700">
                                        Create
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

            </div>
        )
    );

}

