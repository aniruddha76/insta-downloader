if (window.location.href.includes("www.instagram.com")) {

    var body = document.querySelector('.x1iyjqo2');
    var buttonContainer = document.createElement('div');
    buttonContainer.style.position = 'relative';
    buttonContainer.style.zIndex = '2';

    var button = document.createElement('button');
    button.type = 'button';
    button.id = 'btn';
    button.name = 'myCheckbox';
    button.value = 'button';

    button.style.height = '20px';
    button.style.width = '20px';
    buttonContainer.appendChild(button);

    body.appendChild(buttonContainer);

const createdButton = document.getElementById("btn");

function downloadSelectedImages() {
    const selectedImages = document.querySelectorAll('input[type="checkbox"]:checked');

    selectedImages.forEach(function (checkbox) {
        const url = selectedImages.parentElement;
        const imageUrl = url.getElementsByTagName("img")[0].src;
        if (imageUrl) {
            const a = document.createElement("a");
            a.href = imageUrl;
            a.download = "image";
            a.click();
        }
    });
}

createdButton.addEventListener("click", function() {
    downloadSelectedImages();
  });

var images = document.querySelectorAll('._aagu');
images.forEach(function (image) {

    var checkboxContainer = document.createElement('div');
    checkboxContainer.style.position = 'absolute';
    checkboxContainer.style.top = '0';
    checkboxContainer.style.left = '0';
    checkboxContainer.style.zIndex = '2';

    var checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = 'myCheckbox';
    checkbox.name = 'myCheckbox';
    checkbox.value = 'checkboxValue';

    checkbox.style.height = '20px';
    checkbox.style.width = '20px';
    checkboxContainer.appendChild(checkbox);

    image.appendChild(checkboxContainer);

    checkbox.addEventListener('click', function (event) {
        event.stopPropagation();
    });
    
var img = image.querySelector('img');
if (img) {
    img.addEventListener('click', function (event) {
        event.stopPropagation();
    });
} else {
    console.log("No image found within a ._aagu element");
}
});

} else {
    alert("This is not an Instagram page.");
}