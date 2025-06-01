import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomePage from "./home"
import { CardDetailsPage } from "./cardDetailsPage"
import { CardDetailsPage2 } from "./cardDetailsPage2"

export const AppRoutes = () => (


// PARA ENVIAR AO GITHUB TEM Q SER DESSA MANEIRA 

    <BrowserRouter basename="/Pokemon/">
        <Routes>
            <Route exact path='/' element={<HomePage />} />
            <Route exact path='/details/:id' element={<CardDetailsPage />} />
            <Route exact path='/megadetails/:id' reloadDocument element={<CardDetailsPage2 />} />
        </Routes>
    </BrowserRouter>
)

// PARA REALIZAR ALTERAÇÕES LOCAIS 

//     <BrowserRouter basename="/">
//         <Routes>
//             <Route exact path='/' element={<HomePage />} />
//             <Route exact path='/details/:id' element={<CardDetailsPage />} />
//         </Routes>
//     </BrowserRouter>
// )