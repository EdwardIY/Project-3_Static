import '../CSS/index.css';
const loader = document.getElementById('loader')!
const btn = document.querySelector('.btn')!
const myLocation = document.querySelector('.myLocation')!
const searchInput = document.querySelector('.input') as HTMLInputElement
const week = document.getElementById('week')!
const time = document.getElementById('time')!
const fullDate = document.getElementById('fullDate')!
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",
    "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];


const mainCard = {
    location: document.getElementById('location')!,
    des: document.getElementById("descriptionInput")!,
    temp: document.getElementById("tempInput")!,
    feels: document.getElementById("feelsInput")!,
    hum: document.getElementById("humidityInput")!,
    windS: document.getElementById("wSpeedInput")!
}
let backG_details:string[] = [];
const backG:any = document.getElementById('img')!

// LOADER
function activateLoader() {
    loader.style.opacity = "1";
    loader.style.zIndex = "2"
}
function disableLoader() {
    loader.style.opacity = "0";
    loader.style.zIndex = "0"
}


// SEARCH OPTIONS
myLocation.addEventListener("click", () => {
    activateLoader()   // TURN ON LOADER
    navigator.geolocation.getCurrentPosition((position) => {
        let lat:number = position.coords.latitude;
        let long:number = position.coords.longitude;
        getWeek("myP", lat, long)
    })
})

btn.addEventListener("click", () => {
    activateLoader()   // TURN ON LOADER
    getWeek("searched", searchInput.value)
})

document.addEventListener("keydown", (e) => {
    if (e.key == "Enter") {
        activateLoader()   // TURN ON LOADER
        getWeek("searched", searchInput.value);
    }
})


function clock(currentDate = new Date()) {
    const date = currentDate;
    const timeString:string = date.toLocaleTimeString()
    time.textContent = timeString.split(":")[0] + ":" + timeString.split(":")[1] + timeString.slice(-3)
    fullDate.textContent = days[date.getDay()] + ", " + date.getDate() + " " + months[date.getMonth()]

    if (backG_details.length == 0) backG_details.push(timeString.slice(-2));
}

const setClock = setInterval(clock, 1000)


let setNewTime: string | number | NodeJS.Timer | undefined; // Timer holder for searched location
function getWeek(option:string, pointOne:string | number, pointTwo?:number) {
    backG_details = [] // Clear time & weather details for background image
    week.style.opacity = "1" // Make week visible 
    week.innerHTML = "";  // Clear week

    let searchOne = "";
    let searchTwo = "";
    if (option == "myP") {
        searchOne = `https://api.openweathermap.org/data/2.5/weather?lat=${pointOne}&lon=${pointTwo}&appid=a0eb8cd91bacf228a84f3e6370b0b4a3&units=imperial`;
        searchTwo = `https://api.openweathermap.org/data/2.5/forecast?lat=${pointOne}&lon=${pointTwo}&appid=a0eb8cd91bacf228a84f3e6370b0b4a3&units=imperial`
    }
    if (option == "searched") {
        searchOne = `https://api.openweathermap.org/data/2.5/weather?q=${pointOne}&appid=a0eb8cd91bacf228a84f3e6370b0b4a3&units=imperial`;
        searchTwo = `https://api.openweathermap.org/data/2.5/forecast?q=${pointOne}&appid=a0eb8cd91bacf228a84f3e6370b0b4a3&units=imperial`;
    }

    fetch(searchOne)
        .then((re) => re.json())
        .then((data) => {
            if (data.cod != 200) throw Error("Location not found..")
            mainCard.location.textContent = data.name
            mainCard.des.textContent = [...data.weather].pop().description[0].toUpperCase() + [...data.weather].pop().description.slice(1)
            mainCard.temp.textContent = data.main.temp + " ??F";
            mainCard.feels.textContent = data.main.feels_like + " ??F";
            mainCard.hum.textContent = data.main.humidity + "%"
            mainCard.windS.textContent = data.wind.speed + "mph";
            backG_details.push([...data.weather].pop().description);
        }).then(() => {
           fetch(searchTwo)
                .then((res) => res.json())
                .then((data) => {
                    const list = data.list.filter((x: { dt: number }) => {
                        const time = new Date(x.dt * 1000).toLocaleString().split(", ")[1];
                        if (time == '5:00:00 PM' || time == '11:00:00 AM') return true;
                    });
                    let dayCount = 1;
                     const weekList:any = [];
                    for (let time = 0; time < list.length; time += 2) weekList.push([[...list].splice(time, 2)]);
                    weekList.forEach((x:any, i:number) => {
                        const date = new Date();
                        if (i == 0) {
                            console.log(x)
                            week.innerHTML += `
                    <div class="currentDay">
                        <img src="http://openweathermap.org/img/wn/${x[0][0].weather[0].icon}@2x.png" alt="">
                        <div class="info">
                            <span>${days[date.getDay() + dayCount].slice(0, 3)}</span>
                            <span><b>Mid-Day</b> - ${x[0][0].main.temp} ??F</span>
                            <span><b>Afternoon</b> - ${x[0][1].main.temp} ??F</span>
                        </div>
                    </div>

                    `
                        } else {
                            week.innerHTML += `
                    <div class="day">
                        <span>${days[date.getDay() + dayCount].slice(0, 3)}</span>
                        <img src="http://openweathermap.org/img/wn/${x[0][0].weather[0].icon}@2x.png" height:50px; width:50px; alt="">
                        <span><b>Mid-Day</b> - ${x[0][0].main.temp}??F</span>
                        <span><b>Afternoon</b> - ${x[0][1].main.temp}??F</span>
                    </div>
                    `

                        }
                        dayCount++
                    })
                    clearInterval(setClock) // Clear clock for base location

                    clearInterval(setNewTime) // Clear clock for past search location

                    getTime(data) // Initial new time based searched location

                    setNewTime = setInterval(function () { // Start clock for searched location
                        getTime(data)

                    }, 60000)

                })

        }).catch((err) => {
            // Clear today card
            mainCard.location.textContent = '. . .'
            mainCard.des.textContent = '. . .'
            mainCard.temp.textContent = '. . .'
            mainCard.feels.textContent = '. . .'
            mainCard.windS.textContent = '. . .'
            mainCard.hum.textContent = '. . .'

            // Clear week 
            week.style.opacity = "0"

            // Handle error in search input
            searchInput.value = err.message;
            searchInput.style.opacity = '.5'
            setTimeout(() => {
                searchInput.value = "";
                searchInput.style.opacity = "initial"
            }, 1500)
            disableLoader() // TURN LOADER OFF
        })
}

function getTime(data: { city: { coord: { lat: any; lon: any } } }) {
    fetch(`https://api.ipgeolocation.io/timezone?apiKey=957a47b3088a40a8a20879acaf412420&lat=${data.city.coord.lat}&long=${data.city.coord.lon}`)
        .then((res) => res.json())
        .then((data) => {
            clock(new Date(data.date_time_ymd.slice(0, -5)))
            const timeString = new Date().toLocaleTimeString().slice(-2);
            if (backG_details.length == 1) backG_details.unshift(timeString);
            getBackG(backG_details, new Date(data.date_time_ymd.slice(0, -5)).toLocaleTimeString())
        })
}

function getBackG(data: (string | string[])[], time:any ) {
    if(screen.width <= 425){
        disableLoader()
        return;
    }
    time = time.split(":")
    const images = ['url(./Public/images/Night/clear.jpg)', 'url(./Public/images/Night/cloud.jpg)',
        'url(./Public/images/Night/rain.jpg)', 'url(./Public/images/Night/snow.jpg)', 'url(./Public/images/Day/clear.jpg)',
        'url(./Public/images/Day/cloud.jpg)', 'url(./Public/images/Day/rain.jpg)', 'url(./Public/images/Day/snow.jpg)',
        'url(./Public/images/Afternoon/clear.jpg)', 'url(./Public/images/Afternoon/cloud.jpg)',
        'url(./Public/images/Afternoon/rain.jpg)', 'url(./Public/images/Afternoon/snow.jpg)',
    ]

    let time_One: string;
    let time_Two = time[2].slice(-2);
    if (time_Two == "AM" && +time[0] == 12 || time_Two == "AM" && +time[0] < 6) time_One = "Night";
    else if (time_Two == "PM" && +time[0] == 12 || time_Two == "PM" && +time[0] <= 3) time_One = "Day";
    else if (time_Two == "AM" && +time[0] >= 6) time_One = "Day";
    else if (time_Two == "PM" && +time[0] > 3 && time_Two == "PM" && +time[0] <= 6) time_One = "Afternoon";
    else if (time_Two == "PM" && +time[0] > 6) time_One = "Night";



    backG.style.backgroundImage = images.filter((x) => {
        const weather = x.slice(0, -5).split("/").reverse()[0]
        
        const time  = x.slice(0, -5).split("/").reverse()[1];
        if (data[1].includes(weather) && time == time_One) {
            return true;
        }
    })
    if (backG.style.backgroundImage.length == 0) {
        backG.style.backgroundImage = 'url(./Public/images/Atmosphere/fog.jpg)';
    }
    disableLoader() // TURN LOADER OFF
}

