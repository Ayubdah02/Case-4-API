const searchformEl = document.querySelector("#searchForm");
const resultsEl = document.querySelector("#results");

function handleSubmit(e) {
    e.preventDefault();
    const query = e.target.querySelector("input").value;
   

    //fetch("http://api.weatherstack.com/current?access_key=54dc97c856fa1d9792e80958d246f54b&query=" + query)
    fetch("data.json")
        .then((res) => res.json())
        .then((json) => resultsEl.innerHTML += JSON.stringify(json))
        .catch((error) => console.error(error))
}
    
searchformEl.addEventListener("submit", handleSubmit);



            