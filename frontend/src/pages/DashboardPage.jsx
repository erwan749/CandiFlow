import { useEffect, useState } from "react";
import { getApplications } from "../api/applicationApi";
import Dashboard from "../components/Dashboard";

// Page dédiée aux statistiques
function DashboardPage() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    const data = await getApplications();
    setApplications(data);
  };

  return (
    <div className="page-container">
      <h1 className="page-title">Dashboard</h1>
        <a href="/" className="nav-link">
            Retour aux candidatures
        </a>

      <Dashboard applications={applications} />
    </div>
  );
}

export default DashboardPage;