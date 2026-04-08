# CandiFlow — Suivi de candidatures d’alternance

## 1.Le projet
Application web de suivi de candidatures d’alternance avec back **Java Spring Boot** et front **React + Vite**.

Objectif : permettre à un utilisateur de gérer ses candidatures, suivre les statuts, planifier les relances, trier les offres, et visualiser l’avancement via un tableau de bord.

---

## 2. Stack technique

### Back
- Java 21
- Spring Boot
- Spring Data JPA
- JWT
- PostgreSQL
- Lombok
- Validation

### Front
- React
- Vite

---

## 3. Fonctionnalités prévues

### Authentification
- Inscription
- Connexion
- Protection des routes
- Gestion JWT

### Gestion des candidatures
- Ajouter une candidature
- Modifier une candidature
- Supprimer une candidature
- Voir le détail d’une candidature
- Lister toutes les candidatures

### Champs d’une candidature
- Entreprise
- Intitulé du poste
- Type de candidature (offre / spontané)
- Stack / techno
- Date d’envoi
- Date de réponse
- Date prévue de relance
- Lien vers la lettre de motivation
- Statut
- Commentaire
- Source de l’offre
- Contact RH

### Statuts
- À envoyer
- Envoyée
- En attente
- En attente de relance
- Relancée
- Entretien
- Acceptée
- Refusée

### Logique métier
- Passage automatique en **“en attente de relance”** après 14 jours sans réponse
- Vérification automatique des relances
- Affichage des candidatures urgentes à relancer

### Tri / filtres
- Tri par date d’envoi
- Tri par date de réponse
- Tri par date de relance
- Tri par entreprise
- Tri par statut
- Filtres par statut
- Filtres par techno
- Recherche par entreprise ou poste

### Dashboard
- Nombre total de candidatures
- Nombre en attente
- Nombre à relancer
- Nombre d’entretiens
- Nombre acceptées
- Nombre refusées

---

## 4. Version MVP
- Auth simple
- CRUD candidatures
- Liste + détail
- Tri par date
- Statut automatique après 14 jours
- Dashboard simple


