
function checkButton(elem){
    elem.previousElementSibling.checked=true;
        var enfants = elem.parentElement.children;
      
        for (var i = 0; i < enfants.length; i++) {
            
           if(enfants[i].style.border =='2px solid rgb(31, 73, 125)'){
               enfants[i].setAttribute( 'style', 'border: unset' );
               enfants[i].style.color='#000000b5';
           }
        }
    elem.setAttribute( 'style', 'border:solid 2px rgb(31, 73, 125)');
    //elem.style.color='white';
    elem.style.color='#000000b5';
    
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