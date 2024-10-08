import * as React from 'react';
import { IContext } from './interfaces';

export const ImageContext: React.Context<IContext> = React.createContext({});
export const useImageContext = (): IContext => React.useContext(ImageContext);
