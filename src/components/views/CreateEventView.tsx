import { motion } from "framer-motion";
import { useAppStore } from "../../store/useAppStore";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { eventsApi } from "../../lib/api";
import { toast } from "sonner";

interface CreateEventForm {
  title: string;
  date: string;
  budget: number;
  category: string;
  guestCount: number;
  description: string;
  location: string;
}

import { useNavigate } from "react-router-dom";

export function CreateEventView() {
  const { setCursorVariant } = useAppStore();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { register, handleSubmit, formState: { errors } } = useForm<CreateEventForm>();

  const createEventMutation = useMutation({
    mutationFn: eventsApi.create,
    onSuccess: () => {
      toast.success("Event created successfully!");
      queryClient.invalidateQueries({ queryKey: ['events'] });
      navigate('/');
    },
    onError: (error: any) => {
      console.error(error);
      toast.error("Failed to create event. Please try again.");
    }
  });

  const onSubmit = (data: CreateEventForm) => {
    createEventMutation.mutate(data);
  };

  return (
    <div className="min-h-screen w-full p-8 md:p-12 md:pl-32 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <header className="mb-12">
          <h2 className="text-6xl font-serif font-bold text-[#1a1a1a] mb-4">
            Create New Event
          </h2>
          <p className="text-xl font-hand text-[#1a1a1a]/60">
            Enter the details below to get started.
          </p>
        </header>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
          {/* Event Name - The Big Title */}
          <div className="relative group">
            <input
              type="text"
              placeholder="Event Name"
              className="w-full bg-transparent text-4xl font-serif font-bold text-[var(--color-ink)] placeholder:text-[var(--color-ink)]/20 border-b-4 border-[var(--color-ink)]/10 focus:border-[var(--color-accent)] focus:outline-none py-4 transition-colors"
              onMouseEnter={() => setCursorVariant("text")}
              onMouseLeave={() => setCursorVariant("default")}
              {...register("title", { required: true })}
            />
            {errors.title && <span className="text-red-500 text-sm font-hand">Event name is required</span>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Date */}
            <div className="space-y-2">
              <label htmlFor="date" className="block font-hand text-lg text-[#1a1a1a]/60">
                Event Date
              </label>
              <input
                type="date"
                id="date"
                className="w-full bg-transparent text-xl font-serif text-[var(--color-ink)] border-b-2 border-[var(--color-ink)]/10 focus:border-[var(--color-accent)] focus:outline-none py-2"
                {...register("date", { required: true })}
              />
              {errors.date && <span className="text-red-500 text-sm font-hand">Date is required</span>}
            </div>

            {/* Budget */}
            <div className="space-y-2">
              <label htmlFor="budget" className="block font-hand text-lg text-[#1a1a1a]/60">
                Total Budget
              </label>
              <input
                type="number"
                id="budget"
                placeholder="$0.00"
                className="w-full bg-transparent text-xl font-serif text-[var(--color-ink)] border-b-2 border-[var(--color-ink)]/10 focus:border-[var(--color-accent)] focus:outline-none py-2"
                {...register("budget")}
              />
            </div>

            {/* Category */}
            <div className="space-y-2">
              <label htmlFor="category" className="block font-hand text-lg text-[#1a1a1a]/60">
                Event Category
              </label>
              <select
                id="category"
                className="w-full bg-transparent text-xl font-serif text-[var(--color-ink)] border-b-2 border-[var(--color-ink)]/10 focus:border-[var(--color-accent)] focus:outline-none py-2 appearance-none"
                {...register("category")}
              >
                <option value="">Select category...</option>
                <option value="wedding">Wedding</option>
                <option value="corporate">Corporate</option>
                <option value="birthday">Birthday</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Guests */}
            <div className="space-y-2">
              <label htmlFor="guests" className="block font-hand text-lg text-[#1a1a1a]/60">
                Guest Count
              </label>
              <input
                type="number"
                id="guests"
                placeholder="0"
                className="w-full bg-transparent text-xl font-serif text-[var(--color-ink)] border-b-2 border-[var(--color-ink)]/10 focus:border-[var(--color-accent)] focus:outline-none py-2"
                {...register("guestCount")}
              />
            </div>

            {/* Location */}
            <div className="space-y-2">
              <label htmlFor="location" className="block font-hand text-lg text-[#1a1a1a]/60">
                Location
              </label>
              <input
                type="text"
                id="location"
                placeholder="Venue"
                className="w-full bg-transparent text-xl font-serif text-[var(--color-ink)] border-b-2 border-[var(--color-ink)]/10 focus:border-[var(--color-accent)] focus:outline-none py-2"
                {...register("location")}
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-4">
            <label htmlFor="description" className="block font-hand text-lg text-[#1a1a1a]/60">
              Description
            </label>
            <textarea
              id="description"
              rows={6}
              className="w-full bg-[var(--color-ink)]/5 rounded-xl p-6 text-lg font-serif text-[var(--color-ink)] placeholder:text-[var(--color-ink)]/20 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/20 resize-none"
              placeholder="Enter event description..."
              {...register("description")}
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-8">
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05, rotate: 2 }}
              whileTap={{ scale: 0.95 }}
              onMouseEnter={() => setCursorVariant("hover")}
              onMouseLeave={() => setCursorVariant("default")}
              disabled={createEventMutation.isPending}
              className="px-8 py-4 bg-[var(--color-ink)] text-[var(--color-paper)] font-hand text-xl font-bold rounded-full shadow-[4px_4px_0px_var(--color-accent)] border-2 border-transparent hover:border-[var(--color-accent)] transition-all disabled:opacity-50"
            >
              {createEventMutation.isPending ? 'Creating...' : 'Create Event'}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
