'use client';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { auth } from '../firebase/config';
import Image from 'next/image';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordAgain, setPasswordAgain] = useState('');
  const router = useRouter();

  const signup = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push('/signin');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-8 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Image
            className="mx-auto"
            src="/quickpick_horizontal_logo_black.png"
            alt="QuickPick"
            width={100}
            height={100}
            onClick={() => router.push('/')}
          />
          <h2 className="mt-4 text-center text-2xl font-bold leading-9 tracking-tight text-black">
            Sign up
          </h2>
        </div>

        <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-black">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 bg-gray-100 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray/10 focus:ring-2 focus:ring-inset focus:ring-gray-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-black">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 bg-gray-100 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray/10 focus:ring-2 focus:ring-inset focus:ring-gray-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label htmlFor="passwordAgain" className="block text-sm font-medium leading-6 text-black">
                Password Again
              </label>
              <div className="mt-1">
                <input
                  id="passwordAgain"
                  name="passwordAgain"
                  type="password"
                  autoComplete="current-password"
                  onChange={(e) => setPasswordAgain(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 bg-gray-100 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray/10 focus:ring-2 focus:ring-inset focus:ring-gray-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                disabled={(!email || !password || !passwordAgain) || (password !== passwordAgain)}
                onClick={() => signup()}
                className="flex w-full justify-center rounded-md bg-yellow-400 px-3 py-1.5 text-sm font-semibold leading-6 text-black shadow-sm hover:bg-yellow-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black-500"
              >
                Sign Up
              </button>
            </div>

            <p className="mt-4 text-center text-sm text-gray-400">
              Have an account?{' '}
              <button onClick={() => router.push('signin')} className="font-semibold leading-6 text-yellow-500 hover:text-black-300">
                Sign In
              </button>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
