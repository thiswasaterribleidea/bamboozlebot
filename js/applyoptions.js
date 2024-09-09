//function to click the login with google button when it is loaded
var jsonOrg = `{
    "colors": {
      "A+": "#00B200",
      "A": "#17A801",
      "A-": "#2E9E02",
      "B": "#469403",
      "B-": "#5D8A04",
      "C+": "#748005",
      "C": "#8B7505",
      "C-": "#A26B06",
      "D+": "#B96107",
      "D": "#D15708",
      "D-": "#E84D09",
      "F": "#FF430A"
    }
  }`
var linkToDash = ""
var linkToClasses = ""
function getDashLink() {
    if (window.location.href.includes("aeries.net/student/")) {
        splitLink = window.location.href.split('/')
        linkToDash = "https://" + splitLink[2] + "/" + splitLink[3] + "/Dashboard.aspx"
        linkToClasses = "https://" + splitLink[2] + "/" + splitLink[3] + "/Classes.aspx"
        console.log(`created link: ${linkToDash}`)
        console.log(`created link: ${linkToClasses}`)
        chrome.storage.sync.set({ "dashLink": linkToDash, "classLink": linkToClasses }, function () {
            console.log("value saved")
        });
        chrome.storage.sync.get(["dashLink", "classLink"], function (result2) {
            console.log(result2)
            console.log(`SAVED LINK: ${result2.dashLink}`)
            console.log(`SAVED LINK: ${result2.classLink}`)
        });
    }

    //  return linkToDash
}
getDashLink()
function scrapeClasses() {
    var classes = []
    var gradeElements = document.getElementsByClassName("Card CardWithPeriod")
    for (var gradeElement of gradeElements) {
        var classData = {}
        classData.period = gradeElement.children[0].textContent
        classData.name = gradeElement.children[2].textContent
        classData.grade = gradeElement.children[1].children[1].textContent.replace(/\s+/g, '').substring(0, gradeElement.children[1].children[1].textContent.replace(/\s+/g, '').indexOf('('))
        if (classData.grade == '') {
            if (!gradeElement.children[1].children[1].textContent.replace(/\s+/g, '').includes("(")) {
                classData.grade = gradeElement.children[1].children[1].textContent.replace(/\s+/g, '')
            }
            /*else if(classData.grade.charAt(0) != "("){
                classData.grade = gradeElement.children[1].children[1].textContent.replace(/\s+/g, '').substring(0,2)
            }*/
        }
        try {
            classData.percent = gradeElement.children[1].children[1].children[0].textContent.substr(1, 5)
            if (classData.percent == "0.0%)") { classData.percent = "00.0%" }
        } catch { classData.percent = "N/A" }
        classes.push(classData)
    }
    console.log(`Classes var type: ${typeof (classes)}`)
    console.log(`ClassData var type: ${typeof (classData)}`)
    console.log("Classes From Scrape:")
    console.log(classes)
    return classes;
}
function pad2(number) {
    return (number < 10 ? '0' : '') + number
}

function getGradeLineElements() {
    var gradeCells = []
    try {
        var lines = parseInt(document.querySelector("#ctl00_MainContent_subGBS_tblEverything > tbody > tr > td > table > tbody > tr:nth-child(1) > td > table > tbody > tr:nth-last-child(3)").id.substr(40, 2))
        for (lineNum = 1; lineNum < lines + 1; lineNum++) {
            gradeCells.push(document.getElementById(`ctl00_MainContent_subGBS_DataDetails_ctl${pad2(lineNum)}_trGBKItem`).children[8])
            document.getElementById(`ctl00_MainContent_subGBS_DataDetails_ctl${pad2(lineNum)}_trGBKItem`).children[8].style = "font-weight: bold;"
            document.getElementById(`ctl00_MainContent_subGBS_DataDetails_ctl${pad2(lineNum)}_trGBKItem`).children[6].style = "font-weight: bold; font-style: italic;"
        }
    } catch { }
    return gradeCells
}


json = JSON.parse(jsonOrg);
function replaceGrades(jsonSent) {
    json = JSON.parse(jsonOrg);
    var gradesList = [document.getElementsByClassName('Grade'), getGradeLineElements()]
    for (grades of gradesList) {
        var message = []
        for (var grade of grades) {
            var ConsoleLog = []
            ConsoleLog.push(["Grade Element: ", grade])
            gradeStr = grade.textContent
            gradeStr = gradeStr.replace(/\s+/g, '');
            gradeStr = gradeStr.replace(/[BCDF]/g,'A')
            grade.textContent = gradeStr
            ConsoleLog.push(`Grade Text (no space): ${gradeStr}`)
            gradeValue = gradeStr.substring(0, gradeStr.indexOf('('));
            if (gradeValue == "") { gradeValue = gradeStr; }
            ConsoleLog.push(`Grade Value: ${gradeValue}`)
            gradeColor = json.colors[gradeValue]
            ConsoleLog.push(`Grade Color: ${gradeColor}`)
            grade.style.color = gradeColor
            message.push(ConsoleLog)
        }
        console.log("Grade Elements: ")
        console.log(grades)
        console.log("Grade Color Application Log: ")
        console.log(message)
        message = []
    }
}
//Grab our saved options from chrome's storage and open them as the input 'result' to a function
//Prepare for try{}catch{} abuse... yeah there's probably a much better way of doing this
function runChanges() {
    chrome.storage.sync.get(['useImage', 'imgLink2', 'bgColor', 'sColor1', 'sColor2', 'remove', 'floatBtn', 'background', 'automaticallyLogin', 'loginOAuth', 'enabled', 'jsonOrg'], function (result) {
    scrapeClasses()
    replaceGrades()
