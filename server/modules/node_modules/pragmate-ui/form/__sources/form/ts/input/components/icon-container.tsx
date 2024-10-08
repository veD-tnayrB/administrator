import React from 'react'
import { Password } from './password'
import { useInputContext } from '../context';
import { Date } from './date';
import { Icon } from './icon';

export function IconContainer(): JSX.Element {
    const { props } = useInputContext();
    const types = {
        password: Password,
        date: Date,
        default: null,
    };
    const output = [];
    if (!!types[props.type]) {
        const Control = types[props.type];
        output.push(<Control key="control" />)
    };
    if (!!props.icon) {
        output.push(<Icon key="icon" />)
    };

    return <>{output}</>
};
