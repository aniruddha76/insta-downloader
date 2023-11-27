(async () => {
    const src = chrome.runtime.getURL("./jszip.min.js");
    const jszip = await import(src);
    console.log({ jszip });
}
)();

function startExtension() {

    async function downloadSelectedImages() {
        const selectedImages = document.querySelectorAll('input[type="checkbox"]:checked');
        const imageUrls = Array.from(selectedImages).map(checkbox => {
            return checkbox.parentNode.parentElement.querySelector("img").src;
        });

        if (imageUrls.length > 0) {
            const zip = new JSZip();
            const folder = zip.folder("Instagram-Posts");

            const fetchPromises = imageUrls.map(async (imageUrl, index) => {
                try {
                    const response = await fetch(imageUrl);
                    const blob = await response.blob();
                    const imageFilename = `image_${index}.jpg`;
                    folder.file(imageFilename, blob);
                } catch (error) {
                    console.error("Error fetching image:", error);
                }
            });

            try {
                await Promise.all(fetchPromises);

                const content = await zip.generateAsync({ type: "blob" });

                const a = document.createElement("a");
                const url = window.URL.createObjectURL(content);
                a.href = url;
                a.download = window.location.href.split("/")[3] + ".zip";
                a.style.display = "none";
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
            } catch (error) {
                console.error("Error creating zip file:", error);
            }
        }
    }

    function downloadProfilePhoto() {
        const profileUrl = document.querySelector("header img").src;
        if (profileUrl) {
            fetch(profileUrl)
                .then(response => response.blob())
                .then(blob => {
                    const a = document.createElement("a");
                    const photoUrl = window.URL.createObjectURL(blob);
                    a.href = photoUrl;
                    a.download = "Profile-" + Date.now() + ".jpg";
                    a.style.display = "none";
                    document.body.appendChild(a);
                    a.click();
                    window.URL.revokeObjectURL(photoUrl);
                })
                .catch(error => console.error("Error while downloading profile image", error));
        }
    }

    var afterHeader = document.querySelector('header');
    var buttonContainer = document.createElement('div');

    buttonContainer.style.position = 'relative';
    buttonContainer.style.zIndex = '2';
    buttonContainer.style.paddingBottom = '1%';

    var button = document.createElement('button');
    button.type = 'button';
    button.id = 'downloadBtn';
    button.textContent = 'Download Posts';
    button.title = 'Download';
    button.value = 'button';

    button.style.height = '40px';
    button.style.width = 'auto';
    button.style.cursor = 'pointer';

    var button2 = document.createElement('button');
    button2.type = 'button';
    button2.id = 'profownloadBtn';
    button2.textContent = 'Download Profile';
    button2.title = 'Download';
    button2.value = 'button';

    button2.style.height = '40px';
    button2.style.width = 'auto';
    button2.style.marginInline = '10px';

    var breakLine = document.createElement('br');
    var breakLine2 = document.createElement('br');

    var sideNote = document.createElement('h4');
    sideNote.innerText = "Note: If selected check box dissapears, Don't worry you can hit 'Download Post' and they will get downloaded.";

    sideNote.style.border = "1px solid";
    sideNote.style.padding = "1%";
    sideNote.style.borderColor = "#ff3040";
    sideNote.style.borderRadius = "5px";
    sideNote.style.width = "65%";

    buttonContainer.appendChild(button);
    buttonContainer.appendChild(button2);
    buttonContainer.appendChild(breakLine);
    buttonContainer.appendChild(breakLine2);
    buttonContainer.appendChild(sideNote);

    button.style.cursor = 'pointer';
    button2.style.cursor = 'pointer';

    if (afterHeader != null) {
        afterHeader.insertAdjacentElement('afterend', buttonContainer);
    } else {
        console.log("Trying to append...");
    }

    const createdButton = document.getElementById("downloadBtn");

    createdButton.addEventListener("click", function () {
        downloadSelectedImages();
    })

    const profileButton = document.getElementById("profownloadBtn");

    profileButton.addEventListener("click", function () {
        downloadProfilePhoto();
    })

    function createCheckboxes() {
        var images = document.querySelectorAll("article img");
        images.forEach(function (image) {
            var checkboxContainer = document.createElement("div");
            checkboxContainer.style.position = "absolute";
            checkboxContainer.style.top = "0";
            checkboxContainer.style.left = "0";
            checkboxContainer.style.zIndex = "2";

            var checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.style.height = "20px";
            checkbox.style.width = "20px";
            checkboxContainer.appendChild(checkbox);

            image.parentNode.appendChild(checkboxContainer);

            checkbox.addEventListener("click", function (event) {
                event.stopPropagation();
            });

            image.addEventListener("click", function (event) {
                event.stopPropagation();
            });
        });
    }

    createCheckboxes();

    const mutationsInArtical = new MutationObserver(mutations => {
        mutations.forEach(record => {
            let rowAdded = record.addedNodes[0].className;
            if (rowAdded === "_ac7v  _al3n"){
                createCheckboxes();
            }
        })
    });

    let article = document.querySelectorAll("article")[0];
    mutationsInArtical.observe(article, { childList: true, subtree: true });
}

const mutationStatus = new MutationObserver(enteries => {
    startExtension();
    mutationStatus.disconnect();
})

mutationStatus.observe(document.body, { childList: true });