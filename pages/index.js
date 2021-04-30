import Head from 'next/head'
import { useState } from 'react'

export default function Home() {

  const [stand,setStand] = useState('No, Current stand')

  function Stand(local,min_cust,max_cust,avg_vol){
    this.local = local ;
    this.min_cust = min_cust ;
    this.max_cust = max_cust ;
    this.avg_vol = avg_vol ;
  }

  function createStandHandler(event){
    event.preventDefault();
     let new_stand = new Stand(
      event.target.local.value,
      event.target.min_cust.value,
      event.target.max_cust.value,
      event.target.avg_vol.value
    )

    let str_stand = JSON.stringify(new_stand)
    setStand(str_stand)
    
  }
  return (
    <div className="">
      <Head>
        <title>cookie stand admin</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className=" bg-green-600 p-4 text-4xl">
        <h1> Cookie Stand Admin</h1>
      </header>

      <main className="w-screen">
        
        <form onSubmit={createStandHandler} className='w-4/6 p-2 mx-auto mt-8 bg-green-200 rounded-md h-60'>
          <h2 className='text-2xl font-medium py-4 text-center '> Create Cookie Stand</h2>

          <section className='w-full grid grid-cols-4 gap-4'>
          <div className='col-span-4'>
          <label className='mr-4'>Location</label>
          <input name='local' className='w-11/12 h-6 mb-10 '></input>
          </div>
        
          <div className='text-center'>
          <label className=''>Minimun Customers per Hour</label>
          <input  name='min_cust'className='w-11/12 '></input>
          </div>

          <div className='text-center'>
          <label className=''> Maximun Customers per Hour</label>
          <input  name='max_cust' className='w-11/12'></input>
          </div>

          <div className='text-center'>
          <label className=''> Average Cookies per Sale</label>
          <input name='avg_vol' className='w-11/12'></input>
          </div>

          <button type='submit' className='bg-green-700 h-16 flex-1 mr-5 font-medium'>Create</button>
          </section>
        </form>

        <section className='text-center mt-8'>
          <p> Report Table Coming Soon...</p>
          <p>{stand}</p>
        </section>
       

      </main>

      <footer className=" bg-green-600 p-4 mt-8 mb-8">
        <p>&copy;2021</p>
    
  
      </footer>
    </div>
  )
}
