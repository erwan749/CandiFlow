// Composant qui affiche la liste des candidatures
function ApplicationList({ applications }) {
  return (
    <div className="card">
      <h2 className="section-title">Liste des candidatures</h2>

      {/* Si la liste est vide */}
      {applications.length === 0 ? (
        <p>Aucune candidature pour le moment</p>
      ) : (
        <div className="application-list">
          {applications.map((app) => (
            <div key={app.id} className="application-item">
              <strong>
                {app.companyName} — {app.position}
              </strong>

              <div className="application-meta">
                Statut : {app.status}
              </div>

              <div className="application-meta">
                Type : {app.applicationType}
              </div>

              <div className="application-meta">
                Date d'envoi : {app.sendDate}
              </div>

              {app.techStack && (
                <div className="application-meta">
                  Stack : {app.techStack}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ApplicationList;