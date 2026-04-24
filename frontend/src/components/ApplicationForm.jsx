import { useEffect, useState } from "react";

// Composant formulaire pour ajouter une nouvelle candidature
function ApplicationForm({ formData, onChange, onSubmit, submitSuccessKey , isEditing}) {
  // Etat local pour ouvrir / fermer le formulaire
  const [isOpen, setIsOpen] = useState(false);

  // Change l'état du formulaire (ouvert / fermé)
  const toggleForm = () => {
    setIsOpen((prev) => !prev);
  };

  // Quand une soumission réussit, on referme le formulaire
  useEffect(() => {
    if (submitSuccessKey > 0) {
      setIsOpen(false);
    }
  }, [submitSuccessKey]);

  // Quand on passe en mode modification, on ouvre le formulaire
  useEffect(() => {
    if (isEditing) {
      setIsOpen(true);
    }
  }, [isEditing]);

  return (
    <div className="card">
      <div className="section-header">
        <h2 className="section-title">
          {isEditing ? "Modifier une candidature" : "Ajouter une candidature"}
        </h2>
        {/* Bouton pour ouvrir / fermer */}
        <button type="button" className="toggle-button" onClick={toggleForm}>
          {isOpen ? "Fermer" : "Ouvrir"}
        </button>
      </div>

      {/* Le formulaire ne s'affiche que si isOpen = true */}
      {isOpen && (
        <form onSubmit={onSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label>Entreprise</label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={onChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Poste</label>
              <input
                type="text"
                name="position"
                value={formData.position}
                onChange={onChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Type de candidature</label>
              <select
                name="applicationType"
                value={formData.applicationType}
                onChange={onChange}
              >
                <option value="OFFRE">OFFRE</option>
                <option value="SPONTANEE">SPONTANEE</option>
              </select>
            </div>

            <div className="form-group">
              <label>Stack</label>
              <input
                type="text"
                name="techStack"
                value={formData.techStack}
                onChange={onChange}
              />
            </div>

            <div className="form-group">
              <label>Source</label>
              <input
                type="text"
                name="source"
                value={formData.source}
                onChange={onChange}
              />
            </div>

            <div className="form-group">
              <label>Date d'envoi</label>
              <input
                type="date"
                name="sendDate"
                value={formData.sendDate}
                onChange={onChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Date de réponse</label>
              <input
                type="date"
                name="responseDate"
                value={formData.responseDate}
                onChange={onChange}
              />
            </div>

            <div className="form-group">
              <label>Date de relance</label>
              <input
                type="date"
                name="followUpDate"
                value={formData.followUpDate}
                onChange={onChange}
              />
            </div>

            <div className="form-group form-full-width">
              <label>Lien LM</label>
              <input
                type="text"
                name="lmLink"
                value={formData.lmLink}
                onChange={onChange}
              />
            </div>

            <div className="form-group">
              <label>Statut</label>
              <select
                name="status"
                value={formData.status}
                onChange={onChange}
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

            <div className="form-group form-full-width">
              <label>Notes</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={onChange}
                rows="4"
              />
            </div>
          </div>

          <button type="submit" className="primary-button">
            {isEditing ? "Enregistrer" : "Ajouter"}
          </button>
        </form>
      )}
    </div>
  );
}

export default ApplicationForm;