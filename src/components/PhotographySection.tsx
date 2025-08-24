import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Camera, Video, MapPin } from "lucide-react";
import { MediaBanner } from "@/components/shared/MediaBanner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import * as React from "react";

const stillPhotos = [
  {
    id: "72177720328370516",
    albumId: "72177720328370516",
    title: "Snoqualmie Falls",
    src: "//live.staticflickr.com/65535/54721679253_c9c4266eb4_3k.jpg?w=400",
    summary: "Morning hike around the falls enjoying the sights and sounds.",
    location: "Snoqualmie, WA",
  },
  {
    id: "72177720326539958",
    albumId: "72177720326539958",
    title: "Wild Desert",
    src: "https://live.staticflickr.com/65535/54536339555_315a6f005d_4k.jpg?w=400",
    summary: "Wildlife encounters and desert landscapes at The Living Desert Zoo & Gardens.",
    location: "Palm Desert, CA",
  },
  {
    id: "72177720326229155",
    albumId: "72177720326229155",
    title: "Canyon Hike",
    src: "https://live.staticflickr.com/65535/54531845623_2cd383b165_4k.jpg?w=400",
    summary: "Trail views, rugged cliffs, and flowing streams at Sabino Canyon.",
    location: "Sabino Canyon, AZ",
  },
  {
    id: "72177720326131955",
    albumId: "72177720326131955",
    title: "Mount San Jacinto State Park",
    src: "https://live.staticflickr.com/65535/54521916041_ad8ca099a2_6k.jpg?w=400",
    summary: "A day at Mount San Jacinto State Park - 2025.",
    location: "Palm Springs, CA",
  },
  {
    id: "72177720325831279",
    albumId: "72177720325831279",
    title: "Cougar Mountain Zoo",
    src: "https://live.staticflickr.com/65535/54491343537_23cfbcf948_4k.jpg?w=400",
    summary: "Morning taking in the sights on Cougar Moutain.",
    location: "Issaquah, WA",
  },
  {
    id: "72177720324937154",
    albumId: "72177720324937154",
    title: "Botanical Garden",
    src: "https://live.staticflickr.com/65535/54435598693_16a973326e_4k.jpg?w=400",
    summary: "Exploring the diverse flora at the Bellevue Botanical Garden.",
    location: "Bellevue, WA",
  },
  {
    id: "72177720322884577",
    albumId: "72177720322884577",
    title: "WildLights",
    src: "https://live.staticflickr.com/65535/54239058328_feee429a3c_4k.jpg?w=400",
    summary: "Exploring and lights and sights in the desert",
    location: "Palm Desert, CA",
  },
];

const videoProjects = [
  { id: 1, 
    title: "Cove Cinematic Aerial Views", 
    videoId: "6mN4yCdC_v8", 
    description: "A journey through the La Quinta Cove", 
    location: "La Quinta, CA" },
  { id: 2, 
    title: "PGA WEST Pete Dye Mountain Course", 
    videoId: "oW1cTuJPDm0", 
    description: "Life in the modern city", 
    location: "La Quinta, CA" },
  { id: 3, 
    title: "High Flying", 
    videoId: "Kypc2MlZtZ4", 
    description: "Flight of the Blue Angels", 
    location: "Bellevue, WA" },
];

const droneShots = [
  { 
    id: "72177720325965560", 
    albumId: "72177720325965560",
    title: "May 2025 - Drone & Hiking Adventure", 
    src: "https://live.staticflickr.com/65535/54509376917_7bb411c76d_6k.jpg?w=400", 
    summary: "Enjoying a spring flight in the desert cove.", 
    location: "La Quinta, CA" 
  },
  { 
    id: "72177720322548419", 
    albumId: "72177720322548419",
    title: "Dec 2024 - Drone & Hiking Adventure", 
    src: "https://live.staticflickr.com/65535/54241433707_e136c98b55_5k.jpg?w=400", 
    summary: "Enjoying a winter flight in the desert cove.", 
    location: "La Quinta, CA" 
  },
  { 
    id: "72177720316803032", 
    albumId: "72177720316803032",
    title: "May 2024 - Drone & Hiking Adventure", 
    src: "https://live.staticflickr.com/65535/53714070596_6e41956f76_5k.jpg?w=400", 
    summary: "Enjoying a spring flight in the desert cove.", 
    location: "La Quinta, CA" 
  }
];

export function PhotographySection() {
  const [activeTab, setActiveTab] = React.useState<string>("still");

  return (
    <section id="photography" className="py-20 bg-section-gradient">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Photography Portfolio</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Capturing moments and stories through different perspectives and mediums
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          {/* Mobile selector */}
          <div className="mb-4 md:hidden">
            <Select value={activeTab} onValueChange={setActiveTab}>
              <SelectTrigger aria-label="Select media category" data-testid="media-category-select">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="still">Still Photography</SelectItem>
                <SelectItem value="video">Video Projects</SelectItem>
                <SelectItem value="drone-gallery">Drone Gallery</SelectItem>
                <SelectItem value="maps">Maps</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Desktop tabs */}
          <div className="hidden md:block mb-8">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="still" className="flex items-center gap-2">
                <Camera className="h-4 w-4" />
                Still Photography
              </TabsTrigger>
              <TabsTrigger value="video" className="flex items-center gap-2">
                <Video className="h-4 w-4" />
                Video Projects
              </TabsTrigger>
              <TabsTrigger value="drone-gallery" className="flex items-center gap-2">
                <Camera className="h-4 w-4" />
                Drone Gallery
              </TabsTrigger>
              <TabsTrigger value="maps" className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Maps
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="still" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {stillPhotos.map((photo) => (
                <Dialog key={photo.id}>
                  <DialogTrigger asChild>
                    <Card className="group cursor-pointer hover:shadow-glow transition-all duration-300 hover:scale-105">
                      <div className="aspect-square overflow-hidden">
                        <img 
                          src={photo.src} 
                          alt={photo.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <CardHeader className="p-4">
                        <div className="flex flex-wrap items-center gap-2">
                          <CardTitle className="text-sm flex-1 min-w-0 truncate">{photo.title}</CardTitle>
                          {photo.location && (
                            <Badge
                              variant="outline"
                              className="text-xs shrink-0 whitespace-nowrap basis-full sm:basis-auto"
                              title={photo.location}
                              aria-label={`Location: ${photo.location}`}
                            >
                              {photo.location}
                            </Badge>
                          )}
                        </div>
                        {photo.summary ? (
                          <CardDescription className="text-xs mt-1">{photo.summary}</CardDescription>
                        ) : null}
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="mt-2 w-full"
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(`https://www.flickr.com/photos/adam-p-thompson/albums/${photo.albumId}/`, '_blank');
                          }}
                        >
                          View Album
                        </Button>
                      </CardHeader>
                    </Card>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl">
                    <img src={photo.src} alt={photo.title} className="w-full h-auto rounded-lg" />
                  </DialogContent>
                </Dialog>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="video" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videoProjects.map((video) => (
                <Card key={video.id} className="hover:shadow-glow transition-all duration-300">
                  <AspectRatio ratio={16 / 9}>
                    <iframe
                      src={`https://www.youtube.com/embed/${video.videoId}`}
                      title={`${video.title} – YouTube video player`}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </AspectRatio>
                  <CardHeader>
                    <div className="flex flex-wrap items-center gap-2">
                      <CardTitle className="text-sm flex-1 min-w-0 truncate">{video.title}</CardTitle>
                      {video.location && (
                        <Badge
                          variant="outline"
                          className="text-xs shrink-0 whitespace-nowrap basis-full sm:basis-auto"
                          title={video.location}
                          aria-label={`Location: ${video.location}`}
                        >
                          {video.location}
                        </Badge>
                      )}
                    </div>
                    {video.description ? (
                      <CardDescription>{video.description}</CardDescription>
                    ) : null}
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="mt-2 w-full"
                      onClick={() => window.open(`https://www.youtube.com/watch?v=${video.videoId}`, '_blank')}
                    >
                      View Video
                    </Button>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="drone-gallery" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {droneShots.map((shot) => (
                <Card key={shot.id} className="group hover:shadow-glow transition-all duration-300">
                  <MediaBanner src={shot.src} alt={shot.title} />
                  <CardHeader>
                    <div className="flex flex-wrap items-center gap-2">
                      <CardTitle className="text-sm flex-1 min-w-0 truncate">{shot.title}</CardTitle>
                      {shot.location && (
                        <Badge
                          variant="outline"
                          className="text-xs shrink-0 whitespace-nowrap basis-full sm:basis-auto"
                          title={shot.location}
                          aria-label={`Location: ${shot.location}`}
                        >
                          {shot.location}
                        </Badge>
                      )}
                    </div>
                    {shot.summary ? (
                      <CardDescription>{shot.summary}</CardDescription>
                    ) : null}
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="mt-2 w-full"
                      onClick={() => window.open(`https://www.flickr.com/photos/adam-p-thompson/albums/${shot.albumId}/`, '_blank')}
                    >
                      View Album
                    </Button>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="maps" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-6">
                <CardHeader className="p-0 mb-4">
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Drone Flight Locations
                  </CardTitle>
                  <CardDescription>Interactive map of aerial photography locations</CardDescription>
                </CardHeader>
                <AspectRatio ratio={16 / 9}>
                  <iframe
                    src="https://www.google.com/maps/d/embed?mid=1GU0TR2IwUfYCdSQaNiIAI82th4aBxpc&hl=en&ehbc=2E312F"
                    title="Drone flight locations – Google Map"
                    className="w-full h-full rounded-lg"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                  />
                </AspectRatio>
              </Card>

              <Card className="p-6">
                <CardHeader className="p-0 mb-4">
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Hiking Trails
                  </CardTitle>
                  <CardDescription>Photography trails and locations</CardDescription>
                </CardHeader>
                <AspectRatio ratio={16 / 9}>
                  <iframe
                    src="https://www.google.com/maps/d/embed?mid=1LBDq-vmQ6mKccxuUfRVqyDYSqHevRgk&ehbc=2E312F"
                    title="Hiking trails – Google Map"
                    className="w-full h-full rounded-lg"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                  />
                </AspectRatio>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}