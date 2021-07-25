var settingsElement = `
<div id="simplifyMenu" style='display: unset;'>
    <div id='simplify-body'>
        <div class="simplify-title">
            Simplify Aeries Settings
            <div class="widget-options pull-right">
                <span class="icon-expanded widget-collapse" title="Click to collapse"></span>
            </div>
        </div>
        <div id='simplify-parent'>
            <div class='section'>Login</div>
            <div class='section-lower'>
                <div class='lower-part'>
                    <div class='divider checkbox'><input type="checkbox" id="hide-district"></div>
                    <div class='divider'>Hide District Name on Login Page?</div>
                </div>
                <div class='lower-part auto-login login-check'>
                    <div class='divider checkbox'><input type="checkbox" id="auto-login"></div>
                    <div class='divider'>Automatically Login In? (Google/OAuth)</div>
                </div>
                <div class='lower-part auto-login login-email'>
                    <div class='divider'><input id="email-login" placeholder="your.email@provider.com"></div>
                </div>
                <div class='lower-part'>
                    <div class='divider color' id='login-color'><input type="color" id="login-color-picker" value="#ADD8E6"></div>
                    <div class='divider'>Login Background</div>
                </div>
            </div>
            <div class='section'>Dashboard</div>
            <div class='section-lower bg-hide' id='bg-section'>
                <div class='lower-part sidebar-colors'>
                    <div id='sidebar1' class='divider sidebar-color sidebar-1'><input value='#2e8eab' type='color'></div>
                    <div class='divider sidebar-gradient'><span>Sidebar Colors</span></div>
                    <div id='sidebar2' class='divider sidebar-color sidebar-2'><input value='#113e75' type='color'></div>
                </div>
                <div class='lower-part bg-show bg-image box' id='bg-part'>
                    <div class='divider checkbox'><input type='checkbox' id='bg-box' onClick="if(document.getElementById('bg-box').checked){document.getElementById('bg-section').className=document.getElementById('bg-section').className.replace('bg-hide','bg-show')}else{document.getElementById('bg-section').className=document.getElementById('bg-section').className.replace('bg-show','bg-hide')}">
                    </div>
                    <div class='divider'>Use Background Image? (URL)</div>
                </div>
                <div class='lower-part bg-image image'>
                    <img src='https://via.placeholder.com/1920x1080' id='bg-img-preview'>
                </div>
                <div class='lower-part bg-image url' id="url-parent">
                    <input type='url' id='bg-url' placeholder='path.to/your.img'>
                </div>
                <div class='lower-part dash-bg'>
                    <div class='divider color' id='dash-color'><input type="color" id="dash-color-picker" value="#ADD8E6"></div>
                    <div class='divider'>Dashboard Background</div>
                </div>
            </div>
            <div class='section'>Features</div>
            <div class='section-lower'>
                <div class='lower-part'>
                </div>
            </div>
        </div>
    </div>
</div>`








if (window.location.href.includes("aeries.net/student") && !window.location.href.includes("Login")) {
    document.head.innerHTML += `<style>@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300&display=swap');</style>`


    document.getElementById("nav-account-dropdown").innerHTML += `<li class="zebra"><a id="aSimplifyAeries" css="ContextMenuItem">Simplify Aeries</a></li>`

    //load from cache
    setTimeout(function () {
        document.getElementById('aSimplifyAeries').addEventListener("click", function () {
            document.querySelector("#nav-account-dropdown").className = document.querySelector("#nav-account-dropdown").className.replace(" show", "")
            document.body.innerHTML += settingsElement
            console.log(`showing menu`)
            setTimeout(function () {
                document.getElementById("simplifyMenu").className = "blurred"
            }, 100)
            setTimeout(function () {

                //setup minimize icon
                document.getElementsByClassName("widget-collapse")[document.getElementsByClassName("widget-collapse").length - 1].addEventListener("click", function () {
                    iconElement = document.getElementsByClassName("widget-collapse")[document.getElementsByClassName("widget-collapse").length - 1]
                    if (document.getElementById('simplify-body').className.includes('collapsed')) {
                        document.getElementById('simplify-body').className = 'expanded'
                        iconElement.className = iconElement.className.replace("collapsed", "expanded")
                    } else {
                        document.getElementById('simplify-body').className = 'collapsed'
                        iconElement.className = iconElement.className.replace("expanded", "close")
                        iconElement.title = "Click to close"
                        iconElement.addEventListener("click", function () {
                            document.getElementById("simplifyMenu").remove()
                            window.location.reload()
                        })
                    }
                });


                //load previous settings to UI
                if (localStorage["Simplify-Background"].includes("url(")) {
                    document.querySelector("#bg-box").click()
                    document.getElementById("bg-url").value = localStorage["Simplify-Background"].split('url(https://')[1].split(')')[0]
                    try {
                        function imageExists(e, r) { var t = new Image; t.onload = function () { r(!0) }, t.onerror = function () { r(!1) }, t.src = e } var imageUrl = 'https://' + document.getElementById('bg-url').value.split("//")[document.getElementById('bg-url').value.split("//").length - 1];
                        imageExists(imageUrl, (function (e) {
                            e && (document.getElementById('url-parent').className = 'lower-part bg-image url good-url', console.log('good-url')), e || (document.getElementById('url-parent').className = 'lower-part bg-image url')
                            if (e) {
                                document.getElementById("bg-img-preview").src = imageUrl
                                document.getElementById("AeriesFullPageContent").style = `background: url(${imageUrl}) !important; background-size: cover !important; background-position-x: center !important;`
                                localStorage["Simplify-Background"] = `background: url(${imageUrl}) !important; background-size: cover !important; background-position-x: center !important;`
                            }
                        }));
                    } catch { }
                } else {
                    document.getElementById("dash-color-picker").value = localStorage["Simplify-Background"].split('background: ')[1].replace(' !important;', '')
                }

                color1 = localStorage["Simplify-Sidebar"].substring(49, 56)
                color2 = localStorage["Simplify-Sidebar"].substring(58, 65)
                document.getElementById("sidebar1").children[0].value = color1
                document.getElementById("sidebar2").children[0].value = color2
                document.getElementsByClassName("sidebar-gradient")[0].style.background = `linear-gradient(90deg, ${color1}, ${color2})`

                document.getElementById("bg-url").addEventListener('input', function () {
                    try {
                        function imageExists(e, r) { var t = new Image; t.onload = function () { r(!0) }, t.onerror = function () { r(!1) }, t.src = e } var imageUrl = 'https://' + document.getElementById('bg-url').value.split("//")[document.getElementById('bg-url').value.split("//").length - 1];
                        imageExists(imageUrl, (function (e) {
                            e && (document.getElementById('url-parent').className = 'lower-part bg-image url good-url', console.log('good-url')), e || (document.getElementById('url-parent').className = 'lower-part bg-image url')
                            if (e) {
                                document.getElementById("bg-img-preview").src = imageUrl
                                document.getElementById("AeriesFullPageContent").style = `background: url(${imageUrl}) !important; background-size: cover !important; background-position-x: center !important;`
                                localStorage["Simplify-Background"] = `background: url(${imageUrl}) !important; background-size: cover !important; background-position-x: center !important;`
                            }
                        }));
                    } catch { }
                    document.getElementById("bg-url").value = document.getElementById('bg-url').value.split("//")[document.getElementById('bg-url').value.split("//").length - 1]
                });
                document.getElementById("bg-box").addEventListener('change', function () {
                    element = document.getElementById("bg-box")
                    checked = element.checked
                    if (!checked) {
                        color = document.getElementById("dash-color-picker").value
                        document.getElementById("AeriesFullPageContent").style = `background: ${color} !important;`;
                        localStorage["Simplify-Background"] = `background: ${color} !important;`;
                    } else {
                        function imageExists(e, r) { var t = new Image; t.onload = function () { r(!0) }, t.onerror = function () { r(!1) }, t.src = e } var imageUrl = 'https://' + document.getElementById('bg-url').value.split("//")[document.getElementById('bg-url').value.split("//").length - 1];
                        imageExists(imageUrl, (function (e) {
                            e && (document.getElementById('url-parent').className = 'lower-part bg-image url good-url', console.log('good-url')), e || (document.getElementById('url-parent').className = 'lower-part bg-image url')
                            if (e) {
                                document.getElementById("bg-img-preview").src = imageUrl
                                localStorage["Simplify-Background"] = `background: url(${imageUrl}) !important; background-size: cover !important; background-position-x: center !important;`
                                document.getElementById("AeriesFullPageContent").style = `background: url(${imageUrl}) !important; background-size: cover !important; background-position-x: center !important;`
                            }
                        }));
                        document.getElementById("bg-url").value = document.getElementById('bg-url').value.split("//")[document.getElementById('bg-url').value.split("//").length - 1]
                    }
                });
                document.getElementById("sidebar1").addEventListener('input', function () {
                    color1 = document.getElementById("sidebar1").children[0].value
                    color2 = document.getElementById("sidebar2").children[0].value
                    document.getElementsByClassName("sidebar-gradient")[0].style.background = `linear-gradient(90deg, ${color1}, ${color2})`
                    document.getElementById("AeriesFullPageNav").style = `background: radial-gradient(58.5rem at 50% 5rem, ${color1}, ${color2})!important;`
                    document.querySelector("#AeriesTextLogo").style = `background: ${color2} !important;`
                    localStorage["Simplify-Sidebar"] = `background: radial-gradient(58.5rem at 50% 5rem, ${color1}, ${color2})!important;`
                    //add to storage
                    resetTimer()
                });
                document.getElementById("sidebar2").addEventListener('input', function () {
                    color1 = document.getElementById("sidebar1").children[0].value
                    color2 = document.getElementById("sidebar2").children[0].value
                    document.getElementsByClassName("sidebar-gradient")[0].style.background = `linear-gradient(90deg, ${color1}, ${color2})`
                    document.getElementById("AeriesFullPageNav").style = `background: radial-gradient(58.5rem at 50% 5rem, ${color1}, ${color2})!important;`
                    document.querySelector("#AeriesTextLogo").style = `background: ${color2} !important;`
                    localStorage["Simplify-Sidebar"] = `background: radial-gradient(58.5rem at 50% 5rem, ${color1}, ${color2})!important;`
                    //add to storage
                    resetTimer()
                });
                var timeoutID;
                function startTimer() {
                    timeoutID = window.setTimeout(closePreview, 3000);
                }

                function resetTimer(e) {
                    window.clearTimeout(timeoutID);
                }

                function closePreview() {
                    document.getElementById("simplifyMenu").className = document.getElementById("simplifyMenu").className.replace(" sidebar-edit", "")
                    tog1 = true
                    tog2 = true
                }


                tog1 = true
                tog2 = true

                document.getElementById("sidebar1").children[0].addEventListener('focus', function () {
                    if (tog1 === true) {
                        document.getElementById("simplifyMenu").className += " sidebar-edit"
                        startTimer()
                    } else {
                        document.getElementById("simplifyMenu").className = document.getElementById("simplifyMenu").className.replace(" sidebar-edit", "")
                    }
                });
                document.getElementById("sidebar1").children[0].addEventListener('blur', function () {
                    tog1 = !tog1;
                    if (tog1 === true) {
                        tog1 = false;
                        document.getElementById("simplifyMenu").className += " sidebar-edit"
                        startTimer()
                    } else {
                        document.getElementById("simplifyMenu").className = document.getElementById("simplifyMenu").className.replace(" sidebar-edit", "")
                    }
                });
                document.getElementById("sidebar2").children[0].addEventListener('focus', function () {
                    if (tog2 === true) {
                        document.getElementById("simplifyMenu").className += " sidebar-edit"
                        startTimer()
                    } else {
                        document.getElementById("simplifyMenu").className = document.getElementById("simplifyMenu").className.replace(" sidebar-edit", "")
                    }
                });
                document.getElementById("sidebar2").children[0].addEventListener('blur', function () {
                    tog2 = !tog2;
                    if (tog2 === true) {
                        tog2 = false;
                        document.getElementById("simplifyMenu").className += " sidebar-edit"
                        startTimer()
                    } else {
                        document.getElementById("simplifyMenu").className = document.getElementById("simplifyMenu").className.replace(" sidebar-edit", "")
                    }
                });


                document.getElementById("dash-color-picker").addEventListener('input', function () {
                    color = document.getElementById("dash-color-picker").value
                    document.getElementById("AeriesFullPageContent").style = `background: ${color} !important;`
                    localStorage["Simplify-Background"] = `background: ${color} !important;`
                });
                document.getElementById("login-color-picker").addEventListener('input', function () {
                    color = document.getElementById("login-color-picker").value
                    localStorage["Simplify-Login-Color"] = `background: ${color}!important`
                    //add to storage
                });

            }, 300)
        })
        if (localStorage["Simplify-Background"] === undefined) {
            localStorage["Simplify-Background"] = `background: lightblue !important;`;
        }
        if (localStorage["Simplify-Sidebar"] === undefined) {
            localStorage["Simplify-Sidebar"] = `background: radial-gradient(58.5rem at 50% 5rem, #2e8eab, #113e75)!important;`;
        }
        if (localStorage["Simplify-Hide-District"] === undefined) {
            localStorage["Simplify-Hide-District"] = true
        }
        if (localStorage["Simplify-Auto-Login"] === undefined) {
            localStorage["Simplify-Auto-Login"] = false;
        }
        document.getElementById("AeriesFullPageContent").style = localStorage["Simplify-Background"]
        document.getElementById("AeriesFullPageNav").style = localStorage["Simplify-Sidebar"]
        document.querySelector("#AeriesTextLogo").style = `background: ${localStorage["Simplify-Sidebar"].substring(58, 65)} !important;`
    }, 200)



} else if (window.location.href.includes('student/Login')) {
    //set defaults
    if (localStorage["Simplify-Sidebar"] === undefined) {
        localStorage["Simplify-Sidebar"] = `background: radial-gradient(58.5rem at 50% 5rem, #2e8eab, #113e75)!important;`;
    }
    if (localStorage["Simplify-Login-Color"] === undefined) {
        localStorage["Simplify-Login-Color"] = `background: lightblue !important`
    }
    if (localStorage["Simplify-Hide-District"] === undefined) {
        localStorage["Simplify-Hide-District"] = true
    }
    if (localStorage["Simplify-Auto-Login"] === undefined) {
        localStorage["Simplify-Auto-Login"] = false;
    }

    //login sequence:
    if (localStorage["Simplify-Auto-Login"] != "false") {
        console.log("Auto Logging in...")
    }
    //end login



    if (JSON.parse(localStorage["Simplify-Hide-District"])) { districtVis = "hidden" } else { districtVis = "visible" }
    setTimeout(function () {
        document.getElementById("district").style.visibility = districtVis
        document.styleSheets[0].insertRule(`
        @font-face {
            font-family: 'aeries_sanssemibold';
            src: url('https://mvla.asp.aeries.net/student/StyleSheets/fonts/Aeries/aeriessans-semibold-webfont.woff2') format('woff2'), url('https://mvla.asp.aeries.net/student/StyleSheets/fonts/Aeries/aeriessans-semibold-webfont.woff') format('woff');
            font-weight: normal;
            font-style: normal;
        }`)
    }, 300)
    document.body.style = localStorage["Simplify-Login-Color"]
    document.head.innerHTML += `
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300&display=swap') 
      </style>`

    0
    setTimeout(function () {
        document.querySelector("#login-block > div.login-box.clearfix > div.language-wrapper > p").innerHTML += `<a id="simplify-settings" title="Open Simplify Aeries Settings" style="padding-left: 10px;font-size:20pt !important;line-height: 10px !important;position: absolute;top: 50%;transform: translateY(-50%);cursor: pointer;text-decoration: none !important;user-select: none;">&#9881;</a>`
        document.querySelector("#simplify-settings").addEventListener("click", function () {
            document.body.innerHTML += settingsElement
            setTimeout(function () {

                //load values
                //load previous settings to UI
                if (localStorage["Simplify-Background"].includes("url(")) {
                    document.querySelector("#bg-box").click()
                    document.getElementById("bg-url").value = localStorage["Simplify-Background"].split('url(https://')[1].split(')')[0]
                    try {
                        function imageExists(e, r) { var t = new Image; t.onload = function () { r(!0) }, t.onerror = function () { r(!1) }, t.src = e } var imageUrl = 'https://' + document.getElementById('bg-url').value.split("//")[document.getElementById('bg-url').value.split("//").length - 1];
                        imageExists(imageUrl, (function (e) {
                            e && (document.getElementById('url-parent').className = 'lower-part bg-image url good-url', console.log('good-url')), e || (document.getElementById('url-parent').className = 'lower-part bg-image url')
                            if (e) {
                                document.getElementById("bg-img-preview").src = imageUrl
                                localStorage["Simplify-Background"] = `background: url(${imageUrl}) !important; background-size: cover !important; background-position-x: center !important;`
                            }
                        }));
                    } catch { }
                } else {
                    document.getElementById("dash-color-picker").value = localStorage["Simplify-Background"].split('background: ')[1].replace(' !important;', '')
                }
                if (localStorage["Simplify-Auto-Login"] != "false") {
                    document.getElementById("auto-login").checked = true
                    document.getElementById("email-login").value = localStorage["Simplify-Auto-Login"]
                    document.getElementsByClassName("login-email")[0].className += " good-email"
                    document.querySelector("#simplify-parent > div:nth-child(2) > div.lower-part.auto-login.login-check").className += " enabled"
                }
                color1 = localStorage["Simplify-Sidebar"].substring(49, 56)
                color2 = localStorage["Simplify-Sidebar"].substring(58, 65)
                document.getElementById("sidebar1").children[0].value = color1
                document.getElementById("sidebar2").children[0].value = color2
                document.getElementsByClassName("sidebar-gradient")[0].style.background = `linear-gradient(90deg, ${color1}, ${color2})`

                document.getElementById("hide-district").checked = JSON.parse(localStorage["Simplify-Hide-District"])


                document.getElementById("hide-district").addEventListener("input", function () {
                    element = document.getElementById("hide-district")
                    localStorage["Simplify-Hide-District"] = element.checked
                    if (element.checked) { districtVis = "hidden" } else { districtVis = "visible" }
                    document.getElementById("district").style.visibility = districtVis

                })
                document.getElementById("auto-login").addEventListener("input", function () {
                    element = document.getElementById("auto-login")
                    if (element.checked) {
                        element.parentElement.parentElement.className += " enabled"
                    } else {
                        parent = document.getElementsByClassName("lower-part auto-login login-check")[0]
                        parent.className = parent.className.replace(" enabled", "")
                    }

                })
                document.querySelector("#simplify-body > div.simplify-title > div > span").addEventListener("click", function () {
                    document.querySelector("#simplify-parent").style.display = "none"
                    document.querySelector("#simplify-body").style = "min-height: 0px !important"
                    icon = document.querySelector("#simplify-body > div.simplify-title > div > span")
                    icon.className = document.querySelector("#simplify-body > div.simplify-title > div > span").className.replace('icon-expanded', 'icon-close')
                    icon.title = "Click to close"
                    icon.addEventListener("click", function () {
                        document.getElementById("simplifyMenu").remove()
                        document.querySelector("#simplify-settings").remove()
                        window.location.reload()
                    })
                })

                document.getElementById("bg-url").addEventListener('input', function () {
                    try {
                        function imageExists(e, r) { var t = new Image; t.onload = function () { r(!0) }, t.onerror = function () { r(!1) }, t.src = e } var imageUrl = 'https://' + document.getElementById('bg-url').value.split("//")[document.getElementById('bg-url').value.split("//").length - 1];
                        imageExists(imageUrl, (function (e) {
                            e && (document.getElementById('url-parent').className = 'lower-part bg-image url good-url', console.log('good-url')), e || (document.getElementById('url-parent').className = 'lower-part bg-image url')
                            if (e) {
                                document.getElementById("bg-img-preview").src = imageUrl
                                localStorage["Simplify-Background"] = `background: url(${imageUrl}) !important; background-size: cover !important; background-position-x: center !important;`
                            }
                        }));
                    } catch { }
                    document.getElementById("bg-url").value = document.getElementById('bg-url').value.split("//")[document.getElementById('bg-url').value.split("//").length - 1]
                });
                document.getElementById("bg-box").addEventListener('change', function () {
                    element = document.getElementById("bg-box")
                    checked = element.checked
                    if (!checked) {
                        color = document.getElementById("dash-color-picker").value
                        localStorage["Simplify-Background"] = `background: ${color} !important;`;
                    } else {
                        function imageExists(e, r) { var t = new Image; t.onload = function () { r(!0) }, t.onerror = function () { r(!1) }, t.src = e } var imageUrl = 'https://' + document.getElementById('bg-url').value.split("//")[document.getElementById('bg-url').value.split("//").length - 1];
                        imageExists(imageUrl, (function (e) {
                            e && (document.getElementById('url-parent').className = 'lower-part bg-image url good-url', console.log('good-url')), e || (document.getElementById('url-parent').className = 'lower-part bg-image url')
                            if (e) {
                                document.getElementById("bg-img-preview").src = imageUrl
                                localStorage["Simplify-Background"] = `background: url(${imageUrl}) !important; background-size: cover !important; background-position-x: center !important;`
                                document.getElementById("AeriesFullPageContent").style = `background: url(${imageUrl}) !important; background-size: cover !important; background-position-x: center !important;`
                            }
                        }));
                        document.getElementById("bg-url").value = document.getElementById('bg-url').value.split("//")[document.getElementById('bg-url').value.split("//").length - 1]
                    }
                });
                function validateEmail(email) {
                    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    return re.test(String(email).toLowerCase());
                }
                document.getElementById("email-login").addEventListener("input", function () {
                    element = document.getElementById("email-login")
                    if (validateEmail(element.value)) {
                        localStorage["Simplify-Auto-Login"] = element.value
                        document.getElementsByClassName("login-email")[0].className += " good-email"
                    } else {
                        document.getElementsByClassName("login-email")[0].className = document.getElementsByClassName("login-email")[0].className.replace(" good-email", "")
                    }
                })
                document.getElementById("sidebar1").addEventListener('input', function () {
                    localStorage["Simplify-Sidebar"] = `background: radial-gradient(58.5rem at 50% 5rem, ${document.getElementById("sidebar1").children[0].value}, ${document.getElementById("sidebar2").children[0].value})!important;`
                    document.getElementsByClassName("sidebar-gradient")[0].style.background = `linear-gradient(90deg, ${document.getElementById("sidebar1").children[0].value}, ${document.getElementById("sidebar2").children[0].value})`
                });

                document.getElementById("sidebar2").addEventListener('input', function () {
                    localStorage["Simplify-Sidebar"] = `background: radial-gradient(58.5rem at 50% 5rem, ${document.getElementById("sidebar1").children[0].value}, ${document.getElementById("sidebar2").children[0].value})!important;`
                    document.getElementsByClassName("sidebar-gradient")[0].style.background = `linear-gradient(90deg, ${document.getElementById("sidebar1").children[0].value}, ${document.getElementById("sidebar2").children[0].value})`
                });
                document.getElementById("dash-color-picker").addEventListener('input', function () {
                    localStorage["Simplify-Background"] = `background: ${document.getElementById("dash-color-picker").value} !important;`
                });
                document.getElementById("login-color-picker").addEventListener('input', function () {
                    color = document.getElementById("login-color-picker").value
                    document.body.style = `background: ${color}!important`
                    localStorage["Simplify-Login-Color"] = `background: ${color}!important`
                    //add to storage
                });
            }, 200)

        })
    }, 200)

}

