/*
 * @Descripttion: 
 * @version: 
 * @Author: Leojias
 * @Date: 2022-09-04 15:56:24
 * @LastEditors: Leojias
 * @LastEditTime: 2022-09-05 08:59:17
 */
import React from 'react'
import  ReactDOM  from 'react-dom/client'
import App from "./App"
import  { BrowserRouter} from "react-router-dom"
const root =ReactDOM.createRoot(document.getElementById("app"));
root.render(
<BrowserRouter>
    < App/>
</BrowserRouter>
)
