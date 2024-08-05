import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomePage from "./home"
import { CardDetailsPage } from "./cardDetailsPage"

export const AppRoutes = () => (

    <BrowserRouter basename=".">
        <Routes>
            <Route exact path='/pokemon' element={<HomePage />} />
            <Route exact path='/details/:id' element={<CardDetailsPage />} />
        </Routes>
    </BrowserRouter>
)


