document.addEventListener("DOMContentLoaded", () => {
    let selectors = document.querySelectorAll('.selector');
    for (let selector of selectors) {
        selector.addEventListener('change', function (e) {
            console.log({'value':this.value});
        })
}})
