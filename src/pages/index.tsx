import { useAddress } from '@thirdweb-dev/react'
import type { NextPage } from 'next'
import Head from 'next/head'
import Dashboard from '../components/Dashboard'
import Login from '../components/Login'

const Home: NextPage = () => {
  const address = useAddress()
  return (
    <div className='bg-[#091b18] min-h-screen'>
      <Head>
        <title>Lottery app</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      {
        !address ? <Login/> : <Dashboard address={address}/>
      }
    </div>
  )
}

export default Home
