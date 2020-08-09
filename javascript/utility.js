import Point from './point.model.js';

export function getMouseCoordsOnCanvas(e, canvas){
    let rect = canvas.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;
    return new Point(x,y); //{x:x, y:y}
}

export function findDistance(coord1, coord2){
    
    let exp1 = Math.pow(coord2.x-coord1.x, 2);
    let exp2 = Math.pow(coord2.y-coord1.y, 2);
    return Math.sqrt(exp1 + exp2);

}