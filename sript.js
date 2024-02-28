const rightClick = document.querySelector(".rightClick");
const backgroundArea = document.querySelector(".backgroundArea");
const taskbarDate = document.querySelector(".taskbarDate");
const taskbarTime = document.querySelector(".taskbarTime");

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

updateDate();

setInterval(() => {
    updateDate();
}, 1000);

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

const createMenu = (location, items) => {
    rightClick.replaceChildren();
    const ul = document.createElement("ul");
    rightClick.style.padding = "8px";
    rightClick.appendChild(ul);
    const screenWidth = backgroundArea.offsetWidth;
    const screenHeight = backgroundArea.offsetHeight;
    const computedStyle = window.getComputedStyle(rightClick);
    const width = parseFloat(computedStyle.width);
    const height = Object.keys(items.list).length * 33 + 16;
    rightClick.style.left = `${location[0]}px`;
    rightClick.style.top = `${location[1]}px`;
    if (screenWidth - location[0] < width) {
        rightClick.style.left = `${location[0] - width - 16}px`;
        rightClick.style.top = `${location[1] - height}px`;
    }
    if (screenHeight - location[1] < height) {
        rightClick.style.top = `${location[1] - height}px`;
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
function disableRightClick(event) {
    event.preventDefault();
}
function handleRightClick(event) {
    const location = [event.clientX, event.clientY];
    createMenu(location, items);
}
function handleClick(event) {
    rightClick.replaceChildren();
    rightClick.style.padding = "0";
}

document.addEventListener("contextmenu", disableRightClick);
backgroundArea.addEventListener("contextmenu", handleRightClick);
backgroundArea.addEventListener("click", handleClick);
