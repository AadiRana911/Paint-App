import Tool from './tool.class.js';
import Point from './point.model.js';
import { getMouseCoordsOnCanvas, findDistance } from './utility.js'
export default class Paint{
    
    constructor(canvasId){
        this.canvas = document.getElementById(canvasId);
        this.context = canvas.getContext("2d");
    }

    /**
     * @param {string} tool
     */
    set activeTool(tool){
        this.tool = tool;
        console.log(this.tool);
    }

    init(){
        this.canvas.onmousedown = e => this.onMouseDown(e);
    }
    onMouseDown(e){

        //saving sketch 
        this.saveData = this.context.getImageData(0, 0,this.canvas.clientWidth, this.canvas.clientHeight);
        this.canvas.onmousemove = e => this.onMouseMove(e);
        document.onmouseup = e => this.onMouseUp(e);

        this.startPos = getMouseCoordsOnCanvas(e, this.canvas);
        console.log(this.startPos)
    }
    onMouseMove(e){
        this.currentPos = getMouseCoordsOnCanvas(e, this.canvas);
        console.log(this.currentPos);

        switch (this.tool){
            case Tool.TOOL_LINE:
            case Tool.TOOL_RECTANGLE:
            case Tool.TOOL_CIRCLE:
            case Tool.TOOL_TRIANGLE:
                this.drawShape();
                break;
            default:
                break;
        }
    }
    onMouseUp(e){
        this.canvas.onmousemove = null;
        document.onmouseup = null
    }
    drawShape(){

        this.context.putImageData(this.saveData,0 ,0);
       
        //creating line(shapes) through current pos
        this.context.beginPath();

        if(this.tool == Tool.TOOL_LINE){
        this.context.moveTo(this.startPos.x, this.startPos.y);
        this.context.lineTo(this.currentPos.x, this.currentPos.y);
        }
        else if(this.tool == Tool.TOOL_RECTANGLE){
            //drawing rect and getting width and height through subtraction
            this.context.rect(this.startPos.x, this.startPos.y, this.currentPos.x - this.startPos.x, this.currentPos.y - this.startPos.y);
        }
        else if(this.tool == Tool.TOOL_CIRCLE){
            //distance formula implementation
            let distance = findDistance(this.startPos, this.currentPos);
            //Circle measurements (getting angle of arc in radians) 
            this.context.arc(this.startPos.x, this.startPos.y, distance, 0, 2 *Math.PI, false);

        }
        this.context.stroke();
    }
}