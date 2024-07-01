import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const fetchSightings = async () => {
  const response = await fetch("/api/sightings");
  if (!response.ok) {
    throw new Error("Failed to fetch sightings");
  }
  return response.json();
};

const Sightings = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["sightings"],
    queryFn: fetchSightings,
  });
  const [search, setSearch] = useState("");

  const filteredSightings = data?.filter(
    (sighting) =>
      sighting.date.includes(search) || sighting.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="text-center">
      <h1 className="text-3xl mb-4">All UFO Sightings</h1>
      <Input
        type="text"
        placeholder="Search by date or location"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-8"
      />
      {isLoading && <p>Loading...</p>}
      {error && <p>Error loading sightings: {error.message}</p>}
      {filteredSightings && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSightings.map((sighting) => (
            <Card key={sighting.id}>
              <CardHeader>
                <CardTitle>{sighting.date}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{sighting.location}</p>
                <p>{sighting.description}</p>
                {sighting.image && <img src={sighting.image} alt="UFO" />}
                {sighting.video && (
                  <video controls>
                    <source src={sighting.video} type="video/mp4" />
                  </video>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Sightings;