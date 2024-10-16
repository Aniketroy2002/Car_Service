var products = [
    { name: "Michelin", desc: "Rear-view Mirror", price: "Rs 499", img: "https://www.duaria.com/wp-content/uploads/2018/06/Wing_mirror.jpg" },
    { name: "Michelin", desc: "Ultra-Comfort Memory Foam Seat Cover", price: "Rs 999", img: "https://i5.walmartimages.com/asr/f6cca9a8-ff94-49dd-9a84-d5b6b8e4a4c4_1.7b7a5d4a806bda8e475c20404811e6fe.jpeg" },
    { name: "Michelin", desc: "Side Mirror", price: "Rs 799", img: "https://th.bing.com/th/id/OIP.DGXQqVF0WNwhQ3Tn9YFWmgHaEq?rs=1&pid=ImgDetMain" },
    { name: "Michelin", desc: "Seat Cover", price: "Rs 999", img: "https://i5.walmartimages.com/asr/f6cca9a8-ff94-49dd-9a84-d5b6b8e4a4c4_1.7b7a5d4a806bda8e475c20404811e6fe.jpeg" },
    { name: "Michelin", desc: "Memory Foam Cover", price: "Rs 999", img: "https://i5.walmartimages.com/asr/f6cca9a8-ff94-49dd-9a84-d5b6b8e4a4c4_1.7b7a5d4a806bda8e475c20404811e6fe.jpeg" },
    { name: "Michelin", desc: "Winter Seat Cover", price: "Rs 999", img: "https://i5.walmartimages.com/asr/f6cca9a8-ff94-49dd-9a84-d5b6b8e4a4c4_1.7b7a5d4a806bda8e475c20404811e6fe.jpeg" },
    { name: "Michelin", desc: "Car Seat Protector", price: "Rs 999", img: "https://i5.walmartimages.com/asr/f6cca9a8-ff94-49dd-9a84-d5b6b8e4a4c4_1.7b7a5d4a806bda8e475c20404811e6fe.jpeg" },
    { name: "Michelin", desc: "Leather Seat Cover", price: "Rs 1999", img: "https://i5.walmartimages.com/asr/f6cca9a8-ff94-49dd-9a84-d5b6b8e4a4c4_1.7b7a5d4a806bda8e475c20404811e6fe.jpeg" }
  ];
  
  let filteredProducts = [...products]; // Holds the search-filtered products
  const itemsPerPage = 6;
  let currentPage = 1;
  
  function displayProducts(page) {
    const productGrid = document.getElementById("product-grid");
    const errorMessage = document.getElementById("error-message");

  // Clear the previous content
    productGrid.innerHTML = ""; // Clear previous products
    errorMessage.style.display = "none";
  
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginatedProducts = filteredProducts.slice(start, end);
  
    if (paginatedProducts.length === 0) {
        errorMessage.style.display = "block"; // Show error message if no products
        document.getElementById("pagination").innerHTML = ""; // Clear pagination
        return;
    }
 
    paginatedProducts.forEach(product => {
      const productCard = document.createElement('div');
      productCard.className = 'col';
  
      productCard.innerHTML = `
        <div class="card text-white bg-secondary">
          <img src="${product.img}" class="card-img-top" alt="Product Image" style="height: 250px; object-fit: cover;">
          <div class="card-body">
            <h5 class="card-title">${product.name}</h5>
            <p class="card-text">${product.desc}</p>
            <p class="price">${product.price}</p>
          </div>
        </div>`;
      productGrid.appendChild(productCard);
    });
  
    updatePagination();
  }
  
  function updatePagination() {
    const pagination = document.getElementById("pagination");
    pagination.innerHTML = ""; // Clear previous pagination
  
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  
    for (let i = 1; i <= totalPages; i++) {
      const pageItem = document.createElement('li');
      pageItem.className = `page-item ${i === currentPage ? 'active' : ''}`;
      pageItem.innerHTML = `<a class="page-link" href="#">${i}</a>`;
      pageItem.addEventListener('click', () => {
        currentPage = i;
        displayProducts(currentPage);
      });
      pagination.appendChild(pageItem);
    }
  }
  
  function filterProducts() {
    const searchInput = document.getElementById("search-input").value.toLowerCase();
    filteredProducts = products.filter(product =>
      product.name.toLowerCase().includes(searchInput) ||
      product.desc.toLowerCase().includes(searchInput)
    );
    currentPage = 1; // Reset to the first page after filtering
    displayProducts(currentPage);
  }
  
  // Attach event listener to the search input
  document.getElementById("search-input").addEventListener("input", filterProducts);
  
  // Initial display of products
  displayProducts(currentPage);