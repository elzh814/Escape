import { Interactable, addInteractable } from './escape.js';

class Room1Interactable extends Interactable {
    constructor(position, element) {
        super(position, element);
    }

    onMouseEnter() {
        alert('hover');
    }

    onClick() {
        alert("click");
    }

}

addInteractable(new Room1Interactable({x: 0, y: 0}, "testelement"));
