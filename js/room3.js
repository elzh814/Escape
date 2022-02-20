import { Interactable, ModalWindow, addInteractable, InventoryInteractable, PinPadModalWindow } from './escape.js';

let textBox = document.getElementById("text");

let room3 = document.getElementById("room3");

let inventory = new InventoryInteractable("inventory");

let portalOpen = false;

// let pinpad = new class extends PinPadModalWindow {
//     onModalOpen() {
//         if (inventory.itemHasBeenUsed()) super.onModalOpen();
//     }
// }("pinpadModal", "pinpad", "3504");

class Room3Interactable extends Interactable {
    constructor(element) {
        super(element);
    }

    onMouseEnter() {
        switch(this.elementId) {
            case 'sponser1':
                textBox.innerHTML="\"I think I dropped something under the table...\"";
                break;
            case 'sponser2':
                textBox.innerHTML="\"Come check check out our flyers!\"";
                break;
            case 'paper':
                textBox.innerHTML="Looks like a piece of paper with holes cut out?";
                break;
        }
    }

    onClick() {
        switch(this.elementId) {
            case 'paper':
                this.element.src = "";
                inventory.addItem("images/placeholders/paper.png");
                break;
            case 'sponser1':
                if (inventory.itemIsSelected) {
                    let frame = document.getElementById("table_top");
                    frame.style.zIndex = "10";
                    frame.style.height = "650px";
                }
                break;
            case 'cutpaper':
                this.element.style.left = "600px";
                this.element.style.bottom = "135px";
                this.element.style.zIndex = "11";
                break;
            case 'painting3':
                const container = document.getElementById("container");
                container.innerHTML = "<p>Enter password (no spaces):</p><br><input id='password' type=\"text\"><br><button id='submit'>Submit</button><button id='backButton'>Back</button>";
                let button = document.getElementById('submit');
                let backButton = document.getElementById('backButton');
                button.addEventListener('click', function(){
                    let field = document.getElementById("password");
                    if (field.value == "hackers,cometogether") {
                        container.parentNode.removeChild(container);
                        document.getElementById("painting3").src = "";
                        portalOpen = true;
                        document.getElementById("room3").addEventListener('click', function(){
                            window.location.replace("../room4.html");
                        });
                    } else {
                        field.placeholder = "Wrong, try again!";
                        field.value = "";
                    }
                });

                backButton.addEventListener('click', function(){
                    container.innerHTML = "";
                });
        }
    }
}

document.getElementById("back").addEventListener('click', function(){
    let frame = document.getElementById("table_top");
    frame.style.zIndex = "-10";
    frame.style.height = "0";
});


addInteractable(new Room3Interactable("sponser1"));
addInteractable(new Room3Interactable("sponser2"));
addInteractable(new Room3Interactable("paper"));
addInteractable(new Room3Interactable("cutpaper"));
addInteractable(new Room3Interactable("painting3"));
addInteractable(inventory);