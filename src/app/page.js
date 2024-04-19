'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Button from "@/components/ui/button"
import Footer from '@/components/ui/footer';
import Navbar from '@/components/ui/header';
import PageLoader from '@/components/ui/pageLoader';

export default function Home() {

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const userIdHash = localStorage.getItem('userIdHash');
    if (userIdHash) window.location.href = '/dashboard';
    
    // wait 2 seconds to simulate loading 
    setTimeout(() => (setIsLoading(false)), 2000);

  }, []);

  console.log(isLoading);

  return (
    ( isLoading  ? <PageLoader /> :
      <div className="flex flex-col min-h-[100dvh]">
        <Navbar />
        <main className="flex-1">
          <section className="w-full py-12 md:py-24 lg:py-32 border-b">
            <div className="container flex flex-col items-center justify-center gap-4 px-4 mx-auto text-center md:px-6 lg:gap-10">
              <div className="space-y-3">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Notes</h1>
                <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Capture your thoughts. Sync your notes. The best note-taking app for your life. Available on all your
                  devices.
                </p>
              </div>
              <div className="space-x-4">
                <Link href="/auth/login">
                  <Button className="w-full sm:w-auto" type="submit">
                    Login
                  </Button>
                </Link>
                <Link href="/auth/signup">
                  <Button className="w-full sm:w-auto" type="submit">
                    Signup
                  </Button>
                </Link>
              </div>
            </div>
          </section>
          <section className="w-full py-12 md:py-24 lg:py-32">
            <div className="container grid gap-10 md:gap-16 lg:grid-cols-2 lg:gap-20 mx-auto">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl/tight">
                    Beautifully designed
                  </h2>
                  <p className="max-w-[500px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                    The app is beautifully designed and a pleasure to use. The typography is perfect and the interface is
                    clean and simple.
                  </p>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircleIcon className="h-6 w-6 flex-shrink-0" />
                  <ul className="grid gap-2">
                    <li className="text-sm font-medium">Feature 1</li>
                    <li className="text-sm font-medium">Feature 2</li>
                    <li className="text-sm font-medium">Feature 3</li>
                  </ul>
                </div>
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl/tight">
                    Secure and private
                  </h2>
                  <p className="max-w-[500px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                    Your notes are your personal thoughts, and we take that seriously. The app is end-to-end encrypted, so
                    only you can read your notes.
                  </p>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircleIcon className="h-6 w-6 flex-shrink-0" />
                  <ul className="grid gap-2">
                    <li className="text-sm font-medium">Your notes are encrypted in the cloud</li>
                    <li className="text-sm font-medium">Passcode and biometric lock</li>
                    <li className="text-sm font-medium">Two-factor authentication</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
          <section className="w-full py-12 md:py-24 lg:py-32 border-t">
            <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6 mx-auto">
              <div className="space-y-3">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Experience the workflow the best frontend teams love.
                </h2>
                <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Let your team focus on shipping features instead of managing infrastructure with automated CI/CD.
                </p>
              </div>
              <div className="mx-auto w-full max-w-sm space-y-2">
                <Button type="submit">Sign Up</Button>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Sign up to get notified when we launch.
                  <Link className="underline underline-offset-2" href="#">
                    Terms & Conditions
                  </Link>
                </p>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>)

  )
}

function CheckCircleIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  )
}



