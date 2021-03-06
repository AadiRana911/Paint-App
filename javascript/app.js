import Tool from './tool.class.js';
import Paint from './paint.class.js';

var paint = new Paint('canvas');
paint.activeTool = Tool.TOOL_LINE;
paint.lineWidth = 1;
paint.brushSize = 4;
paint.selectedColor = "#000000"
paint.init();

document.querySelectorAll("[data-command]").forEach(
    item => {
        item.addEventListener("click", e => {
            let command = item.getAttribute("data-command");

            if (command === 'undo'){
                paint.undoPaint();
            }else if(command === 'download'){
                var canvas = document.getElementById("canvas");
                var image = canvas.toDataURL("image/png", 1.0).replace("image/png", "image/octet-stream");
                var link = document.createElement("a");
                link.download = "my-canvas.png";
                link.href = image;
                link.click();
            }
        });
    }
);

document.querySelectorAll("[data-tool]").forEach(
    item => {
        item.addEventListener("click", e => {
            document.querySelector("[data-tool].active").classList.toggle("active");
            item.classList.toggle("active");

            let selectedTool = item.getAttribute("data-tool");
            paint.activeTool = selectedTool;
            switch(selectedTool){
                case Tool.TOOL_CIRCLE:
                case Tool.TOOL_RECTANGLE:
                case Tool.TOOL_LINE:
                case Tool.TOOL_TRIANGLE:
                case Tool.TOOL_PENCIL:
                    document.querySelector(".group.for-shapes").style.display="block";
                    document.querySelector(".group.for-brush").style.display="none";
                    break;
                case Tool.TOOL_BRUSH:
                case Tool.TOOL_ERASER:
                    document.querySelector(".group.for-shapes").style.display="none";
                    document.querySelector(".group.for-brush").style.display="block";
                    break;
                default:
                    document.querySelector(".group.for-shapes").style.display="none";
                    document.querySelector(".group.for-brush").style.display="none";
            }
        });
    }
);

document.querySelectorAll("[data-line-width]").forEach(
    item => {
        item.addEventListener("click", e => {
            document.querySelector("[data-line-width].active").classList.toggle("active");
            item.classList.toggle("active");

            let lineWidth = item.getAttribute("data-line-width");
            paint.lineWidth = lineWidth;
        });
    }
);

document.querySelectorAll("[data-brush-size]").forEach(
    item => {
        item.addEventListener("click", e => {
            document.querySelector("[data-brush-size].active").classList.toggle("active");
            item.classList.toggle("active");

            let brushSize = item.getAttribute("data-brush-size");
            paint.brushSize = brushSize;
        });
    }
);

document.querySelectorAll("[data-color]").forEach(
    item => {
        item.addEventListener("click", e => {
            document.querySelector("[data-color].active").classList.toggle("active");
            item.classList.toggle("active"); 

            let selectedColor = item.getAttribute("data-color");
            paint.selectedColor = selectedColor;
        });
    }
);