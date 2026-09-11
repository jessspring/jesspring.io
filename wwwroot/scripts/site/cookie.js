function writeCookie() {
    window.localStorage.setItem("timestamp", new Date().getTime());
    document.cookie = JSON.stringify(window.localStorage);
}

if (document.cookie == "")
    writeCookie();

else {
    const cookie = JSON.parse(document.cookie);
    if (parseInt(window.localStorage.getItem("timestamp")) < cookie.timestamp) {
        window.localStorage.clear();

        for (var item in cookie) {
            console.log(item + " " + cookie[item]);
            window.localStorage.setItem(item, cookie[item]);
        }

        writeCookie();
    }
}
