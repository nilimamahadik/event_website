import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Calendar, MapPin, Clock, DollarSign, Users } from "lucide-react";

interface EventFormData {
  title: string;
  description: string;
  category: string;
  date: string;
  time: string;
  location: string;
  price: number;
  capacity: number;
  imageUrl: string;
}

export default function CreateEvent() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<EventFormData>();

  const onSubmit = async (data: EventFormData) => {
    setIsSubmitting(true);
    try {
      // API call to create event will go here
      console.log("Creating event:", data);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error("Error creating event:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">Create New Event</h1>
          <p className="text-xl text-muted-foreground">Share your event with the community</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Event Title*</Label>
                  <Input
                    id="title"
                    placeholder="Enter event title"
                    {...register("title", { required: "Title is required" })}
                    data-testid="input-event-title"
                  />
                  {errors.title && (
                    <p className="text-destructive text-sm">{errors.title.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category*</Label>
                  <Select onValueChange={(value) => setValue("category", value)}>
                    <SelectTrigger data-testid="select-category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="business">Business</SelectItem>
                      <SelectItem value="music">Music</SelectItem>
                      <SelectItem value="arts">Arts & Culture</SelectItem>
                      <SelectItem value="sports">Sports</SelectItem>
                      <SelectItem value="food">Food & Drink</SelectItem>
                      <SelectItem value="health">Health & Wellness</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description*</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your event"
                  rows={4}
                  {...register("description", { required: "Description is required" })}
                  data-testid="textarea-event-description"
                />
                {errors.description && (
                  <p className="text-destructive text-sm">{errors.description.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="imageUrl">Event Image URL</Label>
                <Input
                  id="imageUrl"
                  type="url"
                  placeholder="https://example.com/image.jpg"
                  {...register("imageUrl")}
                  data-testid="input-image-url"
                />
              </div>
            </CardContent>
          </Card>

          {/* Date & Time */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                Date & Time
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="date">Event Date*</Label>
                  <Input
                    id="date"
                    type="date"
                    {...register("date", { required: "Date is required" })}
                    data-testid="input-event-date"
                  />
                  {errors.date && (
                    <p className="text-destructive text-sm">{errors.date.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="time">Start Time*</Label>
                  <Input
                    id="time"
                    type="time"
                    {...register("time", { required: "Time is required" })}
                    data-testid="input-event-time"
                  />
                  {errors.time && (
                    <p className="text-destructive text-sm">{errors.time.message}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Location */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPin className="w-5 h-5 mr-2" />
                Location
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="location">Event Location*</Label>
                <Input
                  id="location"
                  placeholder="Enter venue name and address"
                  {...register("location", { required: "Location is required" })}
                  data-testid="input-event-location"
                />
                {errors.location && (
                  <p className="text-destructive text-sm">{errors.location.message}</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Pricing & Capacity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <DollarSign className="w-5 h-5 mr-2" />
                Pricing & Capacity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="price">Ticket Price ($)</Label>
                  <Input
                    id="price"
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                    {...register("price", { valueAsNumber: true })}
                    data-testid="input-event-price"
                  />
                  <p className="text-sm text-muted-foreground">Leave as 0 for free events</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="capacity">Maximum Capacity</Label>
                  <Input
                    id="capacity"
                    type="number"
                    min="1"
                    placeholder="50"
                    {...register("capacity", { valueAsNumber: true })}
                    data-testid="input-event-capacity"
                  />
                  <p className="text-sm text-muted-foreground">Maximum number of attendees</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Submit Buttons */}
          <div className="flex items-center justify-end space-x-4">
            <Button type="button" variant="outline" data-testid="button-cancel">
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="btn-primary text-primary-foreground px-8"
              disabled={isSubmitting}
              data-testid="button-create-event"
            >
              {isSubmitting ? "Creating..." : "Create Event"}
            </Button>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
}
