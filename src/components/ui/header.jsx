import Link from 'next/link'

export default function Navbar() {
    return (
        <div className="flex items-center border-b h-14 px-4">
                <Link className="flex items-center gap-2 font-semibold text-lg md:text-xl" href="#">
                    Notes
                </Link>
                <nav className="hidden md:flex items-center ml-auto gap-4 md:gap-8">
                    <Link className="text-sm font-medium text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"href="#">
                        All Notes
                    </Link>
                    <Link className="text-sm font-medium text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"href="#">
                        Profile
                    </Link>
                    <Link className="text-sm font-medium text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"href="#">
                        New Note
                    </Link>
                </nav>
            </div>
    )
}