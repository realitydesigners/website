import { DashboardIcon, ImageIcon, MasterDetailIcon, UserIcon } from '@sanity/icons';

function CustomItem(props) {
   const { title, ...restProps } = props;

   // Determine the type based on the block's schema type
   const type = props.value._type || '';

   const handleDragStart = e => {
      e.dataTransfer.setData('item', JSON.stringify(props.value));
   };

   const handleDragOver = e => {
      e.preventDefault();
   };

   const handleDrop = e => {
      e.preventDefault();
      e.stopPropagation(); // Stop propagation to prevent the "Can't Upload File Here" error
   };

   const iconMap = {
      headingBlock: (
         <MasterDetailIcon
            style={{
               display: 'flex',
               width: '100%',
               height: '100%',
               color: '#777',
            }}
         />
      ),
      contentBlock: (
         <DashboardIcon
            style={{
               display: 'flex',
               width: '100%',
               height: '100%',
               color: '#777',
            }}
         />
      ),
      teamBlock: (
         <UserIcon
            style={{
               display: 'flex',
               width: '100%',
               height: '100%',
               color: '#777',
            }}
         />
      ),
   };

   const defaultIcon = (
      <ImageIcon
         style={{
            display: 'flex',
            width: '100%',
            height: '100%',
            color: '#000',
         }}
      />
   );

   const iconComponent = iconMap[type] || defaultIcon;

   return (
      <div
         draggable="true"
         onDragStart={handleDragStart}
         onDragOver={handleDragOver}
         onDrop={handleDrop}
         style={{
            width: 'auto',
            display: 'flex',
            height: '100%',
            paddingLeft: '1em',
            paddingRight: '1em',
            marginBottom: '1em',
            alignItems: 'center',
         }}
      >
         <div
            style={{
               display: 'flex',
               width: '100%',
               alignItems: 'center',
            }}
         >
            <div
               style={{
                  width: '90%',
                  height: '100%',
               }}
            >
               {props.renderDefault(restProps)}
            </div>
            <div
               style={{
                  width: '50px',
                  height: '50px',
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '0.5em',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#1e1e1e',
                  borderRadius: '.5em',
               }}
            >
               {iconComponent}
               <div
                  style={{
                     color: '#777',
                     fontSize: '0.5em',
                     fontWeight: 'bold',
                     marginBottom: '.5em',
                     textAlign: 'center',
                  }}
               >
                  {title?.toUpperCase()}
               </div>
            </div>
         </div>
      </div>
   );
}

export default CustomItem;
