
function openNav() {
    const nav = document.getElementsByTagName("nav")[0];
    if(nav.className != "opened-nav") {
        nav.className = "opened-nav";
        document.querySelector("#nav-opener button img").src="/assets/images/icons/website/close.png";
    } else {
        nav.className = "";
        document.querySelector("#nav-opener button img").src="/assets/images/icons/website/menu.png";
    }
}