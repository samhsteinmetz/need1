export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  major: string
  graduationYear: number
  skills: string[]
  isVerified: boolean
  karmaScore: number
  ecoImpact: number
  campusCredits: number
}

export interface Request {
  id: string
  title: string
  description: string
  category: string
  budget: number
  location: string
  isRemote: boolean
  deadline: string
  status: "open" | "in_progress" | "completed" | "cancelled"
  seekerId: string
  seeker: User
  bidCount: number
  createdAt: string
  tags: string[]
}

export interface Offer {
  id: string
  requestId: string
  request: Request
  bidderId: string
  bidder: User
  amount: number
  message: string
  status: "pending" | "accepted" | "rejected"
  createdAt: string
}

export interface Message {
  _id: string
  text: string
  createdAt: Date
  user: {
    _id: string
    name: string
    avatar?: string
  }
  threadId: string
}

export interface Thread {
  id: string
  participants: User[]
  lastMessage: Message
  unreadCount: number
  expiresAt: string
  requestId: string
}

export interface SafeSpot {
  id: string
  name: string
  latitude: number
  longitude: number
  description: string
  hours: string
}

export interface FlashDrop {
  id: string
  title: string
  description: string
  endsAt: string
  requests: Request[]
  participantCount: number
}
