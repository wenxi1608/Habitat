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

    // Print Error Message if date selection is invalid
    if (rentalDataOutput.exists() === false) {
      document.getElementById("chart").textContent = "Invalid Date Selected";
      console.log("Invalid Data");
    }

    const resultArray = rentalDataOutput.data().data;
    // Find the areaSqm values available
    const listOfAreaSqm = resultArray.map((value) => {
      return value.areaSqm;
    });
    const uniqueAreaSqmValues = [...new Set(listOfAreaSqm)];
    console.log(uniqueAreaSqmValues);

    // Create a loop to return data row arrays for Google Charts [areaSqm, avg rent]
    const areaSqmRangeOfValues = [
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
    console.log(areaSqmRangeOfValues[20]);
    for (let i = 0; i <= areaSqmRangeOfValues.length; i++) {
      const areaSqmRange = resultArray.filter((element) => {
        if (element.areaSqm === areaSqmRangeOfValues[i]) {
          return element;
        }
      });

      // Create an array with all the returned rent values
      const allRent = areaSqmRange.map((element) => {
        return element.rent;
      });

      // Get average of all rent values within the array
      let sumOfRent = "";
      if (allRent.length > 1) {
        sumOfRent = allRent.reduce(getAvg);
        function getAvg(total, value, index, array) {
          return total + value;
        }
      } else {
        return (sumOfRent = allRent);
      }

      const avgRent =
        "$" + Math.round(sumOfRent / allRent.length).toLocaleString("en-US");
      //console.log(avgRent);

      // Create row array for each areaSqm range and push values into displayData.addRows array
      let areaSqmAndAvgRent = [areaSqmRangeOfValues[i]];
      let addRent = areaSqmAndAvgRent.push(avgRent);
      let dataToAddToChart = [];
      dataToAddToChart.push(areaSqmAndAvgRent);
      console.log(dataToAddToChart);
    }
    // Step 4: Pass the data to Google Chart

    // Set a callback to run when the Google Visualization API is loaded.
    google.charts.setOnLoadCallback(drawChart);

    // Callback that creates and populates a data table,
    // instantiates the chart, passes in the data and
    // draws it.
    function drawChart() {
      // Create the data table.
      var displayData = new google.visualization.DataTable();
      displayData.addColumn("string", "Area");
      displayData.addColumn("number", "Average Rent");
      displayData.addRows([
        ["nero", 15],
        ["enzo", 12],
      ]);

      // Set chart options
      var options = { title: "Average Monthly Rent", width: 500, height: 300 };

      // Instantiate and draw our chart, passing in some options.
      var chart = new google.visualization.ColumnChart(
        document.getElementById("chart")
      );
      chart.draw(displayData, options);
    }
  }
  getRentalData();
}
