var APIkey = "ff53460ebf3630db8e85f507a758a41f"
var cityTA = $('#CityEntry')
var stateTA = $('#StateEntry')
var subBtn = $('#Submission')
var citySelect = 0
var cityArrays = []
var longitude = 0
var latitude = 0


subBtn.on('click', function () {
	var getCoordsUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + stateTA[0].value + "," + cityTA[0].value + "&appid=" + APIkey
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

	displayName.text(stateTA.getFirst(capi))
	displayTemp.text("Todays temperture: " + cityArrays[citySelect].daily[0].temp.day)
	displayTemp2.text("Temperture tomorrow: " + cityArrays[citySelect].daily[1].temp.day)
	displayTemp3.text("Temperture in two days: " + cityArrays[citySelect].daily[2].temp.day)
	displayTemp4.text("Temperture in three days: " + cityArrays[citySelect].daily[3].temp.day)
	displayTemp5.text("Temperture in four days: " + cityArrays[citySelect].daily[4].temp.day)

	displayCol.append(displayTemp)
	displayCol.append(displayTemp2)
	displayCol.append(displayTemp3)
	displayCol.append(displayTemp4)
	displayCol.append(displayTemp5)






}