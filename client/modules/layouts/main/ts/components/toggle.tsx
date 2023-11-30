// Toggle.tsx
import React from 'react';
import { Button } from 'pragmate-ui/components';

interface ToggleProps extends React.HTMLAttributes<HTMLButtonElement> {}

export const Toggle: React.FC<ToggleProps> = () => {
	return <Button className="toggle">{'>'}</Button>;
};
