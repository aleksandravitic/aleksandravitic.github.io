//FUKCIJE


function greet(){
	console.log('hello there');
}

//function expression
const speak = function(){
	console.log('good day');
};


const speak1 = function(name, time){
	console.log('good $(time) $(name)');
}


//poziv funkcije
greet();
speak();
speak1('mario', 'morning');