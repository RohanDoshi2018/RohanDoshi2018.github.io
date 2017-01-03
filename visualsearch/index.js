// GLOBAL VARIABLES ********************************************************
var file_arr = ['car0.jpg', 'car1.jpg', 'car2.jpg', 'car3.jpg', 'car4.jpg', 'car5.jpg', 'car6.jpg', 'car7.jpg', 'car8.jpg', 'car9.jpg', 'car10.jpg', 'car11.jpg', 'car12.jpg', 'car13.jpg', 'car14.jpg', 'car15.jpg', 'car16.jpg', 'car17.jpg', 'car18.jpg', 'car19.jpg'];
var num_photos = file_arr.length;

// load the initial view with random cars
update_view(file_arr);


// upon the click of an image, sort the images by similarity (euclidian distance of the image vectors)
$(document).on('click', '.thumb', function(event) {
    selected_file_path = event.target.src;
    selected_file = selected_file_path.split("/")[selected_file_path.split("/").length-1];

    // calculate the euclidian distance from the selected file to each of the other files
    eucl_dist = [];
    for (var i = 0; i<[num_photos]; i++){
        cur_file = file_arr[i];
        if (cur_file != selected_file){
            eucl_dist.push([cur_file, euclidean_dist(image_features[cur_file], image_features[selected_file])]);    
        }
    }

    // sort the files from smallest to largest by the euclidian distance
    eucl_dist.sort(function(a, b){return a[1]-b[1]});
    new_file_arr = [selected_file];
    for (var i = 0; i<eucl_dist.length; i++) {
        new_file_arr.push(eucl_dist[i][0]);
    }

    // update the view with the computed image ranking
    update_view(new_file_arr);
});

// update the view with the new_file_array
function update_view(new_file_array) {
    // remove the previously generated images
    $(".img_section_wrapper img").remove();

    // update the global file array
    file_arr = new_file_array;

    // load the new images in the new_file_array
    for (var i = 0; i < num_photos; i++) {
        $('.img_section_wrapper').append('<img src="img/' + file_arr[i]+ '" class="thumb"/>');
    }
}

// Returns the euclidian distance between a and b two vectors represented as arrays.
// Assuming that a and b are the same length. 
function euclidean_dist(a,b) {
    var dist = 0;
    for (var i = 0; i<a.length; i++) {
        dist += Math.pow(a[i] - b[i],2);
    }
    return Math.sqrt(dist);
}