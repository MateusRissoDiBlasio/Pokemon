import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomePage from "./home"
import { CardDetailsPage } from "./cardDetailsPage"

export const AppRoutes = () => (
    <BrowserRouter  base href="./">
        <Routes>
            <Route exact path='/' element={<HomePage />} />
            <Route exact path='/details/:id' element={<CardDetailsPage />} />
        </Routes>
    </BrowserRouter>
)
