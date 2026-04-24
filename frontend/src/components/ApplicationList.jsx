// Composant qui affiche la liste des candidatures
function ApplicationList({ applications , onDelete ,onEdit}) {
  // Retourne la classe CSS selon le statut
  const getStatusClass = (status) => {
    switch (status) {
      case "A_ENVOYER":
        return "status-blue";
      case "ENVOYEE":
        return "status-gray";
      case "EN_ATTENTE":
        return "status-yellow";
      case "EN_ATTENTE_DE_RELANCE":
        return "status-orange";
      case "RELANCEE":
        return "status-cyan";
      case "ENTRETIEN":
        return "status-purple";
      case "ACCEPTEE":
        return "status-green";
      case "REFUSEE":
        return "status-red";
      default:
        return "status-default";
    }
  };
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

              {/* Conteneur principal */}
              <div className="application-content">
                <strong>
                  {app.companyName} — {app.position}
                </strong>

                <div className="application-meta">
                  Statut :{" "}
                  <span className={`status-badge ${getStatusClass(app.status)}`}>
                    {app.status}
                  </span>
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

              {/* Actions à droite */}
              <div className="application-actions">
                <button className="edit-button" onClick={() => onEdit(app)}>
                  Modifier
                </button>
                <button
                  className="delete-button"
                  onClick={() => 
                    {
                      if(window.confirm("Supprimer cette candidature ?")){
                        onDelete(app.id);
                      }
                    } 
                  }>
                  Supprimer
                </button>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ApplicationList;