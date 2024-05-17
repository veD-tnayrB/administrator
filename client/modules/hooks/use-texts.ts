import { createContext, useContext, useState, useEffect, Context } from 'react';
import { CurrentTexts } from '@beyond-js/kernel/texts';
interface IDocsValue {
	ready?: boolean;
	texts?: object;
}
type UseText<T> = [ready: boolean, texts?: T];

const value: IDocsValue = {};
export /*bundle*/ const DocsContext: Context<IDocsValue> = createContext<IDocsValue>(value);
export /*bundle*/ const useDocsContext: () => IDocsValue = (): IDocsValue => useContext<IDocsValue>(DocsContext);

/**
 * It returns a boolean and an object. The boolean is true when the object is ready.
 * The object is a collection of strings.
 * @param {string} moduleId - string - the module id of the texts you want to use
 * @returns An array of two elements. The first element is a boolean, the second element is an object.
 */
export /*bundle*/
function useTexts<T>(moduleId: string): UseText<T> {
	const [ready, setReady] = useState<boolean>(false);

	const [texts, setTexts] = useState<T>();

	useEffect((): (() => void) => {
		const modelTexts: CurrentTexts<unknown> = new CurrentTexts(moduleId);

		const triggerEvent: () => void = (): void => {
			const texts: T = <T>modelTexts.value;
			setReady(modelTexts.ready);
			setTexts(texts);
		};
		modelTexts.bind('change', triggerEvent);
		triggerEvent();
		return (): void => {
			modelTexts.unbind('change', triggerEvent);
		};
	}, []);

	const isReady: boolean = ready && !!texts;

	return [isReady, texts];
}
