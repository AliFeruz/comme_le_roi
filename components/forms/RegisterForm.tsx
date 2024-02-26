import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'


const RegisterForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter()

    async function handleSubmit(e: React.FormEvent){
        e.preventDefault();

        if(!name || !email || !password){
            setError('All fields are necessary.');
            return;
        }
        
        try {
            const res = await fetch('api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name,
                    email,
                    password
                })
            })
            if(res.ok){
                setName('');
                setEmail('');
                setPassword('');
                router.push('/')
            } else {
                if (res.status === 400){
                    setError('Email address already registered.');
                    setName('');
                    setEmail('');
                    setPassword('')
                }
            }
        } catch (error) {
            console.log("Error during the registration: ", error)
        }
    }


  return (
    <div className='grid place-items-center h-screen'>
    <div className='shadow-lg p-5 rounded-lg border-t-4 border-lavanda-500'>
    <h1 className='text-xl font-bold my-4'>Register</h1>
    <form className='flex flex-col gap-3' onSubmit={handleSubmit}>
    <input type="text" placeholder='Full Name' value={name}
    onChange={(e) => setName(e.target.value)}/>
    <input type="text" placeholder='Email' value={email}
    onChange={(e) => setEmail(e.target.value)}/>
    <input type="text" placeholder='Password' value={password}
    onChange={(e) => setPassword(e.target.value)}/>
    <button className='btn-primary w-full' type='submit'>Register</button>
    {error && (
    <div className='bg-red-500 text-white w-fit text-sm py-1 px-3 
    rounded-lg mt-2'>
    {error}
    </div>
    )}
    <Link href={'/'} className='text-sm mt-3 text-right'>
    Already have an account <span className='underline underline-offset-4'>Login</span>
    </Link>
    </form>
    </div>
    </div>
  )
}

export default RegisterForm