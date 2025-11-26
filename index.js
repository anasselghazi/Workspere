 // -------------------- VARIABLES --------------------
// Récupération des éléments du DOM pour le modal et le formulaire
const modal = document.getElementById("modal-employer");
const openBtnModal = document.getElementById("open-modal");
const closeBtnModal = document.getElementById("close-modal");
const expContainer = document.getElementById("exp-container");
const addExpBtn = document.getElementById("add-exp");
const formEmployer = document.getElementById("form-employer");

// Tableau des employés
const employees = [];

// Variable pour suivre la zone actuellement sélectionnée
let currentZone;

// Définition des différentes zones avec les rôles autorisés et le nombre maximum d'employés
const zones = {
    reception: { roles: ["Réceptionniste", "Manager", "Nettoyage"], max: 2, employees: [] },
    serveurs: { roles: ["Technicien IT", "Manager"], max: 2, employees: [] },
    securite: { roles: ["Agent de sécurité", "Manager"], max: 3, employees: [] },
    personnel: { roles: ["*"], max: 5, employees: [] }, // '*' = tous les rôles
    conference: { roles: ["*"], max: 10, employees: [] },
    archives: { roles: ["Manager", "Réceptionniste", "Technicien IT", "Agent de sécurité"], max: 2, employees: [] }
};

// -------------------- MODAL EMPLOYER --------------------
// Ouvrir le modal pour ajouter un employé
openBtnModal.addEventListener("click", () => modal.classList.remove("hidden"));

// Fermer le modal et réinitialiser le formulaire
closeBtnModal.addEventListener("click", () => {
    modal.classList.add("hidden");
    formEmployer.reset();
    expContainer.innerHTML = ""; // Supprime les expériences ajoutées
});

// -------------------- AJOUT EXPERIENCE --------------------
// Ajouter dynamiquement une nouvelle expérience dans le formulaire
addExpBtn.addEventListener("click", () => {
    const expDiv = document.createElement("div");
    expDiv.className = "exp-item mt-2 border p-3 rounded-lg flex flex-col gap-2";

    const inputPost = document.createElement("input");
    inputPost.type = "text"; inputPost.placeholder = "Poste"; inputPost.className = "border p-2 rounded-lg";

    const inputEntreprise = document.createElement("input");
    inputEntreprise.type = "text"; inputEntreprise.placeholder = "Entreprise"; inputEntreprise.className = "border p-2 rounded-lg";

    const inputPeriode = document.createElement("input");
    inputPeriode.type = "text"; inputPeriode.placeholder = "Periode (2022-2023)"; inputPeriode.className = "border p-2 rounded-lg";

    const inputDescription = document.createElement("textarea");
    inputDescription.placeholder = "Description"; inputDescription.className = "border p-2 rounded-lg";

    // Bouton pour supprimer une expérience ajoutée
    const btnDeleteExp = document.createElement("button");
    btnDeleteExp.className = "text-red-500 self-end"; 
    btnDeleteExp.innerHTML = `<i class="cursor-pointer fa-solid fa-trash"></i>`;
    btnDeleteExp.addEventListener("click", () => expDiv.remove());

    // Ajouter tous les champs à la div expérience
    expDiv.append(inputPost, inputEntreprise, inputPeriode, inputDescription, btnDeleteExp);
    expContainer.appendChild(expDiv);
});

// -------------------- AJOUT EMPLOYER --------------------
 
formEmployer.addEventListener("submit", (e) => {
    e.preventDefault();

    // Récupération des valeurs du formulaire
    const nomComplet = document.getElementById("input-nom").value;
    const inputEmail = document.getElementById("input-email").value;
    const inputTele = document.getElementById("input-tele").value;
    const role = document.getElementById("role-empl").value;
    const photo = document.getElementById("input-photo").value;

     
    // Création de l'objet employé
    const newEmployer = { id: Date.now(), nom: nomComplet, role, photo, email: inputEmail, telephone: inputTele, experiences: [], assignedZone: null };

    // Ajout des expériences saisies
    document.querySelectorAll(".exp-item").forEach(item => {
        const inputs = item.querySelectorAll("input,textarea");
         
        newEmployer.experiences.push({ poste: inputs[0].value,
             entreprise: inputs[1].value,
              periode: inputs[2].value,
               description: inputs[3].value });
    });

    employees.push(newEmployer); // Ajouter l'employé au tableau
    formEmployer.reset(); // Réinitialiser le formulaire
    expContainer.innerHTML = ""; // Supprimer les expériences affichées
    modal.classList.add("hidden"); // Fermer le modal
    afficherEmployer(); // Mettre à jour l'affichage des employés
});

// -------------------- AFFICHER EMPLOYER --------------------
// Affiche la liste des employés non assignés à une zone
function afficherEmployer() {
    const employerList = document.getElementById("employe-list");
    employerList.innerHTML = "";
    employees.filter(emp => emp.assignedZone === null).forEach(emp => {
        const card = document.createElement("div");
        card.className = "border-2 border-black p-2 rounded-lg flex items-center gap-1 bg-gray-300 cursor-pointer";
        card.innerHTML = `<img src="${emp.photo}" class="w-12 h-12 rounded-full"><div><p class="font-bold">${emp.nom}</p><p class="text-sm">${emp.role}</p></div>`;
        card.addEventListener("click", () => afficherModalInfo(emp));
        employerList.appendChild(card);
    });

    // Fermer le modal info si bouton fermé cliqué
    document.getElementById("close-info")?.addEventListener("click", () => {
        document.getElementById("modal-info").classList.add("hidden");
    });
}

// -------------------- MODAL INFO --------------------
// Affiche le détail complet d'un employé dans un modal
function afficherModalInfo(emp) {
    const modalInfo = document.getElementById("modal-info");
    const divInfo = document.getElementById("info-content");
    divInfo.innerHTML = "";

    const img = document.createElement("img"); img.src = emp.photo; img.className = "w-15 h-15 rounded-full";
    const nom = document.createElement("p"); nom.className = "font-bold"; nom.textContent = emp.nom;
    const role = document.createElement("p"); role.textContent = emp.role;
    const emailInfo = document.createElement("p"); emailInfo.textContent = emp.email;
    const teleINFO = document.createElement("p"); teleINFO.textContent = emp.telephone;
    const titreExp = document.createElement("h2"); titreExp.textContent = "Expériences:"; titreExp.className = "text-green-400 font-bold";

    divInfo.append(img, nom, role, emailInfo, teleINFO, titreExp);

    const divExp = document.createElement("div");
    emp.experiences.forEach(exp => {
        divExp.innerHTML += `<p>${exp.poste}</p><p>${exp.entreprise}</p><p>${exp.periode}</p><p>${exp.description}</p><p>=====================</p>`;
    });

    divInfo.appendChild(divExp);
    modalInfo.classList.remove("hidden");
}

// -------------------- GESTION DES ZONES --------------------
// Vérifie si un employé peut entrer dans une zone
function peutEntrerZone(employee, zoneName) {
    const zone = zones[zoneName];
    if (zone.employees.length >= zone.max) return false; // Zone pleine
    return zone.roles.includes("*") || zone.roles.includes(employee.role); // Vérification du rôle
}

// Ouvre le modal pour ajouter un employé à une zone
function ouvrirModalChambre(zoneId) {
    currentZone = zoneId;
    document.getElementById("modal-chambre").classList.remove("hidden");
    afficherEmployerEligible(zoneId);
}

// Affiche les employés éligibles pour la zone
function afficherEmployerEligible(zoneId) {
    const list = document.getElementById("employer-eligible");
    list.innerHTML = "";
    const zone = zones[zoneId];

    employees.forEach(emp => {
        if (zone.employees.find(e => e.id === emp.id)) return; // Ignorer les employés déjà assignés
        if (zone.roles.includes("*") || zone.roles.includes(emp.role)) {
            const item = document.createElement("div");
            item.className = "p-2 border-b flex items-center justify-between w-full";
            item.innerHTML = `
                <div class="flex items-center gap-2">
                    <img src="${emp.photo}" class="w-12 h-12 rounded-full">
                    <div><p class="font-bold">${emp.nom}</p><p class="text-sm">${emp.role}</p></div>
                </div>
                <button class="btn-add bg-green-500 text-white px-2 py-1 rounded" data-id="${emp.id}">Ajouter</button>
            `;
            list.appendChild(item);
        }
    });

    // Ajouter les événements au bouton "Ajouter"
    document.querySelectorAll(".btn-add").forEach(btn => {
        btn.addEventListener("click", () => ajouterEmployerDansZone(btn.dataset.id, zoneId));
    });
}

// Ajoute un employé à une zone
function ajouterEmployerDansZone(empId, zoneId) {
    const emp = employees.find(e => e.id == empId);
    const zone = zones[zoneId];
    if (!emp) return alert("Employé non trouvé");
    if (emp.assignedZone !== null) return alert(`Cet employé est déjà assigné à la zone ${emp.assignedZone}`);
    if (zone.employees.length >= zone.max) return alert("La zone est pleine");
    zone.employees.push(emp); 
    emp.assignedZone = zoneId;

    afficherEmployer();
    afficherEmployerEligible(zoneId);
    afficherEmployerdansZone(zoneId);
    alert(`Employé ${emp.nom} ajouté à la zone ${zoneId} avec succès!`);
}

// Affiche les employés assignés à une zone
function afficherEmployerdansZone(zoneId) {
    const container = document.getElementById(`${zoneId}-zone`);
    if (!container) return;
    const zone = zones[zoneId];
    container.innerHTML = "";
    zone.employees.forEach(emp => {
        const div = document.createElement("div");
        div.className = "flex items-center justify-between p-2 border-b";
        div.innerHTML = `
            <div class="flex items-center gap-2">
                <img src="${emp.photo}" class="w-10 h-10 rounded-full" alt="${emp.nom}">
                <p class="font-bold">${emp.nom}</p>
            </div>
            <button class="text-red-500 hover:text-red-700 p-2" onclick="supprimerEmployerDeZone(${emp.id}, '${zoneId}')">
                <i class="fa-solid fa-trash"></i>
            </button>
        `;
        container.appendChild(div);
    });
}

// Supprime un employé d'une zone
function supprimerEmployerDeZone(empId, zoneId) {
    const zone = zones[zoneId];
    const emp = employees.find(e => e.id == empId);
    if (!emp) return;
    zone.employees = zone.employees.filter(e => e.id !== empId);
    emp.assignedZone = null;
    afficherEmployer();
    afficherEmployerdansZone(zoneId);
}

// -------------------- BOUTONS DES ZONES --------------------
document.getElementById("conference-button").addEventListener("click", () => ouvrirModalChambre("conference"));
document.getElementById("reception-button").addEventListener("click", () => ouvrirModalChambre("reception"));
document.getElementById("serveurs-button").addEventListener("click", () => ouvrirModalChambre("serveurs"));
document.getElementById("securite-button").addEventListener("click", () => ouvrirModalChambre("securite"));
document.getElementById("archives-button").addEventListener("click", () => ouvrirModalChambre("archives"));
document.getElementById("personnel-button").addEventListener("click", () => ouvrirModalChambre("personnel"));

// Fermer le modal de la zone
document.getElementById("close-chambre").addEventListener("click", () => document.getElementById("modal-chambre").classList.add("hidden"));
