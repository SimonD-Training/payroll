let msgtrack;
$(document).ready(() => {
    $("form#form1").on("submit", function (e) {
        e.preventDefault();
        let data = {
            id: $("input[name=id]").val(),
            employee_id: $("input[name=employee_id]").val(),
            date: $("input[name=date]").val(),
            pay_cycle: $("input[name=pay_cycle]").val(),
            event_type: $("select[name=event_type]").val(),
            hrs: $("input[name=hrs]").val(),
            notes: $("input[name=notes]").val(),
        };
        $.ajax({
            type: "put",
            url: `/employee_event/${data.id}`,
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