const contextMenu = document.querySelector(".contextMenu");
const backgroundArea = document.querySelector(".backgroundArea");
const taskbarDate = document.querySelector(".taskbarDate");
const taskbarTime = document.querySelector(".taskbarTime");
const selection = document.querySelector(".selection");

const updateDate = () => {
    let date = new Date();
    let hours = date.getHours().toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false,
    });
    let minutes = date.getMinutes().toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false,
    });
    let seconds = date.getSeconds().toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false,
    });
    taskbarDate.textContent = date.toLocaleDateString();
    taskbarTime.textContent = `${hours}:${minutes}:${seconds}`;
};

const createMenu = (location, items) => {
    contextMenu.replaceChildren();
    const ul = document.createElement("ul");
    contextMenu.style.padding = "8px";
    contextMenu.appendChild(ul);
    const screenWidth = backgroundArea.offsetWidth;
    const screenHeight = backgroundArea.offsetHeight;
    const computedStyle = window.getComputedStyle(contextMenu);
    const width = parseFloat(computedStyle.width);
    const height = Object.keys(items.list).length * 33 + 16;
    contextMenu.style.left = `${location[0]}px`;
    contextMenu.style.top = `${location[1]}px`;
    if (screenWidth - location[0] < width) {
        contextMenu.style.left = `${location[0] - width - 16}px`;
        contextMenu.style.top = `${location[1] - height}px`;
    }
    if (screenHeight - location[1] < height) {
        contextMenu.style.left = `${location[0] - width - 16}px`;
        contextMenu.style.top = `${location[1] - height}px`;
    }

    for (const key in items.list) {
        const li = document.createElement("li");
        const p = document.createElement("p");
        const img = document.createElement("img");
        p.textContent = items.list[key];
        ul.appendChild(li);
        p.textContent = key;
        img.setAttribute("src", items.list[key].icon);
        img.setAttribute("Alt", `${key} Icon`);
        li.appendChild(img);
        li.appendChild(p);
        if (items.list[key].submenu != null) {
            const img = document.createElement("img");
            img.setAttribute("src", items.arrow);
            img.setAttribute("Alt", `Arrow Icon`);
            img.setAttribute("class", `rightArrow`);
            li.appendChild(img);
        }
    }
};

let items = {
    list: {
        View: {
            icon: "icons/views.png",
            submenu: [
                "Large icons",
                "Medium icons",
                "Small icons",
                "Auto arrange icons",
                "Align icons to grid",
                "Show desktop icons",
            ],
        },
        "Sort by": {
            icon: "icons/sortby.png",
            submenu: ["Date modified", "Name", "Type", "Date added"],
        },
        Refresh: { icon: "icons/refresh.png", submenu: null },
        "More Options": {
            icon: "icons/moreoptions.png",
            submenu: ["IDK", "I don't Fucking Know"],
        },
        New: {
            icon: "icons/new.png",
            submenu: [
                "Folder",
                "Image",
                "Text Document",
                "Word Document",
                "Exel File",
                "PDF Document",
            ],
        },
        Paste: {
            icon: "icons/paste.png",
            submenu: null,
        },
        "Display Setting": {
            icon: "icons/display.png",
            submenu: null,
        },
        Personalize: {
            icon: "icons/personalize.png",
            submenu: null,
        },
    },
    arrow: "icons/arrowright.png",
};

const disableRightClick = (event) => {
    event.preventDefault();
};
const handleRightClick = (event) => {
    const location = [event.clientX, event.clientY];
    createMenu(location, items);
};
const handleClick = (event) => {
    contextMenu.replaceChildren();
    contextMenu.style.padding = "0";
};

const drawSelection = (startCord, endCord) => {
    selection.style.display = "block";
    selection.style.left = startCord[0] + "px";
    selection.style.top = startCord[1] + "px";
    selection.style.width = endCord[0] - startCord[0] + "px";
    selection.style.height = endCord[1] - startCord[1] + "px";
};

let isMouseDown = false;
let mouseDownLocation = [0, 0];
const mouseUp = (event) => {
    selection.style.display = "none";
    isMouseDown = false;
};

const mouseDown = (event) => {
    isMouseDown = true;
    mouseDownLocation = [event.clientX, event.clientY];
};

const mouseMove = (event) => {
    if (isMouseDown == false) return;
    mouseMoveLocation = [event.clientX, event.clientY];
    let startCord = [
        Math.min(mouseDownLocation[0], mouseMoveLocation[0]) - 3,
        Math.min(mouseDownLocation[1], mouseMoveLocation[1]) - 3,
    ];
    let endCord = [
        Math.max(mouseDownLocation[0], mouseMoveLocation[0]) - 3,
        Math.max(mouseDownLocation[1], mouseMoveLocation[1]) - 3,
    ];
    drawSelection(startCord, endCord);
};

document.addEventListener("contextmenu", disableRightClick);
backgroundArea.addEventListener("contextmenu", handleRightClick);
backgroundArea.addEventListener("click", handleClick);
backgroundArea.addEventListener("mousedown", mouseDown);
document.addEventListener("mouseup", mouseUp);
backgroundArea.addEventListener("mousemove", mouseMove);

updateDate();

setInterval(() => {
    updateDate();
}, 1000);
