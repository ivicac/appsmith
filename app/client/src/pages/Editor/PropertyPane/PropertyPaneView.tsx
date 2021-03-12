import React from "react";
import { useSelector } from "react-redux";
import { IPanelProps } from "@blueprintjs/core";

import PropertyControlsGenerator from "./PropertyPaneGenerator";
import PropertyPaneTitle from "pages/Editor/PropertyPaneTitle";
import { getWidgetPropsForPropertyPane } from "selectors/propertyPaneSelectors";

/** interfaces */
export interface UpdatePropertyPayload {
  widgetId: string;
  propertyPath: string;
  propertyValue: any;
}

/** components */
const PropertyPaneView = (
  props: {
    hidePropertyPane: () => void;
  } & IPanelProps,
) => {
  const { hidePropertyPane, ...panel } = props;
  const widgetProperties: any = useSelector(getWidgetPropsForPropertyPane);

  return (
    <>
      <PropertyPaneTitle
        key={widgetProperties.widgetId}
        title={widgetProperties.widgetName}
        widgetId={widgetProperties.widgetId}
        widgetType={widgetProperties?.type}
        onClose={hidePropertyPane}
      />
      <PropertyControlsGenerator type={widgetProperties.type} panel={panel} />
    </>
  );
};

export { PropertyPaneView as default };
