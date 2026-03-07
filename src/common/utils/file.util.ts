import * as fs from 'fs';
import * as path from 'path';

// เครื่องมือจัดไฟล์ในโปรเจคให้อ่านแบบ JSON ได้ไว
export class FileUtil { // อ่านข้อมูลจากไฟล์ JSON และแปลงเป็น object
  static readJsonFile<T>(filePath: string): T {
    const fullPath = path.join(process.cwd(), filePath); // กำหนดเส้นทางไฟล์ให้ถูกต้องตามตำแหน่งที่รันโปรแกรม
    const data = fs.readFileSync(fullPath, 'utf-8'); // อ่านเนื้อหาภายในไฟล์ (utf-8)
    return JSON.parse(data) as T; // แปลงข้อมูล JSON เป็นข้อมูลที่โปรแกรมใช้งานได้
  }
// นำเข้า object ลงไฟล์แบบ JSON , @param filePath คือเส้นทางไฟล์ที่ต้องการบันทึก, @param data ข้อมูลที่ต้องการเขียนลงไฟล์
  static writeJsonFile<T>(filePath: string, data: T): void {
    const fullPath = path.join(process.cwd(), filePath);
    fs.writeFileSync(fullPath, JSON.stringify(data, null, 2));
  }
}