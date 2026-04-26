export interface User {
  id: string
  name: string
  email: string
  avatar: string
  role: 'owner' | 'organizer' | 'team-lead' | 'member'
}

export interface Event {
  id: string
  name: string
  type: 'conference' | 'workshop' | 'seminar' | 'webinar' | 'social' | 'other'
  date: string
  venue: string
  description: string
  status: 'planning' | 'active' | 'completed' | 'archived'
  progress: number
  budget: {
    total: number
    spent: number
  }
  teamMembers: string[]
  channels: string[]
  createdAt: string
  updatedAt: string
}

export interface Channel {
  id: string
  eventId: string
  name: string
  description: string
  icon: string
  color: string
  budget: {
    allocated: number
    spent: number
  }
  taskCount: number
  completedTasks: number
  memberCount: number
  lastActivity: string
}

export interface Task {
  id: string
  eventId: string
  channelId: string
  title: string
  description: string
  assignee: string | null
  dueDate: string | null
  priority: 'high' | 'medium' | 'low'
  status: 'todo' | 'in-progress' | 'review' | 'done'
  progress: number
  subtasks: Subtask[]
  comments: Comment[]
  attachments: Attachment[]
  createdAt: string
  updatedAt: string
}

export interface Subtask {
  id: string
  title: string
  completed: boolean
}

export interface Comment {
  id: string
  userId: string
  text: string
  createdAt: string
}

export interface Attachment {
  id: string
  name: string
  url: string
  size: number
  type: string
  uploadedBy: string
  uploadedAt: string
}

export interface Expense {
  id: string
  eventId: string
  channelId: string
  amount: number
  category: string
  description: string
  vendor: string
  date: string
  status: 'pending' | 'approved' | 'rejected'
  receipt: string | null
  approvedBy: string | null
  createdAt: string
}

export interface Document {
  id: string
  eventId: string
  name: string
  path: string
  type: string
  size: number
  uploadedBy: string
  uploadedAt: string
  version: number
  folderId: string | null
}

export interface Folder {
  id: string
  eventId: string
  name: string
  parentId: string | null
}

export interface Message {
  id: string
  eventId: string
  channelId: string
  userId: string
  text: string
  attachments: Attachment[]
  mentions: string[]
  reactions: Reaction[]
  createdAt: string
}

export interface Reaction {
  emoji: string
  userId: string
}

export interface Activity {
  id: string
  eventId: string
  userId: string
  type: 'task_created' | 'task_completed' | 'expense_added' | 'member_added' | 'document_uploaded' | 'message_sent'
  description: string
  metadata: Record<string, any>
  createdAt: string
}

export interface Notification {
  id: string
  userId: string
  type: 'mention' | 'task_assigned' | 'deadline' | 'budget_alert' | 'team_update'
  title: string
  message: string
  read: boolean
  actionUrl: string | null
  createdAt: string
}
