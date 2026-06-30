//Credit to Krazete on github, https://github.com/Krazete/bookmarklets/blob/master/tri.js
//All I did was incorporate the music player, add a button to change the song, add a volume slider, and change some of the default values of the 3D script

(function() {
  
  var bgmusic = document.createElement("audio");
bgmusic.id = "music";
bgmusic.loop = "loop";
bgmusic.src = prompt("Song,\n example: site.com/song.mp3.\n If the song isn't looped it will just replay,\nthe default song is the Blue Danube Waltz, but it can be changed to whatever you want.\n\n The preset url contains other songs as well, just change the name before the .mp3\n Currently available songs from that url are Nyan, Bad, California Love, Going Up The Country (Remaster 2005), Frolic, Call Me Maybe, and The Blue Danube Waltz.\n Also, if you ever need to reset, press the letter 'r'.", "https://raw.githubusercontent.com/RandomScriptsThatArePoorlyMade/mp3s/main/The Blue Danube Waltz.mp3");
bgmusic.volume = 0.09;
bgmusic.play();
  
   
  
	var tri = {
		menu: document.createElement("div"),
		limit: document.createElement("input"),
		gap: document.createElement("input"),
		sag: document.createElement("input"),
		fov: document.createElement("input"),
        vol: document.createElement("input"),
		int: document.createElement("input"),
		int2: document.createElement("input"),
		spd: document.createElement("input"),
		flo: document.createElement("input"),
		off: document.createElement("input"),
		non: document.createElement("input"),
		end: document.createElement("input"),
		tgl: document.createElement("input"),
        chg: document.createElement("input"),
		cssStatic: document.createElement("style"),
		cssDynamic: document.createElement("style"),
		orientation: {"yaw": 0, "pitch": 0, "roll": 0},
		mouseMove: function(e) {
			tri.orientation.yaw = -Math.cos(Math.PI * e.clientX / innerWidth) * 180 * tri.limit.value;
			tri.orientation.pitch = Math.cos(Math.PI * e.clientY / innerHeight) * 180 * tri.limit.value;
			tri.updateBody();
		},
		gyroMove: function(e) {
			var landscape = innerWidth > innerHeight;
			if (landscape) {
				tri.orientation.yaw = -(e.alpha + e.beta);
				tri.orientation.pitch = e.gamma - Math.sign(90 - Math.abs(e.beta)) * 90;
			}
			else {
				tri.orientation.yaw = -(e.alpha + e.gamma);
				tri.orientation.pitch = e.beta - 90;
			}
			tri.updateBody();
		},
		updateOrigin: function(e) {
			document.body.style.transformOrigin = (innerWidth / 2 + pageXOffset) + "px " + (innerHeight / 2 + pageYOffset) + "px";
		},
		updateBody: function() {
			document.body.style.transform = "perspective(" + Math.pow(2, tri.fov.value) + "px) translateZ(-" + tri.gap.value + "px) rotateX(" + tri.orientation.pitch + "deg) rotateY(" + tri.orientation.yaw + "deg)";
		},
        updateVolume: function() {
        var val = document.getElementById("volumei").value;
        bgmusic.volume = val;
        },
		updateIntensity: function() {
        var val = document.getElementById("inti").value;
        v = val;
		},
		updateIntensity2: function() {
        var val = document.getElementById("int2i").value;
        z = val;
			},
		updateSpeed: function() {
        var val = document.getElementById("spdi").value;
        n = 5000 - val;
			},
		updateCSS: function() {
			if (tri.non.checked)
				tri.cssDynamic.innerHTML = "";
			else if (tri.off.checked)
				tri.cssDynamic.innerHTML = "* { transform-style: preserve-3d; }";
			else {
				for (var depth = 0; document.querySelector("body" + " > *".repeat(depth)); depth++);
				var gap = tri.gap.value / depth;
				var sag = -Math.PI * tri.sag.value / depth;
				tri.cssDynamic.innerHTML = `
*:not(#tri-menu):not(#tri-menu *) {
	transform: translateZ(${gap}px) rotateX(${sag}rad);
	transform-style: preserve-3d;
	transition: transform 1s;
	outline: 1px solid rgba(0, 0, 0, 0.0625);
	${tri.flo.checked ? "overflow: visible !important;" : ""}
}
*:not(#tri-menu):not(#tri-menu *):hover {
	transform: translateZ(${gap * 2}px) rotateX(${sag * 2}rad);
	${!tri.flo.checked ? "overflow: visible;" : ""}
}
`;
			}
		},
		toggle: function() {
				 tri.menu.classList.toggle("active");
		},
		quit: function() {
			window.removeEventListener("deviceorientation", tri.gyroMove);
			window.removeEventListener("mousemove", tri.mouseMove);
			window.removeEventListener("scroll", tri.updateOrigin);
			window.addEventListener("resize", tri.updateOrigin);
			tri.menu.remove();
			tri.cssStatic.remove();
			tri.cssDynamic.remove();
			document.body.removeAttribute("style");
			v = 0;
			z = 0;
			n = 100000;
		},
      change: function() {
        bgmusic.src = prompt("Song,\n example: site.com/song.mp3.\n If the song isn't looped it will just replay,\nthe default song is the Blue Danube Waltz, but it can be changed to whatever you want.\n\n The preset url contains other songs as well, just change the name before the .mp3\n Currently available songs from that url are Nyan, Bad, California Love, Going Up The Country (Remaster 2005), Frolic, Call Me Maybe, and The Blue Danube Waltz.", "https://raw.githubusercontent.com/RandomScriptsThatArePoorlyMade/mp3s/main/The Blue Danube Waltz.mp3");
        bgmusic.play();
      },
		newRange: function(e, label, min, step, max, value, id, f) {
			tri.menu.appendChild(e);
			e.type = "range";
			e.min = min;
			e.max = max;
			e.step = step;
			e.value = value;
            e.id = id;
			e.addEventListener("input", f);
			tri.menu.appendChild(document.createElement("span")).innerHTML = label;
			tri.menu.appendChild(document.createElement("br"));
		},
		newCheckbox: function(e, label, f) {
			tri.menu.appendChild(e);
			e.type = "checkbox";
			e.addEventListener("click", f);
			tri.menu.appendChild(document.createElement("span")).innerHTML = label;
			tri.menu.appendChild(document.createElement("br"));
		},
		newButton: function(e, label, f) {
			tri.menu.appendChild(e);
			e.type = "button";
			e.value = label;
			e.addEventListener("click", f);
		},
		init: function() {
			document.body.parentNode.appendChild(tri.menu).id = "tri-menu";
			tri.newRange(tri.limit, "limit", 0, 0.03125, 1, 0, "limiti", tri.updateBody);
			tri.newRange(tri.gap, "gap / distance", 0, 32, 512, 0, "gapi", function() {
				tri.updateCSS();
				tri.updateBody();
			});
			tri.newRange(tri.sag, "sag", -0.25, 0.03125, 0.25, -0.25, "sagi", tri.updateCSS);
			tri.newRange(tri.fov, "field of view", 7, 1, 13, 7, "fovi", tri.updateBody);
            tri.newRange(tri.vol, "volume", 0, 0.001, 1, 0.09, "volumei", tri.updateVolume);
			tri.newRange(tri.int, "Intensity", 0, 0.01, 10, 0, "inti", tri.updateIntensity);
			tri.newRange(tri.int2, "Alt Intensity", 0, 0.01, 10, 0, "int2i", tri.updateIntensity2);
			tri.newRange(tri.spd, "Speed", 0, 0.1, 4999.9, 4000, "spdi", tri.updateSpeed);
			tri.newCheckbox(tri.flo, "force overflow", tri.updateCSS);
			tri.flo.setAttribute("checked", "");
			tri.newCheckbox(tri.off, "flatten layers", tri.updateCSS);
            tri.off.setAttribute("checked", "");
			tri.newCheckbox(tri.non, "flatten everything", tri.updateCSS);
            tri.non.setAttribute("checked", "");
			tri.newButton(tri.end, "Quit", tri.quit);
			tri.newButton(tri.tgl, "≡", tri.toggle);
            tri.newButton(tri.chg, "Change Song", tri.change);
			tri.tgl.id = "tri-toggle";
			tri.menu.appendChild(tri.cssStatic).innerHTML = `
html, body {
	transition-property: none;
	height: 100%;
	width: 100%;
}
html, html:hover, #tri-menu, #tri-menu > *, #tri-menu > *:hover {
	transform: none;
	outline: none;
	overflow: auto !important;
	float: none;
}
#tri-menu {
	position: fixed;
	top: 0;
	left: 0;
	background: rgba(0, 0, 0, 0.5);
	color: white;
	border: 1px solid rgba(255, 255, 255, 0.5);;
	border-radius: 0 0 16px 0;
	padding: 8px;
	transform: translate(-100%, -100%) translate(32px, 32px);
}
#tri-menu.active {
	transform: none;
}
#tri-toggle {
	position: absolute;
	bottom: 0;
	right: 0;
	height: 32px;
	width: 32px;
	background: transparent;
	color: white;
	border: none;
	cursor: pointer;
}
#tri-menu.active > #tri-toggle {
	background: white;
	color: black;
	border-radius: 8px 0 0 0;
}
`;
			tri.menu.appendChild(tri.cssDynamic);
			tri.updateCSS();
			window.addEventListener("deviceorientation", tri.gyroMove);
			window.addEventListener("mousemove", tri.mouseMove);
			window.addEventListener("scroll", tri.updateOrigin);
			window.addEventListener("resize", tri.updateOrigin);
			window.scrollBy(0, 1);
		}
	};
	tri.init();
function reset() {
	var val = 0
document.getElementById("inti").value = val;
	v = val;
document.getElementById("int2i").value = val;
	z = val;
document.getElementById("spdi").value = val;
	n = 5000;
}
	document.addEventListener("keydown", function(event) {
        switch (event.keyCode) {
            case 82:
                reset();
                break;
		}
	});
})();
