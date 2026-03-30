// ─── State ───────────────────────────────────────────────
let nextId = products.length + 1;
let editingId = null;

// ─── Render ──────────────────────────────────────────────
const renderProducts = (list = products) => {
  const grid = document.getElementById("productsGrid");
  const empty = document.getElementById("emptyState");

  if (list.length === 0) {
    grid.innerHTML = "";
    empty.classList.remove("hidden");
    return;
  }
  empty.classList.add("hidden");

  grid.innerHTML = list.map(p => `
    <div class="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col">
      <div class="bg-gradient-to-br from-blue-500 to-blue-700 p-6 flex items-center justify-center">
        <span class="text-5xl">${getCategoryEmoji(p.category)}</span>
      </div>
      <div class="p-5 flex flex-col flex-1">
        <div class="flex justify-between items-start mb-2">
          <span class="text-xs font-semibold bg-blue-100 text-blue-700 px-2 py-1 rounded-full">${p.category}</span>
          <span class="text-xs text-gray-400">${p.createdAt}</span>
        </div>
        <h3 class="text-gray-800 font-bold text-lg mt-2 mb-1">${p.name}</h3>
        <p class="text-gray-500 text-sm flex-1 mb-3">${p.description}</p>
        <div class="flex justify-between items-center mb-4">
          <span class="text-blue-700 font-bold text-xl">$${p.price}</span>
          <span class="text-yellow-500 font-semibold text-sm">⭐ ${p.rating}</span>
        </div>
        <div class="flex gap-2 mt-auto">
          <button onclick="openEditModal(${p.id})"
            class="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold text-sm py-2 rounded-lg transition">
            ✏️ Edit
          </button>
          <button onclick="deleteProduct(${p.id})"
            class="flex-1 bg-red-50 hover:bg-red-100 text-red-600 font-semibold text-sm py-2 rounded-lg transition">
            🗑️ Delete
          </button>
        </div>
      </div>
    </div>
  `).join("");
};

// ─── Category Emoji ──────────────────────────────────────
const getCategoryEmoji = (category) => {
  const map = {
    "Engine": "⚙️",
    "Exhaust": "💨",
    "Lighting": "💡",
    "Body": "🚗",
    "Brakes": "🛑",
    "Suspension": "🔩",
    "Wheels": "🔵",
    "Interior": "🪑"
  };
  return map[category] || "🔧";
};

// ─── CREATE ──────────────────────────────────────────────
const addForm = document.getElementById("addForm");
addForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("addName").value.trim();
  const category = document.getElementById("addCategory").value;
  const price = parseFloat(document.getElementById("addPrice").value);
  const rating = parseFloat(document.getElementById("addRating").value);
  const description = document.getElementById("addDescription").value.trim();

  if (!name || !category || !price || !rating || !description) return;

  const newProduct = {
    id: nextId++,
    name,
    category,
    price,
    rating,
    description,
    createdAt: new Date().toISOString().split("T")[0]
  };

  products.push(newProduct);
  renderProducts();
  addForm.reset();
  document.getElementById("addModal").classList.add("hidden");
});

// ─── DELETE ──────────────────────────────────────────────
const deleteProduct = (id) => {
  const confirmed = confirm("Are you sure you want to delete this product?");
  if (!confirmed) return;

  const index = products.findIndex(p => p.id === id);
  if (index !== -1) {
    products.splice(index, 1);
  }
  renderProducts();
};

// ─── UPDATE ──────────────────────────────────────────────
const openEditModal = (id) => {
  editingId = id;
  const p = products.find(p => p.id === id);
  if (!p) return;

  document.getElementById("editName").value = p.name;
  document.getElementById("editCategory").value = p.category;
  document.getElementById("editPrice").value = p.price;
  document.getElementById("editRating").value = p.rating;
  document.getElementById("editDescription").value = p.description;

  document.getElementById("editModal").classList.remove("hidden");
};

const editForm = document.getElementById("editForm");
editForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const index = products.findIndex(p => p.id === editingId);
  if (index === -1) return;

  products[index].name = document.getElementById("editName").value.trim();
  products[index].category = document.getElementById("editCategory").value;
  products[index].price = parseFloat(document.getElementById("editPrice").value);
  products[index].rating = parseFloat(document.getElementById("editRating").value);
  products[index].description = document.getElementById("editDescription").value.trim();

  renderProducts();
  document.getElementById("editModal").classList.add("hidden");
  editingId = null;
});

// ─── MODAL CONTROLS ──────────────────────────────────────
const openAddModal = () => document.getElementById("addModal").classList.remove("hidden");
const closeAddModal = () => { document.getElementById("addModal").classList.add("hidden"); addForm.reset(); };
const closeEditModal = () => { document.getElementById("editModal").classList.add("hidden"); editingId = null; };

// Close modal on backdrop click
document.getElementById("addModal").addEventListener("click", (e) => {
  if (e.target === document.getElementById("addModal")) closeAddModal();
});
document.getElementById("editModal").addEventListener("click", (e) => {
  if (e.target === document.getElementById("editModal")) closeEditModal();
});

// ─── INIT ─────────────────────────────────────────────────
renderProducts();
