function replaceNode(node) {
    const parent = node.parentElement;

    if (!parent || ["SCRIPT", "STYLE", "NOSCRIPT"].includes(parent.tagName))
        return;

    node.textContent = node.textContent.replace(
        /(?<!:)[\p{L}\p{N}]+(?:['’\-][\p{L}\p{N}]+)*/gu,
        ":3"
    );
}

function colon3Text(root = document.body) {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);

    while (walker.nextNode())
        replaceNode(walker.currentNode);
}

if (location.port === "44344") {
    colon3Text();

    new MutationObserver(mutations => {
        for (const mutation of mutations) {
            for (const node of mutation.addedNodes) {
                if (node.nodeType === Node.TEXT_NODE)
                    replaceNode(node);
                else if (node.nodeType === Node.ELEMENT_NODE)
                    colon3Text(node);
            }
        }
    }).observe(document.body, {
        childList: true,
        subtree: true
    });
}
