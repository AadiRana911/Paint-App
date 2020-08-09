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

    init(){
        this.canvas.onmousedown = e => this.onMouseDown(e);
    }
    onMouseDown(e){
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
        //creating line through current pos
        this.context.beginPath();
        this.context.moveTo(this.startPos.x, this.startPos.y);
        this.context.lineTo(this.currentPos.x, this.currentPos.y);
        this.context.stroke();
    }
}