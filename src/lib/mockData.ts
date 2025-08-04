import type { User, Request, Offer, Thread, Message, SafeSpot, FlashDrop } from "../../src copy/types"

export const mockUsers: User[] = [
  {
    id: "1",
    email: "john.doe@northeastern.edu",
    name: "John Doe",
    avatar: "https://i.pravatar.cc/150?img=1",
    major: "Computer Science",
    graduationYear: 2025,
    skills: ["React", "Python", "Tutoring"],
    isVerified: true,
    karmaScore: 85,
    ecoImpact: 12,
    campusCredits: 450,
  },
  {
    id: "2",
    email: "jane.smith@northeastern.edu",
    name: "Jane Smith",
    avatar: "https://i.pravatar.cc/150?img=2",
    major: "Business",
    graduationYear: 2024,
    skills: ["Marketing", "Design", "Writing"],
    isVerified: true,
    karmaScore: 92,
    ecoImpact: 8,
    campusCredits: 320,
  },
]

export const mockRequests: Request[] = [
  {
    id: "1",
    title: "Need help with CS 2500 homework",
    description: "Looking for someone to help me understand recursion concepts and debug my code.",
    category: "Tutoring",
    budget: 25,
    location: "Snell Library",
    isRemote: false,
    deadline: "2024-01-20T18:00:00Z",
    status: "open",
    seekerId: "1",
    seeker: mockUsers[0],
    bidCount: 3,
    createdAt: "2024-01-15T10:00:00Z",
    tags: ["CS2500", "Programming", "Urgent"],
  },
  {
    id: "2",
    title: "Move furniture to new dorm",
    description: "Need 2 people to help move some furniture from West Village to IV.",
    category: "Moving",
    budget: 40,
    location: "West Village F",
    isRemote: false,
    deadline: "2024-01-18T16:00:00Z",
    status: "open",
    seekerId: "2",
    seeker: mockUsers[1],
    bidCount: 1,
    createdAt: "2024-01-16T14:30:00Z",
    tags: ["Physical", "Quick"],
  },
]

export const mockOffers: Offer[] = [
  {
    id: "1",
    requestId: "1",
    request: mockRequests[0],
    bidderId: "2",
    bidder: mockUsers[1],
    amount: 25,
    message: "I can help! I aced CS 2500 last semester.",
    status: "pending",
    createdAt: "2024-01-15T11:00:00Z",
  },
]

export const mockMessages: Message[] = [
  {
    _id: "1",
    text: "Hi! When would be a good time to meet?",
    createdAt: new Date("2024-01-15T12:00:00Z"),
    user: {
      _id: "2",
      name: "Student #2847",
    },
    threadId: "1",
  },
  {
    _id: "2",
    text: "How about tomorrow at 3pm in Snell?",
    createdAt: new Date("2024-01-15T12:05:00Z"),
    user: {
      _id: "1",
      name: "Student #1923",
    },
    threadId: "1",
  },
]

export const mockThreads: Thread[] = [
  {
    id: "1",
    participants: [mockUsers[0], mockUsers[1]],
    lastMessage: mockMessages[1],
    unreadCount: 0,
    expiresAt: "2024-01-22T12:00:00Z",
    requestId: "1",
  },
]

export const mockSafeSpots: SafeSpot[] = [
  {
    id: "1",
    name: "Curry Student Center",
    latitude: 42.3398,
    longitude: -71.0892,
    description: "Main lobby, well-lit and monitored",
    hours: "24/7",
  },
  {
    id: "2",
    name: "Snell Library Entrance",
    latitude: 42.3387,
    longitude: -71.0877,
    description: "Front entrance with security desk",
    hours: "6 AM - 2 AM",
  },
  {
    id: "3",
    name: "ISEC Lobby",
    latitude: 42.3401,
    longitude: -71.0863,
    description: "Ground floor lobby with cameras",
    hours: "6 AM - 11 PM",
  },
]

export const mockFlashDrops: FlashDrop[] = [
  {
    id: "1",
    title: "Finals Week Rush",
    description: "Quick tutoring sessions and study help",
    endsAt: "2024-01-20T23:59:59Z",
    requests: mockRequests.slice(0, 1),
    participantCount: 24,
  },
]
