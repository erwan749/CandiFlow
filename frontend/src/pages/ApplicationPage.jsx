import { useEffect, useState } from "react";
import { getApplications, createApplication } from "../api/application";

function ApplicationsPage() {
  // Liste des candidatures récupérées depuis le back
  const [applications, setApplications] = useState([]);

  // Etat du formulaire
  const [formData, setFormData] = useState({
    companyName: "",
    position: "",
    applicationType: "OFFRE",
    techStack: "",
    source: "",
    sendDate: "",
    responseDate: "",
    followUpDate: "",
    lmLink: "",
    status: "A_ENVOYER",
    notes: "",
  });

  // Chargement initial des candidatures au démarrage de la page
  useEffect(() => {
    fetchApplications();
  }, []);

  // Appel API pour récupérer les candidatures
  const fetchApplications = async () => {
    const data = await getApplications();
    setApplications(data);
  };

  // Mise à jour des champs du formulaire
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Envoi du formulaire
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Prépare les données avant envoi
      const applicationToSend = {
        ...formData,
        responseDate: formData.responseDate || null,
        followUpDate: formData.followUpDate || null,
        lmLink: formData.lmLink || null,
        techStack: formData.techStack || null,
        source: formData.source || null,
        notes: formData.notes || null,
      };

      // Appel POST vers le backend
      await createApplication(applicationToSend);

      // Recharge la liste après création
      await fetchApplications();

      // Réinitialise le formulaire
      setFormData({
        companyName: "",
        position: "",
        applicationType: "OFFRE",
        techStack: "",
        source: "",
        sendDate: "",
        responseDate: "",
        followUpDate: "",
        lmLink: "",
        status: "A_ENVOYER",
        notes: "",
      });
    } catch (error) {
      console.error("Erreur lors de la création :", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Mes candidatures</h1>

      <h2>Ajouter une candidature</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: "30px" }}>
        <div>
          <label>Entreprise</label>
          <br />
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Poste</label>
          <br />
          <input
            type="text"
            name="position"
            value={formData.position}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Type de candidature</label>
          <br />
          <select
            name="applicationType"
            value={formData.applicationType}
            onChange={handleChange}
          >
            <option value="OFFRE">OFFRE</option>
            <option value="SPONTANEE">SPONTANEE</option>
          </select>
        </div>

        <div>
          <label>Stack</label>
          <br />
          <input
            type="text"
            name="techStack"
            value={formData.techStack}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Source</label>
          <br />
          <input
            type="text"
            name="source"
            value={formData.source}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Date d'envoi</label>
          <br />
          <input
            type="date"
            name="sendDate"
            value={formData.sendDate}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Date de réponse</label>
          <br />
          <input
            type="date"
            name="responseDate"
            value={formData.responseDate}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Date de relance</label>
          <br />
          <input
            type="date"
            name="followUpDate"
            value={formData.followUpDate}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Lien LM</label>
          <br />
          <input
            type="text"
            name="lmLink"
            value={formData.lmLink}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Statut</label>
          <br />
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="A_ENVOYER">A_ENVOYER</option>
            <option value="ENVOYEE">ENVOYEE</option>
            <option value="EN_ATTENTE">EN_ATTENTE</option>
            <option value="EN_ATTENTE_DE_RELANCE">EN_ATTENTE_DE_RELANCE</option>
            <option value="RELANCEE">RELANCEE</option>
            <option value="ENTRETIEN">ENTRETIEN</option>
            <option value="ACCEPTEE">ACCEPTEE</option>
            <option value="REFUSEE">REFUSEE</option>
          </select>
        </div>

        <div>
          <label>Notes</label>
          <br />
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows="4"
          />
        </div>

        <br />
        <button type="submit">Ajouter</button>
      </form>

      <h2>Liste des candidatures</h2>

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
  );
}

export default ApplicationsPage;