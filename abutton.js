javascript: (function() {
    var button = document.createElement('div');
    button.style.width = '10000px';
    button.style.height = '10000px';
    button.style.backgroundColor = 'white';
    button.style.color = 'black';
    button.style.lineHeight = '50px';
    button.style.position = 'fixed';
    button.style.top = '50%';
    button.style.left = '50%';
    button.style.transform = 'translate(-50%, -50%)';
    button.style.zIndex = '9999999999999';
    button.style.cursor = 'pointer';
    document.body.appendChild(button);
})();
