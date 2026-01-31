const originalHeight = window.visualViewport.height;
let input = document.getElementById("input");
let button = document.getElementById("add");
let list = document.getElementById("items");
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
function render() {
    list.innerHTML = "";
    tasks.forEach((task, index) => {
        let li = document.createElement("li");
        li.textContent = task;
        li.addEventListener("click", () => {
            tasks.splice(index, 1);
            saveAndRender();
        });
        list.appendChild(li);
    });
}
function saveAndRender() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    render();
}
button.addEventListener("click", () => {
    let val = input.value.trim();
    if (val !== "") {
        tasks.push(val);
        input.value = "";
        saveAndRender();
    }
});

input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        button.click();
    }
});

input.addEventListener("focus", () => {
    input.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });
});

window.visualViewport.addEventListener("resize", () => {
    if (Math.abs(window.visualViewport.height - originalHeight) < 20) {
        if (document.activeElement.tagName === "INPUT") {
            document.activeElement.blur();
        }
    }
});

render();
