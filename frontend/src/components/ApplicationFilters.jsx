// Composant qui gère les filtres, le tri et la recherche des candidatures
function ApplicationFilters({
  filterStatus,
  onFilterStatusChange,
  sortOrder,
  onSortOrderChange,
  searchTerm,
  onSearchTermChange,
  searchField,
  onSearchFieldChange,
}) {
  return (
    <div className="card filters-card">
      <h2 className="section-title">Filtres</h2>

      <div className="filters-row">
        <div className="form-group">
          <label>Filtrer par statut</label>
          <select
            value={filterStatus}
            onChange={(event) => onFilterStatusChange(event.target.value)}
          >
            <option value="ALL">Tous</option>
            <option value="A_ENVOYER">À envoyer</option>
            <option value="ENVOYEE">Envoyée</option>
            <option value="EN_ATTENTE">En attente</option>
            <option value="EN_ATTENTE_DE_RELANCE">En attente de relance</option>
            <option value="RELANCEE">Relancée</option>
            <option value="ENTRETIEN">Entretien</option>
            <option value="ACCEPTEE">Acceptée</option>
            <option value="REFUSEE">Refusée</option>
          </select>
        </div>

        <div className="form-group">
          <label>Trier par date d'envoi</label>
          <select
            value={sortOrder}
            onChange={(event) => onSortOrderChange(event.target.value)}
          >
            <option value="DESC">Plus récent d'abord</option>
            <option value="ASC">Plus ancien d'abord</option>
          </select>
        </div>

        <div className="form-group">
          <label>Rechercher</label>
          <input
            type="text"
            value={searchTerm}
            onChange={(event) => onSearchTermChange(event.target.value)}
            placeholder="Ex : Numyoo, Java, développeur..."
          />
        </div>

        <div className="form-group">
          <label>Rechercher dans</label>
          <select
            value={searchField}
            onChange={(event) => onSearchFieldChange(event.target.value)}
          >
            <option value="companyName">Entreprise</option>
            <option value="position">Nom de l'offre</option>
            <option value="techStack">Stack</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default ApplicationFilters;