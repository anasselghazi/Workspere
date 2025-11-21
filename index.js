    const formOverlay   = document.getElementById('formOverlay');
    const openformbtn   = document.getElementById('openform');
    const closeformbtn  = document.getElementById('closeform');
    const cancelformbtn = document.getElementById('cancelform');
    const workerform    = document.getElementById('workerform');
    const photourlinput = document.getElementById('photourl');
    const photopreview  = document.getElementById('photopreview');
    const addexpbtn     = document.getElementById('addexperience');
    const expcontainer  = document.getElementById('experiences');

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
  
  


 