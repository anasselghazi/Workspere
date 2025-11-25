    const formOverlay   = document.getElementById('formOverlay');
    const openformbtn   = document.getElementById('openform');
    const closeformbtn  = document.getElementById('closeform');
    const cancelformbtn = document.getElementById('cancelform');
    const workerform    = document.getElementById('workerform');
    const photourlinput = document.getElementById('photourl');
    const photopreview  = document.getElementById('photopreview');
    const addexpbtn     = document.getElementById('addexperience');
    const expcontainer  = document.getElementById('experiences');
    let employees = [];
    function openform() {
      formOverlay.classList.remove('hidden');
    }
    function closeform() {
      formOverlay.classList.add('hidden');
    }

    openformbtn.addEventListener('click', openform);
    closeformbtn.addEventListener('click', closeform);
    cancelformbtn.addEventListener('click', closeform);

     photourlinput.addEventListener('input', () => {
      const url = photourlinput.value.trim();
      photopreview.src = url || '';
    });

     
    addexpbtn.addEventListener('click', () => {
      const block = document.createElement('div');
      block.className = 'border border-gray-300 p-2';

      block.innerHTML = `
           <div class="border border-gray-300 p-2">
    <label class="block mb-1 text-xs">Poste</label>
    <input type="text" placeholder="Poste"
           class="w-full border border-gray-300 px-1 py-[2px] mb-1 text-[11px]">

    <label class="block mb-1 text-xs">Entreprise</label>
    <input type="text" placeholder="Entreprise"
           class="w-full border border-gray-300 px-1 py-[2px] mb-1 text-[11px]">

    <label class="block mb-1 text-xs">Date début</label>
    <input type="date"
           class="w-full border border-gray-300 px-1 py-[2px] mb-1 text-[11px]">

    <label class="block mb-1 text-xs">Date fin</label>
    <input type="date"
           class="w-full border border-gray-300 px-1 py-[2px] mb-1 text-[11px]">

    <label class="block mb-1 text-xs">Description</label>
    <input placeholder="Description"
              class="w-full border border-gray-300 px-1 py-[2px] text-[11px]"> 
  </div>
      `;
      expcontainer.appendChild(block);
    });
 
     workerform.addEventListener('submit', (e) => {
  e.preventDefault();

  // Récupérer les valeurs
  const name = document.getElementById('name').value.trim();
  const role = document.getElementById('role').value.trim();
  const photo = photourlinput.value.trim();
  const email = document.getElementById('email').value.trim();
  const phone = document.getElementById('phone').value.trim();

  if (!name || !role) return;

//   // Créer un div pour le nouvel employé
//   const staffContainer = document.querySelector('aside .space-y-2');
//   const workerDiv = document.createElement('div');

//   `;

      let object = {
        nom: name,
        role: role,
        image: photo,
        email: email,
        phone: phone,
        isInRoom : false
    }
        employees.push(object);
        sidebar();




   
const removeBtn = document.createElement('button');
removeBtn.textContent = 'X';
removeBtn.className = 'ml-auto text-red-600 text-xs';
removeBtn.addEventListener('click', (e) => {
    e.stopPropagation(); 
    workerDiv.remove();  
});


//   // Ajouter à la liste

//   // Fermer le formulaire et réinitialiser
//   formOverlay.classList.add('hidden');
//   workerform.reset();
//   photopreview.src = '';

//   // Ajouter click pour afficher la card
//   workerDiv.addEventListener('click', () => {
//     const oldCard = document.getElementById('workerCard');
//     if (oldCard) oldCard.remove();

//     const card = document.createElement('div');
//     card.id = 'workerCard';
//     card.className = 'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white border border-gray-300 p-4 rounded shadow-lg z-50 w-72';
//     card.innerHTML = `
//       <div class="flex justify-between items-center mb-2">
//         <h3 class="font-bold text-sm">${name}</h3>
//         <button id="closeCard" class="text-gray-500 text-lg">&times;</button>
//       </div>
//       <div class="flex mb-2">
//         <div class="w-8 h-8 bg-blue-600 rounded-none overflow-hidden mr-3">
//           ${photo ? `<img src="${photo}" alt="${name}" class="w-full h-full object-cover">` : name.charAt(0).toUpperCase()}
//         </div>
//         <div class="text-xs">
//           <p><strong>Rôle:</strong> ${role}</p>
//           <p><strong>Email:</strong> ${email || '-'}</p>
//           <p><strong>Téléphone:</strong> ${phone || '-'}</p>
//         </div>
//       </div>
//     `;

//     document.body.appendChild(card);
//     document.getElementById('closeCard').addEventListener('click', () => {
//       card.remove();
//     });
//   });
});
  
  


 // assign container //



// =======================
//    SYSTÈME D’ASSIGNATION
// =======================

// 1) Fonction pour récupérer les employés éligibles selon la salle
 
function getEligibleEmployees(roomId) {
    return employees.filter(emp => {
        const role = emp.role.toLowerCase();

        // Manager → accès partout
        if (role.includes("manager")) {
            return true;
        }

        switch (roomId) {

            // Réception → uniquement Réceptionnistes
            case "reception":
                return role.includes("réceptionniste") ||
                       role.includes("receptionniste");

            // Serveurs → uniquement Technicien IT
            case "serveurs":
                return role.includes("technicien") ||
                       role.includes("it");

            // Sécurité → uniquement Agents de sécurité
            case "securite":
                return role.includes("agent") &&
                       role.includes("sécurité");

            // Archives → seul Manager autorisé
            case "archives":
                return false;   // Tous interdits sauf Manager (déjà géré au-dessus)

            // Conférence + Personnel → accès libre
            case "conference":
            case "personnel":
                return true;

            // Autres zones → accès libre
            default:
                return true;
        }
    });
}
const assignOverlay = document.getElementById('assignOverlay');
const assignContainer = document.getElementById('assign_container');
const assignCancelBtn = document.getElementById('assignCancel');
const assignConfirmBtn = document.getElementById('assignConfirm');

let currentRoomId = null;
let selectedEmployeeIndex = null;

const ROOM_BUTTONS_MAP = {
    'btnarchive': 'archives',
    'btnpersonnel': 'personnel',
    'btnreception': 'reception',
    'btnsecurit': 'securite',
    'btnserveur': 'serveurs',
    'btnconference': 'conference',
};

function closeAssignModal() {
    assignOverlay.classList.add('hidden');
    selectedEmployeeIndex = null;
    currentRoomId = null;
}

function createEmployeeCard(employee, realIndex) {
    const card = document.createElement('div');
    card.className = "card border mb-2 h-[60px] flex items-center gap-3 px-2 cursor-pointer hover:bg-gray-100";
    card.innerHTML = `
        <img src="${employee.image || ''}" class="h-[44px] w-[44px] rounded-full bg-gray-200 object-cover">
        <div class="flex flex-col text-xs">
            <span class="font-semibold">${employee.nom}</span>
            <span class="text-gray-500">${employee.role}</span>
        </div>
    `;
    
    card.addEventListener('click', () => {
        document.querySelectorAll('#assign_container .card').forEach(c => {
            c.classList.remove('ring', 'ring-green-500');
        });

        card.classList.add('ring', 'ring-green-500');
        selectedEmployeeIndex = realIndex;
    });

    return card;
}

function openAssignModal(roomId) {
    currentRoomId = roomId;
    selectedEmployeeIndex = null;
    assignContainer.innerHTML = '';

    const eligibleEmployees = getEligibleEmployees(roomId);

    if (eligibleEmployees.length === 0) {
        assignContainer.innerHTML = '<p class="p-2 text-sm text-red-600">Pas d\'employés disponibles pour cette salle.</p>';
        assignOverlay.classList.remove('hidden');
        return;
    }

    eligibleEmployees.forEach(emp => {
        const realIndex = employees.indexOf(emp); 
        const card = createEmployeeCard(emp, realIndex);
        assignContainer.appendChild(card);
    });

    assignOverlay.classList.remove('hidden');
}

function createAssignedCard(employee, staffContainer) {
    const assignedCard = document.createElement('div');
    assignedCard.className = "assigned-card flex items-center bg-white border px-2 py-1 text-xs";
    
    const initialLetter = employee.nom.charAt(0).toUpperCase();
    const imageOrInitial = employee.image ? `<img src="${employee.image}" class="w-full h-full object-cover">` : initialLetter;

    assignedCard.innerHTML = `
        <div class="w-6 h-6 bg-blue-600 text-white flex items-center justify-center mr-2 overflow-hidden text-[10px]">
            ${imageOrInitial}
        </div>
        <div class="flex-1">
            <p class="font-semibold truncate">${employee.nom}</p>
            <p class="text-gray-500 text-[10px] truncate">${employee.role}</p>
        </div>
        <button class="remove-btn ml-2 text-red-600 text-xs">X</button>
    `;

    const removeBtn = assignedCard.querySelector('.remove-btn');
    removeBtn.addEventListener('click', () => {
        assignedCard.remove(); 
        
      // here
    let object=  {
            nom: employee.nom,
        role: employee.role,
        image: employee.image,
        email: employee.email,
        phone: employee.phone,
        isInRoom : false
        
    }
    employees.pop(employee)
    employees.push(object); 

    sidebar();
    });

    return assignedCard;
}

function handleAssignConfirm() {
    if (selectedEmployeeIndex === null || currentRoomId === null) {
        return;
    }

    const employee = employees[selectedEmployeeIndex];
    const roomSection = document.getElementById(currentRoomId);
    if (!roomSection) {
        return;
    }
    
    const staffContainer = document.getElementById('staff');

    let zoneList = roomSection.querySelector('.assign');
    // mafhmthach 
    if (!zoneList) {
        zoneList = document.createElement('div');
        zoneList.className = 'assign mt-2 space-y-1';
        roomSection.appendChild(zoneList);
    }
    
    const assignedCard = createAssignedCard(employee, staffContainer);
    zoneList.appendChild(assignedCard);
    let object=  {
            nom: employee.nom,
        role: employee.role,
        image: employee.image,
        email: employee.email,
        phone: employee.phone,
        isInRoom : true
        
    }
    employees.pop(employee)
    employees.push(object);

    
    sidebar();
    closeAssignModal();
}

function initializeEventListeners() {
    assignCancelBtn.addEventListener('click', closeAssignModal);
    assignConfirmBtn.addEventListener('click', handleAssignConfirm);

    for (const btnId in ROOM_BUTTONS_MAP) {
        const button = document.getElementById(btnId);
        const roomId = ROOM_BUTTONS_MAP[btnId];
        
        if (button) {
            button.addEventListener('click', () => openAssignModal(roomId));
        }
    }
}

document.addEventListener('DOMContentLoaded', initializeEventListeners);

// katakhd isInroom false mn employees (filter) == showing in sidebar

const sidebar_list = document.getElementById("staff-list");
function sidebar(){
//       workerDiv.className = '';
//   workerDiv.innerHTML = `
    //   ${photo ? ` : name.charAt(0).toUpperCase()}
    // </div>
    // <div>
    sidebar_list.innerHTML = "";
    let unassigned = null;
         unassigned = employees.filter(function(e){
            return e.isInRoom === false;
        })

        unassigned.forEach(function(e){
            cad = `<div class="flex items-center bg-gray-50 border border-gray-200 rounded-none p-2 hover:bg-gray-100 cursor-pointer">
    <div class="w-8 h-8 bg-blue-600 text-white flex items-center justify-center mr-2 overflow-hidden rounded-full">
        <img src="${e.image}" class="w-full h-full object-cover" alt="${e.nom}">
    </div>

    <div class="flex flex-col">
        <p class="font-semibold">${e.nom}</p>
        <p class="text-gray-500 text-xs">${e.role}</p>
    </div>
</div>`;

            sidebar_list.insertAdjacentHTML('beforeend',cad);        })

            formOverlay.classList.add("hidden");
}