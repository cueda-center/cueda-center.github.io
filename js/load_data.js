function parseText(text, nTokensPerRecord, delim = ";") {
    var data = [];
    const lines = text.split("\n");
    for (let i = 0; i < lines.length; i++) {
        const l = lines[i].trim();
        const tokens = l.split(delim);
        if (l.startsWith("#") || tokens.length != nTokensPerRecord) { continue; }
        if (l.startsWith("sep=") || tokens.length != nTokensPerRecord) { continue; }

        let record = [];
        for (let j = 0; j < tokens.length; j++) { record.push(tokens[j].trim()); }
        data.push(record);
    }
    return data;
}

function parseProfessorData(data) {
    var profs = document.getElementById("professors");
    profs.innerHTML = ""

    // const fs = require('fs')
    // four fields: cse id (key), professor name, professor title, note, homepage
    for (let i = 1; i < data.length; i++) {
        // skip first row in the csv
        const record = data[i];
        var div_col = document.createElement("div");
        div_col.classList.add("col")
        var div_card = document.createElement("div");
        div_card.classList.add("card", "h-100");
        var div_img = document.createElement("img");
        div_img.classList.add("card-img-top", "prof-img")
        imgPath = "./img/professors/" + record[0] + ".jpg"
        div_img.src = imgPath
        div_img.alt = "professor"
        div_img.onerror = function () {
            if (this.src != './img/null.jpg') this.src = './img/null.jpg';
        }
        var div_body = document.createElement("div");
        div_body.classList.add("card-body")
        var homepageUrl = record[4]
        if (homepageUrl == "") { homepageUrl = "https://www.cse.cuhk.edu.hk/~" + record[0] + "/" }
        let titleName = "<h5 class=\"card-title\"><a href=\"" + homepageUrl + "\" target=\"_blank\"><b>" + record[1] + "</b></a></h5>"
        let titleInfo = "\n" + "<p class=\"card-text\">" + record[2] + "<br>" + record[3] + "</p>"
        div_body.innerHTML = titleName + titleInfo
        div_card.appendChild(div_img)
        div_card.appendChild(div_body)
        div_col.appendChild(div_card)
        profs.appendChild(div_col);

        // <div class="col">
        //     <div class="card h-100">
        //         <img src="img/professors/Somebody.jpg" class="card-img-top prof-img" alt="professor">
        //         <div class="card-body">
        //             <h5 class="card-title"><a href="https://www.cse.cuhk.edu.hk/~somebody/"
        //                     target=”_blank”><b>Prof. Somebody</b></a></h5>
        //             <p class="card-text">TODO <br> TODO2</p>
        //         </div>
        //     </div>
        // </div>
    }
}

function parseStudentData(data) {
    var stus = document.getElementById("students");
    stus.innerHTML = ""

    // const fs = require('fs')
    // six fields: cse email id (key), student name, student type (PhD/MPhil), year, is alumni (0/1), homepage (url)
    for (let i = 1; i < data.length; i++) {
        // skip first row in the csv
        const record = data[i];
        if (record[4] == 1) { continue; }
        var div_col = document.createElement("div");
        div_col.classList.add("col", "stu-container")
        var div_card = document.createElement("div");
        div_card.classList.add("card", "h-100");
        var div_img = document.createElement("img");
        div_img.classList.add("card-img-top", "stu-img")
        imgPath = "./img/students/" + record[0] + ".jpg"
        div_img.src = imgPath
        div_img.alt = "student"
        div_img.onerror = function () {
            if (this.src != './img/null.jpg') this.src = './img/null.jpg';
        }
        var div_body = document.createElement("div");
        div_body.classList.add("card-body")
        // e.g. for titleText
        // <h5 class="card-title"><a href="xxx.github.io" target="_blank"><b>xxx</b></a></h5>
        // <p class="card-text">PhD Student <br>2025 - Present</p>
        var homepageUrl = record[6]
        let titleName = "<p class=\"card-title student-name\">"
        if (homepageUrl != "") {
            titleName += "<a href=\"" + homepageUrl + "\" target=\"_blank\"><b>" + record[1] + "</b></a></p>"
        } else {
            titleName += "<b>" + record[1] + "</b></p>"
        }
        let titleInfo = "\n" + "<p class=\"card-text\">" + record[2] + "<br>" + record[3] + " - Present</p>"
        div_body.innerHTML = titleName + titleInfo
        div_card.appendChild(div_img)
        div_card.appendChild(div_body)
        div_col.appendChild(div_card)
        stus.appendChild(div_col);
    }
}

function parseAlumniData(data) {
    var stus = document.getElementById("alumni");
    stus.innerHTML = ""

    // const fs = require('fs')
    // six fields: cse email id (key), student name, student type (PhD/MPhil), year, is alumni (0/1), homepage (url)
    for (let i = data.length - 1; i >= 1; i--) {
        // skip first row in the csv
        const record = data[i];
        if (record[4] == 0) { continue; }
        var div_col = document.createElement("div");
        div_col.classList.add("col", "stu-container")
        var div_card = document.createElement("div");
        div_card.classList.add("card", "h-100");
        var div_img = document.createElement("img");
        div_img.classList.add("card-img-top", "stu-img")
        imgPath = "./img/students/" + record[0] + ".jpg"
        div_img.src = imgPath
        div_img.alt = "student"
        div_img.onerror = function () {
            if (this.src != './img/null.jpg') this.src = './img/null.jpg';
        }
        var div_body = document.createElement("div");
        div_body.classList.add("card-body")
        // e.g. for titleText
        // <h5 class="card-title"><a href="xxx.github.io" target="_blank"><b>xxx</b></a></h5>
        // <p class="card-text">PhD Student <br>2025 - Present</p>
        var homepageUrl = record[6]
        let titleName = "<p class=\"card-title student-name\">"
        if (homepageUrl != "") {
            titleName += "<a href=\"" + homepageUrl + "\" target=\"_blank\"><b>" + record[1] + "</b></a></p>"
        } else {
            titleName += "<b>" + record[1] + "</b></p>"
        }
        let titleInfo = ""
        if (record[5] != "") {
            titleInfo += "\n" + record[5]
        }
        div_body.innerHTML = titleName + titleInfo
        // div_card.appendChild(div_img)
        div_card.appendChild(div_body)
        div_col.appendChild(div_card)
        stus.appendChild(div_col);
    }
}

function parseNewsDataShort(data) {
    var tbody = document.getElementById("newsShort");
    tbody.innerHTML = ""
    let rowId = 0
    let maxNumRecentNews = 3
    for (let i = data.length - 1; i >= 1; i--) {
        if (rowId == maxNumRecentNews) break;
        const record = data[i];
        var tr = document.createElement("tr");
        var td1 = document.createElement("td");
        td1.className = "newsTime"
        td1.innerHTML = record[0]
        var td2 = document.createElement("td");
        td2.innerHTML = record[1]
        if (rowId == maxNumRecentNews - 1) {
            tr.className = "last-tr"
        }
        tr.appendChild(td1)
        tr.appendChild(td2)
        tbody.append(tr)
        rowId++;
    }
}

function parseNewsDataAll(data) {
    var tbody = document.getElementById("news");
    let rowId = 0
    let maxNumRecentNews = data.length - 1
    for (let i = data.length - 1; i >= 1; i--) {
        if (rowId == maxNumRecentNews) break;
        const record = data[i];
        var tr = document.createElement("tr");
        var td1 = document.createElement("td");
        td1.className = "newsTime"
        td1.innerHTML = record[0]
        var td2 = document.createElement("td");
        td2.innerHTML = record[1]
        if (rowId == maxNumRecentNews - 1) {
            tr.className = "last-tr"
        }
        tr.appendChild(td1)
        tr.appendChild(td2)
        tbody.append(tr)
        rowId++;
    }
}

function loadProfessor() {
    $.ajax({
        url: "src/professors.csv",
        success: function (text) {
            var data = parseText(text, 5)
            parseProfessorData(data);
        }
    });
}

function loadStudent() {
    $.ajax({
        url: "src/students.csv",
        success: function (text) {
            var data = parseText(text, 7)
            parseStudentData(data);
            parseAlumniData(data);
        }
    });
}

function loadNewsShort() {
    $.ajax({
        url: "src/news.csv",
        success: function (text) {
            var data = parseText(text, 2)
            parseNewsDataShort(data);
        }
    });
}

function loadNewsAll() {
    $.ajax({
        url: "src/news.csv",
        success: function (text) {
            var data = parseText(text, 2)
            parseNewsDataAll(data);
        }
    });
}

function loadAll() {
    loadProfessor()
    loadStudent()
    loadNewsShort()
    loadNewsAll()
}

function loadHome() {
    loadProfessor()
    loadNewsShort()
}

function loadPeople() {
    loadProfessor()
    loadStudent()
}
