$(document).ready(function() {
    $("#jdom a").click(function() { // Show more/less link clicked
        $(this).prev().toggleClass("hide"); // Toggle the hide setting
        if ($(this).prev().attr("class") != "hide") { // "Show more" clicked
            $(this).prev().show(); // Show the text
            $(this).text("Show less");
        }
        else { // "Show less" clicked
            $(this).prev().hide(); // Hide the text
            $(this).text("Show more");
        }
    }); // end click
}); // end ready
