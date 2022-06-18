const url = "https://www.ura.gov.sg/uraDataService/invokeUraDS?service=PMI_Resi_Rental&refPeriod=21q1&AccessKey=23fea41f-e994-485b-a186-e26c956c4b8f&Token=q999f7pM9cT9Vc3qNzt968mv4ukJEN64e-BhzDe2RwKFMe9hWa9R6e578yMEx-8671bv4c17nbeae4xxc3b4cVm442Jrc3f94pT4"

async function fetchURA(url) {
      const response = await fetch(url);
      const data = await response.json();
      console.log("URA API:", data);
}
fetchURA();