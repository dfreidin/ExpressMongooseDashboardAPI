function show_all_bears(res) {
    if(res.message == "Success") {
        var output = "<table><thead><tr><th>Name</th><th>Actions</th></tr></thead><tbody>";
        for(var i=0; i<res.data.length; i++) {
            output += "<tr><td>" + res.data[i].name + "</td>";
            output += "<td><a href='#' data-id='" + res.data[i]._id + "' class='show'>Show</a></td>"
            output += "<td><a href='#' data-id='" + res.data[i]._id + "' class='delete'>Delete</a></td></tr>";
        }
        output += "</tbody></table>"
        $("#results").html(output);
    }
    else {
        $("#results").text(JSON.stringify(res.error));
    }
}

function show_one_bear(res) {
    if(res.message == "Success") {
        var output = "<h4>Name: " + res.data.name + "</h4>";
        output += "<p>Created at: " + res.data.createdAt + "</p>";
        output += "<p>Updated at: " + res.data.updatedAt + "</p>";
        output += "<form class='update_form' action='/bears/" + res.data._id + "' method='post'>";
        output += "<p>Name: <input type='text' name='name' value='" + res.data.name + "'></p>"
        output += "<p><input type='submit' value='Update This Bear'></p></form>"
        $("#results").html(output);
    }
    else {
        $("#results").text(JSON.stringify(res.error));
    }
}

$(document).ready(function(){
    $("#index").click(function(){
        $.get("/bears", show_all_bears);
    });
    $(document).on("click", ".show", function(e){
        $.get("/bears/"+$(this).attr("data-id"), show_one_bear);
        return false;
    });
    $("#new_bear_form").submit(function(e){
        e.preventDefault();
        $.ajax({
            url: "/bears",
            method: "post",
            data: $(this).serialize(),
            success: show_one_bear
        });
    });
    $(document).on("submit", ".update_form", function(e){
        e.preventDefault();
        $.ajax({
            url: $(this).attr("action"),
            method: "post",
            data: $(this).serialize(),
            success: show_one_bear
        });
    });
    $(document).on("click", ".delete", function(e){
        $.ajax({
            url: "/bears/"+$(this).attr("data-id")+"/delete",
            method: "post",
            success: show_all_bears
        });
        return false;
    });
});