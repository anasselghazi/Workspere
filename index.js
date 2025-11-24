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

  // Créer un div pour le nouvel employé
  const staffContainer = document.querySelector('aside .space-y-2');
  const workerDiv = document.createElement('div');
  workerDiv.className = 'flex items-center bg-gray-50 border border-gray-200 rounded-none p-2 hover:bg-gray-100 cursor-pointer';
  workerDiv.innerHTML = `
    <div class="w-8 h-8 bg-blue-600 text-white flex items-center justify-center mr-2 text-xs">
      ${photo ? `<img src="${photo}" class="w-full h-full object-cover">` : name.charAt(0).toUpperCase()}
    </div>
    <div>
      <p class="font-semibold">${name}</p>
      <p class="text-gray-500 text-xs">${role}</p>
    </div>
  `;

      let object = {
        nom: name,
        role: role,
        image: photo,
        email: email,
        phone: phone
    }
        employees.push(object);



   
const removeBtn = document.createElement('button');
removeBtn.textContent = 'X';
removeBtn.className = 'ml-auto text-red-600 text-xs';
removeBtn.addEventListener('click', (e) => {
    e.stopPropagation(); 
    workerDiv.remove();  
});

workerDiv.appendChild(removeBtn);

  // Ajouter à la liste
  staffContainer.appendChild(workerDiv);

  // Fermer le formulaire et réinitialiser
  formOverlay.classList.add('hidden');
  workerform.reset();
  photopreview.src = '';

  // Ajouter click pour afficher la card
  workerDiv.addEventListener('click', () => {
    const oldCard = document.getElementById('workerCard');
    if (oldCard) oldCard.remove();

    const card = document.createElement('div');
    card.id = 'workerCard';
    card.className = 'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white border border-gray-300 p-4 rounded shadow-lg z-50 w-72';
    card.innerHTML = `
      <div class="flex justify-between items-center mb-2">
        <h3 class="font-bold text-sm">${name}</h3>
        <button id="closeCard" class="text-gray-500 text-lg">&times;</button>
      </div>
      <div class="flex mb-2">
        <div class="w-8 h-8 bg-blue-600 rounded-none overflow-hidden mr-3">
          ${photo ? `<img src="${photo}" alt="${name}" class="w-full h-full object-cover">` : name.charAt(0).toUpperCase()}
        </div>
        <div class="text-xs">
          <p><strong>Rôle:</strong> ${role}</p>
          <p><strong>Email:</strong> ${email || '-'}</p>
          <p><strong>Téléphone:</strong> ${phone || '-'}</p>
        </div>
      </div>
    `;

    document.body.appendChild(card);
    document.getElementById('closeCard').addEventListener('click', () => {
      card.remove();
    });
  });
});
  
  


 // assign container //



// =======================
//    SYSTÈME D’ASSIGNATION
// =======================

// 1) Fonction pour récupérer les employés éligibles selon la salle
function getEligibleEmployees(roomId) {
    switch(roomId) {
        case "reception":
            return employees.filter(emp =>
                emp.role.toLowerCase().includes("réception") ||
                emp.role.toLowerCase().includes("reception")
            );
        case "serveurs":
            return employees.filter(emp =>
                emp.role.toLowerCase().includes("tech") ||
                emp.role.toLowerCase().includes("it")
            );
        case "securite":
            return employees.filter(emp =>
                emp.role.toLowerCase().includes("sécurité") ||
                emp.role.toLowerCase().includes("secur")
            );
        case "archives":
            return employees.filter(emp => emp.role.toLowerCase() !== "nettoyage");
        case "conference":
        case "personnel":
            return employees;
        default:
            return employees;
    }
}

// 2) Éléments du modal
var assignOverlay = document.getElementById('assignOverlay');
var assignContainer = document.getElementById('assign_container');
var assignCancelBtn = document.getElementById('assignCancel');
var assignConfirmBtn = document.getElementById('assignConfirm');

var currentRoom = null;
var selectedIndex = null;

// 3) Ouvrir le modal d'assignation
function open_assign(roomId) {
    currentRoom = roomId;
    selectedIndex = null;

    assignContainer.innerHTML = '';

    var eligible = getEligibleEmployees(roomId);

    if(eligible.length === 0) {
        assignContainer.innerHTML = '<p class="p-2 text-sm text-red-600">Pas d\'employés disponibles pour cette salle.</p>';
        assignOverlay.classList.remove('hidden');
        return;
    }

    for(var i = 0; i < eligible.length; i++) {
        (function(emp) {
            var realIndex = employees.indexOf(emp);
            var card = document.createElement('div');
            card.className = "card border mb-2 h-[60px] flex items-center gap-3 px-2 cursor-pointer hover:bg-gray-100";
            card.innerHTML = 
                '<img src="'+(emp.image || '')+'" class="h-[44px] w-[44px] rounded-full bg-gray-200 object-cover">' +
                '<div class="flex flex-col text-xs">' +
                '<span class="font-semibold">'+emp.nom+'</span>' +
                '<span class="text-gray-500">'+emp.role+'</span>' +
                '</div>';
            
            card.onclick = function() {
                var allCards = assignContainer.getElementsByClassName('card');
                for(var j=0;j<allCards.length;j++){
                    allCards[j].classList.remove('ring', 'ring-green-500');
                }
                card.classList.add('ring', 'ring-green-500');
                selectedIndex = realIndex;
            };

            assignContainer.appendChild(card);
        })(eligible[i]);
    }

    assignOverlay.classList.remove('hidden');
}

// 4) Fermer le modal
function close_assign_modal() {
    assignOverlay.classList.add('hidden');
    selectedIndex = null;
    currentRoom = null;
}

assignCancelBtn.onclick = close_assign_modal;

// 5) Confirmer l'assignation
assignConfirmBtn.onclick = function() {
    if(selectedIndex === null || currentRoom === null) return;

    var emp = employees[selectedIndex];
    var roomSection = document.getElementById(currentRoom);
    if(!roomSection) return;

    var zoneList = null;
    var children = roomSection.getElementsByClassName('assign');
    if(children.length > 0){
        zoneList = children[0];
    } else {
        zoneList = document.createElement('div');
        zoneList.className = 'assign mt-2 space-y-1';
        roomSection.appendChild(zoneList);
    }

    var assigned = document.createElement('div');
    assigned.className = "assigned-card flex items-center bg-white border px-2 py-1 text-xs";
    assigned.innerHTML = 
        '<div class="w-6 h-6 bg-blue-600 text-white flex items-center justify-center mr-2 overflow-hidden text-[10px]">' +
        (emp.image ? '<img src="'+emp.image+'" class="w-full h-full object-cover">' : emp.nom.charAt(0).toUpperCase()) +
        '</div>' +
        '<div class="flex-1">' +
        '<p class="font-semibold truncate">'+emp.nom+'</p>' +
        '<p class="text-gray-500 text-[10px] truncate">'+emp.role+'</p>' +
        '</div>' +
        '<button class="ml-2 text-red-600 text-xs">X</button>';

    // Bouton X pour retirer
    var removeBtn = assigned.getElementsByTagName('button')[0];
    removeBtn.onclick = function() {
        assigned.remove();

        // Remettre dans le staff non assigné
        var staffContainer = document.getElementById('staff');
        var workerDiv = document.createElement('div');
        workerDiv.className = "flex items-center bg-gray-50 border p-2 hover:bg-gray-100 cursor-pointer";
        workerDiv.innerHTML = 
            '<div class="w-8 h-8 bg-blue-600 text-white flex items-center justify-center mr-2">'+
            (emp.image ? '<img src="'+emp.image+'" class="w-full h-full object-cover">' : emp.nom.charAt(0).toUpperCase()) +
            '</div>'+
            '<div><p class="font-semibold">'+emp.nom+'</p><p class="text-gray-500 text-xs">'+emp.role+'</p></div>';

        staffContainer.appendChild(workerDiv);
    };

    zoneList.appendChild(assigned);
    close_assign_modal();
};

// 6) Boutons "+" pour toutes les salles
 document.getElementById('btnarchive').onclick = function(){ open_assign('archives'); };
document.getElementById('btnpersonnel').onclick = function(){ open_assign('personnel'); };
document.getElementById('btnreception').onclick = function(){ open_assign('reception'); };
document.getElementById('btnsecurit').onclick = function(){ open_assign('securite'); };
document.getElementById('btnserveur').onclick = function(){ open_assign('serveurs'); };
document.getElementById('btnconference').onclick = function(){ open_assign('conference'); };



 