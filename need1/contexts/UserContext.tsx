import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import type { User } from "../types"

interface UserContextType {
  user: User | null
  setUser: (user: User | null) => void
  isLoading: boolean
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // TODO: Check for existing session/token
    // For now, using mock user
    const mockUser: User = {
      id: "1",
      email: "Samuel.Steinmetz@northeastern.edu",
      name: "Samuel Steinmetz",
      avatar: "https://i.pravatar.cc/150?img=1",
      major: "Computer Science",
      graduationYear: 2025,
      skills: ["React", "Python", "Tutoring"],
      isVerified: true,
      karmaScore: 85,
      ecoImpact: 12,
      campusCredits: 450,
    }
    
    setUser(mockUser)
    setIsLoading(false)
  }, [])

  return (
    <UserContext.Provider value={{ user, setUser, isLoading }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
} 