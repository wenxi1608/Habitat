// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-app.js";
// import { getFirestore } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-firestore.js";
import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/9.8.3/firebase-firestore-lite.js";

google.charts.load("current", { packages: ["corechart"] });

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC4WJpRnoXQJZ_0fDOxtuZTGZNGDtXVNRY",
  authDomain: "singapore-rental-data-dbe28.firebaseapp.com",
  projectId: "singapore-rental-data-dbe28",
  storageBucket: "singapore-rental-data-dbe28.appspot.com",
  messagingSenderId: "220238436553",
  appId: "1:220238436553:web:54a22142aa78f4609a5518",
  measurementId: "G-HLQ06NH7SD",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function drawChart() {
  const displayData = new google.visualization.DataTable();
  displayData.addColumn("string", "Area");
  displayData.addColumn("number", "Average Rent (S$)");
  displayData.addRows([
    ["100-110sqm", 0],
    ["110-120sqm", 0],
    ["120-130sqm", 0],
    ["130-140sqm", 0],
    ["140-150sqm", 0],
    ["160-170sqm", 0],
    ["170-180sqm", 0],
    ["180-190sqm", 0],
    ["190-200sqm", 0],
    ["200-210sqm", 0],
    ["210-220sqm", 0],
    ["220-230sqm", 0],
    ["230-240sqm", 0],
    ["240-250sqm", 0],
    ["250-260sqm", 0],
    ["260-270sqm", 0],
    ["270-280sqm", 0],
    ["280-290sqm", 0],
    ["290-300sqm", 0],
    [">300sqm", 0],
  ]);
  // Set chart options
  const options = {
    title: "Average Monthly Rent by Unit Size",
    width: 900,
    height: 700,
  };

  // Instantiate and draw chart, passing in some options.
  const chart = new google.visualization.ColumnChart(
    document.getElementById("chart")
  );
  chart.draw(displayData, options);
}
// Set a callback to run when the Google Visualization API is loaded.
google.charts.setOnLoadCallback(drawChart);

// Step 1: Listen for when the user submits the year/quarter/district input
document.getElementById("submit").onclick = retrieveData;

// // Step 2: Call a function to retrieve doc from Firebase based on user input
function retrieveData() {
  // 2a: Get user input
  const getYear = document.getElementById("year").value;
  const getQuarter = document.getElementById("quarter").value;
  const getDistrict = document.getElementById("district").value;

  // 2b: Call Firebase
  async function getRentalData() {
    const collectionName = `${getYear}q${getQuarter}`;
    const docData = doc(db, collectionName, getDistrict);
    const rentalDataOutput = await getDoc(docData);

    // Print Error Message if date selection is invalid
    if (rentalDataOutput.exists() === false) {
      document.getElementById("chart").textContent = "Invalid Date Selected";
    }

    // Get data returned by Firebase
    const resultArray = rentalDataOutput.data().data;

    // Create a loop to return an array for Google Charts [areaSqm, avg rent]
    const houseSizes = [
      "100-110",
      "110-120",
      "120-130",
      "130-140",
      "140-150",
      "150-160",
      "160-170",
      "170-180",
      "180-190",
      "190-200",
      "200-210",
      "210-220",
      "220-230",
      "230-240",
      "240-250",
      "250-260",
      "260-270",
      "270-280",
      "280-290",
      "290-300",
      ">300",
    ];
    const dataToAddToChart = [];
    const x = houseSizes.length;
    for (let i = 0; i <= x; i++) {
      const areaSqmAndRentArray = resultArray.filter((element) => {
        if (element.areaSqm === houseSizes[i]) {
          return element;
        }
      });

      // Create an array with all the returned rent values
      const allRent = areaSqmAndRentArray.map((element) => element.rent);

      // Get average of all rent values within the array
      let sumOfRent = "";
      if (allRent.length > 1) {
        sumOfRent = allRent.reduce(getAvg);
        function getAvg(total, value) {
          return total + value;
        }
      } else {
        sumOfRent = allRent;
      }

      const avgRent = Math.round(sumOfRent / allRent.length);

      // Create row array for each house size to push values into Google Charts
      const areaSqmAndAvgRent = [`${houseSizes[i]}sqm`];
      const addRent = areaSqmAndAvgRent.push(avgRent);
      dataToAddToChart.push(areaSqmAndAvgRent);
    }

    // Callback that creates and populates a data table,
    // instantiates the chart, passes in the data and
    // draws it.
    function drawChart() {
      const displayData = new google.visualization.DataTable();
      displayData.addColumn("string", "Area");
      displayData.addColumn("number", "Average Rent (S$)");
      displayData.addRows(dataToAddToChart);
      // Set chart options
      const options = {
        title: "Average Monthly Rent by Unit Size",
        width: 900,
        height: 700,
      };

      // Instantiate and draw chart, passing in some options.
      const chart = new google.visualization.ColumnChart(
        document.getElementById("chart")
      );
      chart.draw(displayData, options);
    }
    // Set a callback to run when the Google Visualization API is loaded.
    google.charts.setOnLoadCallback(drawChart);
  }
  getRentalData();
}
// function init() {
//   google.charts.load();
//   const firebaseConfig = {};
//   initializeApp();
//   getFirestore();
//   document.getElementById("submit").onclick;
//   retrieveData();
//   getRentalData();
//   getAvg();
//   drawChart();
//   google.charts.setOnLoadCallback();
// }

// init();
