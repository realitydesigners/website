const SplineCard = ({ url }) => {
   return (
      <div className="h-screen w-full">
         <spline-viewer url={url}></spline-viewer>
      </div>
   );
};

const SplineRefWrapper = ({ value }) => {
   const { url } = value;
   if (!url) return null;

   return <SplineCard url={url} />;
};

export default SplineRefWrapper;
