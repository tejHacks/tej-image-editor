document.addEventListener("DOMContentLoaded", function() {
    const fileInput = document.querySelector(".file-input");
    const filterOptions = document.querySelectorAll(".filter button");
    const filterName = document.querySelector(".filter-info .name");
    const filterValue = document.querySelector(".filter-info .value");
    const filterSlider = document.querySelector(".slider input");
    const rotateOptions = document.querySelectorAll(".rotate button");
    const previewImg = document.querySelector(".preview-img img");
    const resetFilterBtn = document.querySelector(".reset-filter");
    const chooseImgBtn = document.querySelector(".choose-img");
    const saveImgBtn = document.querySelector(".save-img");
    const shareButtons = document.querySelectorAll(".options a");

    let brightness = 100;
    let saturation = 100;
    let inversion = 0;
    let grayscale = 0;
   let blurImg = 0;
   let contrast = 0;
   let hueRotate = 0;
    let sepia = 0;
    let opacity = 80;
    let rotate = 0;
    let flipHorizontal = 1;
    let flipVertical = 1;

    const loadImage = () => {
        const file = fileInput.files[0];
        if (!file) return;
        previewImg.src = URL.createObjectURL(file);
        previewImg.onload = () => {
            resetFilterBtn.click();
            document.querySelector(".container").classList.remove("disable");
        };
    };

    const applyFilter = () => {
        // previewImg.style.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%) blur(${blurImg}px) hue-rotate(${hueRotate}deg)`;
       
        previewImg.style.filter = `
        brightness(${brightness}%)
        saturate(${saturation}%)
        invert(${inversion}%)
        grayscale(${grayscale}%)
        blur(${blurImg}px)
        hue-rotate(${hueRotate}deg)
        sepia(${sepia}%)
        opacity(${opacity / 100})
    `;
       
        previewImg.style.transform = `rotate(${rotate}deg) scale(${flipHorizontal}, ${flipVertical})`;
    };

    filterOptions.forEach(option => {
        option.addEventListener("click", () => {
            filterOptions.forEach(opt => opt.classList.remove("active"));
            option.classList.add("active");
            filterName.innerText = option.innerText;

            if (option.id === "brightness") {
                filterSlider.max = "200";
                filterSlider.value = brightness;
                filterValue.innerText = `${brightness}%`;
            } 
            else if (option.id === "saturation") {
                filterSlider.max = "200";
                filterSlider.value = saturation;
                filterValue.innerText = `${saturation}%`;
            } 
            else if (option.id === "inversion") {
                filterSlider.max = "100";
                filterSlider.value = inversion;
                filterValue.innerText = `${inversion}%`;
            }
            else if(option.id === "blur-img"){
                filterSlider.max = "1000";
                filterSlider.value = blurImg;
                filterValue.innerText = `${blurImg}px`; 
            }
            else if(option.id === "contrast-img"){
                filterSlider.max = "100";
                filterSlider.value = contrast;
                filterValue.innerText = `${contrast}%`; 
            }
             else if(option.id === "hue-rotate"){
                filterSlider.max = "360";
                filterSlider.value = hueRotate;
                filterValue.innerText = `${hueRotate}deg`; 
            }
            else if(option.id === "sepia"){
                filterSlider.max = "100";
                filterSlider.value = sepia;
                filterValue.innerText = `${sepia}px`; 
            }
            else if(option.id === "opacity"){
                filterSlider.max = "100";
                filterSlider.value = opacity;
                filterValue.innerText = `${opacity}px`; 
            }
             else {
                filterSlider.max = "100";
                filterSlider.value = grayscale;
                filterValue.innerText = `${grayscale}%`;
            }
        });
    });

    const updateFilter = () => {
        filterValue.innerText = `${filterSlider.value}%`;
        const selectedFilter = document.querySelector(".filter button.active");

        if (!selectedFilter) return;

        switch (selectedFilter.id) {
            case "brightness":
                brightness = filterSlider.value;
                break;
            case "saturation":
                saturation = filterSlider.value;
                break;
            case "inversion":
                inversion = filterSlider.value;
                break;
            case "blur-img":
                blurImg = filterSlider.value;
                break;
            case "contrast-img":
                contrast = filterSlider.value;
                break;
            case "sepia":
                sepia = filterSlider.value;
                break;
            case "opacity":
                opacity = filterSlider.value;
                break;
            case "hue-rotate":
                hueRotate = filterSlider.value;
            case "grayscale":
                grayscale = filterSlider.value;
                break;
            default:
                break;
        }

        applyFilter();
    };

    rotateOptions.forEach(option => {
        option.addEventListener("click", () => {
            if (option.id === "left") {
                rotate -= 90;
            } else if (option.id === "right") {
                rotate += 90;
            } else if (option.id === "horizontal") {
                flipHorizontal = flipHorizontal === 1 ? -1 : 1;
            } else {
                flipVertical = flipVertical === 1 ? -1 : 1;
            }
            applyFilter();
        });
    });

    const resetFilter = () => {
        brightness = 100;
        saturation = 100;
        inversion = 0;
        grayscale = 0;
        rotate = 0;
        blurImg = 0;
    contrast = 0;
    hueRotate = 0;
    sepia = 0;
    opacity = 80;
        flipHorizontal = 1;
        flipVertical = 1;
        filterOptions[0].click(); // Reset active filter
        applyFilter();
    };

    const saveImage = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = previewImg.naturalWidth;
        canvas.height = previewImg.naturalHeight;

        ctx.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%) blur(${blurImg}px) hue-rotate(${hueRotate}deg)`;
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate(rotate * Math.PI / 180);
        ctx.scale(flipHorizontal, flipVertical);
        ctx.drawImage(previewImg, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);

        const link = document.createElement("a");
        link.download = "image.jpg";
        link.href = canvas.toDataURL();
        link.click();
    };


   
    
 
 
    
    const shareImage = (platform) => {
        const canvas = document.createElement("canvas");
     
       
        const ctx = canvas.getContext("2d");
        canvas.width = previewImg.naturalWidth;
        canvas.height = previewImg.naturalHeight;

        ctx.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%) blur(${blur}px) blur(${blur}px) hue-rotate(${hueRotate}deg) opacity(${Opacity}%) contrast(${contrast}%) sepia(${sepia}%)`;
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate(rotate * Math.PI / 180);
        ctx.scale(flipHorizontal, flipVertical);
        ctx.drawImage(previewImg, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);

        const dataUrl = canvas.toDataURL();
        const imageBase64 = canvas.toDataURL();
    
        switch (platform) {
            case "facebook":
                window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(imageBase64)}`, "_blank");
                break;
            // Add similar cases for WhatsApp, Twitter, and Pinterest with their respective share URLs
            case "whatsapp":
                window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(imageBase64)}`, "_blank");
                break;
            case "twitter":
                window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(imageBase64)}`, "_blank");
                break;
            case "pinterest":
                window.open(`https://www.pinterest.com/pin/create/button/?url=${encodeURIComponent(imageBase64)}`, "_blank");
                break;
            default:
                break;
        }
    };

//  select the sharing platform



    filterSlider.addEventListener("input", updateFilter);
    resetFilterBtn.addEventListener("click", resetFilter);
    saveImgBtn.addEventListener("click", saveImage);
    fileInput.addEventListener("change", loadImage);
    chooseImgBtn.addEventListener("click", () => fileInput.click());
  
 
    // share the image link
    shareButtons.forEach(button => {
        button.addEventListener("click", () => {
            const platform = button.id; // Get the platform ID (e.g., facebook, whatsapp)
            shareImage(platform); // Call the shareImage function with the platform
        });
    });

    // Initial load if an image is already selected
    if (fileInput.files.length > 0) {
        loadImage();
    }
});
