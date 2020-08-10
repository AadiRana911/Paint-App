import Tool from './tool.class.js';
import { getMouseCoordsOnCanvas } from './utility.js';
import { findDistance} from './new-util.js';
import Fill from './fill.class.js';
export default class Paint{
    
    constructor(canvasId){
        this.canvas = document.getElementById(canvasId);
        this.context = canvas.getContext("2d");
        this.undoStack = [];
        this.undoLimit = 30;
    }

    set activeTool(tool){
        this.tool = tool;
    }

    set lineWidth(lineWidth){
        this._lineWidth = lineWidth;
        this.context.lineWidth = this._lineWidth;
    }

    set brushSize(brushSize){
        this._brushSize = brushSize;

    }

    set selectedColor(color){
        this.color = color;
        this.context.strokeStyle = this.color;
    }

    init(){
        this.canvas.onmousedown = e => this.onMouseDown(e);
    }
    onMouseDown(e){

        //saving sketch 
        this.saveData = this.context.getImageData(0, 0,this.canvas.clientWidth, this.canvas.clientHeight);
        
        if (this.undoStack.length >= this.undoLimit) this.undoStack.shift();
        this.undoStack.push(this.saveData);

        this.canvas.onmousemove = e => this.onMouseMove(e);
        document.onmouseup = e => this.onMouseUp(e);

        this.startPos = getMouseCoordsOnCanvas(e, this.canvas);

        if(this.tool == Tool.TOOL_PENCIL || this.tool == Tool.TOOL_BRUSH){
            this.context.beginPath();
            this.context.moveTo(this.startPos.x,this.startPos.y);
        }else if(this.tool == Tool.TOOL_PAINT_BUCKET){
            //fill color
            new Fill(this.canvas, this.startPos, this.color);
        }
        else if(this.tool == Tool.TOOL_ERASER){
            this.context.clearRect(this.startPos.x, this.startPos.y, this._brushSize, this._brushSize);
        }
    }
    onMouseMove(e){
        this.currentPos = getMouseCoordsOnCanvas(e, this.canvas);

        switch (this.tool){
            case Tool.TOOL_LINE:
            case Tool.TOOL_RECTANGLE:
            case Tool.TOOL_CIRCLE:
            case Tool.TOOL_TRIANGLE:
                this.drawShape();
                break;
            case Tool.TOOL_PENCIL:
                this.drawFreeLine(this._lineWidth);
                break;
            case Tool.TOOL_BRUSH:
                this.drawFreeLine(this._brushSize);
            case Tool.TOOL_ERASER:
                this.context.clearRect(this.currentPos.x, this.currentPos.y, this._brushSize, this._brushSize);
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
        else if(this.tool == Tool.TOOL_TRIANGLE){
            //top coordinate calculates height
            this.context.moveTo((this.startPos.x + (this.currentPos.x - this.startPos.x) / 2), this.startPos.y);
            //left coordinate
            this.context.lineTo(this.startPos.x, this.currentPos.y);
            //right coordinate
            this.context.lineTo(this.currentPos.x, this.currentPos.y);
            this.context.closePath();
        }
        this.context.stroke();
    }

    drawFreeLine(lineWidth){
        this.lineWidth = lineWidth;
        this.context.lineTo(this.currentPos.x,this.currentPos.y);
        this.context.stroke();
    }
    undoPaint(){
        console.log(this.undoStack.length);
        console.log(this.undoStack);
        if(this.undoStack.length > 0){
        this.context.putImageData(this.undoStack[this.undoStack.length - 1], 0, 0);
        this.undoStack.pop();
        }else{
            alert("No undo available");
        }
    }
}