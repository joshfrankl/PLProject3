/**
 * Created by pcannata on 2/20/16.
 */

var substance = function(){ // This line to the line with "}();" creates a Closure.
    // private data
    var data = {            // This is an exmaple of a javaScript Object.
        name:'Substance',
        $name: function(n){
            data.memo += 1; // This, and the object entry "memo: 0" below is an example of Memoization where a function can
                            // keep track of some prior behavior.
            data.name = n },
        memo: 0,
        dob: new Date('January 1, 1980'),
        $dob: function(n){data.memo += 1; data.dob = n},
        says:"Hello, I'm a substance",
        $says: function(n){data.memo += 1; data.says = n},
        quality: 'Virtue',
        $quality: function(n){data.memo += 1; data.quality = n}
    };

    var F = function(){};
    f = new F();            // This is an example of the conflicted nature of JavaScript.
                            // In the words of Douglas Crockford, "JavaScript itself is not confident in its prototypal nature,
                            // so it offers an object-making syntax that is reminiscent of the classical oo languages. Few
                            // classical progrmmers found prototypal inheritance to be acceptable and classically inspired
                            // syntax obscures the language's true nature. It is the worst of both worlds.

    // public data
    f.sname = 'Substance'
    f.run = function (e) {
        return data[e];
    };

    return f;
}();                        // This is an example of Function Application.

var animal = function(p){
    // private data
    var data = {
        name:'Animal',
        $name: function(n){data.memo += 1; data.name = n},
        memo: 0,
        dob: new Date('January 1, 1990'),
        $dob: function(n){data.memo += 1; data.dob = n},
        says:"Hello, I'm an animal",
        $says: function(n){data.memo += 1; data.says = n}
    };

    var F = function(){};
    F.prototype = p;        // The prototype property sets up Inheritance.
    f = new F();

    // public data
    f.aname = 'Animal'
    f.run = function (e) {
        var r = data[e];
        if(r === undefined) return F.prototype.run(e);
        else return r;
    };

    return f;
}(substance);

var cat = function(p){
    // private data
    var data = {
        name:'Cat',
        $name: function(n){data.memo += 1; data.name = n},
        memo: 0,
        dob: new Date('January 1, 2000'),
        $dob: function(n){data.memo += 1; data.dob = n},
        says:"Hello, I'm a cat",
        $says: function(n){data.memo += 1; data.says = n}
    };

    var F = function(){};
    F.prototype = p;
    f = new F();

    // public data
    f.cname = 'Cat'
    f.run = function (e) {
        var r = data[e];
        if(r === undefined) return F.prototype.run(e);
        else return r;
    };

    return f;
}(animal);

var human = function(p){
    // private data
    var data = {
        name:'Human',
        $name: function(n){data.memo += 1; data.name = n},
        memo: 0,
        dob: new Date('January 1, 2010'),
        $dob: function(n){data.memo += 1; data.dob = n},
        says:"Hello, I'm a human",
        $says: function(n){data.memo += 1; data.says = n}
    };

    var F = function(){};
    F.prototype = p;
    f = new F();

    // public data
    f.hname = 'Human'
    f.run = function (e) {
        var r = data[e];
        if(r === undefined) return F.prototype.run(e);
        else return r;
    };
    f.age = (new Date()).getFullYear() - f.run('dob').getFullYear();

    return f;
}(animal);

var a1 = Object.create(animal);

document.writeln(Object.getPrototypeOf(a1) + "<BR>");
document.writeln(a1.sname + "<BR>");
document.writeln(a1.run('says') + "<BR>");
a1.run('$name')('a1');
document.writeln(a1.run('name') + "<BR>");

var myCat = Object.create(cat);

document.writeln("<BR>");
document.writeln(Object.getPrototypeOf(myCat) + "<BR>");
document.writeln(myCat.sname + "<BR>");
document.writeln(myCat.run('says') + "<BR>");
document.writeln(myCat.run('quality') + "<BR>");
myCat.run('$name')('myCat');
document.writeln(myCat.run('name') + "<BR>");

var socrates = Object.create(human);

document.writeln("<BR>");
document.writeln(Object.getPrototypeOf(socrates) + "<BR>");
document.writeln(socrates.sname + "<BR>");
document.writeln(socrates.run('says') + "<BR>");
document.writeln(socrates.run('quality') + "<BR>");
socrates.run('$name')('socrates');
socrates.run('$says')('I am Socrates.');
document.writeln(socrates.run('says') + "<BR>");
document.writeln(socrates.age + "<BR>");

// View local properties.
document.writeln("<BR>" + "Local properties are: <BR>");
for (var key in Object.getPrototypeOf(socrates)) {
    if (Object.getPrototypeOf(socrates).hasOwnProperty(key)) {
        document.writeln('socrates: ' + key + " -> " + Object.getPrototypeOf(socrates)[key] + "<BR>");
    }
}

// View local and inherited properties.
document.writeln("<BR>" + "Local and inherited properties are: <BR>");
for (var key in Object.getPrototypeOf(socrates)) {
        document.writeln('socrates: ' + key + " -> " + Object.getPrototypeOf(socrates)[key] + "<BR>");
}

document.writeln("<BR>");
document.writeln("Socrates memo is: " + socrates.run('memo') + "<BR>");

// Polymorphism.
a1.speak = function(a){ document.writeln(a.run('says') + "<BR>"); }
document.writeln("<BR>");
a1.speak(a1);
a1.speak(myCat);
a1.speak(socrates);