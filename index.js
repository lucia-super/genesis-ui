// global
document.write("<script language=javascript src='server/request.js'></script>");
$(document).ready(function () {
    $.ajaxSetup({
        header: { "Content-Type": "application/json;charset=UTF-8" },
        beforeSend: function (request) {
            request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        },
    });
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

    var $table = $('#modulesTable')
    var $removeModule = $('#removeModule')
    $table.on('check.bs.table uncheck.bs.table check-all.bs.table uncheck-all.bs.table', function () {
        $removeModule.prop('disabled', !$table.bootstrapTable('getSelections').length)
    })

    $("#fieldsTable").bootstrapTable({ data: [] })
});
// main page
function deleteModule() {
    var $table = $('#modulesTable')
    var names = $.map($table.bootstrapTable('getSelections'), function (row) {
        return row.name
    })
    $table.bootstrapTable('remove', {
        field: 'name',
        values: names
    })
    updateModulesData($table.bootstrapTable('getData'))
}

// add and edit form
function addNewsModule() {
    const formElement = document.getElementById("newData");

    if (formElement.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
    }
    formElement.classList.add('was-validated');
    if ($("#newData .form-control:invalid").length === 0) {
        const fields = $("#fieldsTable").bootstrapTable("getData")
        const needAddData = $("#newData").serializeJson()
        var $table = $('#modulesTable')
        const newItem = {
            "name": needAddData.moduleID,
            "title": needAddData.moduleName,
            "update": false,
            "apis": {
                "list": needAddData.list,
                "detail": needAddData.detail,
                "edit": needAddData.edit,
                "delete": needAddData.delete,
            },
            fields: fields
        }
        const allModules = $table.bootstrapTable('getData')
        allModules.push(newItem)
        updateModulesData(allModules, () => {
            $('#addNewModule').modal('hide')
            $table.bootstrapTable("refresh")
            $("#newData")[0].reset()
            $("#newData").removeAttr("class")
            $("#fieldsTable").bootstrapTable('removeAll')
        })
    } else {
        alert("please check fields")
    }
}



function recommendApis() {
    const formElement = document.getElementById("newData");
    const name = formElement.moduleID.value;

    formElement.list.value = name + "/list";
    formElement.detail.value = name + "/detail";
    formElement.edit.value = name + "/detail";
    formElement.delete.value = name;
}

function addNewsFields() {
    const addFieldsForm = $("#addFieldsForm");
    if (addFieldsForm.attr("hidden")) {
        addFieldsForm.removeAttr("hidden")
    } else {
        const formElement = document.getElementById("addFieldsForm");
        if (formElement.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        formElement.classList.add('was-validated');
        if ($("#addFieldsForm .form-control:invalid").length === 0) {
            addFieldsForm.attr("hidden", "hidden")
            const data = addFieldsForm.serializeJson();
            $("#fieldsTable").bootstrapTable('insertRow', {
                index: 1,
                row: data
            })
            addFieldsForm[0].reset();
            addFieldsForm.removeAttr("class")
        } else {
            alert("please check fields")
        }
    }
}
