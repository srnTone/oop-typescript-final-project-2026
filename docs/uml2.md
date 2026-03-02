@startuml

class User {
  id: string
  fullName: string
  email: string
  phone: string
  role: UserRole
}

class Room {
  id: string
  roomNumber: string
  type: RoomType
  pricePerNight: number
  capacity: number
  status: RoomStatus
}

class Booking {
  id: string
  userId: string
  roomId: string
  checkInDate: string
  checkOutDate: string
  totalPrice: number
  status: BookingStatus
}

class Payment {
  id: string
  bookingId: string
  amount: number
  paymentDate: string
  method: PaymentMethod
  status: PaymentStatus
}

enum UserRole {
  ADMIN
  CUSTOMER
}

enum RoomType {
  STANDARD
  DELUXE
  SUITE
}

enum RoomStatus {
  AVAILABLE
  OCCUPIED
  MAINTENANCE
}

enum BookingStatus {
  PENDING
  CONFIRMED
  CANCELLED
  COMPLETED
}

enum PaymentMethod {
  CREDIT_CARD
  BANK_TRANSFER
  CASH
}

enum PaymentStatus {
  PENDING
  PAID
  FAILED
}

User "1" -- "many" Booking
Room "1" -- "many" Booking
Booking "1" -- "1" Payment

@enduml
