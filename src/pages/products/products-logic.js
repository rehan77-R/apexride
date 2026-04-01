// ==========================================
// 1. INITIAL DATA (Array of Objects) [cite: 13, 36]
// ==========================================
let products = [
    { id: "PRD-101", name: "Turbo Boost Kit V2", category: "Engine", price: 350, rating: 4.8, description: "High performance turbo kit for extra horsepower." },
    { id: "PRD-102", name: "LED Headlights Pro", category: "Lighting", price: 120, rating: 4.5, description: "Ultra bright LED conversion kit." },
    { id: "PRD-103", name: "Carbon Fiber Spoiler", category: "Body", price: 299, rating: 4.2, description: "Aerodynamic lightweight rear spoiler." },
    { id: "PRD-104", name: "Ceramic Brake Pads", category: "Brakes", price: 85, rating: 3.9, description: "Low dust, noise-free stopping power." },
    { id: "PRD-105", name: "Sport Exhaust System", category: "Exhaust", price: 450, rating: 4.9, description: "Deep aggressive sound with better flow." },
];

// ==========================================
// 2. THEME TOGGLE (Task 4 - LocalStorage)
// ==========================================
const themeToggleBtn = document.getElementById('themeToggleBtn');
const body = document.getElementById('bodyElement');
const navbar = document.getElementById('navbar');

// Check Local Storage on Load
let isDarkMode = localStorage.getItem('theme') === 'dark';

const applyTheme = () => {
    if (isDarkMode) {
        // Main Background & Navbar
        body.classList.replace('bg-slate-100', 'bg-gray-900');
        navbar.classList.replace('bg-white', 'bg-gray-800');
        navbar.classList.add('text-white');
        themeToggleBtn.innerText = '☀️';
        
        // Fix: Stats Cards & Filter Section Backgrounds
        document.querySelectorAll('.card-bg').forEach(el => {
            el.classList.remove('bg-white', 'border-gray-100', 'border-gray-200');
            el.classList.add('bg-gray-800', 'border-gray-700', 'text-white');
        });
        
        // Fix: Text colors inside Stats
        document.querySelectorAll('.stat-text').forEach(el => {
            el.classList.replace('text-gray-800', 'text-white');
        });
        
        // Fix: Form Inputs and Select Dropdowns styling
        document.querySelectorAll('input, select, textarea').forEach(el => {
            el.classList.remove('bg-white', 'text-black', 'border-gray-300');
            el.classList.add('bg-gray-700', 'text-white', 'border-gray-600');
        });
        
    } else {
        // Main Background & Navbar
        body.classList.replace('bg-gray-900', 'bg-slate-100');
        navbar.classList.replace('bg-gray-800', 'bg-white');
        navbar.classList.remove('text-white');
        themeToggleBtn.innerText = '🌓';
        
        // Fix: Revert Stats Cards & Filter Section
        document.querySelectorAll('.card-bg').forEach(el => {
            el.classList.remove('bg-gray-800', 'border-gray-700', 'text-white');
            el.classList.add('bg-white', 'border-gray-100');
        });
        
        // Fix: Revert Text colors
        document.querySelectorAll('.stat-text').forEach(el => {
            el.classList.replace('text-white', 'text-gray-800');
        });
        
        // Fix: Revert Inputs and Select Dropdowns
        document.querySelectorAll('input, select, textarea').forEach(el => {
            el.classList.remove('bg-gray-700', 'text-white', 'border-gray-600');
            el.classList.add('bg-white', 'text-black', 'border-gray-300');
        });
    }
};

themeToggleBtn.addEventListener('click', () => {
    isDarkMode = !isDarkMode;
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    applyTheme();
    window.applyFilters(); // Re-render product cards
});
applyTheme(); // Run on initial load

// ==========================================
// 3. STATS CALCULATION (Array Methods) 
// ==========================================
const updateStats = (data) => {
    // 1. Array Method: reduce() - Total Price calc
    const totalPrice = data.reduce((sum, item) => sum + Number(item.price), 0);
    const avgPrice = data.length ? (totalPrice / data.length).toFixed(2) : 0;

    // 2. Array Method: reduce() - Total Rating calc
    const totalRating = data.reduce((sum, item) => sum + Number(item.rating), 0);
    const avgRating = data.length ? (totalRating / data.length).toFixed(1) : 0;

    // 3. Array Method: every() - Check if all products have valid ratings
    const allValidRatings = data.every(item => item.rating > 0);
    
    // 4. Array Method: some() - Check if any product is premium (>$400)
    const hasPremium = data.some(item => item.price > 400);

    document.getElementById('statTotal').innerText = data.length;
    document.getElementById('statAvgPrice').innerText = `$${avgPrice}`;
    document.getElementById('statAvgRating').innerText = `${avgRating} ${allValidRatings ? '⭐' : ''}`;
};


// ==========================================
// 4. RENDER UI (Read - Array.map) [cite: 42, 56]
// ==========================================
const renderProducts = (data) => {
    const grid = document.getElementById('productsGrid');
    const emptyState = document.getElementById('emptyState');
    
    grid.innerHTML = '';

    if (data.length === 0) {
        emptyState.classList.remove('hidden');
    } else {
        emptyState.classList.add('hidden');

        // 5. Array Method: map() - Create HTML for each product
        const htmlParts = data.map(product => {
            const cardBg = isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-100 text-gray-800';
            const textMuted = isDarkMode ? 'text-gray-400' : 'text-gray-500';
            
            // --- String Methods Integration (10 Methods)  ---
            let pName = product.name.trim(); // 1. trim() - Clean spaces
            let pCat = product.category.toUpperCase(); // 2. toUpperCase() - Format category
            let pDesc = product.description.substring(0, 50); // 3. substring() - Truncate long descriptions
            if(product.description.length > 50) pDesc = pDesc.concat('...'); // 4. concat() - Add ellipses
            let badgeClass = pCat.includes('ENGINE') ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'; // 5. includes() on string
            let priceStr = String(product.price).replace('', ''); // 6. replace() - simple string conversion helper
            let formattedId = product.id.split('-').join(' #'); // 7. split() and 8. join() - reformat ID (e.g., PRD #101)
            let firstLetter = pName.charAt(0); // 9. charAt() - get first letter for avatar maybe
            let searchIndex = pName.indexOf('Kit'); // 10. indexOf() - check if it's a kit (just for demo)
            
            return `
                <div class="${cardBg} p-5 rounded-xl shadow-sm border hover:shadow-md transition duration-300">
                    <div class="flex justify-between items-start mb-3">
                        <span class="text-xs font-bold px-2 py-1 rounded ${badgeClass}">${pCat}</span>
                        <span class="text-xs font-mono text-gray-400">${formattedId}</span>
                    </div>
                    <h3 class="text-xl font-bold mb-1">${pName}</h3>
                    <p class="${textMuted} text-sm mb-4 h-10">${pDesc}</p>
                    
                    <div class="flex justify-between items-center mb-4">
                        <span class="text-2xl font-bold text-blue-600">$${priceStr}</span>
                        <span class="flex items-center text-sm font-medium text-yellow-500">
                            ⭐ ${product.rating}
                        </span>
                    </div>
                    
                    <div class="flex gap-2 pt-3 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-100'}">
                        <button onclick="window.openEditModal('${product.id}')" class="flex-1 bg-green-50 text-green-600 py-1.5 rounded text-sm font-semibold hover:bg-green-100 transition">Edit</button>
                        <button onclick="window.deleteProduct('${product.id}')" class="flex-1 bg-red-50 text-red-600 py-1.5 rounded text-sm font-semibold hover:bg-red-100 transition">Delete</button>
                    </div>
                </div>
            `;
        });
        
        grid.innerHTML = htmlParts.join(''); // Combining array elements into HTML string
    }
    updateStats(data);
};


// ==========================================
// 5. SEARCH, FILTER & SORT (Task 3) [cite: 50, 56]
// ==========================================
window.applyFilters = () => {
    let searchTerm = document.getElementById('searchInput').value.toLowerCase().trim();
    let category = document.getElementById('categoryFilter').value;
    let maxPrice = document.getElementById('maxPriceFilter').value;
    let minRating = document.getElementById('ratingFilter').value;
    let sortBy = document.getElementById('sortFilter').value;

    // 6. Array Method: filter() - Chaining multiple conditions
    let filteredData = products.filter(item => {
        // String searching
        let matchesSearch = item.name.toLowerCase().includes(searchTerm) || 
                            item.description.toLowerCase().includes(searchTerm);
        
        let matchesCategory = category === 'All' || item.category === category;
        let matchesPrice = maxPrice === '' || item.price <= Number(maxPrice);
        let matchesRating = item.rating >= Number(minRating);

        return matchesSearch && matchesCategory && matchesPrice && matchesRating;
    });

    // 7. Array Method: sort() - Sorting by different parameters
    if (sortBy === 'priceLowHigh') {
        filteredData.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'priceHighLow') {
        filteredData.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'ratingHighLow') {
        filteredData.sort((a, b) => b.rating - a.rating);
    }

    renderProducts(filteredData);
};


// ==========================================
// 6. CRUD: CREATE [cite: 40, 41]
// ==========================================
const addModal = document.getElementById('addModal');
const addForm = document.getElementById('addForm');

window.openAddModal = () => {
    addForm.reset();
    addModal.classList.remove('hidden');
};

document.getElementById('closeAddModalBtn').addEventListener('click', () => addModal.classList.add('hidden'));
document.getElementById('cancelAddBtn').addEventListener('click', () => addModal.classList.add('hidden'));

addForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const newProduct = {
        id: "PRD-" + Math.floor(Math.random() * 900 + 100), // Generate Random ID
        name: document.getElementById('addName').value.trim(),
        category: document.getElementById('addCategory').value,
        price: Number(document.getElementById('addPrice').value),
        rating: Number(document.getElementById('addRating').value),
        description: document.getElementById('addDescription').value.trim()
    };

    products.push(newProduct); // Array Push
    addModal.classList.add('hidden');
    window.applyFilters(); // Re-render immediately
});


// ==========================================
// 7. CRUD: UPDATE [cite: 40, 43]
// ==========================================
const updateModal = document.getElementById('updateModal');
const updateForm = document.getElementById('updateForm');

window.openEditModal = (id) => {
    // 8. Array Method: find() - Locate specific object
    const productToEdit = products.find(p => p.id === id);
    
    if(productToEdit) {
        document.getElementById('editId').value = productToEdit.id;
        document.getElementById('editName').value = productToEdit.name;
        document.getElementById('editCategory').value = productToEdit.category;
        document.getElementById('editPrice').value = productToEdit.price;
        document.getElementById('editRating').value = productToEdit.rating;
        document.getElementById('editDescription').value = productToEdit.description;
        
        updateModal.classList.remove('hidden');
    }
};

document.getElementById('closeEditModalBtn').addEventListener('click', () => updateModal.classList.add('hidden'));
document.getElementById('cancelEditBtn').addEventListener('click', () => updateModal.classList.add('hidden'));

updateForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const id = document.getElementById('editId').value;
    
    // Update object directly
    products = products.map(p => {
        if (p.id === id) {
            return {
                ...p, // Spread Operator (Object Manipulation)
                name: document.getElementById('editName').value.trim(),
                category: document.getElementById('editCategory').value,
                price: Number(document.getElementById('editPrice').value),
                rating: Number(document.getElementById('editRating').value),
                description: document.getElementById('editDescription').value.trim()
            };
        }
        return p;
    });

    updateModal.classList.add('hidden');
    window.applyFilters();
});


// ==========================================
// 8. CRUD: DELETE [cite: 40, 44]
// ==========================================
window.deleteProduct = (id) => {
    if(confirm("Are you sure you want to delete this product?")) {
        // 9. Array Method: filter() - Remove object from array
        products = products.filter(p => p.id !== id);
        window.applyFilters(); // Update DOM
    }
};

// Initial Render
window.applyFilters();
