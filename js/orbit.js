// Orbit Object

class Orbit{
    constructor(distance,numberOfCraters){
        this._distance=distance;
        this._numberOfCraters=numberOfCraters;
    }
    get distance(){
        return this._distance;
    }
    set distance(distance){
        this._distance=distance;
    }
    get numberOfCraters(){
        return this._numberOfCraters;
    }
    set numberOfCraters(numberOfCraters){
        this._numberOfCraters=numberOfCraters;
    }

}
module.exports={
    Orbit:Orbit
}