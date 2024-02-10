var checkboxes = document.querySelectorAll('.btn-check');


checkboxes.forEach(function(checkbox) {
    checkbox.addEventListener('change', function() {
        // Get the number of checked checkboxes
        var checkedCount = document.querySelectorAll('.btn-check:checked').length;

        // If more than 4 checkboxes are checked, disable the unchecked ones
        if (checkedCount >= 4) {
            checkboxes.forEach(function(checkbox) {
                if (!checkbox.checked) {
                    checkbox.disabled = true;
                }
            });
        } else {
            // If 4 or fewer checkboxes are checked, enable all checkboxes
            checkboxes.forEach(function(checkbox) {
                checkbox.disabled = false;
            });
        }
    });
});
        
function showForm(){
    $('#formContainer').toggleClass("hidden");
    $('#detailsContainer').toggleClass("hidden");
    }
    
document.getElementById('inputImage').addEventListener('change', function(e) {
  var image = document.getElementById('image');
  image.src = URL.createObjectURL(e.target.files[0]);

  var cropper = new Cropper(image, {
    aspectRatio: 1,
    viewMode: 2,
    autoCropArea: 1
  });

  document.getElementById('imageForm').addEventListener('submit', function(e) {
    e.preventDefault();
    // Get the cropped canvas
    var croppedCanvas = cropper.getCroppedCanvas({
      width: 300,
      height: 300,
      fillColor: 'transparent'
    });
    croppedCanvas.toBlob(function(blob) {
    // Create a FormData object
    var formData = new FormData();
    // Append the cropped image blob to the form data
    formData.append('croppedImage', blob, 'cropped-image.png');

    // Fetch POST request to send the FormData containing the cropped image blob
    fetch('/profile/changeProfilePic', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        console.log(response);
        if (response.ok) {
            // Handle successful response
            console.log('Image uploaded successfully');
        } else {
            // Handle error response
            console.error('Error uploading image:', response.statusText);
        }
    })
    .catch(error => {
        // Handle network error
        console.error('Network error:', error);
    });
}, 'image/png');

    
  });
});


