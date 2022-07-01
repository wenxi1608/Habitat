Step 1: Extract all data for **non-landed properties** (i.e. rental.propertyType = "Non-landed Properties")

- need to do some filtering

Step 2: Sort the lease data for NLP by quarter and year (i.e. rental.leaseDate = e.g. for 2022 Q2 "0622, 0522, 0422")

- look at quarter data

Step 3a: Sort the district data (i.e. district = e.g. "10")
Step 3b: Find the district names 
Step 3c: Add the names to the district no.

- like amk, sembawang, orchard etc

Step 4: Create specific containers for each permutation - means have to select only rental arrays which are NLP && within leaseDate range && district no?

Step 5: Display data for rental according to sqft
Step 5a: Sort the areaSqft data according to the range (i.e. areaSqft = "1700 - 1800")
Step 5b: Display the rental rate (i.e. rent = 3000)


areaSqm
district
leaseData => by quarter
propertyType
rent