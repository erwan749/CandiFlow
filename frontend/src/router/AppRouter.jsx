import { BrowserRouter, Routes, Route} from "react-router-dom";
import ApplicationPage from "../pages/ApplicationPage";
import ApplicationsPage from "../pages/ApplicationPage";

// Composant qui gère les routes de l'application
function AppRouter(){
    return(
        <BrowserRouter>
            <Routes>
                {/* Route principale */}
                <Route path="/" element={<ApplicationsPage />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter;