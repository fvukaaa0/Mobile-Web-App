// 1. Konfigurasi API (Disentralisasi)
const CONFIG = {
    API_URL: "http://localhost:3000", // Ganti dengan path file JSON Anda
};

let allData = [];

// 2. Fungsi Ambil Data (Querying Data)
async function fetchData() {
    const response = await fetch(CONFIG.API_URL);
    allData = await response.json();
    renderData(allData);
}

// 3. Tampilkan Data (Mobile Layout)
function renderData(data) {
    const list = document.getElementById('dataList');
    list.innerHTML = data.map(item => `
        <div class="card" onclick="showDetail(${item.id})">
            <h3>${item.name}</h3>
            <p>${item.email}</p>
        </div>
    `).join('');
}

// 4. Fitur Pencarian (Interaktif)
document.getElementById('searchInput').addEventListener('input', (e) => {
    const keyword = e.target.value.toLowerCase();
    const filtered = allData.filter(item =>
        item.name.toLowerCase().includes(keyword)
    );
    renderData(filtered);
});

// 5. Tampilan Detail
function showDetail(id) {
    const item = allData.find(d => d.id === id);
    const content = document.getElementById('detailContent');
    content.innerHTML = `
        <h2>${item.name}</h2>
        <p><strong>Username:</strong> ${item.username}</p>
        <p><strong>Website:</strong> ${item.website}</p>
        <p><strong>Alamat:</strong> ${item.address.city}</p>
    `;
    document.getElementById('detailModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('detailModal').style.display = 'none';
}

fetchData();