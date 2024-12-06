import {
  ClipboardIcon,
  DashboardIcon,
  DatabaseIcon,
  MasterDetailIcon,
  UserIcon
} from '@sanity/icons';

const iconStyle = {
  display: 'flex',
  width: '100%',
  height: '100%',
  color: '#fff'
};

const iconMap = {
  headingBlock: <MasterDetailIcon style={iconStyle} />,
  contentBlock: <DashboardIcon style={iconStyle} />,
  teamBlock: <UserIcon style={iconStyle} />,
  imageCanvasBlock: <UserIcon style={iconStyle} />,
  headingSplineBlock: <DatabaseIcon style={iconStyle} />
};

const defaultIcon = <ClipboardIcon style={{ ...iconStyle, color: '#fff' }} />;

export function CustomItem({ title, value, renderDefault, ...restProps }) {
  const handleDragStart = (e) => {
    e.dataTransfer.setData('item', JSON.stringify(value));
  };

  const iconComponent = iconMap[value._type] || defaultIcon;

  const containerStyle = {
    width: 'auto',
    display: 'flex',
    height: '100%',
    paddingLeft: '1em',
    paddingRight: '1em',
    marginBottom: '1em',
    alignItems: 'center'
  };

  const iconContainerStyle = {
    width: '60px',
    height: '60px',
    display: 'flex',
    flexDirection: 'column',
    padding: '0.5em',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
    borderRadius: '.5em'
  };

  const titleStyle = {
    color: '#fff',
    fontSize: '0.5em',
    fontWeight: 'bold',
    marginBottom: '.5em',
    textAlign: 'center'
  };

  return (
    <div draggable="true" onDragStart={handleDragStart} style={containerStyle}>
      <div style={{ display: 'flex', width: '100%', alignItems: 'center' }}>
        <div style={iconContainerStyle}>
          {iconComponent}
          <div style={titleStyle}>{title?.toUpperCase()}</div>
        </div>
        <div style={{ width: '90%', height: '100%' }}>
          {renderDefault({ value, ...restProps })}
        </div>
      </div>
    </div>
  );
}
