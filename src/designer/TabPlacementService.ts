import { DefaultPlacementService, IDesignItem } from "@node-projects/web-component-designer";
import { TabWebcomponent } from "../tab/TabWebcomponent.js";

export default class TabPlacementService extends DefaultPlacementService {
    override serviceForContainer(container: IDesignItem, containerStyle: CSSStyleDeclaration) {
        if (container.element instanceof TabWebcomponent)
            return true;
        return false;
    }

    override enterContainer(container: IDesignItem, items: IDesignItem[]) {
        for (let i of items) {
            if (i.hasStyle('position'))
                i.removeStyle('position');
            if (i.hasStyle('width'))
                i.removeStyle('width');
            if (i.hasStyle('heigth'))
                i.removeStyle('heigth');
        }
    }
}