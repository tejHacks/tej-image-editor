// initialize the variables

const fileInput = document.querySelector(".file-input"),
filterOptions = document.querySelectorAll(".filter button"),
filterName = document.querySelector(".filter-info .name"),
filterValue = document.querySelector(".filter-info .value"),
filterSlider = document.querySelector(".slider input"),
rotateOptions = document.querySelectorAll(".rotate button"),
previewImg = document.querySelector(".preview-img img"),
resetFilterBtn = document.querySelector(".reset-filter"),
chooseImgBtn = document.querySelector(".choose-img"),
saveImgBtn = document.querySelector(".save-img");

//filters and their init values
let brightness = "100", saturation = "100", inversion = "0", grayscale = "0", blurImg = "0", contrast ="0", dropshadow = "0", huerotate = "0", sepia = "0";
let rotate = 0, flipHorizontal = 1, flipVertical = 1;


// function to load Image
const loadImage = () =>{
    let file  = fileInput.files[0];
    if(!file) return;
    previewImg.src = URL.createObjectURL(file);
    previewImg.addEventListener("load", () =>{
        resetFilterBtn.click();
        document.querySelector(".container").classList.remove("disable");
    });
}

// apply the filter to the image
const applyFilter = () => {
    previewImg.style.transform = `rotate(${rotate}deg) scale(${flipHorizontal}, ${flipVertical})`;
    previewImg.style.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)  blur(${blurImg}px) contrast(${contrast}%) hue-rotate(${huerotate}deg) )`;
}

// design the filter options for the image
filterOptions.forEach(option =>{
    option.addEventListener("click", () =>{
        document.querySelector(".active").classList.remove("active");
        option.classList.add("active");
        filterName.innerText = option.innerText;

        if(option.id === "brightness") {
            filterSlider.max = "200";
            filterSlider.value = brightness;
            filterValue.innerText = `${brightness}%`;
        } else if(option.id === "saturation") {
            filterSlider.max = "200";
            filterSlider.value = saturation;
            filterValue.innerText = `${saturation}%`
        } else if(option.id === "inversion") {
            filterSlider.max = "100";
            filterSlider.value = inversion;
            filterValue.innerText = `${inversion}%`;
        }else if(option.id === "blur") {
            filterSlider.max = "1000";
            filterSlider.value = blurImg;
            filterValue.innerText = `${blurImg}px`;
        }else if(option.id === "contrast") {
            filterSlider.max = "100";
            filterSlider.value =contrast;
            filterValue.innerText = `${contrast}%`;
        }else if(option.id === "hue-rotate") {
            filterSlider.max = "360";
            filterSlider.value = huerotate;
            filterValue.innerText = `${huerotate}deg`;
        }else if(option.id === "sepia") {
            filterSlider.max = "100";
            filterSlider.value = sepia;
            filterValue.innerText = `${sepia}%`;
        }else if(option.id === "opacity") {
            filterSlider.max = "100";
            filterSlider.value = opacity;
            filterValue.innerText = `${opacity}%`;
        }
         else {
            filterSlider.max = "100";
            filterSlider.value = grayscale;
            filterValue.innerText = `${grayscale}%`;
        }
    });
});

// update filter function
const updateFilter = () => {
    filterValue.innerText = `${filterSlider.value}%` || `${filterSlider.value}px` || `${filterSlider.value}deg`;
    const selectedFilter = document.querySelector(".filter .active");

    if(selectedFilter.id === "brightness") {
        brightness = filterSlider.value;
    } else if(selectedFilter.id === "saturation") {
        saturation = filterSlider.value;
    } else if(selectedFilter.id === "inversion") {
        inversion = filterSlider.value;
    } else if(selectedFilter.id === "blur") {
        blurImg = filterSlider.value;
    }else if(selectedFilter.id === "contrast") {
        contrast = filterSlider.value;
    }else if(selectedFilter.id === "hue-rotate") {
        huerotate = filterSlider.value;
    }else if(selectedFilter.id === "sepia") {
        sepia = filterSlider.value;
    }else if(selectedFilter.id === "opacity") {
    opacity = filterSlider.value;
    }    else {
        grayscale = filterSlider.value;
    }
    applyFilter();
}
// didnt add the drop-shadown but imma figurre it out in a few days or mayybe later though

// rotate options here too,lets try it out,
rotateOptions.forEach(option => {
    option.addEventListener("click", () => {
        if(option.id === "left") {
            rotate -= 90;
        } else if(option.id === "right") {
            rotate += 90;
        } else if(option.id === "horizontal") {
            flipHorizontal = flipHorizontal === 1 ? -1 : 1;
        } else {
            flipVertical = flipVertical === 1 ? -1 : 1;
        }
        applyFilter();
    });
});


//reset the filters below
const resetFilter = () => {
    brightness = "100"; saturation = "100"; inversion = "0"; grayscale = "0", blurImg = "1", contrast ="0", dropshadow = "0", huerotate = "0", sepia = "0";
    rotate = 0; flipHorizontal = 1; flipVertical = 1;
    filterOptions[0].click();
    applyFilter();
}


//image save function below

const saveImage = () =>{
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = previewImg.naturalWidth;
    canvas.height = previewImg.naturalHeight;

    ctx.filter =  `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%) blur(${blurImg}px) contrast(${contrast}%) hue-rotate(${huerotate}deg)`;
    ctx.translate(canvas.width / 2, canvas.height /2);
    if(rotate !==0){
        ctx.rotate(rotate * Math.PI /180);
    }
    ctx.scale(flipHorizontal, flipVertical);
    ctx.drawImage(previewImg, -canvas.width /2, -canvas.width / 2, canvas.width, canvas.height );

    const link = document.createElement("a");
    link.download = "image.jpg";
    link.href = canvas.toDataURL();
    link.click();
}


// event listeners for the buttons and their functions too

filterSlider.addEventListener("input", updateFilter);
resetFilterBtn.addEventListener("click", resetFilter);
saveImgBtn.addEventListener("click", saveImage);
fileInput.addEventListener("change", loadImage);
chooseImgBtn.addEventListener("click", () => fileInput.click());