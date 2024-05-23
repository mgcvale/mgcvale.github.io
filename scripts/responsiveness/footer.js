//check if viewport width is bigger than its height

if(window.innerWidth < window.innerHeight) {
    const footer = document.getElementsByTagName("footer")[0];

    //set the font size of the footer to be smaller
    footer.className += " small-footer-font";
    console.log("updated footer responsiveness");    

    //remove footer logo
    document.getElementById("footer-logo").opac();
}