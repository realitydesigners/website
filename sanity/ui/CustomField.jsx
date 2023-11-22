import { Card, Stack, Text } from '@sanity/ui';

export function CustomField(props) {
   const { title, ...restProps } = props;
   return (
      <Card border padding={4} radius={4}>
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
