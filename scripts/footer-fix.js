// this will check if the footer needs to be fixed in the bottom of the page, in the case that it isn't scrollable


let previousBodyHeight = getBodyHeight();
chcekFooter();

setInterval(() => {
    const currentBodyHeight = getBodyHeight();
    if(previousBodyHeight != currentBodyHeight) {
        previousBodyHeight = currentBodyHeight;
        chcekFooter();
    }
}, 2000);

function chcekFooter() {
    const bodyHeight = getBodyHeight();

    if (bodyHeight == window.innerHeight) {
        fixFooter();
    } else {
        unfixFooter();
    }
}

function getBodyHeight() {
    const body = document.body;
    const html = document.documentElement;
    return Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
}

function fixFooter() {
    document.getElementsByTagName("footer")[0].className += " incomplete-footer";
    document.getElementById("main").className = "incomplete";
}

function unfixFooter() {
    document.getElementsByTagName("footer")[0].className += "";
    document.getElementById("main").className = "";
}