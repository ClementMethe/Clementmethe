$('#contact').click(function(){
    location.href='#mail'
})


var wordsHover = document.getElementById('changesize');
//mots
var textBalise = wordsHover.textContent.replace(/\b(\w+)\b/g, "<span>$1</span>");
//lettres
wordsHover.innerHTML= textBalise;
console.log(textBalise)


//attribue un id à chaque span
var tagId = wordsHover.querySelectorAll('span')
//console.log(tagId);
tagId.forEach((span, index) => {  //utilisation de NodeList.forEach
  span.setAttribute('id', `${index}`);
//span.setAttribute('class', `${index}`);
});


//donne le nombre de spans
var long = tagId.length
console.log(long);


//créait une list de valeurs comprise en 0 et le nb de spans
const array = Array.from({length: long/3}, () => Math.floor(Math.random() * long));
console.log(array);
console.log(array[0]);

for(var value of array){
  var rdmSelect = document.getElementById(value)
  console.log(rdmSelect)
  rdmSelect.style.fontFamily = 'Pinyon Script';
  rdmSelect.style.fontSize = "30px";
}

