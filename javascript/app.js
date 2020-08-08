import Tool from './tool.class.js';
import Paint from './paint.class.js';

var paint = new Paint('canvas');
paint.activeTool = Tool.TOOL_LINE;
paint.init();

document.querySelectorAll("[data-command]").forEach(
    item => {
        item.addEventListener("click", e => {
            console.log(item.getAttribute("data-command"));
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
        });
    }
);

document.querySelectorAll("[data-color]").forEach(
    item => {
        item.addEventListener("click", e => {
            document.querySelector("[data-color].active").classList.toggle("active");
            item.classList.toggle("active"); 
        });
    }
);