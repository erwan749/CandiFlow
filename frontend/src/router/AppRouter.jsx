import { BrowserRouter, Routes, Route} from "react-router-dom";
import ApplicationPage from "../pages/ApplicationPage";
import DashboardPage from "../pages/DashboardPage";

// Composant qui gère les routes de l'application
function AppRouter(){
    return(
        <BrowserRouter>
            <Routes>
                {/* Route principale */}
                <Route path="/" element={<ApplicationPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter;