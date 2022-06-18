const { initializeApp, cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
const serviceAccount = require("./serviceAccountKey.json");

const data2018q1 = require("../Rental-Data/2018Q1.json");
const data2018q2 = require("../Rental-Data/2018Q2.json");
const data2018q3 = require("../Rental-Data/2018Q3.json");
const data2018q4 = require("../Rental-Data/2018Q4.json");
const data2019q1 = require("../Rental-Data/2019Q1.json");
const data2019q2 = require("../Rental-Data/2019Q2.json");
const data2019q3 = require("../Rental-Data/2019Q3.json");
const data2019q4 = require("../Rental-Data/2019Q4.json");
const data2020q1 = require("../Rental-Data/2020Q1.json");
const data2020q2 = require("../Rental-Data/2019Q2.json");
const data2020q2 = require("../Rental-Data/2019Q3.json");
const data2020q4 = require("../Rental-Data/2019Q4.json");
const data2021q1 = require("../Rental-Data/2021Q1.json");
const data2021q2 = require("../Rental-Data/2021Q2.json");
const data2021q3 = require("../Rental-Data/2021Q3.json");
const data2021q4 = require("../Rental-Data/2021Q4.json");
const data2022q1 = require("../Rental-Data/2022Q1.json");
const data2022q2 = require("../Rental-Data/2022Q2.json");

const allYearsData = [
  [data2018q1, data2018q2, data2018q3, data2018q4], // year 2018
  [data2019q1, data2019q2, data2019q3, data2019q4], // year 2019
  [data2020q1, data2020q2, data2020q3, data2020q4][ // year 2020
    (data2021q1, data2021q2, data2021q3, data2021q4)
  ][(data2022q1, data2022q2)], // year 2021 // year 2022
];

const combinedData = {
  "2018q1": {},
  "2018q2": {},
  "2018q3": {},
  "2018q4": {},
  "2019q1": {},
  "2019q2": {},
  "2019q3": {},
  "2019q4": {},
  "2020q1": {},
  "2020q2": {},
  "2020q3": {},
  "2020q4": {},
  "2021q1": {},
  "2021q2": {},
  "2021q3": {},
  "2021q4": {},
  "2022q1": {},
  "2022q2": {},
};
const startingYear = 2018;
const startingQuarter = 1;

allYearsData.forEach((yearData, yearIndexPosition) => {
  yearData.forEach((quarterData, quarterIndexPosition) => {
    quarterData.forEach((data) => {
      const rentals = data.rental;

      rentals.forEach((rental) => {
        const propertyType = rental.propertyType;
        const district = rental.district;

        if (propertyType === "Non-landed Properties") {
          const modifiedRental = {
            areaSqm: rental.areaSqm,
            // district: rental.district,
            // leaseDate: rental.leaseDate,
            // propertyType: rental.propertyType,
            rent: rental.rent,
          };

          const year = startingYear + yearIndexPosition;
          const quarter = startingQuarter + quarterIndexPosition;

          const yearAndQuarter = `${year}q${quarter}`;

          if (district in combinedData[yearAndQuarter]) {
            combinedData[yearAndQuarter][district].push(modifiedRental);
          } else {
            combinedData[yearAndQuarter][district] = [modifiedRental];
          }
        }
      });
    });
  });
});

// console.log(combinedData["2018q1"]["01"].length);

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();

// for (const property in combinedData) {
//   // const collectionName = "nlp-rentals";

//   const allDistrictDataForQuarterAndYear = combinedData[property];

//   for (const district in allDistrictDataForQuarterAndYear) {
//     const documentReference = db.collection(property).doc(district);

//     const writeIntoFirebase = async () => {
//       await documentReference.set({
//         data: combinedData[property][district],
//       });
//     };

//     writeIntoFirebase();
//   }
// }

// const test = async () => {
//   const districtRef = db.collection("2018q1").doc("07");
//   const doc = await districtRef.get();
//   if (!doc.exists) {
//     console.log("No such document!");
//   } else {
//     console.log("Document data:", doc.data().data.length);
//   }
// };

// test();
