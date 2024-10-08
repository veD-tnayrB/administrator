import { createContext, useContext, Context } from "react";

export const MenuContext: Context<any> = createContext({ });
export const useMenuContext: () => any = (): any => useContext(MenuContext);
