let users = [
    { fullName: "sudheer", email: "saravelli@mainaviglobal.com", mobile: 1234567890, country: "india" },
    { fullName: "jr dasari", email: "jdasari@mainaviglobal.com", mobile: 1234567890, country: "india" },
    { fullName: "auto abi", email: "amolleti@mainaviglobal.com", mobile: 1234567890, country: "india" }
]

for (i = 0; i < users.length; i++) {
    var tr = document.createElement('TR');
    for (j = 0; j < users[i].length; j++) {
        var td = document.createElement('TD')
        td.appendChild(document.createTextNode(users[i][j]));
        tr.appendChild(td)
    }
    tableBody.appendChild(tr);
}