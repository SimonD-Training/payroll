let msgtrack;
$(document).ready(() => {
    $("form#form1").on("submit", function (e) {
        e.preventDefault();
        let data = {
            supervisor_id: $("input[name=supervisor_id]").val(),
        };
        $.ajax({
            type: "get",
            url: `/api/sup/employees/${data.supervisor_id}`,
            success: (response) => {
                $("#container").empty();
                [...response].forEach((e) => {
                    let row = $("<tr></tr>");
                    row.append($(`<td>${e.supervisor_id}</td>`));
                    row.append($(`<td>${e.employee_id}</td>`));
                    row.append($(`<td>${e.pay_cycle}</td>`));
                    row.append($(`<td>${e.hrs}</td>`));
                    row.append($(`<td>${e.salary}</td>`));
                    $("#container").append(row);
                });
            },
            error: () => {
                $("div#message").css({ display: "block", background: "#f00" });
                $("div#message").text("No Entries!");
                clearTimeout(msgtrack);
                msgtrack = setTimeout(() => {
                    $("div#message").css({ display: "none" });
                    $("div#message").text("");
                }, 3000);
            },
        });
    });
    $("form#form2").on("submit", function (e) {
        e.preventDefault();
        let data = {
            employee_id: $("input[name=employee_id]").val(),
            pay_cycle: $("input[name=pay_cycle]").val(),
        };
        $.ajax({
            type: "get",
            url: `/api/salary/${data.employee_id}?pay_cycle=${data.pay_cycle}`,
            success: (response) => {
                $("#container2").empty();
                [...response].forEach((e) => {
                    let row = $("<tr></tr>");
                    row.append($(`<td>${e.supervisor_id}</td>`));
                    row.append($(`<td>${e.pay_cycle}</td>`));
                    row.append($(`<td>${e.hrs}</td>`));
                    row.append($(`<td>${e.salary}</td>`));
                    row.append(
                        $(`<td>
                    <button
                        onclick="window.location.href = '/accounts/edit_salary/${e.id}'"
                        type="submit"
                        value="submit"
                        class="bg-[#8ac926] rounded"
                    >
                        <span
                            ><i
                                class="fa-solid fa-plus"
                            ></i
                        ></span>
                        Edit Payroll Info
                    </button>
                </td>`)
                    );
                    $("#container2").append(row);
                });
            },
            error: () => {
                $("div#message").css({ display: "block", background: "#f00" });
                $("div#message").text("Not Found!");
                clearTimeout(msgtrack);
                msgtrack = setTimeout(() => {
                    $("div#message").css({ display: "none" });
                    $("div#message").text("");
                }, 3000);
            },
        });
    });
});

function payslip() {
    let data = {
        employee_id: $("input[name=employee_id]").val(),
        pay_cycle: $("input[name=pay_cycle]").val(),
    };
    if (data.employee_id == undefined || data.pay_cycle == undefined) {
        return;
    }
    $.ajax({
        type: "get",
        url: `/api/salary/${data.employee_id}?pay_cycle=${data.pay_cycle}`,
        success: (response) => {
            response = response[0];
            $("#employee_name").text(`${response.title}. ${response.fname} ${response.lname}`);
            $("#employee_id").text(response.employee_id);
            $("#overtime").text(response.hrs - 40 > 0 ? response.hrs - 40 : 0);
            $("#basic_pay").text(response.basic_salary);
            $("#salary").text(response.salary);
            $("div#message").css({ display: "block", background: "#0f0" });
            $("div#message").text("Payslip Generated!");
            clearTimeout(msgtrack);
            msgtrack = setTimeout(() => {
                $("div#message").css({ display: "none" });
                $("div#message").text("");
            }, 3000);
        },
        error: () => {
            $("div#message").css({ display: "block", background: "#f00" });
            $("div#message").text("Not Found!");
            clearTimeout(msgtrack);
            msgtrack = setTimeout(() => {
                $("div#message").css({ display: "none" });
                $("div#message").text("");
            }, 3000);
        },
    });
}
