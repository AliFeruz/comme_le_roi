import Link from 'next/link'
import React, { useState } from 'react'
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';


const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter()

    async function handleSubmit(e: React.FormEvent){
        e.preventDefault();

        if(!email || !password){
            setError('All fields are necessary.');
            return;
        }
        try {
            const res = await signIn('credentials', {
                email,
                password,
                redirect: false
            });

            if(res?.error){
                setError('Invalid credentials');
                return;
            }
            if (res?.ok) {
                setEmail('');
                setPassword('');
                router.push('/')
            }
        } catch (error) {
            console.log("Error during the logining: ", error)
        }
        
    }


  return (
    <div className='grid place-items-center h-screen'>
    <div className='shadow-lg p-5 rounded-lg bg-lavanda-50 
    border-t-4 border-lavanda-500'>
    <h1 className='text-xl font-bold my-4'>Login</h1>
    <form className='flex flex-col gap-3' onSubmit={handleSubmit}>
    <input type="text" placeholder='Email' value={email}
    onChange={(e) => setEmail(e.target.value)}/>
    <input type="text" placeholder='Password' value={password}
    onChange={(e) => setPassword(e.target.value)}/>
    <button className='btn-primary w-full' type='submit'>Login</button>
    {error && (
    <div className='bg-red-500 text-white w-fit text-sm py-1 px-3 
    rounded-lg mt-2'>
    {error}
    </div>
    )}
    <Link href={'/register'} className='text-sm mt-3 text-right'>
    Don't have an account <span className='underline underline-offset-4'>Register</span>
    </Link>
    </form>
    </div>
    </div>
  )
}

export default LoginForm