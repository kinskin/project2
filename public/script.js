window.onload = function() {
    document.getElementById("one").addEventListener("click", submitHandler)
};

window.onload = function() {
    document.getElementById("two").addEventListener("click", submitHandler2)
};

var responseHandler = function() {
    let response = JSON.parse(this.responseText)
    console.log("response text", response);
    console.log("status text", this.statusText);
    console.log("status code", this.status);

    var inputTitle = document.getElementById('inputTitle');
    inputTitle.value = response.title;
    document.body.appendChild(p);
    var inputTitleJap = document.createElement('inputTitleJap');
    inputTitleJap.value = response.synopsis;
    document.body.appendChild(p1);
    var p2 = document.createElement('p');
    p2.innerText = response.genres[0].name;
    document.body.appendChild(p2);
    var p3 = document.createElement('p');
    p3.innerText = response.genres[1].name;
    document.body.appendChild(p3);
    var p4 = document.createElement('p');
    p4.innerText = response.genres[2].name;
    document.body.appendChild(p4);
};

// send the request
var submitHandler = ()=>{
    // make a new request
    var request = new XMLHttpRequest();

    // listen for the request response
    request.addEventListener("load", responseHandler);

    // ready the system by calling open, and specifying the url
    const input = document.getElementById("input")
    console.log(input.value);
    var url = "https://api.jikan.moe/v3/anime/"+input.value;
    // var url2 = "http://127.0.0.1:3006/banana";
    request.open("GET", url);

    // send the request
    request.send();
}