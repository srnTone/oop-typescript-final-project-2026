import * as fs from 'fs';
import * as path from 'path';

// เครื่องมือจัดไฟล์ในโปรเจคให้อ่านและเขียนข้อมูลลงไฟล์แบบ JSON ได้ง่ายขึ้น 
export class FileUtil {
  static readJsonFile<T>(filePath: string): T {
    const fullPath = path.join(process.cwd(), filePath);
    const data = fs.readFileSync(fullPath, 'utf-8'); 
    return JSON.parse(data) as T; 
  }
  static writeJsonFile<T>(filePath: string, data: T): void {
    const fullPath = path.join(process.cwd(), filePath);
    fs.writeFileSync(fullPath, JSON.stringify(data, null, 2));
  }
}