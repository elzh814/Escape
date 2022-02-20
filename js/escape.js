export class Interactable {
    constructor(elementId) {
        this.elementId = elementId;
    }

    onLoad() {}

    onClick() {}

    onMouseEnter() {}

    onMouseOut() {}

}

export class ModalWindow extends Interactable {
    constructor(elementId, opentrigger=null, closetrigger=null) {
        super(elementId);
        
        if (opentrigger != null) {
            this.opentrigger = new Interactable(opentrigger);
            this.opentrigger.onClick = () => this.onModalOpen();
            addInteractable(this.opentrigger);
        }
        if (closetrigger != null) {
            this.closetrigger = new Interactable(closetrigger);
            this.closetrigger.onClick = () => this.onModalClose();
            addInteractable(this.closetrigger);
        }
    }

    onModalOpen() {
        this.element.style.display = "block";
        window.addEventListener('click', this.winevent);
    }

    onModalClose() {
        this.element.style.display = "none";
        window.removeEventListener('click', this.winevent);
    }

    onLoad() {
        this.winevent = (e) => {
            if (e.target == this.element) this.onModalClose();
        }
    }
}

export class InventoryInteractable extends Interactable {
    constructor(elem) {
        super(elem); 

        this.src = "";

        this.containsitem = false;
        this.itemIsSelected = false;
        this.itemUsed = false;
    }

    containsItem() {
        return this.containsitem;
    }

    addItem(item) {
        this.element.src = item;
        this.containsitem = true;
    }

    removeItem() {
        this.element.src = "";
        this.containsitem = false;
        this.itemIsSelected = false;
    }

    itemHasBeenUsed() {
        return this.itemUsed;
    }

    onClick() {
        if (this.containsitem) this.itemIsSelected = true;
    }

    canUseItem() {
         return this.itemIsSelected;
    }

    onLoad() {
        window.addEventListener('click', (e) => {
            if (this.itemIsSelected) this.onUseItem(e.target);
            if (this.containsitem && e.target == this.element) {
                this.itemIsSelected = true;
                this.element.style.outlineStyle = "solid";
                this.element.style.outlineColor = "yellow";

            }
        });
    }

    // I think target is the html element that's clicked on?
    onUseItem(target) {}
}

export class PinPadModalWindow extends ModalWindow {

    constructor(element, trigger, pin) {
        super(element, trigger);
        this.pinPositions = [];
        this.pinSize = 0;
        this.pin = pin;
        this.numpadPos = {
            0: {
                x: 163,
                y: 406
            },
            1: {
                x: 45,
                y: 158
            },
            2: {
                x: 158,
                y: 157
            },
            3: {
                x: 278,
                y: 157
            },
            4: {
                x: 42,
                y: 237
            },
            5: {
                x: 158,
                y: 240
            },
            6: {
                x: 280,
                y: 235
            },
            7: {
                x: 45,
                y: 321
            },
            8: {
                x: 162,
                y: 323
            },
            9: {
                x: 286,
                y: 321
            },
        }
    }

    makeButton(pos, parent, eventListener) {
        let numpadPos = pos
        let numbutton = document.createElement("button");
        numbutton.addEventListener('click', eventListener);
        numbutton.setAttribute("class", "invisible-button");
        parent.appendChild(numbutton);
        numbutton.style.left = numpadPos.x + "px";
        numbutton.style.top = numpadPos.y + "px";
        numbutton.style.width = "80px";
        numbutton.style.height= "70px";
    }

    onLoad() {
        super.onLoad();
        let modalContent = this.element.querySelector(".modal-content")
        for (let i = 0; i < 10; i++)
            this.makeButton(this.numpadPos[i], modalContent, () => this.addPinNum(i));
        //clear pin
        this.makeButton({x: 32 , y: 403 }, modalContent, () => this.clearPin());

        //check pin, unlock hatch
        this.makeButton({x: 276 , y: 403 }, modalContent, () => this.checkPin());

        for (let i = 0; i < 4; i++) {
            let pinEl = document.createElement("p");
            pinEl.setAttribute("id", "pinDisplay");
            pinEl.setAttribute("class", "nodrag");
            modalContent.appendChild(pinEl);
            let pinX = 615 + (50 * i);
            pinEl.style.left = pinX + "px";
            pinEl.style.top =  "70px";
            pinEl.innerHTML = "?";
            this.pinPositions.push(pinEl);
        }

    }

    addPinNum(i) {
        if (this.pinSize >= 4) return;
        this.pinPositions[this.pinSize++].innerHTML = i;
        this.getPinString();
    }

    getPinString() {
        let pinstr = "";
        for (let pinE of this.pinPositions) pinstr += pinE.innerHTML;
        return pinstr;
    }

    checkPin() {
        if (this.getPinString() === this.pin) {
            this.onCorrectPin();
            return true;
        }
        return false;
    }

    onCorrectPin() {}

    clearPin() {
        for (let pinE of this.pinPositions) {
            pinE.innerHTML = "?";
        }
        this.pinSize = 0;
    }

    onClick() {

    }
}

const interactables = [];

export function addInteractable(interactable) {
    interactables.push(interactable);
}

window.onload = () => {

    //diable dragging of images
    document.querySelectorAll('img')
    .forEach((img) => img.ondragstart = () => false);

    for (let interactable of interactables) {
        interactable.element = document.getElementById(interactable.elementId);
        interactable.onLoad();
        interactable.element.addEventListener('click', () => interactable.onClick());
        interactable.element.addEventListener('mouseenter', () => interactable.onMouseEnter());
        interactable.element.addEventListener('mouseout', () => interactable.onMouseOut());
    }

    window.setTimeout(() => document.body.classList.remove('fade'), 500);
}


// window.addEventListener('click', (e) => {
//     if (!e.target.classList.contains('pos')) return;

//     var rect = e.target.getBoundingClientRect();
//     var x = e.clientX - rect.left; //x position within the element.
//     var y = e.clientY - rect.top;  //y position within the element.
//     console.log("Left? : " + x + " ; Top? : " + y + ".");
// });