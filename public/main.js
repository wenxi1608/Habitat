// const url = "https://www.ura.gov.sg/uraDataService/invokeUraDS?service=PMI_Resi_Rental&refPeriod=21q1&AccessKey=23fea41f-e994-485b-a186-e26c956c4b8f&Token=q999f7pM9cT9Vc3qNzt968mv4ukJEN64e-BhzDe2RwKFMe9hWa9R6e578yMEx-8671bv4c17nbeae4xxc3b4cVm442Jrc3f94pT4"

// async function fetchURA(url) {
//       const response = await fetch(url);
//       const data = await response.json();
//       console.log("URA API:", data);
// }
// fetchURA();

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-app.js";
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
