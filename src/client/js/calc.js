function calc(departing , arriving){
    let calc = arriving.getDate() - departing.getDate();
    console.log(calc);
    return calc;   
}

export{calc}