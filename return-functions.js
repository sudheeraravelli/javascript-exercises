function isEven(number){
	console.log(number);

	return(number%2 ===0);
}


function factorial(x) {
	var y = 1;
	for(i = x; i > 0 ; i--){	
		y = y *i;
	}

	return y;
}


function prime(x){
	for(i= 2; i < x; i++){
		if(x%i === 0 ){
			return x + " is not a prime number";
		}
	}
	return x + " is a prime number";
}
function kebabTosnake(str){
	var newStr = str.replace(/ - /g, "_");
	return newStr;
}
