import { ComponentType } from "./enum";
import { BaseComponent } from "./baseComponent";
export class BaseControl extends BaseComponent {
    constructor() {
        super(ComponentType.Control);
    }
}