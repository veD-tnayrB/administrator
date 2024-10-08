import React from 'react'
import { ISrcSet } from '../interfaces'

export function Item(props: ISrcSet) {
    if (!props.srcSet) return null;
    let media: string = "";
    const { maxWidth, minWidth } = props;
    if (!maxWidth && !!minWidth) media = `(min-width: ${minWidth}px)`;
    if (!!maxWidth && !minWidth) media = `(max-width: ${maxWidth}px)`;
    if (!!maxWidth && !!minWidth) media = `(min-width: ${minWidth}px) and (max-width: ${maxWidth}px)`;
    const properties = { ...props };
    ["maxWidth", "minWidth"].forEach(item => delete properties[item])
    return <source media={media} {...properties} />
};
