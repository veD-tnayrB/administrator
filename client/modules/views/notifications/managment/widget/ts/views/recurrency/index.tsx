import React from 'react';
import { CollapsibleContainer, CollapsibleHeader, CollapsibleContent } from 'pragmate-ui/collapsible';
import { ButtonGroup, Button } from 'pragmate-ui/components';

export const Recurrency = () => {
	const [selected, setSelected] = React.useState(0);

	const onChange = props => {
		console.log('PROPS => ', props);
	};

	return (
		<CollapsibleContainer>
			<CollapsibleHeader>
				<h3>Recurrency</h3>
			</CollapsibleHeader>
			<CollapsibleContent>
				<ButtonGroup selected={selected}>
					<Button onClick={onChange}>Daily</Button>
					<Button onClick={onChange}>Weekly</Button>
					<Button onClick={onChange}>Monthly</Button>
					<Button onClick={onChange}>Annually</Button>
				</ButtonGroup>
			</CollapsibleContent>
		</CollapsibleContainer>
	);
};
