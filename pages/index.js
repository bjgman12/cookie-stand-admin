import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'

export default function Home() {

  // const [stand,setStand] = useState('No, Current stand')
  const [locations,setLocations] = useState([])
  const [totals,setTotals] = useState([])

  function Stand(local,min_cust,max_cust,avg_vol,hourly_sales){
    this.local = local ;
    this.min_cust = min_cust ;
    this.max_cust = max_cust ;
    this.avg_vol = avg_vol ;
    this.hourly_sales = hourly_sales;
  }

  function GetTotals(){
    let i ;
    let totals = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    for ( i = 0 ; i < locations.length ; i++){
      let j;
      for ( j = 0; j < locations[i].hourly_sales.length ; j ++){
        totals[j] += locations[i].hourly_sales[j]
      }
    }
    let subtotal = totals.reduce(function(a,b) { a+b } )
    totals.push(subtotal)
    return totals
    }

  function createStandHandler(event){
    event.preventDefault();
     let new_stand = new Stand(
      event.target.local.value,
      event.target.min_cust.value,
      event.target.max_cust.value,
      event.target.avg_vol.value,
      [48,42,30,24,42,24,36,42,42,48,36,42,24,36]
    )
    // let str_stand = JSON.stringify(new_stand)
    // setStand(str_stand)
    setLocations([...locations,new_stand])
    let temp = GetTotals()
    setTotals(temp)
    
  }
  return (
    <div className="">
      <Head>
        <title>cookie stand admin</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header title='Cookie Stand Admin '/>

      <main className="w-screen">
        
        <StandForm />
        <StandTable locations={locations} totals={totals}/>
        
       

      </main>

      <Footer locations = {locations}/>
    </div>
  );

  function Header(props) {
    return (
      <header className='bg-green-600 p-4 justify-between flex items-center'>
        <h1 className='text-4xl'>{props.title}</h1>
        {/* <a href='/overview'>Overview</a> */}
        <Link href='/overview'>
          <a className=' bg-gray-200 rounded-sm px-2'>Overview</a>
        </Link>
      </header>
    )
  }

  function StandForm(props) {
    return(
    <form onSubmit={createStandHandler} className='w-4/6 p-2 mx-auto mt-8 bg-green-200 rounded-md h-60'>
    <h2 className='text-2xl font-medium py-4 text-center '> Create Cookie Stand</h2>

    <section className='w-full grid grid-cols-4 gap-4'>
    <div className='col-span-4'>
    <label className='mr-4'>Location</label>
    <input name='local' className='w-11/12 h-6 mb-10 '></input>
    </div>
  
    <div className='text-center bg-green-100 rounded-md'>
    <label className=''>Minimun Customers per Hour</label>
    <input  name='min_cust'className='w-11/12 '></input>
    </div>

    <div className='text-center bg-green-100 rounded-md'>
    <label className=''> Maximun Customers per Hour</label>
    <input  name='max_cust' className='w-11/12'></input>
    </div>

    <div className='text-center bg-green-100 rounded-md'>
    <label className=''> Average Cookies per Sale</label>
    <input name='avg_vol' className='w-11/12'></input>
    </div>

    <button type='submit' className='bg-green-700 h-16 flex-1 mr-5 font-medium rounded-md'>Create</button>
    </section>
  </form>

    )
  }

  function StandTable(props){
    if(props.locations.length === 0){
      return (
        <section className='text-center mt-8'>
          <p> No Cookie Stands Available </p>
        </section>
      )
    }
    return(
      <section className='text-center mt-8'>
          <table className=' w-4/6 mx-auto my-4 rounded-md'>
            <thead>
              <tr className='font-bold bg-green-700 '>
                <th>Location</th>
                <td>6am</td>
                <td>7am</td>
                <td>8am</td>
                <td>9am</td>
                <td>10am</td>
                <td>11am</td>
                <td>12pm</td>
                <td>1pm</td>
                <td>2pm</td>
                <td>3pm</td>
                <td>4pm</td>
                <td>5pm</td>
                <td>6pm</td>
                <td>7pm</td>
                <td>Totals</td>
                </tr>
            </thead>
            <tbody>
              {props.locations.map(location => (
                <tr className='odd:bg-green-200 bg-green-600'>
                <td className='border border-black'> {location.local} </td>
                {location.hourly_sales.map(sales_vol => (
                  <td className='border border-black'> {sales_vol} </td>
                ))}
                <td className='border border-black'>{location.hourly_sales.reduce(function(a,b){
                  return a + b;
                },0)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className='bg-green-700'>
                <td className='font-bold'>Totals</td>
                {props.totals.map(value => (
                  <td>{value}</td>
                ))}
                
              </tr>
            </tfoot>
    
          </table>
        </section>
    )
  }

  function Footer(props) {
    return(
    <footer className=" bg-green-600 p-4 mt-8 mb-8 flex items-center justify-between">
    <p> {locations.length} locations worldwide</p>
    <p>&copy;2021</p>
    </footer>
    )
  }


   
    
  
}
