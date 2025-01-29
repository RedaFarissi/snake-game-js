var doda = { 
    position: ['0-0','0-1'] , 
    direction: 'right' , 
    head:'0-1' , 
    eat_position : '3-6' 
}

// List line and column to play
for(let x=0 ; x<22 ; x++){
    document.getElementById("table").innerHTML += `<tr> 
         <td id='${x}-0'>   </td>
         <td id='${x}-1'>   </td>
         <td id='${x}-2'>   </td>
         <td id='${x}-3'>   </td>
         <td id='${x}-4'>   </td>
         <td id='${x}-5'>   </td>
         <td id='${x}-6'>   </td>
         <td id='${x}-7'>   </td>
         <td id='${x}-8'>   </td>
         <td id='${x}-9'>   </td>
         <td id='${x}-10'>  </td>
         <td id='${x}-11'>  </td>
         <td id='${x}-12'>  </td>
         <td id='${x}-13'>  </td>
         <td id='${x}-14'>  </td>
         <td id='${x}-15'>  </td>
         <td id='${x}-16'>  </td>
         <td id='${x}-17'>  </td>
    </tr>` 
}

// game over style
function game_over(){
    document.getElementById("game-over-back-ground").style.display = "block"
}

// return all color to white
function color_white(){
    for(let x=0 ; x<22 ; x++){
        for(let y=0 ; y<18 ; y++){
            document.getElementById(`${x}-${y}`).style.backgroundColor = `white` 
        }
    }
} 

//get the empty position 
function get_empty_position(position_array){
    var empty_position = [];
    for(let x=0 ; x<22 ; x++){
        for(let y=0 ; y<18 ; y++){
            if( ! position_array.includes(x + '-' + y)   ){
                empty_position.push( x+'-'+y ) 
            }
        }
    }

    return empty_position
}

// color the position of snake 
function color_snake(position){
    color_white();
    for(let i=0 ; i<doda.position.length ; i++)
        document.getElementById(position[i]).style.backgroundColor = 'orange';
}

function remove_last_position(position){
    position.shift();
    return position;
}




color_snake(doda.position) // default position snake

document.getElementById(doda.eat_position).style.backgroundColor = "green" // default position eat

function check_if_eat( head , eat_position ){
    if(  doda.head == doda.eat_position) {
        emptyPositionList = get_empty_position( doda.position );
        let randomIndex = Math.floor(Math.random() * emptyPositionList.length);
        doda.eat_position = emptyPositionList[randomIndex];
        return true
    }else{
        return false
    }
}

let intervalPaused = false;

const interval = setInterval( ()=>{
    const position_of_current_head = doda.head 
    const direction  = doda.direction
    const position  = doda.position
    
    // get x and y of current head
    var x , y ;
    if( position_of_current_head.search("-") === 1 && position_of_current_head.length === 3  ){
        x = position_of_current_head[0]
        y = position_of_current_head[2] 
    }else if( position_of_current_head.search("-") === 1 && position_of_current_head.length === 4  ){
        x = position_of_current_head[0]
        y = position_of_current_head[2] + position_of_current_head[3];
    }else if( position_of_current_head.search("-") === 2 && position_of_current_head.length === 4  ){
        x = position_of_current_head[0] + position_of_current_head[1]
        y = position_of_current_head[3];
    }else if( position_of_current_head.search("-") === 2 && position_of_current_head.length === 5 ){
        x = position_of_current_head[0] + position_of_current_head[1]
        y = position_of_current_head[3] + position_of_current_head[4];
    }
    
    
    if( direction == 'right' ){
        if( Number(y) < 17){
            add_one_to_right = Number(y) + 1   
            position.push( x + '-' + add_one_to_right );
                  
            doda.head = x + '-' + add_one_to_right
        }else{
            //game_over();
            clearInterval(interval)
        }
    }else if( direction == 'left' ){
        if( Number(y) > 0){
            remove_one_to_left = Number(y) - 1   
            position.push( x + '-' + remove_one_to_left )
            doda.head = x + '-' + remove_one_to_left
        }else{
            //game_over();
            clearInterval(interval)
        }
    }else if( direction == 'top' ){
        if( Number(x) > 0){
            remove_one_to_top = Number(x) - 1   
            position.push( remove_one_to_top + '-' + y )
            doda.head = remove_one_to_top + '-' + y
        }else{
            //game_over();
            clearInterval(interval)
        }
    }else if( direction == 'bottom' ){
        if( Number(x) < 21){
            add_one_to_bottom = Number(x) + 1   
            position.push( add_one_to_bottom + '-' + y )
            doda.head = add_one_to_bottom + '-' + y
        }else{
            //game_over();
            clearInterval(interval)
        }
    }
    
    if( ! check_if_eat( doda.head , doda.eat_position ) ){
        doda.position = remove_last_position(position)
        document.getElementById("score").innerHTML = doda.position.length
    }  


    color_snake( doda.position );
    
    document.getElementById( doda.eat_position ).style.backgroundColor = "green";
},200);

document.addEventListener('keydown', function(event) {
    console.log(event.key)
});




document.addEventListener('keydown', function(event) {
    switch(event.key) {
        case 'ArrowUp': 
            if( doda.direction !== "bottom"  ) doda.direction = "top"; break;
        case 'ArrowDown': 
            if( doda.direction !== "top"  ) doda.direction = "bottom"; break;
        case 'ArrowLeft':
            if( doda.direction !== "right"  ) doda.direction = "left"; break;
        case 'ArrowRight': 
            if( doda.direction !== "left"  )doda.direction = "right"; break;
    }
});