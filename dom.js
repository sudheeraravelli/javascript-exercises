// function prime(from,to){
// 	let arr = [];
// 	for(let i = from; i <= to ; i++){
// 		let count = 0;
// 		for(let j = 2 ; j < i; j++ ){
// 			if(i % j === 0 ){
// 				count++;
// 			}
// 		}
// 		if(count === 0 ){
// 			arr.push(i)		
// 		}
//     }
// 	return arr;
// }

// console.log(prime(10,40));

// function fib(num){
// 	  var a = 0, b = 1;
//     for(var i = 2; i <= num ; i++) {
//         c = a + b;
//         a = b;
//         b = c;
//     }
//     return c;
// };



// var body = document.querySelector("body"); //SELECT
// var isBlue = false;

// setInterval(function(){   //MANIPULATE
//  if (isBlue) {
//    body.style.background = "white";
//  } else {
//    body.style.background = "blue";
//  }
//  isBlue = !isBlue;
// }, 1000);





// var button = document.querySelector("button");
// var isViolet = false;

// // var paragraph = document.querySelector("p");
// button.addEventListener("click",function(){
// 	if(isViolet)
// 	{
// 	document.body.style.background = "white";
// 	isViolet = false;
// 	}
// 	else{
// 	document.body.style.background = "violet";
// 	isViolet = true;
//     }
// });


var button = document.querySelector("button");

button.addEventListener("click",function(){
	document.body.classList.toggle("purple");
});

