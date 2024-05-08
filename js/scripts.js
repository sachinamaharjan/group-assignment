// Load and parse XML data
// function loadXML() {
//     let xhttp = new XMLHttpRequest();
//     xhttp.open("GET", "../lodges.xml", true);
//     xhttp.send();
//     xhttp.onreadystatechange = function() {
//         if (this.readyState == 4 && this.status == 200) {
//             parseXML(this.responseText);
//         }
//     };
    
//     return xhttp.responseXML;
// }

function loadXML(xmlFile){
    if(window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    }

    xmlhttp.open("GET", xmlFile, false);
    xmlhttp.send();
    return (xmlhttp.responseText);
}

// Parse XML data and create lodge objects
function parseXML(xml) {
    // let xmlDoc = new DOMParser().parseFromString(xml, "text/xml");
    let xmlDoc = loadXML("./lodges.xml");
    let lodges = xmlDoc.documentElement.getElementsByTagName("lodge");

    // Array to store lodge objects
    let lodgeObjects = [];

    // Iterate over lodge elements and extract information
    for (let i = 0; i < lodges.length; i++) {
        let lodge = lodges[i];
        let id = lodge.getAttribute("id");
        let name = lodge.getElementsByTagName("name")[0].textContent;
        let cost = lodge.getElementsByTagName("cost")[0].textContent;
        let capacity = lodge.getElementsByTagName("capacity")[0].textContent;
        let status = lodge.getElementsByTagName("status")[0].textContent;
        let imagePath = lodge.getElementsByTagName("imagePath")[0].textContent;

        // Populate lodge info in HTML elements
        document.getElementById("lodge-id").textContent = id;
        document.getElementById("lodge-cost").textContent = cost;
        document.getElementById("lodge-booked").textContent = status;
        document.getElementById("lodge-capacity").textContent = capacity;
        document.getElementById("lodge-image").src = imagePath;

        // Create lodge object and push it to array
        let lodgeObject = {
            id: id,
            name: name,
            cost: cost,
            capacity: capacity,
            status: status,
            imagePath: imagePath
        };
        lodgeObjects.push(lodgeObject);
    }

    // Once all lodge objects are created, populate map with lodge objects
    populateMap(lodgeObjects);
}

// Populate map with lodge objects
function populateMap(lodges) {
    const mapContainer = document.getElementById('map-container');

    lodges.forEach(lodge => {
        const lodgeElement = document.createElement('div');
        lodgeElement.classList.add('lodge');
        lodgeElement.dataset.id = lodge.id; // Set dataset attribute for ID
        lodgeElement.dataset.cost = lodge.cost; // Set dataset attribute for cost
        lodgeElement.dataset.capacity = lodge.capacity; // Set dataset attribute for capacity
        lodgeElement.dataset.status = lodge.status; // Set dataset attribute for status
        lodgeElement.dataset.imagePath = lodge.imagePath; // Set dataset attribute for imagePath

        // Add event listener for mouseover to display lodge information
        lodgeElement.addEventListener('mouseover', () => {
            displayLodgeInfo(lodge);
        });

        lodgeElement.appendChild(imageElement);
        mapContainer.appendChild(lodgeElement);
    });
}


// Function to add event listeners to lodge elements
function addLodgeEventListeners() {
    // Get all lodge elements
    let lodges = document.querySelectorAll('.lodge');

    // Add event listener to each lodge element
    lodges.forEach(lodge => {
        // Add mouseout event listener
        lodge.addEventListener('mouseout', () => {
            // Hide the lodge information popup
            hideLodgePopup();
        });
    });
}

// Call the function to load XML data
parseXML("lodges.xml");

// Call the function to add event listeners to lodge elements
addLodgeEventListeners();
