import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import {getSession, signOut, useSession} from 'next-auth/react'

export default function Home() {
  const {data:session} = useSession()

  function handleSignOut(){
    signOut()
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Home Page</title>      
      </Head>
      {session ? User({session, handleSignOut }): Guest()}
    </div>
  )
} 

 {/* guest user to sign Up the application */}
function Guest(){
  return(
      <main className="container mx-auto text-center py-20">
        <h3 className="text-4xl font-bold">Guest Home Page</h3>
        <div className="flex justify-center">
          <Link href={'/login'} className='mt-5 px-10 py-2 rounded-sm bg-indigo-500 text-gray-200'>Sign In</Link>
        </div>      
      </main>      
  )
}


// Authorize User to login directly
function User({session, handleSignOut}){
  return(
    <main className="container mx-auto text-center py-20">
        <h3 className="text-4xl font-bold">Authorize User HomePage</h3>

        <div className='details'>
          <h5>{session.user.name}</h5>
          <h5>{session.user.email}</h5> 
        </div>

        <div className='flex justify-center'>
          <button onClick={handleSignOut} className='mt-5 px-10 py-2 rounded-sm bg-indigo-500 bg-grey-50'>Sign Out</button>
        </div>
        <div className="flex justify-center">
          <Link href={'/profile'} className='mt-5 px-10 py-2 rounded-sm bg-indigo-500 text-gray-200'>Profile Page</Link>
        </div>      
      </main> 
  )
}

export async function getServerSideProps({req}){
  const session = await getSession({req})

  if(!session){
    return{
      redirect:{
        destination:'/login',
        permanent: false 
      }
    }
  }

  return {
     props:{session}
  }
}
