

const checkId = () =>{
    if (localStorage.getItem("userIdHash") == undefined || localStorage.getItem("userIdHash") == false) {
        window.location.href = "/";
    }
}