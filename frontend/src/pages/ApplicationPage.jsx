import { useEffect, useState } from "react";
import { getApplications, createApplication , deleteApplication , updateApplication } from "../api/applicationApi";
import ApplicationForm from "../components/ApplicationForm";
import ApplicationList from "../components/ApplicationList";

// Page principale qui gere le formulaire et la liste
function ApplicationsPage() {
  // Liste des candidatures récupérées depuis le backend
  const [applications, setApplications] = useState([]);
  const [submitSuccessKey, setSubmitSuccessKey] = useState(0);
  const [editingApplicationId , setEditingApplicationId] = useState(null);

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
// Envoie le formulaire au backend
const handleSubmit = async (event) => {
  event.preventDefault();

  try {
    const applicationToSend = {
      ...formData,
      responseDate: formData.responseDate || null,
      followUpDate: formData.followUpDate || null,
      lmLink: formData.lmLink || null,
      techStack: formData.techStack || null,
      source: formData.source || null,
      notes: formData.notes || null,
    };

    if (editingApplicationId) {
      // Mode modification
      await updateApplication(editingApplicationId, applicationToSend);
      setEditingApplicationId(null);
    } else {
      // Mode création
      await createApplication(applicationToSend);
    }

    await fetchApplications();

    setSubmitSuccessKey((prev) => prev + 1);

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
    console.error("Erreur lors de l'enregistrement :", error);
  }
};

  //fonction delete
  const handleDelete = async (id) => {
    try{
      await deleteApplication(id);
      await fetchApplications();
    }
    catch(error){
      console.error("Erreur suppresion : ", error);
    }
  };

  //Preparation du formulaire pour modifier une candidature 
  const handleEdit = (application) =>{
    setEditingApplicationId(application.id);

    setFormData({
      companyName: application.companyName || "",
      position: application.position || "",
      applicationType: application.applicationType || "OFFRE",
      techStack: application.techStack || "",
      source: application.source || "",
      sendDate: application.sendDate || "",
      responseDate: application.responseDate || "",
      followUpDate: application.followUpDate || "",
      lmLink: application.lmLink || "",
      status: application.status || "A_ENVOYER",
      notes: application.notes || "",
    })
  };

  //page 

    return (
    <div className="page-container">
      <h1 className="page-title">Mes candidatures</h1>

      {/* Formulaire séparé */}
      <ApplicationForm
        formData={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
        submitSuccessKey={submitSuccessKey}
        isEditing={editingApplicationId !== null}
      />

      {/* Liste séparée */}
      <ApplicationList applications={applications} onDelete={handleDelete} onEdit={handleEdit} />
    </div>
  );
}

export default ApplicationsPage;