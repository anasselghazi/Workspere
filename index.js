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
 
     formOverlay.addEventListener('click', (e) => {
      if (e.target === formOverlay) {
        closeform();
      }
    });


 workerform.addEventListener('submit', (e) => {
  e.preventDefault();

  // Récupérer le nom et le rôle
  const name = document.getElementById('name').value.trim();
  const role = document.getElementById('role').value.trim();

  if (!name || !role) return; // ne rien faire si vide

  // Créer un div pour le nouvel employé
  const staffContainer = document.querySelector('aside .space-y-2');
  const workerDiv = document.createElement('div');
  workerDiv.className = 'flex items-center bg-gray-50 border border-gray-200 rounded-none p-2';
  workerDiv.innerHTML = `
    <div class="w-8 h-8 bg-blue-600 text-white flex items-center justify-center mr-2 text-xs">
      ${name.charAt(0).toUpperCase()}
    </div>
    <div>
      <p class="font-semibold">${name}</p>
      <p class="text-gray-500 text-xs">${role}</p>
    </div>
  `;

  // Ajouter à la liste
  staffContainer.appendChild(workerDiv);

  // Fermer le formulaire et réinitialiser
  formOverlay.classList.add('hidden');
  workerform.reset();
  photopreview.src = '';
});