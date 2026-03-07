// โครงสร้างมาตรฐานสำหรับการตอบกลับ API ทุกเส้นในระบบ ใช้ Generic Type <T> เพื่อรองรับข้อมูลหลากหลายรูปแบบในส่วนของ data
export interface ApiResponse<T> {
  success: boolean; // สถานะงาน
  message: string;  // ข้อความอธิบายผลลัพธ์
  data: T | null;   // ข้อมูลส่งกลับผู้ใช้ ไม่มีส่ง null
}