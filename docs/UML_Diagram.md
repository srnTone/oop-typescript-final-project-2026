```mermaid
classDiagram
    direction TB

    package Common {
        class ApiResponse {
            <<interface>>
            +success: boolean
            +message: string
            +data: T
        }
    }

    package Enums {
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
    }

    package DataModels {
        class Service {
            +id: string
            +name: string
            +description: string
            +price: number
            +durationMinutes: number
            +status: ServiceStatus
            +category: string
            +isActive: boolean
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
            +status: AppointmentStatus
            +notes: string
            +createdAt: Date
        }
    }

    package Controllers {
        class ServicesController {
            +create(CreateServiceDto) ApiResponse
            +findAll() ApiResponse
            +findOne(id) ApiResponse
            +update(id, UpdateServiceDto) ApiResponse
            +remove(id) ApiResponse
        }

        class AppointmentsController {
            +create(CreateAppointmentDto) ApiResponse
            +findAll() ApiResponse
            +findOne(id) ApiResponse
            +update(id, UpdateAppointmentDto) ApiResponse
            +remove(id) ApiResponse
        }
    }

    package Services {
        class ServicesLogic {
            +create(CreateServiceDto) Service
            +findAll() List~Service~
            +findOne(id) Service
            +update(id, UpdateServiceDto) Service
            +remove(id) void
        }

        class AppointmentsLogic {
            +create(CreateAppointmentDto) Appointment
            +findAll() List~Appointment~
            +findOne(id) Appointment
            +update(id, UpdateAppointmentDto) Appointment
            +remove(id) void
        }
    }

    ServicesController --> ServicesLogic : calls
    AppointmentsController --> AppointmentsLogic : calls
    
    ServicesLogic "1" *-- "*" Service : manages
    AppointmentsLogic "1" *-- "*" Appointment : manages
    
    Appointment "*" --> "1" Service : references serviceId
    
    ServicesController ..> ApiResponse : formats
    AppointmentsController ..> ApiResponse : formats
```