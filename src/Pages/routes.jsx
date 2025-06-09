import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomePage from "./home"
import { CardDetailsPage } from "./cardDetailsPage"
import { CardStage1Details } from "./cardStage1DetailPage"
import { CardStage2Details } from "./cardStage2DetailPage"
import { CardStage3Details } from "./cardStage3DetailPage"

import { CardMegaDetails } from "./cardMegaDetailPage"

export const AppRoutes = () => (


// PARA ENVIAR AO GITHUB TEM Q SER DESSA MANEIRA 

    <BrowserRouter basename="/Pokemon/">
        <Routes>
            <Route exact path='/' element={<HomePage />} />
            <Route exact path='/details/:id' element={<CardDetailsPage />} />
            <Route exact path='/stage1details/:id' element={<CardStage1Details />} />
            <Route exact path='/stage2details/:id' element={<CardStage2Details />} />
            <Route exact path='/stage3details/:id' element={<CardStage3Details />} />
            <Route exact path='/megadetails/:id' reloadDocument element={<CardMegaDetails />} />
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