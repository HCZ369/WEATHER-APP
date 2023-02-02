const API_KEY = "71d1e01ab4a4e7466df818a3fd5c8ccc";
const fetchData = (position) => {
	const { latitude, longitude } = position.coords;
	fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${latitude}&lon=${longitude}&appid=${API_KEY}`)
		.then((response) => response.json())
		.then((data) => setWeatherData(data));
	console.log(position);
};
const setWeatherData = (data) => {
	console.log(data);
	const weatherData = {
		location: data.name,
		description: data.weather[0].description,
		humidity: data.main.humidity,
		temperature: data.main.temp,
		date: getDate(),
	};
	Object.keys(weatherData).forEach((key) => {
		document.getElementById(key).textContent = weatherData[key];
	});
	cleanUp();
}; //aqui ubicaremos la informacion que recibimos en nuestro HTML ej: temperatura, humedad, dia, lugar//
const cleanUp = () => {
	let container = document.getElementById("container");
	let loader = document.getElementById("loader");
	loader.style.display = "none";
	container.style.display = "flex";
}; // Funcion para mostrar un loader en lo que carga nuestra pagina //
const onLoad = () => {
	navigator.geolocation.getCurrentPosition(fetchData);
}; //Obtenemos la ubicacion del usuario//
const getDate = () => {
	let date = new Date();
	return `${date.getDate()}-${("0" + (date.getMonth() + 1)).slice(-2)}-${date.getFullYear()}`;
};
