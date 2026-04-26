export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatDate(date: string): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(date))
}

export function formatRelativeTime(date: string): string {
  const now = new Date()
  const then = new Date(date)
  const diffMs = now.getTime() - then.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMins / 60)
  const diffDays = Math.floor(diffHours / 24)

  if (diffMins < 1) return 'just now'
  if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`
  if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`
  
  return formatDate(date)
}

export function calculateProgress(completed: number, total: number): number {
  if (total === 0) return 0
  return Math.round((completed / total) * 100)
}

export function getBudgetStatus(spent: number, total: number): 'success' | 'warning' | 'danger' {
  const percentage = (spent / total) * 100
  if (percentage < 70) return 'success'
  if (percentage < 90) return 'warning'
  return 'danger'
}

export function getPriorityColor(priority: 'high' | 'medium' | 'low'): string {
  switch (priority) {
    case 'high':
      return 'bg-red-100 text-red-700 border-red-200'
    case 'medium':
      return 'bg-yellow-100 text-yellow-700 border-yellow-200'
    case 'low':
      return 'bg-green-100 text-green-700 border-green-200'
  }
}

export function getStatusColor(status: 'planning' | 'active' | 'completed' | 'archived'): string {
  switch (status) {
    case 'planning':
      return 'bg-blue-100 text-blue-700 border-blue-200'
    case 'active':
      return 'bg-green-100 text-green-700 border-green-200'
    case 'completed':
      return 'bg-purple-100 text-purple-700 border-purple-200'
    case 'archived':
      return 'bg-gray-100 text-gray-700 border-gray-200'
  }
}

export function getTaskStatusColor(status: 'todo' | 'in-progress' | 'review' | 'done'): string {
  switch (status) {
    case 'todo':
      return 'bg-gray-100 text-gray-700 border-gray-200'
    case 'in-progress':
      return 'bg-blue-100 text-blue-700 border-blue-200'
    case 'review':
      return 'bg-yellow-100 text-yellow-700 border-yellow-200'
    case 'done':
      return 'bg-green-100 text-green-700 border-green-200'
  }
}

export function getEventTypeIcon(type: string): string {
  switch (type) {
    case 'conference':
      return '🎤'
    case 'workshop':
      return '🛠️'
    case 'seminar':
      return '📚'
    case 'webinar':
      return '💻'
    case 'social':
      return '🎉'
    default:
      return '📅'
  }
}

export function generateId(prefix: string): string {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.substr(0, maxLength) + '...'
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .substr(0, 2)
}
