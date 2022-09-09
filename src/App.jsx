/*
 * @Descripttion: 
 * @version: 
 * @Author: Leojias
 * @Date: 2022-09-04 16:03:08
 * @LastEditors: Leojias
 * @LastEditTime: 2022-09-05 09:31:32
 */
import React,{ Suspense,lazy} from 'react'
import{ Link, Route,Routes,} from 'react-router-dom'
const Home=lazy(()=>import("./pages/Home"))
const About=lazy(()=>import("./pages/About"))
const App = () => {
  return (
    <div>
    <ul>
      <li>
        <Link to="home">Home</Link>
      </li>
      <li>
        <Link to="about">About</Link>
      </li>
    </ul>
    <Suspense fallback={<div>loading....</div>}>
      <Routes>
        <Route  path='/home' element={<Home/>}/>
        <Route  path='/about' element={<About/>}/>
      </Routes>
      </Suspense>
    </div>
  )
}

export default App