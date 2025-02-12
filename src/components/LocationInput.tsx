import citiesList from "@/lib/cities-list";
import { forwardRef, useMemo, useState } from "react";
import { Input } from "./ui/input";

interface LocationInputProps extends React.HTMLAttributes<HTMLInputElement> {
  onLocationSelected: (location: string) => void;
}

export default forwardRef<HTMLInputElement, LocationInputProps>(function LocationInput(
  { onLocationSelected, ...props },
  ref
) {
  const [locationSearchInput, setLocationSearchInput] = useState("");

  const cities = useMemo(() => {
    if (!locationSearchInput.trim()) return [];

    const searchWords = locationSearchInput.split(" ");

    return citiesList
      .map((city) => `${city.name}, ${city.subcountry}, ${city.country}`)
      .filter(
        (city) =>
          city.toLowerCase().startsWith(searchWords[0].toLowerCase()) &&
          searchWords.every((word) => city.toLowerCase().includes(word.toLowerCase()))
      )
      .slice(0, 5);
  }, [locationSearchInput]); // ✅ Fix: Proper dependency array

  return<div className="relative">

   <Input 
   placeholder="Search for a City "
   onChange={(e)=>setLocationSearchInput(e.target.value)}
   
   {...props} ref={ref} 
   />
   {locationSearchInput.trim()&&(
    <div className=" absolute z-20 divide-y bg-background shadow-xl border-b-rounded ">
        {!cities.length && <p className="p-3"> No results found</p>}
        {cities.map(city=>(
            <button key ={city} className="block w-full text-start p-2">
            {city}
            </button>
        ))}
    </div>
   )}

   </div>;
});
