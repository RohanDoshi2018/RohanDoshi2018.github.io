let server_url = "http://34.148.134.132:5000"

$("#upload_form").submit(function (e) {
    e.preventDefault();
    console.log("Handler for .submit() called.");

    let prompt = $("#prompt").val();
    var image = $('#upload_file')[0]['files'][0];

    let fd = new FormData;
    fd.append('prompt', JSON.stringify(prompt));
    fd.append('image', image);

    // upload prompt and image to server.
    fetch(server_url + "/infill/",
        {
            method: "POST",
            body: fd
        })
        .then(res => res.blob())
        .then(blob => {
            console.log("request successful");
            let url = URL.createObjectURL(blob);
            $('#result_img').attr('src', url);
            console.log(url);
            // console.log("infill image: " + JSON.stringify(resp["img_url"], null, 4));
        })
        .catch(function (res) {
            console.log("request failed");
        })
});

