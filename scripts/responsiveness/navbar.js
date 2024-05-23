
function openNav() {
    const nav = document.getElementsByTagName("nav")[0]
    console.log("LKSAJDLSAKJD")
    if(nav.className != "open-nav") {
        nav.className = "open-nav";
        document.getElementById("open-nav-button-img").src="/assets/images/icons/website/close.png";
    } else {
        nav.className = "";
        document.getElementById("open-nav-button-img").src="/assets/images/icons/website/menu.png";
    }
}