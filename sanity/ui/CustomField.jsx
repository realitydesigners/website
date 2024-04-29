import { Card, Stack, Text } from "@sanity/ui";

export function CustomField(props) {
	const { title, ...restProps } = props;
	return (
		<Card padding={0} radius={0}>
			<Stack space={1} marginBottom={4}>
				<Text size={1} weight="bold">
					{title?.toUpperCase()}
				</Text>
			</Stack>
			{props.renderDefault(restProps)}
		</Card>
	);
}

export default CustomField;
