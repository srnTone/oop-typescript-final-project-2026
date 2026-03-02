classDiagram
    direction TB

    %% =========================
    %% Generic API Response
    %% =========================
    class ApiResponse~T~ {
        <<interface>>
        +success: boolean
        +message: string
        +data: T
        +timestamp: Date
    }

    %% =========================
    %% ENUMS
    %% =========================
    class ServiceStatus {
        <<enumeration>>
        AVAILABLE
        UNAVAILABLE
        MAINTENANCE
    }

    class AppointmentStatus {
        <<enumeration>>
        PENDING
        CONFIRMED
        CANCELLED
        COMPLETED
    }

    %% =========================
    %% CORE MODELS
    %% =========================
    class Service {
        +id: string
        +name: string
        +description: string
        +price: number
        +durationMinutes: number
        +status: ServiceStatus
        +category: string
        +createdAt: Date
        +updatedAt: Date
    }

    class Appointment {
        +id: string
        +serviceId: string
        +customerName: string
        +customerEmail: string
        +customerPhone: string
        +appointmentDate: Date
        +startTime: string
        +endTime: string
        +status: AppointmentStatus
        +notes: string
        +createdAt: Date
        +updatedAt: Date
    }

    %% =========================
    %% CONTROLLERS
    %% =========================
    class ServicesController {
        +create(dto: CreateServiceDto) ApiResponse~Service~
        +findAll() ApiResponse~Service[]~
        +findOne(id: string) ApiResponse~Service~
        +update(id: string, dto: UpdateServiceDto) ApiResponse~Service~
        +remove(id: string) ApiResponse~void~
    }

    class AppointmentsController {
        +create(dto: CreateAppointmentDto) ApiResponse~Appointment~
        +findAll() ApiResponse~Appointment[]~
        +findOne(id: string) ApiResponse~Appointment~
        +update(id: string, dto: UpdateAppointmentDto) ApiResponse~Appointment~
        +remove(id: string) ApiResponse~void~
    }

    %% =========================
    %% SERVICES (BUSINESS LOGIC)
    %% =========================
    class ServicesService {
        +create(dto: CreateServiceDto) Service
        +findAll() Service[]
        +findOne(id: string) Service
        +update(id: string, dto: UpdateServiceDto) Service
        +remove(id: string) void
    }

    class AppointmentsService {
        +create(dto: CreateAppointmentDto) Appointment
        +findAll() Appointment[]
        +findOne(id: string) Appointment
        +update(id: string, dto: UpdateAppointmentDto) Appointment
        +remove(id: string) void
        -validateTimeSlot(serviceId: string, date: Date, startTime: string, endTime: string) boolean
    }

    %% =========================
    %% RELATIONSHIPS
    %% =========================
    ServicesController --> ServicesService : calls
    AppointmentsController --> AppointmentsService : calls

    ServicesService "1" *-- "*" Service : manages
    AppointmentsService "1" *-- "*" Appointment : manages

    Appointment "*" --> "1" Service : belongsTo

    ServicesController ..> ApiResponse : formats
    AppointmentsController ..> ApiResponse : formats

    %% =========================
    %% BUSINESS RULE NOTES
    %% =========================
    note for Appointment
        - endTime must be later than startTime
        - cannot book past date/time
        - cannot overlap same service on same date
        - service must have status = AVAILABLE
    end note

    note for Service
        - durationMinutes must be > 0
        - price must be >= 0
    end note
