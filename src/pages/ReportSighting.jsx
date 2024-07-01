import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

const ReportSighting = () => {
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("date", date);
    formData.append("location", location);
    formData.append("description", description);
    if (image) formData.append("image", image);
    if (video) formData.append("video", video);

    const response = await fetch("/api/report-sighting", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      console.error("Failed to report sighting");
    } else {
      console.log("Sighting reported successfully");
    }
  };

  return (
    <div className="text-center">
      <h1 className="text-3xl mb-4">Report a UFO Sighting</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <Input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
        <Textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <Input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <Input
          type="file"
          accept="video/*"
          onChange={(e) => setVideo(e.target.files[0])}
        />
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default ReportSighting;