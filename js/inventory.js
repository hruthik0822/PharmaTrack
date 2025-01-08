document.addEventListener('DOMContentLoaded', () => {
    // Initialize the list of medicines (existing or new)
    let medicines = JSON.parse(localStorage.getItem('medicines')) || [
        {
            "name": "Rantac 150mg Tablet",
            "mrp": 25,
            "type": "strip of 30 tablets",
            "manufacturer": "JB Chemicals & Pharmaceuticals Ltd",
            "composition": "Ranitidine (150mg)"
        },
        {
            "name": "Sertraline 50mg Tablet",
            "mrp": 95,
            "type": "strip of 10 tablets",
            "manufacturer": "Torrent Pharmaceuticals Ltd",
            "composition": "Sertraline (50mg)"
        },
        {
            "name": "Amlodipine 5mg Tablet",
            "mrp": 60,
            "type": "strip of 15 tablets",
            "manufacturer": "Pfizer Ltd",
            "composition": "Amlodipine (5mg)"
        },
        {
            "name": "Losartan 50mg Tablet",
            "mrp": 80,
            "type": "strip of 10 tablets",
            "manufacturer": "Sun Pharmaceutical Industries Ltd",
            "composition": "Losartan (50mg)"
        },
        {
            "name": "Amitriptyline 25mg Tablet",
            "mrp": 55,
            "type": "strip of 10 tablets",
            "manufacturer": "Lupin Pharmaceuticals",
            "composition": "Amitriptyline (25mg)"
        },
        {
            "name": "Loratadine 10mg Tablet",
            "mrp": 75,
            "type": "strip of 10 tablets",
            "manufacturer": "Cipla Ltd",
            "composition": "Loratadine (10mg)"
        },
        {
            "name": "Propranolol 40mg Tablet",
            "mrp": 85,
            "type": "strip of 15 tablets",
            "manufacturer": "Sun Pharmaceutical Industries Ltd",
            "composition": "Propranolol (40mg)"
        },
        {
            "name": "Nitroglycerin 2.6mg Tablet",
            "mrp": 100,
            "type": "strip of 15 tablets",
            "manufacturer": "Abbott",
            "composition": "Nitroglycerin (2.6mg)"
        },
        {
            "name": "Enalapril 10mg Tablet",
            "mrp": 70,
            "type": "strip of 10 tablets",
            "manufacturer": "Lupin Pharmaceuticals",
            "composition": "Enalapril (10mg)"
        },
        {
            "name": "Metformin 850mg Tablet",
            "mrp": 35,
            "type": "strip of 10 tablets",
            "manufacturer": "USV Pvt Ltd",
            "composition": "Metformin (850mg)"
        },
        {
            "name": "Clopidogrel 75mg Tablet",
            "mrp": 110,
            "type": "strip of 15 tablets",
            "manufacturer": "Sanofi India Ltd",
            "composition": "Clopidogrel (75mg)"
        },
        {
            "name": "Simvastatin 20mg Tablet",
            "mrp": 120,
            "type": "strip of 10 tablets",
            "manufacturer": "Cipla Ltd",
            "composition": "Simvastatin (20mg)"
        },
        {
            "name": "Clarithromycin 250mg Tablet",
            "mrp": 95,
            "type": "strip of 10 tablets",
            "manufacturer": "Abbott",
            "composition": "Clarithromycin (250mg)"
        },
        {
            "name": "Prednisolone 5mg Tablet",
            "mrp": 50,
            "type": "strip of 10 tablets",
            "manufacturer": "Cipla Ltd",
            "composition": "Prednisolone (5mg)"
        }
    ];

    // Function to create and display medicine cards
    function displayMedicines(medicines) {
        const container = document.getElementById('medicine-container');
        container.innerHTML = ''; // Clear previous entries
        medicines.forEach((medicine, index) => {
            const card = document.createElement('div');
            card.className = 'medicine-card';
            card.innerHTML = `
                <h3>${medicine.name}</h3>
                <p><strong>MRP:</strong> ₹${medicine.mrp}</p>
                <p><strong>Type:</strong> ${medicine.type}</p>
                <p><strong>Manufacturer:</strong> ${medicine.manufacturer}</p>
                <p><strong>Composition:</strong> ${medicine.composition}</p>
                <div class="button-group">
                    <button class="edit-btn" data-index="${index}">Edit</button>
                    <button class="remove-btn" data-index="${index}">Remove</button>
                </div>
            `;
            container.appendChild(card);
        });

        // Attach event listeners to Edit and Remove buttons
        document.querySelectorAll('.edit-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = e.target.dataset.index;
                openEditModal(index);
            });
        });

        document.querySelectorAll('.remove-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = e.target.dataset.index;
                removeMedicine(index);
            });
        });
    }

    // Display medicines initially
    displayMedicines(medicines);

    // Get modal and button elements
    const modal = document.getElementById('add-drug-modal');
    const btn = document.getElementById('add-drug-btn');
    const span = document.getElementsByClassName('close-btn')[0];
    const form = document.getElementById('add-drug-form');
    let editIndex = null; // To keep track if we're editing a drug
    let modalbox = document.querySelector('.modal-content');


    // Show the modal when the button is clicked
    btn.onclick = function() {

        modal.style.display = 'block';
        modalbox.style.backgroundColor = 'teal';
        form.reset();
        editIndex = null; // Reset editing state
    }

    // Close the modal when the user clicks on <span> (x)
    span.onclick = function() {
        modal.style.display = 'none';
    }

    // Close the modal when the user clicks anywhere outside of the modal
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }

    // Handle form submission for both adding and editing drugs
    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent form from submitting normally

        // Get form data
        const name = document.getElementById('name').value;
        const mrp = document.getElementById('mrp').value;
        const type = document.getElementById('type').value;
        const manufacturer = document.getElementById('manufacturer').value;
        const composition = document.getElementById('composition').value;

        const newDrug = {
            name,
            mrp: parseFloat(mrp), // Convert to number
            type,
            manufacturer,
            composition
        };

        if (editIndex !== null) {
            // Edit existing drug
            medicines[editIndex] = newDrug;
        } else {
            // Add new drug
            medicines.push(newDrug);
        }

        // Store updated list in local storage
        localStorage.setItem('medicines', JSON.stringify(medicines));

        // Display updated list
        displayMedicines(medicines);

        // Clear and close the form
        form.reset();
        modal.style.display = 'none';
    });

    // Function to open the modal and populate the form for editing
    function openEditModal(index) {
        const medicine = medicines[index];
        document.getElementById('name').value = medicine.name;
        document.getElementById('mrp').value = medicine.mrp;
        document.getElementById('type').value = medicine.type;
        document.getElementById('manufacturer').value = medicine.manufacturer;
        document.getElementById('composition').value = medicine.composition;

        editIndex = index; // Set the current editing index
        modal.style.display = 'block'; // Open the modal
    }

    // Function to remove a medicine from the list with confirmation
    function removeMedicine(index) {
        const confirmed = window.confirm('Are you sure you want to remove this medicine?');
        if (confirmed) {
            medicines.splice(index, 1); // Remove from the array
            localStorage.setItem('medicines', JSON.stringify(medicines)); // Update local storage
            displayMedicines(medicines); // Update displayed list
        }
    }

    // Function to handle search
    function searchMedicines() {
        const searchInput = document.getElementById('search-input').value.toLowerCase();
        const filteredMedicines = medicines.filter(medicine => {
            return medicine.name.toLowerCase().includes(searchInput);
        });
        displayMedicines(filteredMedicines);
    }

    // Event listener for search input
    document.getElementById('search-input').addEventListener('input', searchMedicines);
});
function confirmRemoval() {
    const confirmed = window.confirm("Are you sure you want to remove this drug from the inventory?");
    if (confirmed) {
        // Add logic to remove the drug
        alert("Drug removed from inventory");
    } else {
        // Optionally handle the case where the user cancels
        alert("Drug removal cancelled");
    }
}

function searchDrugs() {
    const searchInput = document.getElementById('search-input').value.toLowerCase();
    const medicineCards = document.querySelectorAll('.medicine-card');

    medicineCards.forEach(card => {
        const drugName = card.querySelector('h3').textContent.toLowerCase();
        if (drugName.includes(searchInput)) {
            card.style.display = '';
        } else {
            card.style.display = 'none';
        }
    });
}



function popup (){
    document.getElementById
}