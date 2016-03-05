var person = function(){ // This line to the line with "}();" creates a Closure.
    // private data
    var data = {            // This is a JavaScript Object.
        first_name:'',
        $first_name: function(n) {
            data.first_name = n },
        last_name:'',
        $last_name: function(n) {
            data.last_name = n},
        email_address:'',
        $email_address: function(n) {
            data.email_address = n}
    };

    var F = function(){};
    f = new F();            // This is an example of the conflicted nature of JavaScript.
                            // In the words of Douglas Crockford, "JavaScript itself is not confident in its prototypal nature,
                            // so it offers an object-making syntax that is reminiscent of the classical oo languages. Few
                            // classical programmers found prototypal inheritance to be acceptable and classically inspired
                            // syntax obscures the language's true nature. It is the worst of both worlds.

    // public data
    f.toString = function() {
        return "Name: " + data["first_name"] + " " + data["last_name"] + "\nEmail: " + data["email_address"];}
    f.run = function (e) {
        return data[e];
    };

    return f;
}();                        // This is a Function Application.

var customer = function(p){
    // private data
    var data = {
        customer_number:'',
        $customer_number: function(n) {
            data.customer_number = n}
    };

    var F = function(){};
    F.prototype = p;        // The prototype property sets up Inheritance.
    f = new F();

    // public data
    f.getDisplayText = function() {
        return F.prototype.toString() + "\nCustomer number: " + data["customer_number"];
    }
    f.run = function (e) {
        var r = data[e];
        if(r === undefined) return F.prototype.run(e);
        else return r;
    };

    return f;
}(person);

var employee = function(p){
    // private data
    var data = {
        ssn:'',
        $ssn: function(n) {
            data.ssn = n}
    };

    var F = function(){};
    F.prototype = p;
    f = new F();

    // public data
    f.getDisplayText = function() {
        return F.prototype.toString() + "\nSocial security number: " + data["ssn"];
    }
    f.run = function (e) {
        var r = data[e];
        if(r === undefined) return F.prototype.run(e);
        else return r;
    };

    return f;
}(person);



$(document).ready(function() {
    $("#create_person_button").click(function() { // "Create Person" button was clicked
        if($("#choose_customer_employee_type").val() == "c" || $("#choose_customer_employee_type").val() == "C") { // Customer type selected
            if ($("#customer").hasClass("hide") == true) {
                $("#customer").toggleClass("hide"); // Make sure Customer interface is showing
            }
            if ($("#employee").hasClass("hide") != true){
                $("#employee").toggleClass("hide"); // Make sure Employee interface is hidden
            }

            $("#customer_employee_error").text("*"); // Reset the error field
        }

        else if($("#choose_customer_employee_type").val() == "e" || $("#choose_customer_employee_type").val() == "E") { // Employee type selected
            if ( $("#employee").hasClass("hide") == true){
                $("#employee").toggleClass("hide"); // Make sure Employee interface is showing
            }
            if ( $("#customer").hasClass("hide") != true){
                $("#customer").toggleClass("hide"); // Make sure Customer interface is hidden
            }

            $("#customer_employee_error").text("*"); // Reset the error field
        }

        else { // Something entered other than "c", "C", "e", or "E"
            $("#customer_employee_error").text("Error: please enter 'e' or 'c'.");
            if ($("#employee").hasClass("hide") != true){
                $("#employee").toggleClass("hide"); // Make sure Employee interface is hidden if incorrect type entered
            }
            if ($("#customer").hasClass("hide") != true){
                $("#customer").toggleClass("hide"); // Make sure Customer interface is hidden if incorrect type entered
            }
        }

        // Each time a new selection is made, clear the textboxes
        $("#customer_first_name").val("");
        $("#customer_last_name").val("");
        $("#customer_email_address").val("");
        $("#customer_number").val("");
        $("#employee_first_name").val("");
        $("#employee_last_name").val("");
        $("#employee_email_address").val("");
        $("#employee_ssn").val("");


    }) // End of "Create Person" click function

    $("#create_customer_button").click(function() { // "Create Customer" button was clicked
        // Get the data from the textboxes
        var customer_first_name = $("#customer_first_name").val();
        var customer_last_name = $("#customer_last_name").val();
        var customer_email_address = $("#customer_email_address").val();
        var customer_number = $("#customer_number").val();

        var isValid = true; // Set to False if any input is invalid

        // Check first name
        if (customer_first_name == "") {
            $("#customer_first_name_error").text("Error: First Name is required.");
            isValid = false;
        } else {
            $("#customer_first_name_error").text("*"); // Reset the error label
        }

        // Check last name
        if (customer_last_name == "") {
            $("#customer_last_name_error").text("Error: Last Name is required.");
            isValid = false;
        } else {
            $("#customer_last_name_error").text("*"); // Reset the error label
        }

        // Check email address
        if (customer_email_address == "") {
            $("#customer_email_address_error").text("Error: Email Address is required.");
            isValid = false;
        }
        else {
            $("#customer_email_address_error").text("*"); // Reset the error label
        }

        // Check customer number
        if (customer_number == "") {
            $("#customer_number_error").text("Error: Customer Number is required.");
            isValid = false;
        }
        else {
            $("#customer_number_error").text("*"); // Reset the error label
        }

        if (isValid == true) { // Input is valid, so create Customer object
            var customer1 = Object.create(customer);
            customer1.run('$first_name')(customer_first_name);
            customer1.run('$last_name')(customer_last_name);
            customer1.run('$email_address')(customer_email_address);
            customer1.run('$customer_number')(customer_number);
            alert("You entered:\n" + customer1.getDisplayText());

            // After displaying Customer verification, clear the textboxes to prepare for more input
            $("#customer_first_name").val("");
            $("#customer_last_name").val("");
            $("#customer_email_address").val("");
            $("#customer_number").val("");
            $("#customer").toggleClass("hide"); // Hide Customer interface after each input
            $("#choose_customer_employee_type").val("");
        }
    }) // End of "Create Customer" click function


    $("#create_employee_button").click(function() { // "Create Employee" button was clicked
        // Get the data from the textboxes
        var employee_first_name = $("#employee_first_name").val();
        var employee_last_name = $("#employee_last_name").val();
        var employee_email_address = $("#employee_email_address").val();
        var employee_ssn = $("#employee_ssn").val();

        var isValid = true; // Set to False if any input is invalid

        // Check first name
        if (employee_first_name == "") {
            $("#employee_first_name_error").text("Error: First Name is required.");
            isValid = false;
        } else {
            $("#employee_first_name_error").text("*"); // Reset the error label
        }

        // Check last name
        if (employee_last_name == "") {
            $("#employee_last_name_error").text("Error: Last Name is required.");
            isValid = false;
        } else {
            $("#employee_last_name_error").text("*"); // Reset the error label
        }

        // Check email address
        if (employee_email_address == "") {
            $("#employee_email_address_error").text("Error: Email Address is required.");
            isValid = false;
        }
        else {
            $("#employee_email_address_error").text("*"); // Reset the error label
        }

        // Check social security number
        if (employee_ssn == "" ) {
            $("#employee_ssn_error").text("Error: Social Security Number is required.");
            isValid = false;
        }
        else {
            $("#employee_ssn_error").text("*"); // Reset the error label
        }

        if (isValid == true) { // Input is valid, so create Employee object
            var employee1 = Object.create(employee)
            employee1.run('$first_name')(employee_first_name);
            employee1.run('$last_name')(employee_last_name);
            employee1.run('$email_address')(employee_email_address);
            employee1.run('$ssn')(employee_ssn);
            alert("You entered:\n" + employee1.getDisplayText());

            // After displaying Employee verification, clear the textboxes to prepare for more input
            $("#employee_first_name").val("");
            $("#employee_last_name").val("");
            $("#employee_email_address").val("");
            $("#employee_ssn").val("");
            $("#employee").toggleClass("hide"); // Hide Employee interface after each input
            $("#choose_customer_employee_type").val("");
        }
    }) // End of "Create Employee" click function
}) // End of "ready" function