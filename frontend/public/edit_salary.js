let msgtrack;
$(document).ready(() => {
    $("form#form1").on("submit", function (e) {
        e.preventDefault();
        let data = {
            id: $("input[name=id]").val(),
            pay_cycle: $("input[name=pay_cycle]").val(),
            hrs: $("input[name=hrs]").val(),
            basic_salary: $("input[name=basic_salary]").val(),
            salary: $("input[name=salary]").val(),
        };
        $.ajax({
            type: "put",
            url: `/salary/${data.id}`,
            data: data,
            success: () => {
                window.location.reload;
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
    });
});