import { Interactable, ModalWindow, addInteractable, InventoryInteractable, PinPadModalWindow } from './escape.js';

let textBox = document.getElementById("text");

let room2 = document.getElementById("room2");

let inventory = new InventoryInteractable("inventory");
let pinpad = new class extends PinPadModalWindow {
    // onModalOpen() {
    //     if (inventory.itemHasBeenUsed()) super.onModalOpen();
    // }
}("pinpadModal", "pinpad", "3504");


let chairPulled = false;
class Room2Interactable extends Interactable {
    constructor(element) {
        super(element);
    }

    onMouseEnter() {
        switch (this.elementId) {
            case 'statue1':
                textBox.innerHTML = "\"How can I help you?\"";
                break;
            case 'statue2':
                if (chairPulled) {
                    textBox.innerHTML = "\"Thank you, darling.\""
                } else {
                    textBox.innerHTML = "\"Is chivarly dead? Aren't you going to pull out my chair?\"";
                }
                break;
            case 'pinpad':
                if (!inventory.itemHasBeenUsed())
                    textBox.innerHTML = "I can't make a purchase without money.";
                break;
            case 'painting':
                textBox.innerHTML = "Wow, what a striking painting...";
                break;
        }
    }


    onClick() {
        switch (this.elementId) {
            case 'banner':
                this.element.src ="";
                break;
            case 'chair':
                this.element.style.transform = "translate(100px,0)";
                textBox.innerHTML ="\"Ugh, finally.\""
                chairPulled = true;
                break;
            case 'credit':
                this.element.src = "";
                inventory.addItem("images/placeholders/credit_card.png");
                break;
            case 'coffee':
                //transition to next page...
                document.body.classList.add('fadeout');
                window.location.href = "room3.html";
                break;
        }
        
    }
}

let coffeeCup = new Room2Interactable("coffee");

pinpad.onCorrectPin = () => {
    coffeeCup.element.style.display = "block";
    pinpad.onModalClose();
}

inventory.onUseItem = (target) => {
    if (target === document.getElementById("pinpad") && !inventory.itemUsed) {
        inventory.itemUsed = true;
        textBox.innerHTML = "\"Thank you for your purchase!\"";
    }
};

addInteractable(new Room2Interactable("statue1"));
addInteractable(new Room2Interactable("statue2"));
addInteractable(new Room2Interactable("banner"));
addInteractable(new Room2Interactable("chair"));
addInteractable(new Room2Interactable("credit"));
addInteractable(new Room2Interactable("pinpad"));
addInteractable(new Room2Interactable("painting"));
addInteractable(coffeeCup);
addInteractable(inventory);
addInteractable(pinpad);
