import Navbar from '@/components/global/Navbar/Navbar';

export default async function IndexRoute() {
   return (
      <div className="w-full h-screen bg-gray-200">
         <Navbar />
      </div>
   );
}
