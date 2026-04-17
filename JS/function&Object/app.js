//array with multiple data types
let mixedArray =[1,"Hello",true,{name: "Alice"},[1,2,3]];
console.log(mixedArray[0]);
console.log(mixedArray[1]);
console.log(mixedArray[2]);
console.log(mixedArray[3]);
console.log(mixedArray[4]);

//arrow function with single parameters
let square = x => x * x;
console.log(square(4));//16

//arrow funcrtion with one parameteres
const greetuser = (name) => {
    console.log(`hello, &{name}!`);

} 
greetuser("Alice");// Hello,Alice!

//map on array
//map creates a new array by applying a 
//function to each element of the original array
let newarray = [1,2,3,4,5];
let squaredArray = newarray.map((num) => num *num);
console.log(squaredArray);//[1,4,9,16,25]