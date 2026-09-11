function writeCookie() {
    window.localStorage.setItem("timestamp", new Date().getTime());

    const cookieObj = {};
    const items = { ...window.localStorage };

    for (var item in items)
        cookieObj[item] = items[item];

    document.cookie = JSON.stringify(cookieObj);
}

if (document.cookie == "")
    writeCookie();

else {
    const cookie = JSON.parse(document.cookie);
    if (parseInt(window.localStorage.getItem("timestamp")) < cookie.timestamp) {
        window.localStorage.clear();

        for (var item in cookie) {
            window.localStorage.setItem(item, cookie[item]);
        }

        writeCookie();
    }
}
