import { useEffect, useState } from "react";
import { getApplications, createApplication } from "../api/applicationApi";
import ApplicationForm from "../components/ApplicationForm";
import ApplicationList from "../components/ApplicationList";

// Page principale qui gere le formulaire et la liste
function ApplicationsPage() {
  // Liste des candidatures récupérées depuis le backend
  const [applications, setApplications] = useState([]);
  const [submitSuccessKey, setSubmitSuccessKey] = useState(0);

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

  // Chargement initial des candidatures
  useEffect(() => {
    fetchApplications();
  }, []);

  // Récupère la liste depuis l'API
  const fetchApplications = async () => {
    const data = await getApplications();
    setApplications(data);
  };

  // Met à jour un champ du formulaire
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Envoie le formulaire au backend
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Prépare l'objet à envoyer
      const applicationToSend = {
        ...formData,
        responseDate: formData.responseDate || null,
        followUpDate: formData.followUpDate || null,
        lmLink: formData.lmLink || null,
        techStack: formData.techStack || null,
        source: formData.source || null,
        notes: formData.notes || null,
      };

      // Création dans la base
      await createApplication(applicationToSend);

      // Recharge la liste après ajout
      await fetchApplications();
      setSubmitSuccessKey((prev) => prev + 1);

      // Remet le formulaire à zéro
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
    <div className="page-container">
      <h1 className="page-title">Mes candidatures</h1>

      {/* Formulaire séparé */}
      <ApplicationForm
        formData={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
        submitSuccessKey={submitSuccessKey}
      />

      {/* Liste séparée */}
      <ApplicationList applications={applications} />
    </div>
  );
}

export default ApplicationsPage;