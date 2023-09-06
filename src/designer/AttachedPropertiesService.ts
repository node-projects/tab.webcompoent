import { BaseCustomWebComponentPropertiesService, IDesignItem, IProperty, PropertyType } from "@node-projects/web-component-designer";
import { TabWebcomponent } from "../tab/TabWebcomponent.js";

export default class AttachedPropertiesService extends BaseCustomWebComponentPropertiesService {
  override isHandledElement(designItem: IDesignItem): boolean {
    return designItem.parent?.element instanceof TabWebcomponent;
  }

  public override getProperties(designItem: IDesignItem): IProperty[] {
    return [{
      name: 'header',
      description: 'header shown in tab control',
      type: "string",
      service: this,
      propertyType: PropertyType.propertyAndAttribute
    }];
  }
}