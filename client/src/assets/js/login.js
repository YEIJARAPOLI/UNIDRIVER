const inputs = document.querySelectorAll('.input');

function focusFunc(){
    let parent = this.parent.parentNode;
    parent.classList.add('focus');
}

function blurFunc(){
    let parent = this.parent.parentNode;
    if(this.value == "") {
        parent.classList.remove('active');
    }
}

inputs.forEach(input => {
    input.addEventListener('focus', focusFunc);
    input.addEventListener('blur', blurFunc);
});