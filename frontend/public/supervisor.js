let msgtrack;
$(document).ready(() => {
    $("form#form1").on("submit", function (e) {
        e.preventDefault();
        let data = {
            employee_id: $("input[name=employee_id]").val(),
            title: $("input[name=title]").val(),
            fname: $("input[name=fname]").val(),
            lname: $("input[name=lname]").val(),
            rate: $("input[name=rate]").val(),
        };
        $.ajax({
            type: "post",
            url: "/sup/employee",
            data: data,
            success: () => {
                window.location.reload();
            },
            error: () => {
                $("div#message").css({ display: "block", background: "#f00" });
                $("div#message").text("Action Failed!");
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
            event_type: $("select[name=event_type]").val(),
            hrs: $("input[name=hrs]").val(),
            notes: $("textarea[name=notes]").val(),
        };
        $.ajax({
            type: "post",
            url: "/employee_event",
            data: data,
            success: () => {
                window.location.reload();
            },
            error: () => {
                $("div#message").css({ display: "block", background: "#f00" });
                $("div#message").text("Action Failed!");
                clearTimeout(msgtrack);
                msgtrack = setTimeout(() => {
                    $("div#message").css({ display: "none" });
                    $("div#message").text("");
                }, 3000);
            },
        });
    });
});

function genSumm() {
    $.ajax({
        type: "get",
        url: "/api/sup/summary",
        success: (response) => {
            $("#total").text("$" + response);
        },
        error: () => {
            $("div#message").css({ display: "block", background: "#f00" });
            $("div#message").text("Login Failed!");
            clearTimeout(msgtrack);
            msgtrack = setTimeout(() => {
                $("div#message").css({ display: "none" });
                $("div#message").text("");
            }, 3000);
        },
    });
}
function genPayroll() {
    $.ajax({
        type: "get",
        url: `/api/generate/payroll?pay_cycle=`,
        success: () => {
            $("div#message").css({ display: "block", background: "#0f0" });
            $("div#message").text("Department Payroll Generated!");
            clearTimeout(msgtrack);
            setTimeout(() => {
                window.location.reload();
            }, 3000);
        },
        error: () => {
            $("div#message").css({ display: "block", background: "#f00" });
            $("div#message").text("Action Failed!");
            clearTimeout(msgtrack);
            msgtrack = setTimeout(() => {
                $("div#message").css({ display: "none" });
                $("div#message").text("");
            }, 3000);
        },
    });
}
