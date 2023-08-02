import React, { useEffect } from "react";
import {Routes, Route, Outlet} from "react-router-dom";
import Main from "../../Pages/Main/Main";
import Navigation from "../NavigationBar/Navigation";

export default function AppRouter() {

    const WithNavigation = () => {
        return (
            <>
                <Navigation/>
                <Outlet/>
            </>
        )
    }

    useEffect(() => {
        document.title = "DucAnhType"
    }, [])

    return (
        <Routes>

            <Route element={<WithNavigation/>}>
                <Route exact path="/" element={<Main/>}></Route>
            </Route>
            
        </Routes>
    )
}