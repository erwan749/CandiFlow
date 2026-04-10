import { useEffect, useState } from "react";
import { getApplications } from "../api/application";

function ApplicationsPage(){

  const [applications, setApplications] = useState([]);
  useEffect(()=>{
    fetchApplications();
  },[]);

  const fetchApplications = async () => {
    const data = await getApplications();
    setApplications(data);
  };
  return (
    <div>
      <h1>Mes candidatures</h1>

      {/* Si aucune candidature */}
      {applications.length === 0 ? (
        <p>Aucune candidature pour le moment</p>
      ) : (
        <ul>
          {applications.map((app) => (
            <li key={app.id}>
              {app.companyName} - {app.position} ({app.status})
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
export default ApplicationsPage;