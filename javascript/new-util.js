export function findDistance(coord1, coord2){
    
    let exp1 = Math.pow(coord2.x-coord1.x, 2);
    let exp2 = Math.pow(coord2.y-coord1.y, 2);
    return Math.sqrt(exp1 + exp2);

}
