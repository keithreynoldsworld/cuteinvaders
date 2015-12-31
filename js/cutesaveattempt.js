 $(document).ready(function() {
  function hideIntro(){
	 $("#choose-player-character").on("click", function(){
		 $("#portfolio").hide();
 });
  }
 function chooseAda(){
	 $("#ada-button").on("click", function(){
		 localStorage.setItem("ship", "assets/adaplayer.png"); 
		 localStorage.setItem("currentGameScore", "222220");
		 console.log("a");
		 $("#choose-player-modal").html("<div style='height:175px;width:300px;'></div><textarea placeholder='enter your name here!' id='name'></textarea><br/><button id='name-button'>SUBMIT</button>");
	  toDirections();});
 }
  function chooseBjorne(){
	 $("#bjorne-button").on("click", function(){
		 localStorage.setItem("ship", "assets/bjorneplayer.png"); 
		 localStorage.setItem("currentGameScore", "222220");
		 console.log('b');
		 $("#choose-player-modal").html("<div style='height:175px;width:300px;'></div><textarea placeholder='enter your name here!' id='name'></textarea><br/><button id='name-button'>SUBMIT</button>");
	  toDirections();});	
 }
  function chooseLinus(){
	 $("#linus-button").on("click", function(){
		 localStorage.setItem("ship", "assets/linusplayer.png"); 
		 localStorage.setItem("currentGameScore", "222220");
		 
		 console.log('l');
		$("#choose-player-modal").html("<div style='height:175px;width:300px;'></div><textarea placeholder='enter your name here!' id='name'></textarea><br/><button id='name-button'>SUBMIT</button>");
	  toDirections();});
 }
  function toDirections(){
	 $("#name-button").on("click", function(){
		 console.log('directions');
		 if($("#name").val()==""){localStorage.name = "anonymous"}
		 else{localStorage.name = $("#name").val();}
		
		$("#choose-player-modal").html("<div style='height:75px;width:300px;font-size:5em;color:white;'><br/>D</div><div id='directions'><h3 style='text-align:center;font-size:2em;color:black;' id='dglow'>DIRECTIONS</h3><br/>Tap the red button to move right.<br/><br/>Tap the red button to move left.<br/><br/></div><a href='thegame.html'><button id='directions-button'>START!</button></a>");
		// startGame();
	 });
 }
   // function startGame(){
	 // $("#directions-button").on("click", function(){
		 // $("#portfolio").hide();
		  // $("#portfolio").html("");
		// $("#portfolio").css("background","black");
		// $("body").css("background","black");
	 // });
 // }
 chooseAda();
 chooseBjorne();
 chooseLinus();
 toDirections();
  // function chooseName(){
	 // $("#").on("click", function(){
		 // localStorage.playername = $("#playername");
	 // })
 // }
 hideIntro();
 
 });
 