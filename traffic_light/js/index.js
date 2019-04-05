window.onload = function() {
    
    let stop = document.querySelector('#stopButton');
    let slow = document.querySelector('#slowButton');
    let go = document.querySelector('#goButton');

    let trafficLight = document.querySelector('#traffic-light');
    let lights = document.querySelector('#controlPanel');
    lights.addEventListener('click', function(e) {
        
        for(i=0;i<trafficLight.children.length;i++){
            trafficLight.children[i].style.backgroundColor = '#000000';
        }
        if(e.target.id === "stopButton"){
            document.querySelector('#stopLight').style.backgroundColor = 'red';
        }
        else if(e.target.id === "slowButton"){
            document.querySelector('#slowLight').style.backgroundColor = 'yellow';
        }
        else if(e.target.id === "goButton"){
            document.querySelector('#goLight').style.backgroundColor = 'green';
        }   
    })
    

}       