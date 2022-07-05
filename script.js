const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API
let count = 5;
const apiKey = 'i1jX9wNnyV7y0gOXOmt0SQupssxgcsnE48nYoEFfMD8';
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Check if all images were loaded
function imageLoaded() {
    imagesLoaded += 1;
    if(imagesLoaded === totalImages) {
        imagesLoaded = 0;
        ready = true;
        loader.hidden = true;
        count = 30;
        apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
    }
}

// Helper function to set attributes on DOM elements
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}


// Create Elements for Links and Photos
function displayPhotos() {
    totalImages = photosArray.length;
    // Run function for each object in photosArray
    photosArray.forEach((photo) => {
        // Create <a> element to link to Unsplash
        let {links, urls, alt_description, description} = photo;
        alt_description = !alt_description ? '' : alt_description;
        description = !description ? '' : description;
        const item = document.createElement('a');
        setAttributes(item, {
            href: links.html,
            target: '_blank'
        });
        // Create <img> for photo 
        const img = document.createElement('img');
        setAttributes(img, {
            src: urls.regular,
            alt: 'alt_description',
            title: 'description'
        });

        // Event Listener, check when each is finished loading 
        img.addEventListener("load", imageLoaded);
        // Put <img> inside <a> element. Put both inside imageContainer element
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
};

// Get photos from Unsplash API
let scrollHeight;
const getPhotos = async () => {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch (error) {
        // Catch Error Here
        alert('ERROR. CHECK CONSOLE  LOG');
        console.log("ERROR: ", error);
    }
};

// Check to see if the scrolling near bottom of the page, Load More Photos
window.addEventListener("scroll", () => {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
    }
})

// On Load
getPhotos();
