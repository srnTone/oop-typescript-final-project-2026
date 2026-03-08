## Appointment Booking System API

## Project Overview
โปรเจคนี้เป็นส่วนหนึ่งของรายวิชาการพัฒนา Backend พัฒนาด้วย NestJS Framework 
เพื่อจัดการระบบจองบริการและนัดหมาย (Appointment Booking System) โดยเน้นความปลอดภัยของข้อมูล (Type-safe)
และการจัดการข้อมูลผ่านไฟล์ JSON

---

## Technology Stack
- **Framework:** NestJS
- **Language:** TypeScript
- **API Documentation:** Swagger (OpenAPI)
- **Validation:** class-validator & class-transformer
- **Database:** File-based JSON storage

---

## Installation and Running the Project

### 1. Clone the Repository
```bash
git clone https://github.com/srnTone/oop-typescript-final-project-2026.git
cd oop-typescript-final-project-2026

```
### 2. Install Dependencies
```bash
npm install
```

### 3. Run the Project

Development mode:

``` bash
npm run start:dev
```

Production mode:

``` bash
npm run build
npm run start:prod
```

### 4. Access the Application

Base URL:

    http://localhost:3000/api

Swagger Documentation:

    http://localhost:3000/api/docs

------------------------------------------------------------------------

## Project Structure (Summary)

    src/
     ├── common/                # Shared interfaces and utilities
     ├── modules/
     │    ├── service/          # Service module (CRUD for services)
     │    └── appointment/      # Appointment module (CRUD for appointments)
     ├── app.module.ts
     └── main.ts

    docs/
     ├── api-specification.md
     ├── Data_Model_Documentation.md
     └── UML_Diagram.md

------------------------------------------------------------------------

## Documentation Links

* [API Specification](docs/api-specification.md)
* [Data Model Documentation](docs/Data_Model_Documentation.md)
* [UML Diagram](docs/UML_Diagram.md)

------------------------------------------------------------------------