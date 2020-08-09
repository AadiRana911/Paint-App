import Tool from './tool.class.js';
import Point from './point.model.js';
import { getMouseCoordsOnCanvas } from './utility.js'
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

    set lineWidth(lineWidth){
        this._lineWidth = lineWidth;
        this.context.lineWidth = this._lineWidth;
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

        if(this.tool = Tool.TOOL_PENCIL){
            this.context.moveTo(this.startPos.x,this.startPos.y);
        }
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
            case Tool.TOOL_PENCIL:
                // this.drawFreeLine();
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

        if(this.tool == TOOL_LINE){
        this.context.moveTo(this.startPos.x, this.startPos.y);
        this.context.lineTo(this.currentPos.x, this.currentPos.y);
        }
        this.context.stroke();
    }
    // drawFreeLine(){
    //     this.context.lineTo(this.currentPos.x, this.currentPos.y);
    //     this.context.stroke();
    // }
}