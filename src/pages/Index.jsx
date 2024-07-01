import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";

const fetchLatestSightings = async () => {
  const response = await fetch("/api/latest-sightings");
  if (!response.ok) {
    throw new Error("Failed to fetch latest sightings");
  }
  return response.json();
};

const Index = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["latestSightings"],
    queryFn: fetchLatestSightings,
  });

  return (
    <div className="text-center">
      <h1 className="text-3xl mb-4">UFO Sightings in the USA</h1>
      <p className="mb-8">Stay updated with the latest UFO sightings across the USA.</p>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error loading sightings: {error.message}</p>}
      {data && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.map((sighting) => (
            <Card key={sighting.id}>
              <CardHeader>
                <CardTitle>{sighting.date}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{sighting.location}</p>
                <p>{sighting.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Index;