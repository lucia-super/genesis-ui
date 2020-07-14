document.write("<script language=javascript src='server/request.js'></script>");
window.addEventListener('load', function () {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.getElementsByClassName('needs-validation');
    // Loop over them and prevent submission
    var validation = Array.prototype.filter.call(forms, function (form) {
        form.addEventListener('submit', function (event) {
            if (form.checkValidity() === false) {
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add('was-validated');
        }, false);
    });
}, false);

$.ajaxSetup({
    header: { "Content-Type": "application/json;charset=UTF-8" },
    beforeSend: function (request) {
        request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    },
});

$(document).ready(function () {
    getModulesData();
    $.fn.serializeJson = function () {
        var serializeObj = {};
        var array = this.serializeArray();
        var str = this.serialize();
        $(array).each(
            function () {
                if (serializeObj[this.name]) {
                    if ($.isArray(serializeObj[this.name])) {
                        serializeObj[this.name].push(this.value);
                    } else {
                        serializeObj[this.name] = [
                            serializeObj[this.name], this.value];
                    }
                } else {
                    serializeObj[this.name] = this.value;
                }
            });
        return serializeObj;
    };
});

function addNewsModule() {
    const formElement = document.getElementById("newData");

    if (formElement.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
    }
    formElement.classList.add('was-validated');
    if ($(".form-control:invalid").length === 0) {
        //$("#fieldsTable>tbody>tr")
        const allFileds = $("#fieldsTable>tbody")[0].children;
        const fields = [];
        for (let i = 0; i < allFileds.length; i++) {
            const item = allFileds[i];
            fields.push({
                key: $(item).find("td:first").text(),
                name: $(item).find("td:last").text()
            })
        }

        const newItem = {
            "name": formElement.moduleID.value,
            "title": formElement.moduleName.value,
            "update": false,
            "apis": {
                "list": formElement.list.value,
                "detail": formElement.detail.value,
                "edit": formElement.edit.value,
                "delete": formElement.delete.value,
            },
            fields: fields
        }
        this.data.push(newItem);
        // update data
        updateModulesData(this.data, (responseData) => {
            this.data = responseData;
            renderAllNodes(this.data);
        })
    } else {
        alert("please check fields")
    }
}

function renderAllNodes(data) {
    let allNodes = "";
    data.forEach(element => {
        allNodes += `<tr class="pure-table-odd">
                        <td>${element.name}</td>
                        <td>${element.title}</td>
                    </tr>`
    });
    $("#modulesTable>tbody").html(allNodes);
}

function recommendApis() {
    const formElement = document.getElementById("newData");
    const name = formElement.moduleID.value;

    formElement.list.value = name + "/list";
    formElement.detail.value = name + "/detail";
    formElement.edit.value = name + "/detail";
    formElement.delete.value = name;
}

function deleteModule() {
    document.getElementById("modulesTable").deleteRow(3);
}

function addNewsFields() {
    const addFieldsForm = $("#addFieldsForm");
    if (addFieldsForm.hasClass("visible")) {

        // const formElement = document.getElementById("addFieldsForm");
        // if (formElement.checkValidity() === false) {
        //     event.preventDefault();
        //     event.stopPropagation();
        // }
        // formElement.classList.add('was-validated');
        // if ($(".form-control:invalid").length === 0) {
        const addObj = addFieldsForm.serializeJson();
        $("#fieldsTable>tbody").append(`<tr class="pure-table-odd"><td>${addObj.Key}</td><td>${addObj.Name}</td></tr>`);
        addFieldsForm.removeClass("visible");
        addFieldsForm.addClass("invisible");
        // } else {
        //     alert("please check fields")
        // }
    } else {
        addFieldsForm.addClass("visible");
        addFieldsForm.removeClass("invisible");
    }
}
