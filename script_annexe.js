var modal = document.getElementById('modal');
const body = document.querySelector("body");

var modalClose = document.getElementById('modal');
modalClose.addEventListener('click', function() { 
  modal.style.display = "none";
  
});


document.addEventListener('click', function (e) { 
  if (e.target.className.indexOf('modal-target') !== -1) {
      var img = e.target;
      var modalImg = document.getElementById("modal-content");
      var captionText = document.getElementById("modal-caption");
      modal.style.display = "block";
      modalImg.src = img.src;
      captionText.innerHTML = img.alt;
    
                    body.style.overflow = "hidden";
            } else {
                body.style.overflow = "auto";
   }
});