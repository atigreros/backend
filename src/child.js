function between(min, max) {
    return Math.floor(
        Math.random() * (max - min) + min
    )
}


process.on('message', (cant) => {
    console.log('Message from parent:', cant);   
   
    const max = 1000
    const min = 1
    let numbers = [];
    let num;
    let isOnArray = 0;
    numbers.push({"number":between(min,max), "cant":1 })
    for (let i=1; i<cant; i++){

        num = between(min,max);
        isOnArray = 0
        numbers.forEach(number=>{
            if(number.number==num){
                number.cant = number.cant + 1;
                isOnArray=1;
            }
        })
        if (isOnArray==0) 
            numbers.push({"number":num, "cant":1 })
            
    }

    console.log('cant:',cant);
    process.send( {quantity:cant, numbers});

});

