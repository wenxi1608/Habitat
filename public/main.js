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

// Step 1: Listen for when the user submits the year/quarter/district input
document.getElementById("submit").onclick = retrieveData;

// // Step 2: Call a function to retrieve doc from Firebase based on user input
function retrieveData() {
  // 2a: Get values from Form
  const getYear = document.getElementById("Year").value;
  const getQuarter = document.getElementById("Quarter").value;
  const getDistrict = document.getElementById("District").value;

  const collectionName = getYear + "q" + getQuarter;

  // 2b: Call Firebase
  async function getRentalData() {
    const docData = doc(db, collectionName, getDistrict);
    const rentalDataOutput = await getDoc(docData);

    // if (rentalDataOutput.exists()) {
    //   console.log("Document data:", rentalDataOutput.data().data); // invoking the function
    // } else {
    //   console.log("No such document!"); //Print message to user, e.g. invalid
    // }

    const resultArray = rentalDataOutput.data().data;

    // Return array of objects with areaSqm of 100-110sqm
    const areaSqmOf100to110 = resultArray.filter((element) => {
      if (element.areaSqm === "100-110") {
        return element;
      }
    });

    // Create an array with all the returned rent values
    const allRent = areaSqmOf100to110.map((element) => {
      return element.rent;
    });

    // Get average of all rent values within the array
    const sumOfRent = allRent.reduce(getAvg);
    function getAvg(total, value, index, array) {
      return total + value;
    }

    const avgRent =
      "$" + Math.round(sumOfRent / allRent.length).toLocaleString("en-US");
    console.log(avgRent);
  }
  getRentalData();
}
// 3b: Loop through the object and return new array where areaSqm is in the range

//   if(queryResult.areaSqm === "100-110")
//   return value.rent;
// });

//     // 3c: Calculate average of rent values based on given areaSqm

//     let total = 0;
//     for(let i = 0; i < queryResult.length; i++) {
//       total += queryResult.rent[i];
//     }
//     let avgRent = total / queryResult.length;

//     // 3d: Create 2d array and pass values in

// }

// // Step 4: Pass the data to Google Chart
