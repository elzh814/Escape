import { Interactable, PinPadModalWindow, addInteractable, InventoryInteractable } from './escape.js';

let textBox = document.getElementById("text");
//let haveItem = false;
let room1=document.getElementById("room1");

let inventory = new InventoryInteractable("inventory");
 
let latchModal = new PinPadModalWindow("latchModal", "latch", "7543");
latchModal.onCorrectPin = () => {
    document.body.classList.add('fadeout');
    window.location.href = "room2.html";
}

class Room1Interactable extends Interactable {
    constructor(element) {
        super(element);
    }

    onMouseEnter() {
        // alert('hover');
        switch (this.elementId) {
            case 'window':
                textBox.innerHTML = "Surprisingly the blinds aren't broken.";
                break;
            case 'board':
                textBox.innerHTML = "Who wrote this...?";
                break;
            case 'eraser':
                textBox.innerHTML = "Who left a whiteboard eraser here?";
                break;
        }
    }

    onClick() {
        // alert("click");
        switch (this.elementId) {
            case 'window':
                this.element.src = "images/placeholders/window_open.png";
                if (!inventory.containsItem()) 
                    document.getElementById("eraser").src = "images/placeholders/eraser.png";
                break;
            case 'board':
                if (!inventory.itemHasBeenUsed())
                    textBox.innerHTML = "Hmm this is too much to erase with just my hands.";
                break;
            case 'eraser' :
                this.element.src = "";                
                inventory.addItem("images/placeholders/eraser.png");
                break;
            case 'latch' :
                //latchModalWindow.onModalOpen();
                // let div = document.createElement('div');
                // div.id = 'pad_container';
                // document.room1.appendChild(div);
                
                // let pinContainer = document.getElementById("pinimg");
                
                // pinContainer.style.backgroundImage = "url('images/placeholders/pinpad.png')";
                // pinContainer.style.backgroundRepeat = "no-repeat";
                // pinContainer.style.backgroundSize = "400px 500px";
                // pinContainer.style.width = "400px";
                // pinContainer.style.height = "500px"; 
                break;
        }
    }
}

addInteractable(new Room1Interactable("window"));
addInteractable(new Room1Interactable("board"));
addInteractable(new Room1Interactable("eraser"));
addInteractable(new Room1Interactable("latch"));
addInteractable(latchModal);

addInteractable(inventory);
inventory.onUseItem = (target) => {
    if (target === document.getElementById("board")) {
        target.src = "images/placeholders/whiteboard_empty.png";
        textBox.innerHTML = "Some of the writing won't erase...";
        inventory.itemUsed = true;
    }
};
