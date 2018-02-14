console.log("print all numbers between -10 and 20");
var num = -10;
for(var i=0;i<20;i++){
	console.log(i)
}
console.log("print all even numbers between 10 and 40");
var num = 10;
for(var i=0; i<40;i++){
	if(i%2 ===0){
		console.log(i)
	}

	
}

console.log("print all odd numbers between 300 and 333");
var num = 300;
for(var i =300;i<333;i++){
	if(i%2 !==0){
		console.log(i)
	}	
}

console.log("print all numbers divisible by 5 and 3 between 5 and 50");
var num = 5;
for(var i = 5;i<=51;i++){
	if(i%5 ===0 && i % 3 ===0){
		console.log(i)
	}
}
