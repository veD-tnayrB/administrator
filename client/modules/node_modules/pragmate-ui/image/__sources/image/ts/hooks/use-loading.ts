import { useEffect, useState } from 'react';
import { IInitialState, IProps, ISetState } from '../interfaces';

export function useLoading(props: IProps): [IInitialState, ISetState] {
    const initialState: IInitialState = { size: '200x200', loaded: false };
    const [image, setImage] = useState<HTMLImageElement | IInitialState>();
    const [state, setState] = useState<IInitialState>(initialState);

    const loadImage = (url: string, size: string): void => {
        let finalSrc: string = url;
        const newImage: HTMLImageElement = new globalThis.Image();
        newImage.onload = (): void =>
            setState({ ...state, loaded: true, error: false });
        newImage.onerror = (): void =>
            setState({ ...state, error: true, loaded: false });
        newImage.src = finalSrc;
        setImage(newImage);
        setState({ ...state, url, size, src: finalSrc, loaded: true });
    };

    useEffect(() => {
        const currentSrc: string = props.src;
        if (state.url !== currentSrc) {
            let size: string = props.size ?? state.size;
            loadImage(currentSrc, size);
        }
        return (): void =>
            setImage({ ...state, onload: undefined, onerror: undefined });
    }, [props.src]);
    return [state, setState];
};
