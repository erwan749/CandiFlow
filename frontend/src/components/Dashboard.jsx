// Dashboard simple avec les statistiques principales
function Dashboard({ applications }) {
  const total = applications.length;

  const countByStatus = (status) =>
    applications.filter((app) => app.status === status).length;

  const toSend = countByStatus("A_ENVOYER");
  const waitingFollowUp = countByStatus("EN_ATTENTE_DE_RELANCE");
  const interviews = countByStatus("ENTRETIEN");
  const accepted = countByStatus("ACCEPTEE");
  const refused = countByStatus("REFUSEE");

  return (
    <div className="dashboard-grid">
      <div className="dashboard-card">
        <span>Total</span>
        <strong>{total}</strong>
      </div>

      <div className="dashboard-card">
        <span>À envoyer</span>
        <strong>{toSend}</strong>
      </div>

      <div className="dashboard-card">
        <span>À relancer</span>
        <strong>{waitingFollowUp}</strong>
      </div>

      <div className="dashboard-card">
        <span>Entretiens</span>
        <strong>{interviews}</strong>
      </div>

      <div className="dashboard-card success">
        <span>Acceptées</span>
        <strong>{accepted}</strong>
      </div>

      <div className="dashboard-card danger">
        <span>Refusées</span>
        <strong>{refused}</strong>
      </div>
    </div>
  );
}

export default Dashboard;