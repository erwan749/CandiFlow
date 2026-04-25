import { useEffect, useState } from "react";
import {
  getApplications,
  createApplication,
  deleteApplication,
  updateApplication,
} from "../api/applicationApi";
import ApplicationForm from "../components/ApplicationForm";
import ApplicationList from "../components/ApplicationList";
import ApplicationFilters from "../components/ApplicationFilters";

// Valeur initiale du formulaire
const initialFormData = {
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
};

// Convertit les champs vides en null avant l'envoi au backend
const formatApplicationForApi = (formData) => ({
  ...formData,
  responseDate: formData.responseDate || null,
  followUpDate: formData.followUpDate || null,
  lmLink: formData.lmLink || null,
  techStack: formData.techStack || null,
  source: formData.source || null,
  notes: formData.notes || null,
});

// Page principale qui gère le formulaire et la liste
function ApplicationsPage() {
  const [applications, setApplications] = useState([]);
  const [formData, setFormData] = useState(initialFormData);
  const [submitSuccessKey, setSubmitSuccessKey] = useState(0);
  const [editingApplicationId, setEditingApplicationId] = useState(null);
  const [filterStatus, setFilterStatus] = useState("ALL");
  const [sortOrder, setSortOrder] = useState("DESC");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchField, setSearchField] = useState("companyName");

  // Récupère la liste depuis l'API
  const fetchApplications = async () => {
    const data = await getApplications();
    setApplications(data);
  };

  // Chargement initial des candidatures
  useEffect(() => {
    fetchApplications();
  }, []);

  // Met à jour un champ du formulaire
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Remet le formulaire en mode création
  const resetForm = () => {
    setFormData(initialFormData);
    setEditingApplicationId(null);
  };

  // Envoie le formulaire au backend
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const applicationToSend = formatApplicationForApi(formData);

      if (editingApplicationId) {
        await updateApplication(editingApplicationId, applicationToSend);
      } else {
        await createApplication(applicationToSend);
      }

      await fetchApplications();
      resetForm();

      // Sert à prévenir le formulaire qu'une action a réussi
      setSubmitSuccessKey((prev) => prev + 1);
    } catch (error) {
      console.error("Erreur lors de l'enregistrement :", error);
    }
  };

  // Supprime une candidature
  const handleDelete = async (id) => {
    try {
      await deleteApplication(id);
      await fetchApplications();
    } catch (error) {
      console.error("Erreur suppression :", error);
    }
  };

  // Prépare le formulaire pour modifier une candidature
  const handleEdit = (application) => {
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
    });
  };

// Liste filtrée, recherchée puis triée avant affichage
const filteredApplications = applications
  .filter((application) => {
    if (filterStatus === "ALL") {
      return true;
    }

    return application.status === filterStatus;
  })
  .filter((application) => {
    if (searchTerm.trim() === "") {
      return true;
    }

    const valueToSearch = application[searchField] || "";

    return valueToSearch
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
  })
  .sort((a, b) => {
    const dateA = new Date(a.sendDate);
    const dateB = new Date(b.sendDate);

    if (sortOrder === "ASC") {
      return dateA - dateB;
    }

    return dateB - dateA;
  });

  return (
    <div className="page-container">
      <h1 className="page-title">Mes candidatures</h1>
      <a href="/dashboard" className="nav-link">
        Voir le dashboard
      </a>

      <ApplicationForm
        formData={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
        submitSuccessKey={submitSuccessKey}
        isEditing={editingApplicationId !== null}
      />
      
      <ApplicationFilters
          filterStatus={filterStatus}
          onFilterStatusChange={setFilterStatus}
          sortOrder={sortOrder}
          onSortOrderChange={setSortOrder}
          searchTerm={searchTerm}
          onSearchTermChange={setSearchTerm}
          searchField={searchField}
          onSearchFieldChange={setSearchField}
        />

      <ApplicationList
        applications={filteredApplications}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
    </div>
  );
}

export default ApplicationsPage;