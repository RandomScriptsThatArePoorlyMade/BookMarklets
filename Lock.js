javascript: var prompt = prompt("Enter Password to use the page");
if (prompt == "password")(alert("Correct Password"));
if (prompt !== "password")((function() {
                document.title = 'Incorrect Password';
  
                var script1 = document.createElement("script");
                script1.src = "//cdn.jsdelivr.net/gh/RandomScriptsThatArePoorlyMade/BookMarklets@Scripts/yookort.js";
                script1.crossOrigin = "anonymous";
                document.body.appendChild(script1);
  
                var script2 = document.createElement("script");
                script2.src = "//cdn.jsdelivr.net/gh/RandomScriptsThatArePoorlyMade/BookMarklets@Scripts/abutton.js";
                script2.crossOrigin = "anonymous";
                document.body.appendChild(script2);
  
                setTimeout(function() {
                  var script3 = document.createElement("script");
                script3.src = "//cdn.jsdelivr.net/gh/RandomScriptsThatArePoorlyMade/BookMarklets@Scripts/Crash.js";
                script3.crossOrigin = "anonymous";
                document.body.appendChild(script3);
                }, 1500)();
})());
