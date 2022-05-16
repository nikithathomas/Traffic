// Weather Object

class Weather{
    constructor(percentageCraters,vehicleArray){
        this._percentageCraters=percentageCraters;
        this._vehicleArray=vehicleArray;
    }
    get percentageCraters(){
        return this._percentageCraters;
    }
    set percentageCraters(percentageCraters){
        this._percentageCraters=percentageCraters;
    }
    get vehicleArray(){
        return this._vehicleArray;
    }
    set vehicleArray(vehicleArray){
        this._vehicleArray=vehicleArray;
    }
}
module.exports={
    Weather:Weather
}