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
            if (i.lastContainerSize) {
                i.setStyle('width', '100%');
                i.setStyle('height', '100%');
                if (!i.hasStyle('position'))
                    i.removeStyle('position');
            }
        }
    }
}