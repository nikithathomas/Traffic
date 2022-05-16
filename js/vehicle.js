// Vehicle Object

class Vehicle{
    constructor(name,speed,timeToCrossCrater){
        this._name=name;
        this._speed=speed;
        this._timeToCrossCrater=timeToCrossCrater;
    }
    get name(){
        return this._name;
    }
    set name(name){
        this._name=name;
    }
    get speed(){
        return this._speed;
    }
    set speed(speed){
        this._speed=speed;
    }
    get timeToCrossCrater(){
        return this._timeToCrossCrater;
    }
    set timeToCrossCrater(timeToCrossCrater){
        this._timeToCrossCrater=timeToCrossCrater;
    }
}
module.exports={
    Vehicle:Vehicle
}