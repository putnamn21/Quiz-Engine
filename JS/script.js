
var qArray = [
    {
        question: "What is a man?",
        a1: "ur mom",
        a2: "the ultimate final result of perfection",
        a3: "a hairless orangutan",
        correcta: "But a miserable pile of secrets"
    },

    {
        question: "What walks on four legs in the morning, two legs in the afternoon, and three legs in the evening?",
        a1: "ur mom",
        a2: "a true American",
        a3: "A creepy leg-based monster",
        correcta: "But a miserable pile of secrets"
    },

    {
        question: "As I was going to St. Ives, I met a man with seven wives.<br/> Each wife had seven sacks, each sack had seven cats, each cat had seven kits.<br/> Kits, cats, sacks, and wives, how many were going to St. Ives?",
        a1: "2",
        a2: "2801",
        a3: "2407",
        correcta: "1"
    },

    {
        question: "Which animal sleeps standing up?",
        a1: "Horse",
        a2: "Dolphin",
        a3: "Raven",
        correcta: "Flamingos"
    },



    {
        question: "What animal has the longest life-span?",
        a1: "Red Sea Urchin",
        a2: "Galapagos Tortoise",
        a3: "Flea",
        correcta: "Ocean Quahog Clam"
    },

    {
        question: "Which are more numerous: the integers or the decimals?",
        a1: "Integers",
        a2: "Can't answer the question",
        a3: "They're Equal",
        correcta: "Decimals"
    },

    {
        question: "If you twist a piece of chalk what angle will it break at?",
        a1: "30 degrees",
        a2: "60 degrees",
        a3: "90 degrees",
        correcta: "45 degrees"
    },

    {
        question: "If you push on a bar of steel and on a bar of wood which has more force?",
        a1: "Steel",
        a2: "Wood",
        a3: "Can't say for certain",
        correcta: "Same"
    },

    {
        question: "Which way is a rock moving when you throw it straight up at its maximum height",
        a1: "9.8m/s²",
        a2: "Negative velocity",
        a3: "Positive velocity",
        correcta: "Zero velocity"
    },

    {
        question: "What causes the tides on the Earth?",
        a1: "The rotation of the Earth",
        a2: "Tilt of the Earht's Axis",
        a3: "Movement of the Earth's crust",
        correcta: "The Moon"
    },
    
    {
        question: "Is this the tenth question?",
        a1: "P...probably?",
        a2: "Who cares?",
        a3: "YOUR MOM IS THE TENTH QUESTION",
        correcta: "No"
    }

];

var correctnessArray = [];

var questionCount = 0;


//A function that takes an object and places the contents of that object on an html doc

var aBigFatQuestionTemplate = '<h4 id=qname style = "margin:10px"></h4><div class="form-group"><label id = "question" for="sel1"></label><div class="radio"><label id = "q1"></label></div><div class="radio"><label  id = "q2"><input type="radio" name="optradio"></label></div><div class="radio"><label id = "q3"><input type="radio" name="optradio"></label></div><div class="radio"><label id = "q4"><input type="radio" name="optradio"></label></div></div><button onclick="onSubmitClick()">Submit your Answer!</button>';

function _ih(id, value) {
    document.getElementById(id).innerHTML = value;
}

function startQuiz(){
    _ih("everything", aBigFatQuestionTemplate);
    quizQuestionPositioner(quizNums(), qArray[questionCount], radioConcatonator);
    questionCount++;
}
    


//The start of the big honkin' random array generator
var areDistinct = function (array) {
    var tempArray = array;
    if (tempArray[0] == tempArray[1] || tempArray[0] == tempArray[2] || tempArray[0] == tempArray[3] || tempArray[1] == tempArray[2] || tempArray[1] == tempArray[3] || tempArray[2] == tempArray[3]) {
        return false;
    } else {
        return tempArray;
    }
};

function quizNums() {
    var d = false;
    while (d == false) {
        var num1 = Math.floor((Math.random() * 4) + 1);
        var num2 = Math.floor((Math.random() * 4) + 1);
        var num3 = Math.floor((Math.random() * 4) + 1);
        var num4 = Math.floor((Math.random() * 4) + 1);
        d = areDistinct([num1, num2, num3, num4])
    }
    return [num1, num2, num3, num4];
};
//The end of the big honkin' random array generator

function onSubmitClick() {
    
    correctnessArray.push(grabAnswer() == qArray[zeroIsZeroDangit(questionCount)].correcta);
    console.log(correctnessArray);
    if (questionCount == qArray.length) {
        lastPage();
    }
    quizQuestionPositioner(quizNums(), qArray[questionCount], radioConcatonator);
    questionCount++;
    
}

function lastPage (){
    document.getElementById("everything").innerHTML = "<h2>You got "+numberCorrect(correctnessArray)+" ("+parseInt(numberCorrect(correctnessArray)/(correctnessArray.length) * 100) + "%)" + " questions right!</h2>";
    document.getElementById("exceptForThisThing").innerHTML = resultOfQuiz(correctnessArray,qArray);    
}

function resultOfQuiz (trueFalseArray, objectArray){
    var longString ='';
    for (var i = 0; i<trueFalseArray.length; i++){
        var question = objectArray[i].question;
        var answer = objectArray[i].correcta;
        var right = '';
        if (trueFalseArray[i]){
         right = "<span style = 'color:blue;'>You got this question right!</span>";   
        }else{right="<span style = 'color:red'>You got this question wrong! Leave the room!</span>";}
        longString += question + " "+answer+"! "+right +"<br/><br/>";
    }
    return longString;
}
function numberCorrect(arr){
    var correctCount = 0;
    for(var i = 0; i < arr.length; i++){
        if(arr[i] == true){
            correctCount++;
        }
    }
    return correctCount;
}

function zeroIsZeroDangit(number) {
    if (number != 0) {
        number--;
    }
    return number;
}

function radioConcatonator(string) {
    yar = '<input type="radio" name="optradio" value ="' + string + '">' + string;
    return yar;
}

function quizQuestionPositioner(randArray, questionObject, callback) {
    for (i = 0; i < randArray.length; i++) {
        randArray[i] = "q" + randArray[i];
    }
    _ih("qname", questionObject.question);
    _ih(randArray[0], callback(questionObject.correcta));
    _ih(randArray[1], callback(questionObject.a1));
    _ih(randArray[2], callback(questionObject.a2));
    _ih(randArray[3], callback(questionObject.a3));
}

function grabAnswer() {
    var z = document.getElementsByName("optradio");
    for (var i = 0; i < z.length; i++) {
        if (z[i].checked == true) {
            return z[i].value;
        }
    }
}
