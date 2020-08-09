export default class Fill{
    constructor(canvas, point, color){
        this.context = canvas.getContext("2d");

        this.imageData = this.context.getImageData(0,0,this.context.canvas.width,this.context.canvas.height);
        
        const targetColor = this.getPixel(point);

        console.log(targetColor);
    }
    floodFill(Point, targetColor, fillColor){

    }
    getPixel(point){

        if(point.x < 0 || point.y<0 || point.x > this.imageData.width || point.y > this.imageData.height){
            return[-1,-1,-1,-1]; //impossible color
        }
        else{
            const offset = (point.y * this.imageData.width + 4) * 4;
            return[
                this.imageData.data[offset + 0],
                this.imageData.data[offset + 1],
                this.imageData.data[offset + 2],
                this.imageData.data[offset + 3]
            ]
        }
    }
}