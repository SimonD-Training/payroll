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
            type: "put",
            url: `/dept/employee/${data.employee_id}`,
            data: data,
            success: () => {
                window.location.reload;
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