const HOST = "http://localhost:3000";

function getModulesData() {
    $.get(HOST + "/getAllModules", (data) => {
        this.data = typeof (data) === "string" ? JSON.parse(data) : data;
        renderAllNodes(this.data);
    })
}

function updateModulesData(data, callback) {
    $.post(HOST + "/rebuild", JSON.stringify(data), (response) => {
        const responseData = typeof (response) === "string" ? JSON.parse(response) : response;
        callback && callback(responseData)
    }, "json")
}