import React from "react";
import { Icon as PUIIcon } from "pragmate-ui/icons";
import { useInputContext } from "../context";
export function Icon(): JSX.Element {
    const {
        props: { icon },
    } = useInputContext();
    if (!icon) return null;
    return <PUIIcon icon={icon} className="input-icon" />
}
