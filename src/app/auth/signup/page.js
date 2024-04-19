"use client"

import AuthService from "@/service/api/authService";

export default function Signup() {

    async function onSubmit(event) {
        event.preventDefault()

        const formData = Object.fromEntries(new FormData(event.currentTarget));

        const { success, message } = await AuthService.signupUser(formData.email, formData.username, formData.password);


        if (success) {
            console.log("Signup successful");
            window.location.href = '/user/details';
        }
        else {
            console.log("Signup failed: " + message);
        }
    }


    return (
        <main className="min-h-screen flex items-center justify-center bg-black py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-white-900">Create an account</h2>
                </div>
                <form className="mt-8 space-y-6" action="#" method="POST" onSubmit={onSubmit}>
                    <input type="hidden" name="remember" value="true" />
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="email-address" className="sr-only">Email address</label>
                            <input id="email-address" name="email" type="email" autoComplete="email" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Email address" />
                        </div>
                        <div>
                            <label htmlFor="username" className="sr-only">Username</label>
                            <input id="username" name="username" type="text" autoComplete="username" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Username" />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input id="password" name="password" type="password" autoComplete="current-password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password" />
                        </div>
                    </div>

                    <div>
                        <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                <svg className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fillRule="evenodd" d="M10 2.5a7.5 7.5 0 016.96 10.409l2.354 2.353a1 1 0 01-1.414 1.414l-2.353-2.354A7.5 7.5 0 1110 2.5zm0 3a4.5 4.5 0 100 9 4.5 4.5 0 000-9zM4 10a6 6 0 1112 0 6 6 0 01-12 0z" clipRule="evenodd" />
                                </svg>
                            </span>
                            Sign up
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
}