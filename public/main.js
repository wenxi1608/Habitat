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

// Set a callback to run when the Google Visualization API is loaded.
google.charts.setOnLoadCallback(drawChart);

// Callback that creates and populates a data table,
// instantiates the pie chart, passes in the data and
// draws it.
function drawChart() {
  // Create the data table.
  var data = new google.visualization.DataTable();
  data.addColumn("string", "Area");
  data.addColumn("number", "Average Rent");
  data.addRows([
    ["100 - 110sqm", 3],
    ["110 - 120sqm", 1],
    ["120 - 130sqm", 1],
    ["130 - 140sqm", 1],
    ["140 - 150sqm", 2],
  ]);

  // Set chart options
  var options = { title: "Average Monthly Rent", width: 500, height: 300 };

  // Instantiate and draw our chart, passing in some options.
  var chart = new google.visualization.ColumnChart(
    document.getElementById("chart")
  );
  chart.draw(data, options);
}

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
async function getRentalData() {
  const rentalCollection = doc(db, "2022q2", "01");
  const districtOne22Q2 = await getDoc(rentalCollection);

  if (districtOne22Q2.exists()) {
    console.log("Document data:", districtOne22Q2.data());
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!"); //Print message to user, e.g. invalid
  }
}
getRentalData();
// Step 1: Get year/quarter/district input from the dropdown form

// Step 1: Listen for when the user submits the year/quarter/district input
document.getElementById("submit").onclick = retrieveData;

// // Step 2: Call a function to retrieve doc from Firebase based on user input
function retrieveData() {
  // 2a: Get values from Form
  const selYear = document.getElementById("Year").value;
  const selQuarter = document.getElementById("Quarter").value;
  const selDistrict = document.getElementById("District").value;

  const collectionName = selYear + "q" + selQuarter;

  // 2b: Call Firebase
  async function getRentalData() {
    const rentalCollection = doc(db, collectionName, selDistrict);
    const districtOne22Q2 = await getDoc(rentalCollection);

    if (districtOne22Q2.exists()) {
      console.log("Document data:", districtOne22Q2.data());
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!"); //Print message to user, e.g. invalid
    }
  }
}
//   // 3a: Retrieve data as an object based on user input

//     // 3b: Loop through the object and return new array where areaSqm is in the range
//     const queryResult = docSnap.map((value) => {
//       if(queryResult.areaSqm === "100-110")
//       return value.rent;
//     });

//     // 3c: Calculate average of rent values based on given areaSqm

//     let total = 0;
//     for(let i = 0; i < queryResult.length; i++) {
//       total += queryResult.rent[i];
//     }
//     let avgRent = total / queryResult.length;

//     // 3d: Create 2d array and pass values in

// }

// // Step 4: Pass the data to Google Chart
