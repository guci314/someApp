///<reference path="../../typings/tsd.d.ts" />

function test(){
    console.log("dfdf");
    if (angular.isNumber(5)){
        var p=new Promise((fullfil,reject)=>{
            fullfil("dfdf");
        });
        var defer=$q.defer();
        
    }
}