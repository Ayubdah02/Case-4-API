const searchformEl = document.querySelector("#searchForm");
const resultsEl = document.querySelector("#results");

function handleSubmit(e) {
    e.preventDefault();
    const query = e.target.querySelector("input").value;
   

        // fetch current weather from WeatherStack API
        fetch("http://api.weatherstack.com/current?access_key=54dc97c856fa1d9792e80958d246f54b&query=" + encodeURIComponent(query))
        
        .then((res) => res.json())
        .then((data) => {
          const current = data.current;
          const request = data.request;

          const weatherHTML = `
          <section class="weather-grid-box">
          <figure class="weather-box-figure">
          <h2>Vädret i ${request.query}</h2>
          <p>Temperatur: ${current.temperature}°C</p>
          <p>Vindhastighet: ${current.wind_speed} km/h</p>
          <p>Fuktighet: ${current.humidity}%</p>
          <button id="historybutton" class="historybutton">Visa historik</button>


          </figure>
          </section>`;

            resultsEl.innerHTML = weatherHTML;
            const historybutton = resultsEl.querySelector("#historybutton");

            if (historybutton) {
                historybutton.addEventListener("click", function () {
                    // fetch historical data from WeatherStack API
                    fetch(
                        "http://api.weatherstack.com/historical?access_key=54dc97c856fa1d9792e80958d246f54b&query=" +
                            encodeURIComponent(query) +
                            "&historical_date=2023-01-01"
                    )
                        .then((res) => res.json())
                        .then((data) => {
                    
                            if (data.error) {
                                resultsEl.innerHTML += `<p>Ingen historik: ${data.error.info || data.error.type}</p>`;
                                return;
                            }
                            const historical = data.historical && data.historical["2023-01-01"];
                            if (!historical) {
                                resultsEl.innerHTML += `<p>Ingen historik tillgänglig för detta datum.</p>`;
                                return;
                            }
                            const historyHTML = `
                                        <section class="weather-grid-box">
                                            <figure class="weather-box-figure">
                                                <h2>Vädret i ${request.query} den 1 januari 2023</h2>
                                                <p>Temperatur: ${historical.temperature}°C</p>
                                                <p>Vindhastighet: ${historical.wind_speed} km/h</p>
                                                <p>Fuktighet: ${historical.humidity}%</p>
                                            </figure>
                                        </section>`;
                            resultsEl.innerHTML += historyHTML;
                        })
                        .catch((error) => console.error(error));
                });
            }
        })
        .catch((error) => console.error(error));
}
    
searchformEl.addEventListener("submit", handleSubmit);




            