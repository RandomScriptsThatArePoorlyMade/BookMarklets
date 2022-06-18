//I did not make this, although I did fix it. Pretty self explanatory, its a bookmarklet that lets you change the tab title and favicon

javascript: (function() {
    document.title = prompt('Tab Cloak\n\nEnter new Tab Title:');
    var link = document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.type = 'image/png';
    link.href = prompt('Choose new tab icon:\n\n[1] Google Search\n[2] Google Drive\n[3] Custom URL');
    document.getElementsByTagName('head')[0].appendChild(link);
})();
