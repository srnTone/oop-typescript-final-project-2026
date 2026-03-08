## 1. Overview

เอกสารฉบับนี้อธิบายรายละเอียดของ RESTful API สำหรับระบบ **Appointment Booking System**  
ซึ่งพัฒนาด้วย NestJS Framework และใช้ Swagger (OpenAPI) สำหรับการจัดทำเอกสาร API

### Base URL


/api


### Swagger Documentation


/api/docs


---

## 2. Standard Response Format

API ทุก Endpoint ใช้มาตรฐานการตอบกลับในรูปแบบเดียวกันดังนี้

```ts
interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T | null;
}
2.1 Success Response Example
{
  "success": true,
  "message": "ดำเนินการสำเร็จ",
  "data": {}
}
2.2 Error Response Example
{
  "statusCode": 404,
  "message": "ไม่พบข้อมูล",
  "error": "Not Found"
}
3. Service APIs
3.1 Service Model
Field	Type	Description
id	string	รหัสบริการที่ไม่ซ้ำกัน
name	string	ชื่อบริการ
description	string	รายละเอียดบริการ
price	number	ราคาค่าบริการ
duration	number	ระยะเวลาให้บริการ (นาที)
category	string	หมวดหมู่บริการ
providerName	string	ชื่อผู้ให้บริการ
status	ServiceStatus	สถานะของบริการ
isActive	boolean	กำหนดการแสดงผลในระบบ
createdAt	string	วันเวลาที่สร้างข้อมูล
updatedAt	string	วันเวลาที่แก้ไขล่าสุด
ServiceStatus Enum

AVAILABLE

UNAVAILABLE

MAINTENANCE

HIDDEN

3.2 GET /api/services

Description:
ดึงข้อมูลบริการทั้งหมดในระบบ

Response: 200 OK

3.3 GET /api/services/{id}

Description:
ดึงข้อมูลบริการตามรหัสที่ระบุ

Path Parameter:

id (string)

Response:

200 OK

404 Not Found (กรณีไม่พบข้อมูล)

3.4 POST /api/services

Description:
สร้างบริการใหม่ในระบบ

Request Body:

{
  "name": "Haircut",
  "description": "Basic haircut service",
  "price": 250,
  "duration": 45,
  "category": "Salon",
  "providerName": "ABC Barber",
  "status": "AVAILABLE"
}

Validation Rules:

name ต้องไม่ว่าง

description ต้องไม่ว่าง

price ต้องเป็นตัวเลข

duration ต้องเป็นตัวเลข

status ต้องเป็นค่าใน ServiceStatus

Response: 201 Created

3.5 PUT /api/services/{id}

Description:
อัปเดตข้อมูลบริการทั้งหมด (Full Update)

Path Parameter:

id (string)

Response: 200 OK
Error: 404 Not Found

3.6 PATCH /api/services/{id}

Description:
แก้ไขข้อมูลบางส่วนของบริการ (Partial Update)

Response: 200 OK

3.7 DELETE /api/services/{id}

Description:
ลบบริการออกจากระบบ

Response: 200 OK

4. Appointment APIs
4.1 Appointment Model
Field	Type	Description
id	string	รหัสการนัดหมาย
serviceId	string	รหัสบริการที่จอง
customerName	string	ชื่อลูกค้า
customerEmail	string	อีเมลลูกค้า
customerPhone	string	เบอร์โทรศัพท์
appointmentDate	string	วันที่เข้ารับบริการ
startTime	string	เวลาเริ่มต้น
status	AppointmentStatus	สถานะการนัดหมาย
notes	string	หมายเหตุเพิ่มเติม
createdAt	string	วันที่สร้างรายการ
updatedAt	string	วันที่แก้ไขล่าสุด
AppointmentStatus Enum

PENDING

CONFIRMED

CANCELLED

COMPLETED

4.2 GET /api/appointments

Description:
ดึงข้อมูลการนัดหมายทั้งหมด

Response: 200 OK

4.3 GET /api/appointments/{id}

Description:
ดึงข้อมูลการนัดหมายตามรหัส

Path Parameter:

id (string)

Response:

200 OK

404 Not Found

4.4 POST /api/appointments

Description:
สร้างรายการนัดหมายใหม่

Request Body Example:

{
  "serviceId": "1741000000000",
  "customerName": "Somchai Jaidee",
  "customerEmail": "somchai@example.com",
  "customerPhone": "+66812345678",
  "appointmentDate": "2026-03-10",
  "startTime": "10:00",
  "notes": "Please call before arrival",
  "status": "PENDING"
}

Validation Rules:

serviceId ต้องมีอยู่ในระบบ

customerEmail ต้องเป็นรูปแบบ email

status ต้องเป็นค่าใน AppointmentStatus

Response: 201 Created
Error: 400 Bad Request (หาก serviceId ไม่ถูกต้อง)

4.5 PUT /api/appointments/{id}

Description:
อัปเดตข้อมูลการนัดหมายทั้งหมด

Response: 200 OK

4.6 PATCH /api/appointments/{id}

Description:
แก้ไขข้อมูลการนัดหมายบางส่วน

Response: 200 OK

4.7 DELETE /api/appointments/{id}

Description:
ลบหรือยกเลิกการนัดหมาย

Response: 200 OK

5. Validation Configuration

ระบบเปิดใช้งาน ValidationPipe แบบ Global ดังนี้:

whitelist: true

forbidNonWhitelisted: true

transform: true

ดังนั้นข้อมูลที่ไม่ได้กำหนดใน DTO จะถูกปฏิเสธโดยอัตโนมัติ

6. Implementation Notes

id ถูกสร้างโดยใช้ Date.now().toString()

ข้อมูลถูกจัดเก็บในรูปแบบ JSON file ภายในระบบ

createdAt และ updatedAt ถูกจัดเก็บเป็น ISO Date String

PUT และ PATCH ใน implementation ปัจจุบันใช้ logic การ merge ข้อมูล
