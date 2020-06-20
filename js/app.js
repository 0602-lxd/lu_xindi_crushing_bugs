(() => {
	// set up the puzzle pieces and boards
	const puzzleButtons = document.querySelectorAll('#buttonHolder img'),
				// querySelectorAll is for a one to many relationship and returns a NodeList (an array) of matching elements
				puzzlePieces = document.querySelectorAll(".puzzle-image"),
				dropZones = document.querySelectorAll(".drop-zone"),
				gameBoard = document.querySelector(".puzzle-board"); // one to one relationship -> returns the first matching element
				

	let imageNames = ["topLeft", "topRight", "bottomLeft", "bottomRight"];

	// add event handling here -> how is the user going to use our app?
	// what triggers do we need?
	function changeImageSet() {

		// change all the image elements on the page -> draggable image sources
		imageNames.forEach((piece, index) => {
			puzzlePieces[index].src = `images/${piece + this.dataset.bgkey}.jpg`;
		});

		// and set the drop zone background
		gameBoard.style.backgroundImage = `url(images/backGround${this.dataset.bgkey}.jpg)`;

		resetPuzzlePieces ();
	}

	function allowDrag(event) {
		// let the drag happen, and store a reference of the ID of the element we're dragging
		console.log('started dragging an image: this one - ', event.target.id);

		event.dataTransfer.setData("draggedImg", this.id);
		// event.dataTransfer.setData("targetTrack", this.dataset.track);

		// set a reference to a data track so i can retrieve it later in the drop

	}

	function allowDragOver(event) {
		event.preventDefault(); // for next week
		console.log('dragged something over me!');
	}

	function allowDrop(event) {
		console.log('dropped something on me');

		let droppedImage = event.dataTransfer.getData("draggedImg");
		// let currentTrack = event.dataTransfer.getData('targetTrack');
		console.log(event.target.innerHTML.trim());
		if(event.target.nodeName=="DIV" && event.target.childNodes.length<1){
			event.target.appendChild(document.querySelector(`#${droppedImage}`));
		}else{
			alert("Do not dragged me!");
		}

		//debugger;
	}

	// click on the bottom buttons to change the puzzle image we're working with
	puzzleButtons.forEach(button => button.addEventListener('click', changeImageSet));
	puzzlePieces.forEach(piece => piece.addEventListener('dragstart', allowDrag));

	for (let zone of dropZones) {
		zone.addEventListener('dragover', allowDragOver);
		zone.addEventListener('drop', allowDrop);
	}

	// research call, apply and bind
	changeImageSet.call(puzzleButtons[0]); // emulates a click on the first bottom button
})();
