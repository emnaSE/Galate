
function checkButton(elem){
    elem.previousElementSibling.checked=true;
        var enfants = elem.parentElement.children;
      
        for (var i = 0; i < enfants.length; i++) {
            
           if(enfants[i].style.backgroundColor =='rgb(31, 73, 125)'){
               enfants[i].setAttribute( 'style', 'background-color: rgb(255,255,255)' );
               enfants[i].style.color='#000000b5';
           }
        }
    elem.setAttribute( 'style', 'background-color: #1f497d');
    elem.style.color='white';
    
}
function fill(elem){
    /*var enfants = elem.parentElement.parentElement.children;
      
        for (var i = 0; i < enfants.length; i++) {
           if(enfants[i].style.backgroundImage =='url("assets/img/done.png")'){
                enfants[i].style.backgroundImage = "url('')";
                if (enfants[i].firstChild) {
                    enfants[i].firstChild.style.visibility="visible";
                }
           }
        }
    elem.parentElement.style.backgroundImage = "url('assets/img/done.png')";
    elem.parentElement.style.backgroundRepeat="no-repeat";
    elem.parentElement.style.backgroundPositionY="center";
    elem.parentElement.style.backgroundPositionX="center";
    elem.style.visibility="hidden";*/
    var enfants = elem.parentElement.children;
      
        for (var i = 0; i < enfants.length; i++) {
           if(enfants[i].style.backgroundImage =='url("assets/img/done2.png")'){
                enfants[i].style.backgroundImage = "url('')";
           }
        }
    elem.style.backgroundImage = "url('assets/img/done2.png')";
    elem.style.backgroundSize="25px";
    elem.style.backgroundRepeat="no-repeat";
    elem.style.backgroundPositionY="center";
    elem.style.backgroundPositionX="center";
    elem.firstChild.checked=true;
}