const { Orbit } = require('./orbit');
const { Vehicle } = require('./vehicle');
const { Weather } = require('./weather');

fs = require('fs');
const filename = process.argv[2];

// Creating Orbit objects
const orbitOne=new Orbit(18,20);
const orbitTwo=new Orbit(20,10);

//Creating Vehicle Objects
const bike=new Vehicle('BIKE',10,2);
const tuktuk=new Vehicle('TUKTUK',12,1);
const car=new Vehicle('CAR',20,3);

// Creating Vehicle Objects
const sunnyWeather=new Weather(0.1,[car,bike,tuktuk]);
const rainyWeather=new Weather(0.2,[car,tuktuk]);
const windyWeather=new Weather(0,[car,bike]);

// Populating the weather map
const weatherMap=new Map();
weatherMap.set('SUNNY',sunnyWeather);
weatherMap.set('RAINY',rainyWeather);
weatherMap.set('WINDY',windyWeather);

function calculateTimeTakenForEachOrbit(weather,orbit,weatherObj,orbitTrafficSpeed){
    let orbitNoOfCraters=orbit.numberOfCraters;
    if(weather==='SUNNY'){
        orbitNoOfCraters=orbit.numberOfCraters-(orbit.numberOfCraters*weatherObj.percentageCraters);
    }
    else if(weather==='RAINY'){
        orbitNoOfCraters=orbit.numberOfCraters+(orbit.numberOfCraters*weatherObj.percentageCraters);
    }
    const orbitDistance=orbit.distance;
    let minTimeTaken=0;
    let minTimeVehicle='';
    for(let i=0;i<weatherObj.vehicleArray.length;i++){
        // Determining if vehicle speed or orbit speed has to be used
        const vehicleSpeed=weatherObj.vehicleArray[i].speed>orbitTrafficSpeed?orbitTrafficSpeed:weatherObj.vehicleArray[i].speed;
        
        // converting speed in relation to minutes
        const convertedVehicleSpeed=vehicleSpeed/60;

        // Calculating Time taken for vehicle to traverse orbit
        const timeTaken=(orbitDistance/convertedVehicleSpeed)+(orbitNoOfCraters*weatherObj.vehicleArray[i].timeToCrossCrater);
        
        // Determining which vehicle takes the least time to travel
        if(timeTaken<minTimeTaken || i===0){
            minTimeTaken=timeTaken;
            minTimeVehicle=weatherObj.vehicleArray[i].name;
        }
    }
    return [minTimeTaken,minTimeVehicle];
}
function decideVehicleAndOrbit(weather,orbitOneTrafficSpeed,orbitTwoTrafficSpeed){
    const weatherObj=weatherMap.get(weather);
    
    // Obtaining Time Taken and Vehicle used on Orbit One
    const orbitOneArray=calculateTimeTakenForEachOrbit(weather,orbitOne,weatherObj,orbitOneTrafficSpeed);

    // Obtaining Time Taken and Vehicle used on Orbit Two
    const orbitTwoArray=calculateTimeTakenForEachOrbit(weather,orbitTwo,weatherObj,orbitTwoTrafficSpeed);

    // Determining if Orbit 1 or Orbit 2 has to be selected
    if(orbitOneArray[0]<=orbitTwoArray[0]){
        console.log(`${orbitOneArray[1]} ORBIT1`);
    }else{
        console.log(`${orbitTwoArray[1]} ORBIT2`);
    }
}

function getTrafficData(data){

    data.split('\n').forEach((line)=>{
        const splitArray=line.split(" ");

        // Obtaining weather, orbit 1 speed and orbit 2 speed from file
        const weather=splitArray[0];
        const orbitOneTrafficSpeed=splitArray[1];
        const orbitTwoTrafficSpeed=splitArray[2];
        decideVehicleAndOrbit(weather,orbitOneTrafficSpeed,orbitTwoTrafficSpeed);
    });
}

fs.readFile(filename, 'utf8', function (err, data) {
    if (err) {
        return console.log(err);
    }
    getTrafficData(data);
});