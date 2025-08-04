import type { User, Request, Offer, Thread, Message, FlashDrop } from "../../src/types"
import { mockUsers, mockRequests, mockOffers, mockThreads, mockMessages, mockFlashDrops } from "./mockData"

// Simulate API delays
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const api = {
  // Auth
  async sendMagicLink(email: string): Promise<{ success: boolean }> {
    await delay(1000)
    return { success: true }
  },

  async verifyToken(token: string): Promise<{ user: User }> {
    await delay(500)
    return { user: mockUsers[0] }
  },

  // Requests
  async getRequests(page = 0): Promise<Request[]> {
    await delay(800)
    return mockRequests
  },

  async createRequest(request: Partial<Request>): Promise<Request> {
    await delay(1000)
    return { ...mockRequests[0], ...request, id: Date.now().toString() }
  },

  async getRequestById(id: string): Promise<Request> {
    await delay(500)
    return mockRequests.find((r) => r.id === id) || mockRequests[0]
  },

  // Offers
  async getOffers(type: "open" | "my_bids" | "flash_drops"): Promise<Offer[]> {
    await delay(600)
    return mockOffers
  },

  async createOffer(offer: Partial<Offer>): Promise<Offer> {
    await delay(800)
    return { ...mockOffers[0], ...offer, id: Date.now().toString() }
  },

  // Messages
  async getThreads(): Promise<Thread[]> {
    await delay(400)
    return mockThreads
  },

  async getMessages(threadId: string): Promise<Message[]> {
    await delay(300)
    return mockMessages.filter((m) => m.threadId === threadId)
  },

  async sendMessage(threadId: string, text: string): Promise<Message> {
    await delay(200)
    const newMessage: Message = {
      _id: Date.now().toString(),
      text,
      createdAt: new Date(),
      user: {
        _id: "1",
        name: "You",
      },
      threadId,
    }
    return newMessage
  },

  // Flash Drops
  async getFlashDrops(): Promise<FlashDrop[]> {
    await delay(500)
    return mockFlashDrops
  },

  // Profile
  async updateProfile(updates: Partial<User>): Promise<User> {
    await delay(800)
    return { ...mockUsers[0], ...updates }
  },
}
