ISDI Coders Airlines! ✈️🛩
(Los datos de los vuelos están al final del enunciado, podéis usarlos en vuestro código)

Programa una primera versión (no entregar) de una inferfaz de usuario para una aerolinea (por terminal...). Esta aerolinea dispondrá de 10 vuelos para el dia de hoy, para empezar, estos vuelos estarán declarados de manera global, cuando se llame a la función:

Se preguntará por el nombre de usuario y dará la bienvenida.
El usuario visualizará todos los vuelos disponibles de una forma amigable: El vuelo con origen: Barcelona, y destino: Madrid tiene un coste de XXXX€ y no realiza ninguna escala.
A continuación, el usuario verá el coste medio de los vuelos.
También podrá ver cuantos vuelos efectúan escalas.
Y, sabiendo que los ultimos 5 vuelos (los últimos 5 ID's) son los últimos del día, muestra al usuario sus destinos.

  
** Versión PRO para entregar:**
Después de ver toda la información de la primera versión, el programa pedirá al usuario si es ADMIN/USER mediante un prompt(), dependiendo de la elección, el programa se comportará de la siguiente manera:

Si eres ADMIN, la función debería permitir:

Poder crear, más vuelos, pidiendo la información por prompt(), sin poder pasar de 15 vuelos, si se intenta introducir uno más, saltará un alert().
Poder eliminar vuelos mediante el ID.
Si eres USER la función debería permitir:

El usuario debe poder buscar por precio. Cuando el usuario ponga el precio, debera mostrar los vuelos que tengan ese precio o mas baratos.


// DATOS DE VUELOS
const flights = [
    { id: 00, to: "New York", from: "Barcelona", cost: 700, layover: false },
    { id: 01, to: "Los Angeles", from: "Madrid", cost: 1100, layover: true },
    { id: 02, to: "Paris", from: "Barcelona", cost: 210, layover: false },
    { id: 03, to: "Roma", from: "Barcelona", cost: 150, layover: false },
    { id: 04, to: "London", from: "Madrid", cost: 200, layover: false },
    { id: 05, to: "Madrid", from: "Barcelona", cost: 90, layover: false },
    { id: 06, to: "Tokyo", from: "Madrid", cost: 1500, layover: true },
    { id: 07, to: "Shangai", from: "Barcelona", cost: 800, layover: true },
    { id: 08, to: "Sydney", from: "Barcelona", cost: 150, layover: true },
    { id: 09, to: "Tel-Aviv", from: "Madrid", cost: 150, layover: false },
  ];
  
  // Función principal
  function showFlights() {
    let name = prompt("¡Bienvenido/a a nuestra aerolínea! Por favor, indíquenos su nombre:");
    alert(`Bienvenido/a ${name}, estos son los vuelos disponibles para hoy:`);
  
    do {
        // Mostrar vuelos
        displayFlights();
    
        // Preguntar si es ADMIN o USER
        let userType = prompt("¿Eres ADMIN o USER?").toUpperCase();
    
        // Según el tipo de usuario
        if (userType === "ADMIN") {
          adminOptions();
        } else if (userType === "USER") {
          userOptions();
        } else {
          alert("Tipo de usuario no válido.");
        }
      } while (confirm("¿Desea realizar otra operación?"));
    
      alert("Gracias por utilizar nuestros servicios. ¡Que tenga un buen día!");
    }
  
  // Función para mostrar vuelos
  function displayFlights() {
    flights.forEach((flight) => {
      console.log(
        `El vuelo ${flight.id}, con origen: ${flight.from}, y destino: ${flight.to}, tiene un coste de ${flight.cost}€ ${
          flight.layover ? "y realiza escala." : "y no realiza ninguna escala."
        }`
      );
    });
  
    const averageCost = flights.reduce((acc, flight) => acc + flight.cost, 0) / flights.length;
    console.log(`\nEl coste medio de los vuelos es de ${averageCost.toFixed(2)}€.`);
  
    const flightsWithLayovers = flights.filter((flight) => flight.layover);
    console.log(`\n${flightsWithLayovers.length} vuelos realizan escalas.`);
  
    const last5Destinations = flights.slice(-5).map((flight) => flight.to);
    console.log(`\nLos destinos de los últimos 5 vuelos del día son: ${last5Destinations.join(", ")}.`);
  }
  
  // Función para opciones de ADMIN
  function adminOptions() {
    let option = prompt("Opciones de ADMIN: \n1. Crear vuelo (pueden crearse hasta un máximo de 15) \n2. Eliminar vuelo por ID \n3. Salir");
  
    if (option === "1") {
      createFlight();
    } else if (option === "2") {
      deleteFlight();
    } else if (option === "3") {
      alert("Saliendo del modo ADMIN.");
    } else {
      alert("Lo sentimos. Opción no válida.");
      adminOptions();
    }
  }
  
  // Función para crear vuelo
  function createFlight() {
    if (flights.length < 15) {
      let newFlight = {};
      newFlight.id = flights.length;
      newFlight.to = prompt("Por favor, ingrese el destino del nuevo vuelo. Tenga en cuenta que se pueden crear hasta un máximo de 15:");
      newFlight.from = prompt("Por favor, ingrese el origen del nuevo vuelo:");
      newFlight.cost = parseInt(prompt("Por favor, ingrese el coste del nuevo vuelo:"));
      newFlight.layover = prompt("¿El vuelo realiza escala? (Sí/No)").toUpperCase() === "SÍ";
  
      flights.push(newFlight);
  
      alert("Vuelo creado exitosamente.");
      displayFlights();
      adminOptions();
    } else {
      alert("Lo sentimos. Se ha alcanzado el límite máximo de 15 vuelos.");
      adminOptions();
    }
  }
  
  // Función para eliminar vuelo por ID
  function deleteFlight() {
    let idToDelete = parseInt(prompt("Ingrese el ID del vuelo que desea eliminar:"));
  
    let index = flights.findIndex((flight) => flight.id === idToDelete);
  
    if (index !== -1) {
      flights.splice(index, 1);
      alert("Vuelo eliminado exitosamente.");
      displayFlights();
      adminOptions();
    } else {
      alert("Lo sentimos. No se encontró ningún vuelo con ese ID.");
      adminOptions();
    }
  }
  
  // Función para opciones de USER
  function userOptions() {
    let option = prompt("Opciones de USER: \n1. Buscar vuelo por precio \n2. Salir");
  
    if (option === "1") {
      searchByPrice();
    } else if (option === "2") {
      alert("Saliendo del modo USER.");
    } else {
      alert("Lo sentimos. Opción no válida.");
      userOptions();
    }
  }
  
  // Función para buscar por precio
  function searchByPrice() {
    let maxPrice = parseInt(prompt("Ingrese el precio máximo que está dispuesto/a a pagar:"));
  
    let filteredFlights = flights.filter((flight) => flight.cost <= maxPrice);
  
    if (filteredFlights.length > 0) {
      console.log(`Vuelos con precio igual o inferior a ${maxPrice}€:`);
      filteredFlights.forEach((flight) => {
        console.log(
          `El vuelo ${flight.id}, con origen: ${flight.from}, y destino: ${flight.to}, tiene un coste de ${flight.cost}€ ${
            flight.layover ? "y realiza escala." : "y no realiza ninguna escala."
          }`
        );
      });
    } else {
      alert(`Lo sentimos. No hay vuelos con precio igual o inferior a ${maxPrice}€.`);
    }
  
    userOptions();
  }
  
  // Llama a la función para mostrar la interfaz
  showFlights();
