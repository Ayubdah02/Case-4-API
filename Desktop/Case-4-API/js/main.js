const searchformEl = document.querySelector("#searchForm");
const resultsEl = document.querySelector("#results");

function handleSubmit(e) {
    e.preventDefault();
    const query = e.target.querySelector("input").value;
   

    //fetch("http://api.weatherstack.com/current?access_key=54dc97c856fa1d9792e80958d246f54b&query=" + query)
    fetch("data.json")
        .then((res) => res.json())
        .then((data) => {
          const current = data.current;
          const request = data.request;

          const weatherHTML = `
          <h2>Vädret i ${request.query}</h2>
          <p>Temperatur: ${current.temperature}°C</p>
          <p>Vindhastighet: ${current.wind_speed} km/h</p>
          <p>Fuktighet: ${current.humidity}%</p>
          `;

          resultsEl.innerHTML = weatherHTML;
            resultsEl.innerHTML += JSON.stringify(json)
        
        })



        .catch((error) => console.error(error))
}
    
searchformEl.addEventListener("submit", handleSubmit);



            