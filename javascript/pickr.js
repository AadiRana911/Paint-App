
document.querySelector(".color-pickr").addEventListener("input", e => {
    inputColor.setAttribute("value",document.querySelector(".color-pickr").value);
    document.querySelector(".color-picker").setAttribute("data-color", document.querySelector(".color-pickr").getAttribute("value"));
});
