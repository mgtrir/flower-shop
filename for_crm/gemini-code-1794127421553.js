// Функция автоматического поиска фото по имени цветка
function getFlowerPhotoUrl(flower) {
    if (flower.image && flower.image.startsWith('http')) return flower.image;
    if (flower.image && (flower.image.includes('/') || flower.image.includes('.'))) return flower.image;
    const cleanName = (flower.name || '').trim();
    return `for crm/${cleanName}.jpg`;
}

// Рендер каталога с каскадной проверкой путей (for crm/ -> for_crm/ -> заглушка)
function renderCatalog() {
    const grid = document.getElementById('catalogGrid');
    const search = document.getElementById('searchInput').value.toLowerCase();
    grid.innerHTML = '';
    flowers.filter(f => {
        return (f.name.toLowerCase().includes(search)) &&
               (selectedTypeFilter === 'ALL' || f.category === selectedTypeFilter) &&
               (selectedSizeFilter === 'ALL' || f.size.includes(selectedSizeFilter)) &&
               (selectedNameFilter === 'ALL' || f.name === selectedNameFilter);
    }).forEach(f => {
        const photoUrl = getFlowerPhotoUrl(f);
        const cleanName = (f.name || '').trim();
        grid.innerHTML += `
            <div class="card">
                <div class="image-wrapper">
                    <img src="${photoUrl}" alt="${f.name}" onerror="if(!this.dataset.triedAlt){this.dataset.triedAlt=1; this.src='for_crm/${cleanName}.jpg';}else{this.onerror=null; this.src=DEFAULT_FLOWER_IMAGE;}">
                    <div class="size-tag">${f.size}</div>
                    <div class="category-tag">${f.category || 'Одноголовая'}</div>
                </div>
                <div class="card-body">
                    <h3 class="card-title">${f.name}</h3>
                    <p style="margin-bottom:0.5rem; font-size:0.90rem;">Остаток: <strong>${f.packs || 0} пач (${f.stock || 0} шт)</strong></p>
                    <div class="card-footer-action">
                        <div class="cart-input-box">
                            <button class="btn btn-outline btn-sm" onclick="adjustCardQty('${f.id}', -1)">-</button>
                            <input type="number" id="cardQty_${f.id}" class="cart-qty-input" value="1">
                            <button class="btn btn-outline btn-sm" onclick="adjustCardQty('${f.id}', 1)">+</button>
                            <button class="btn btn-success btn-sm" style="flex:1;" onclick="addToCartDirect('${f.id}')">🛒 В корзину</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });
}