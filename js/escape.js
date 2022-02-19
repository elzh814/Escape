export class Interactable {
    constructor(position, elementId) {
        this.elementId = elementId;
    }

    onLoad() {}

    onClick() {}

    onMouseEnter() {}

    onMouseOut() {}

}

export class ClickableInteractable {

}

const interactables = [];

export function addInteractable(interactable) {
    interactables.push(interactable);
}

window.onload = () => {
    for (let interactable of interactables) {
        interactable.element = document.getElementById(interactable.elementId);
        interactable.onLoad();
        interactable.element.addEventListener('click', () => interactable.onClick());
        interactable.element.addEventListener('mouseenter', () => interactable.onMouseEnter());
        interactable.element.addEventListener('mouseout', () => interactable.onMouseOut());
    }
}
