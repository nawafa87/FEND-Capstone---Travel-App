import {calc} from './calc.js'
let api_url = "http://api.geonames.org/postalCodeLookupJSON?placename=&username=nawafa87";
document.getElementById('bt').addEventListener('click',performAction);
let departing ;
let arriving;

export function performAction(e)
{
    const city = document.getElementById('city').value;
    departing = document.getElementById('departing').value;
    arriving = document.getElementById('arriving').value;
    if(city == '' || departing == '' || arriving == ''){ 
    alert("You Should Enter city!");
       
     }
    else{
        departing = new Date(departing);
        arriving = new Date(arriving);
        //this the first fetch from geonames api to get the city data from the api
        api_url = `http://api.geonames.org/searchJSON?q=${city}&username=nawafa87`;  
        getData(api_url)
        .then(function(data){
        postData('/add', data)  
    })
   
    
    }
}
//this the first fetch from geonames api to get the city data from the api    
const getData = async(url = '')=>{
    const res = await fetch(api_url)
    try{
        const data = await res.json()
        console.log(data);
        console.log(data.geonames[0]);
        console.log(data.geonames[0].countryName);
        console.log(data.geonames[0].name);
        console.log(data.geonames[0].lat);
        console.log(data.geonames[0].lng);
        document.getElementById('trip_to').innerHTML =`MY trip to: ${data.geonames[0].name},${data.geonames[0].countryName}`;
        document.getElementById('departing_to').innerHTML = `Departing : ${departing.getDate()}/${departing.getMonth()+1}/${departing.getFullYear()}`;
        

         let today = new Date(); 
        if(departing.getDate() <= today.getDate()+6){
            console.log("OK");
            //this the secoend fetch from wetherbit api for the current weather to get the city data from the api by lat and lng
            getData2(`https://api.weatherbit.io/v2.0/current?lat=${data.geonames[0].lat}&lon=${data.geonames[0].lng}&key=036c576df3a147d393103065d3c0df56`)
        }
        else{
            console.log("NOOOO");
            //this the secoend fetch from wetherbit api for the forecast weather to get the city data from the api by lat and lng
            getData2(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${data.geonames[0].lat}&lon=${data.geonames[0].lng}&key=036c576df3a147d393103065d3c0df56`)
        }
         return data;
    }
    catch(error){
        console.log("error",error);
    }
    
}
//this the secoend fetch from wetherbit api for the current weather or forecast to get the city data from the api by lat and lng
  const getData2 = async(url = '')=>{
    const response = await fetch(url);
    try{    
        const newData = await response.json();
        console.log(newData);
        console.log(newData.data[0]);
        
        postData('/add', newData)
        let today = new Date();
        let cal = calc(departing,arriving);
        console.log(cal);
        if(departing.getDate() <= today.getDate()+6){
            console.log("OK2");
            document.getElementById('ways').innerHTML =`you will stay in ${newData.data[0].city_name},${cal} days`;
            document.getElementById('temp').innerHTML =`Typical weather for then is:
             ${newData.data[0].temp}`;
             document.getElementById('cloud').innerHTML =`Mostly ${newData.data[0].weather.description} through the day`;
             //this the api to get the picture for the city to get the picture for the city
            getData3(`https://pixabay.com/api/?key=17623255-470774e4928590abd3c568b46&q=${newData.data[0].city_name}`)
        
        }
        else{
            console.log("NOOOO2");
            document.getElementById('ways').innerHTML =`you will stay in ${newData.city_name},${cal}days`;
            document.getElementById('temp').innerHTML =`Typical weather for then is:
            High ${newData.data[0].high_temp}, Low ${newData.data[0].low_temp}, Temp ${newData.data[0].temp}`;
             document.getElementById('cloud').innerHTML =`Mostly ${newData.data[0].weather.description} through the day`;
            //this the api to get the picture for the city to get the picture for the city
            getData3(`https://pixabay.com/api/?key=17623255-470774e4928590abd3c568b46&q=${newData.city_name}`)
        }
        return newData;
        }
        
    catch(error){
        console.log("error",error);
    }
}
//this the api to get the picture for the city to get the picture for the city
const getData3 = async(url = '')=>{
    const response = await fetch(url);
    try{    
        const newData = await response.json();
        console.log(newData);
        document.getElementById('photo').src = newData.hits[0].webformatURL;
        document.getElementById('photo').height = "400";
        document.getElementById('photo').width = "450";

        postData('/add', newData)
        return newData;
        }
        
    catch(error){
        console.log("error",error);
    }
}
 

const postData = async(url = '' , data = {})=>{
    const response = await fetch(url,{
        method: 'POST', 
        credentials: 'same-origin',
        headers: {
        'Content-Type': 'application/json',
    },
   // Body data type must match "Content-Type" header        
    body: JSON.stringify(data),   
    });

    try{    
        const newData = await response.json();
        return newData;
        }
    catch(error){
        console.log("error",error);
    }
}