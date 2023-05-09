// export function backToTop() {
//   const currentScroll =
//     document.documentElement.scrollTop || document.body.scrollTop;
//   if (currentScroll > 0) {
//     window.requestAnimationFrame(backToTop);
//     window.scrollTo(0, currentScroll - currentScroll / 10);
//   }
// }

window.onscroll = function () { scrollFunction() };
const btn = document.getElementById("myBtn");

btn.addEventListener("click", topFunction)

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("myBtn").style.display = "block";
    } else {
        document.getElementById("myBtn").style.display = "none";
    }
}
function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}