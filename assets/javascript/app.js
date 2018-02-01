$(document).ready(function(){
    var config = {
        apiKey: "AIzaSyBvS2Nlc0KhSW3JGMyAJ2kh3aGE1D2gooA",
        authDomain: "train-d64a4.firebaseapp.com",
        databaseURL: "https://train-d64a4.firebaseio.com",
        projectId: "train-d64a4",
        storageBucket: "train-d64a4.appspot.com",
        messagingSenderId: "99922862595"
      };
      firebase.initializeApp(config);

      var database = firebase.database();
       
    // button to add a train
    $("#trainButton").on("click", function(){

        // registers user input and assigns variables
        var trainName = $("#userInputTrainName").val().trim();
        var trainLineName = $("#userInputTrainLine").val().trim();
        var trainDestination = $("#userInputDestination").val().trim();
        var trainTime = moment($("#userInputFirstTrain").val().trim(), "HH:mm").subtract(10, "years").format("X");;
        var trainFrequency = $("#userInputFrequency").val().trim();

        // tests in console
        // console.log(trainName);
        // console.log(trainLineName);
        // console.log(trainDestination);
        // console.log(trainTime);
        // console.log(trainFrequency);

        // creates object to hold train data, data pushed to firebase
        var newtrain = {
            name: trainName,
            line: trainLineName,
            destination: trainDestination,
            time: trainTime,
            frequency: trainFrequency,
        }

        // pushes train data into firebase
        database.push(newTrain);
        
        // to empty text boxes
        $("#userInputTrainName").val("");
        $("#userInputTrainLine").val("");
        $("#userInputDestination").val("");
        $("#userInputFirstTrain").val("");
        $("#userInputFrequency").val("");

        // to prevent page from refreshing
        return false;
    });
    
    database.on("child_added", function(childSnapshot, prevChildKey){
        
        // assign variable to snapshots
        var fbName = childSnapshot.val().name;
        var fbLine = childSnapshot.val().line;
        var fbDestination = childSnapshot.val().destination;
        var fbInputTime = childSnapshot.val().time;
        var fbFrequency = childSnapshot.val().frequency;

        var diffTime = moment().diff(moment.unix(fbInputTime), "minutes");
		var timeRemain = moment().diff(moment.unix(fbInputTime), "minutes") % fbFrequency;
		var minutes = fbFrequency - timeRemain;

		var nextTrainArrival = moment().add(minutes, "m").format("hh:mm A"); 

    // append train data to table 
    $("#trains > tbody").append("<tr><td>" + fbName + "</td><td>" + fbLine + "</td><td>" + fbDestination + "</td><td>" + 
    fbFrequency + "mins" + "</td><td>" + nextTrainArrival + "</td><td>" + minutes + "</td></tr>");

    });
});