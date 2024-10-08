/************
Processor: ts
************/

import * as __beyond_dep_ns_0 from '@beyond-js/react-18-widgets/page';
import * as __beyond_dep_ns_1 from '@beyond-js/widgets/controller';
// controller.ts
declare namespace ns_0 {
  import PageReactWidgetController = __beyond_dep_ns_0.PageReactWidgetController;
  import StoreManager = ns_1.StoreManager;
  import View = ns_2.View;
  export class Controller extends PageReactWidgetController {
    #private;
    createStore(): StoreManager;
    get Widget(): typeof View;
    /**
     * this method is executed when the widget is showd
     */
    show(): void;
    /**
     * this method is executed when the widget is hidden
     */
    hide(): void;
  }
}


// store.ts
declare namespace ns_1 {
  import IWidgetStore = __beyond_dep_ns_1.IWidgetStore;
  export class StoreManager implements IWidgetStore {}
}


// views\index.tsx
declare namespace ns_2 {
  /// <reference types="react" />
  export function View(): JSX.Element;
}


export import Controller = ns_0.Controller;
export import View = ns_2.View;

export declare const hmr: {on: (event: string, listener: any) => void, off: (event: string, listener: any) => void };