var APIkey = "ff53460ebf3630db8e85f507a758a41f"
var cityTA = $('#CityEntry')
var stateTA = $('#StateEntry')
var subBtn = $('#Submission')
var citySelect = 0
var cityArrays = []
var longitude = 0
var latitude = 0
var uvImage 



// I hate api's this is insufferably difficult to troubleshoot.
subBtn.on('click', function () {
	var getCoordsUrl = "https://api.openweathermap.org/geo/1.0/direct?q=" + stateTA[0].value + "," + cityTA[0].value + "&appid=" + APIkey
	fetch(getCoordsUrl)
		.then(function (response) {
			return response.json()
		})
		.then(function (data) {
			latitude = data[0].lat
			longitude = data[0].lon
			useCoords()
		})
})

// For real I had to use the previous function to get the latitude and longitude for the url being fetched. Its actually horrendous, I refuse to believe somebody created this and thought it was a good idea.
function useCoords() {
	var useCoordsUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&appid=" + APIkey
	fetch(useCoordsUrl)
		.then(function (response) {
			return response.json()
		})
		.then(function (data) {
			citySelect += 1
			cityArrays[citySelect] = data
			createColumnEl()
		})
}

// This is obviously much easier than interacting with an api, but it took a tenth the time to write this function to create all the divisions and columns for the data compared to literally making ONE of those stupid urls not throw a fit.
function createColumnEl() {
	console.log(cityArrays[citySelect])
	
	var displayCol = $('<div>')
	displayCol.addClass('column')
	$('main').append(displayCol)

	var displayName = $('<div>')
	var displayTemp = $('<div>')
	var displayTemp2 = $('<div>')
	var displayTemp3 = $('<div>')
	var displayTemp4 = $('<div>')
	var displayTemp5 = $('<div>')
	var displayUvIndex = $('<div>')
	var displayNameText1 = stateTA[0].value.charAt(0).toUpperCase() + stateTA[0].value.slice(1)
	var displayNameText2 = cityTA[0].value.charAt(0).toUpperCase() + cityTA[0].value.slice(1)

	if (cityArrays[citySelect].daily[0].uvi > 10)
		uvImage = "🔴"
	if (5 < cityArrays[citySelect].daily[0].uvi < 10)
		uvImage = "🟡"
	if (cityArrays[citySelect].daily[0].uvi < 1)
		uvImage = "🟢"
		
	displayName.text(displayNameText2 + ", " + displayNameText1 + "🌤️")
	displayTemp.text("Todays temperture: " + cityArrays[citySelect].daily[0].temp.day + "k")
	displayTemp2.text("Temperture tomorrow: " + cityArrays[citySelect].daily[1].temp.day + "k")
	displayTemp3.text("Temperture in two days: " + cityArrays[citySelect].daily[2].temp.day + "k")
	displayTemp4.text("Temperture in three days: " + cityArrays[citySelect].daily[3].temp.day + "k")
	displayTemp5.text("Temperture in four days: " + cityArrays[citySelect].daily[4].temp.day + "k")
	displayUvIndex.text("UV Index: " + cityArrays[citySelect].daily[0].uvi + " " + uvImage)

	displayCol.append(displayName)
	displayCol.append(displayTemp)
	displayCol.append(displayTemp2)
	displayCol.append(displayTemp3)
	displayCol.append(displayTemp4)
	displayCol.append(displayTemp5)
	displayCol.append(displayUvIndex)

}