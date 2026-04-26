import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "../../store/useAppStore";
import { Plus, X, Calendar, Flag } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { tasksApi, eventsApi } from "../../lib/api";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface TaskForm {
  title: string;
  description: string;
  priority: string;
  dueDate: string;
}

export function TaskView() {
  const { setCursorVariant } = useAppStore();
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<TaskForm>();


  const { data: events, isLoading: eventsLoading } = useQuery({
    queryKey: ['events'],
    queryFn: eventsApi.getAll
  });


  const { data: tasks, isLoading: tasksLoading } = useQuery({
    queryKey: ['tasks', selectedEventId],
    queryFn: () => tasksApi.getAll(selectedEventId!),
    enabled: !!selectedEventId
  });

  
  const createTaskMutation = useMutation({
    mutationFn: (data: TaskForm) => tasksApi.create(selectedEventId!, data),
    onSuccess: () => {
      toast.success("Task created successfully!");
      queryClient.invalidateQueries({ queryKey: ['tasks', selectedEventId] });
      setShowCreateModal(false);
      reset();
    },
    onError: () => {
      toast.error("Failed to create task.");
    }
  });

  const updateTaskMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) => tasksApi.update(id, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks', selectedEventId] });
      toast.success("Task updated!");
    }
  });

  const toggleTaskStatus = (task: any) => {
    const newStatus = task.status === 'done' ? 'todo' : 'done';
    updateTaskMutation.mutate({ id: task.id, status: newStatus });
  };

  const onSubmit = (data: TaskForm) => {
    createTaskMutation.mutate(data);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      default: return 'bg-green-500';
    }
  };

  return (
    <div className="min-h-screen w-full p-8 md:p-12 md:pl-32 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <header className="mb-8 flex justify-between items-end">
          <div>
            <h2 className="text-6xl font-serif font-bold text-[#1a1a1a] mb-4">
              Task Management
            </h2>
            <p className="text-xl font-hand text-[#1a1a1a]/60">
              Track progress and deadlines.
            </p>
          </div>

          {selectedEventId && (
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowCreateModal(true)}
              className="w-16 h-16 bg-[var(--color-accent)] rounded-full flex items-center justify-center text-[var(--color-paper)] shadow-[4px_4px_0px_var(--color-ink)] border-2 border-[var(--color-ink)]"
              onMouseEnter={() => setCursorVariant("hover")}
              onMouseLeave={() => setCursorVariant("default")}
            >
              <Plus size={32} />
            </motion.button>
          )}
        </header>

        {/* Event Selection */}
        <div className="mb-8">
          <label className="block font-hand text-lg text-[#1a1a1a]/60 mb-2">Select Event</label>
          <select
            value={selectedEventId || ''}
            onChange={(e) => setSelectedEventId(e.target.value || null)}
            className="w-full md:w-96 bg-white text-xl font-serif text-[var(--color-ink)] border-2 border-[var(--color-ink)]/20 rounded-xl p-3 focus:border-[var(--color-accent)] focus:outline-none"
          >
            <option value="">-- Select an event --</option>
            {events?.map((event: any) => (
              <option key={event.id} value={event.id}>{event.title}</option>
            ))}
          </select>
        </div>

        {/* The Clipboard */}
        <div className="relative bg-white p-8 md:p-12 shadow-[8px_8px_0px_rgba(0,0,0,0.1)] rotate-1 border border-[#e5e5e5]">
          {/* Clip */}
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-32 h-12 bg-[#1a1a1a] rounded-t-xl flex items-center justify-center">
            <div className="w-24 h-4 bg-[#333] rounded-full" />
          </div>

          <div className="space-y-6 mt-4">
            {!selectedEventId ? (
              <div className="text-center font-hand text-[#1a1a1a]/60 py-8">Please select an event to view tasks.</div>
            ) : tasksLoading ? (
              <div className="text-center font-hand text-[#1a1a1a]/60">Loading tasks...</div>
            ) : tasks?.length === 0 ? (
              <div className="text-center font-hand text-[#1a1a1a]/60 py-8">No tasks yet. Click + to create one!</div>
            ) : (
              tasks?.map((task: any) => (
                <motion.div
                  key={task.id}
                  className="flex items-center gap-4 p-4 border-b-2 border-dashed border-[#1a1a1a]/10 group hover:bg-[#1a1a1a]/5 transition-colors"
                  whileHover={{ x: 10 }}
                >
                  <div 
                    onClick={() => toggleTaskStatus(task)}
                    className="w-8 h-8 border-2 border-[var(--color-ink)] rounded-md flex items-center justify-center cursor-pointer hover:bg-[var(--color-accent)]/20 transition-colors"
                  >
                    {task.status === 'done' && <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-4 h-4 bg-[#1a1a1a] rounded-sm" />}
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-serif text-xl ${task.status === 'done' ? 'line-through opacity-50' : ''}`}>
                      {task.title}
                    </h3>
                    <div className="flex items-center gap-3 mt-1">
                      {task.dueDate && (
                        <span className="font-hand text-sm text-[#1a1a1a]/40 flex items-center gap-1">
                          <Calendar size={12} /> {new Date(task.dueDate).toLocaleDateString()}
                        </span>
                      )}
                      {task.priority && (
                        <span className={`text-xs px-2 py-0.5 rounded-full text-white ${getPriorityColor(task.priority)}`}>
                          {task.priority}
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </motion.div>

      
      <AnimatePresence>
        {showCreateModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowCreateModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl border-2 border-[var(--color-ink)]"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-serif font-bold">New Task</h3>
                <button onClick={() => setShowCreateModal(false)} className="p-2 hover:bg-gray-100 rounded-full">
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <label className="block font-hand text-sm text-[#1a1a1a]/60 mb-1">Task Title *</label>
                  <input
                    type="text"
                    {...register("title", { required: true })}
                    className="w-full border-2 border-[var(--color-ink)]/20 rounded-xl p-3 focus:border-[var(--color-accent)] focus:outline-none"
                    placeholder="What needs to be done?"
                  />
                  {errors.title && <span className="text-red-500 text-sm">Title is required</span>}
                </div>

                <div>
                  <label className="block font-hand text-sm text-[#1a1a1a]/60 mb-1">Description</label>
                  <textarea
                    {...register("description")}
                    rows={3}
                    className="w-full border-2 border-[var(--color-ink)]/20 rounded-xl p-3 focus:border-[var(--color-accent)] focus:outline-none resize-none"
                    placeholder="Add details..."
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-hand text-sm text-[#1a1a1a]/60 mb-1">Priority</label>
                    <select
                      {...register("priority")}
                      className="w-full border-2 border-[var(--color-ink)]/20 rounded-xl p-3 focus:border-[var(--color-accent)] focus:outline-none"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-hand text-sm text-[#1a1a1a]/60 mb-1">Due Date</label>
                    <input
                      type="date"
                      {...register("dueDate")}
                      className="w-full border-2 border-[var(--color-ink)]/20 rounded-xl p-3 focus:border-[var(--color-accent)] focus:outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={createTaskMutation.isPending}
                  className="w-full mt-4 py-3 bg-[var(--color-ink)] text-white font-hand text-lg rounded-xl hover:bg-[var(--color-ink)]/90 transition-colors disabled:opacity-50"
                >
                  {createTaskMutation.isPending ? 'Creating...' : 'Create Task'}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
