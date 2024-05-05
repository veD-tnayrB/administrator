import React from 'react';

export interface IContext {
	permissions: Map<string, Record<string, string>>;

}

export const ModulesListContext = React.createContext({} as IContext);
export const useModulesListContext = () => React.useContext(ModulesListContext);
