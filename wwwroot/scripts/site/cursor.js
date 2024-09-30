let cursor = window.localStorage.getItem("cursor");

if (cursor == null) {
    window.localStorage.setItem("cursor", "default");
    cursor = "default";
}

document.getElementById("cursor-css").href = `/css/cursors/${cursor}.css`;
