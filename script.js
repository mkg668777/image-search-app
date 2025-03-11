// Selectors
const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const imageContainer = document.getElementById("image-container");
const showMoreBtn = document.getElementById("show-more");

// Unsplash API details
const accessKey = "vMsJx5AKEnQc_5wkhOFqwHuDCYYUTkdi7FniYymFGn0";  // Replace with your Unsplash API key
let query = "";
let page = 1;

// Function to fetch images
async function fetchImages() {
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${query}&client_id=${accessKey}&per_page=10`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        
        if (page === 1) {
            imageContainer.innerHTML = ""; // Clear previous results
        }

        data.results.forEach(photo => {
            const imgElement = document.createElement("img");
            imgElement.src = photo.urls.small;
            imgElement.alt = photo.alt_description;
            imageContainer.appendChild(imgElement);
        });

        showMoreBtn.style.display = "block";
    } catch (error) {
        console.error("Error fetching images:", error);
    }
}

// Search Event Listener
searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    query = searchInput.value;
    page = 1;
    fetchImages();
});

// Show More Button Event Listener
showMoreBtn.addEventListener("click", () => {
    page++;
    fetchImages();
});
