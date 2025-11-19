# WorkSphere - Gestion Visuelle du Personnel

## Contexte du projet
WorkSphere souhaite disposer d’une application web innovante dédiée à la **gestion visuelle et interactive du personnel** au sein de ses espaces de travail.  
L’objectif principal est de faciliter l’organisation et la répartition des employés sur un plan d’étage en temps réel, tout en respectant les contraintes liées aux rôles et aux zones autorisées.

---

## Objectifs du projet
- Permettre l’ajout, le déplacement et la suppression d’employés directement depuis une interface graphique représentant les locaux.
- Assurer le respect des règles métier (ex. : seuls les réceptionnistes peuvent occuper le poste d’accueil).
- Offrir une expérience utilisateur fluide, intuitive et responsive sur tous les appareils (ordinateur, tablette, smartphone).
- Centraliser la gestion des données du personnel et la visualisation spatiale au sein d’une même plateforme.

---

## User Stories

### Conception (UI/UX)
- Définir une interface intuitive et fluide.
- Créer une palette de couleurs cohérente et des icônes intuitives.
- Réaliser la version Desktop et Mobile avec un design moderne (Flexbox, Grid, formes arrondies, boutons colorés).
- Ajouter une photo par défaut pour les employés sans image.

### Développement Front-End
- Créer la structure HTML complète avec section “Unassigned Staff” et bouton “Add New Worker”.
- Implémenter la modale d’ajout d’un employé (Nom, Rôle, Photo, Email, Téléphone, expériences professionnelles dynamiques).
- Intégrer la prévisualisation de la photo dans la modale.
- Afficher le plan d’étage du bâtiment avec 6 zones principales :  
  - Salle de conférence  
  - Réception  
  - Salle des serveurs  
  - Salle de sécurité  
  - Salle du personnel  
  - Salle d’archives
- Appliquer les restrictions logiques par rôle et zone.
- Ajouter un bouton “X” pour retirer un employé et le replacer dans la liste “Unassigned”.
- Afficher un profil détaillé au clic sur un employé.
- Ajouter un bouton “+” dans chaque zone pour assigner des employés éligibles.
- Indiquer visuellement les zones vides obligatoires.
- Limiter le nombre d’employés par zone.
- Assurer la responsivité et les animations CSS fluides.
- Valider le code HTML/CSS avec le W3C Validator.
- Publier le projet sur GitHub Pages ou Vercel.

### Scrum Master / Gestion du projet
- Organiser les User Stories et suivre l’avancement via Trello, Jira ou GitHub Projects.
- Gérer les branches Git pour structurer le développement.
- Présenter le projet final en démontrant toutes les fonctionnalités dynamiques.

### Bonus (optionnel)
- Drag & Drop des employés entre zones et vers “Unassigned”.
- Bouton “Edit” pour modifier un employé depuis la liste “Unassigned”.
- Recherche et filtrage des employés par nom ou rôle.
- Sauvegarde automatique de l’état du plan dans le localStorage.
- Mode “Réorganisation automatique” selon les règles.

---

## Tailles d’écrans à gérer

### Portrait
- Grand écran ordinateur : > 1280px
- Petit écran ordinateur : 1024px – 1279px
- Tablette : 768px – 1023px
- Mobile : ≤ 767px

### Paysage
- Mobile : 768px – 1023px
- Tablette : 1024px – 1279px

---

## Technologies utilisées
- HTML5
- CSS3 (Flexbox, Grid, animations)
- JavaScript (Vanilla JS)
- Git & GitHub
- GitHub Pages ou Vercel pour le déploiement

---

## Installation & utilisation
1. Cloner le dépôt :  
```bash
git clone https://github.com/<votre-utilisateur>/worksphere.git
