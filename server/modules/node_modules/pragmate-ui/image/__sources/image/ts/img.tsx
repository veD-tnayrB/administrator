import React from 'react';
import { useImageContext } from './context';

export function Img() {
    const { src, setState, state, loading, alt } = useImageContext();
    const onLoad: () => void = (): void =>
        setState({ ...state, error: false, htmlLoaded: true });
    const loadingIMG: 'eager' | 'lazy' =
        (loading && loading === 'eager') || loading === 'lazy'
            ? loading
            : 'eager';
    const altIMG: string = alt ?? ' ';
    return <img src={src} onLoad={onLoad} loading={loadingIMG} alt={altIMG} />;
}
