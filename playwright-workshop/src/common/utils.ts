// import faker from '../../node_modules/faker';
import { faker } from '@faker-js/faker';

// export function genUser(){
//   return  {
//     name: faker.person.fullName(),
//     email: faker.internet.email(),
//     phone: faker.phone.number(),
//     address: faker.location.streetAddress(),
//   };
// }

export async function genUserName(): Promise<{ firstname: string; lastname: string; nickname: string; email: string} | undefined> {
  try {
    const response = await fetch('https://kidhaina.com/json/thainames.json');
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    return {
      firstname: genFirstnameMale(data.firstnameMale),
      lastname: genLastname(data.lastname),
      nickname: genNicknameMale(data.nicknameMale),
      email: faker.internet.email()
    };
  } catch (err) {
    console.error('Error:', err);
    return undefined;
  }
}

type NameListModel = {
  "th": string;
  "en": string
}

function genFirstnameMale(names: NameListModel[]): string {
  return names[Math.floor(Math.random() * names.length)].th;
}

function genLastname(names: NameListModel[]): string {
  return names[Math.floor(Math.random() * names.length)].th;
}

function genNicknameMale(names: NameListModel[]): string {
  return names[Math.floor(Math.random() * names.length)].th;
}



export function genCitizenId(): string {
  let result: string = "";
  let id12: string = "";

  for (let i = 0; i < 12; i++) {
    id12 += Math.floor(Math.random() * 10).toString(); // ใช้ Math.floor และแปลงเป็น string
  }

  result = id12 + finddigit(id12);
  return result;
}

function finddigit(id: string): number {
  let base: number = 100000000000; // สร้างตัวแปรเพื่อสำหรับให้หารเพื่อเอาหลักที่ต้องการ
  let basenow: number; // สร้างตัวแปรเพื่อเก็บค่าประจำหลัก
  let sum: number = 0; // สร้างตัวแปรเริ่มตัวผลบวกให้เท่ากับ 0

  // แปลง id จาก string เป็น number เพื่อให้สามารถใช้กับการคำนวณ
  let idNumber: number = parseInt(id);

  for (let i = 13; i > 1; i--) {
    basenow = Math.floor(idNumber / base); // หาค่าประจำตำแหน่งนั้น ๆ
    idNumber = idNumber - basenow * base; // ลดค่า id ลงทีละหลัก
    sum += basenow * i; // บวกค่า sum ไปเรื่อย ๆ ทีละหลัก
    base = base / 10; // ตัดค่าที่ใช้สำหรับการหาเลขแต่ละหลัก
  }

  // คำนวณค่า checkbit
  let checkbit: number = (11 - (sum % 11)) % 10;
  return checkbit;
}

export function generateRandomNumByDigit(length: number = 10): string {
    let accountNumber = "";
    for (let i = 0; i < length; i++) {
      accountNumber += Math.floor(Math.random() * 10); // สุ่มตัวเลข 0-9
    }
    return accountNumber;
  }

export function generateRandomAccountNumber(length: number = 10): string {
  let accountNumber = "";
  for (let i = 0; i < length; i++) {
    accountNumber += Math.floor(Math.random() * 10); // สุ่มตัวเลข 0-9
  }
  return accountNumber;
}



export function generateRandomAlpNumber(length: number = 17): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"; // ใช้ตัวอักษรและตัวเลข
  let chassisNumber = "";

  for (let i = 0; i < length; i++) {
    chassisNumber += chars[Math.floor(Math.random() * chars.length)];
  }

  return chassisNumber;
}

export function generateRandomLICNumber(length: number = 6): string {
  const charsnum = "0123456789"; // ใช้ตัวอักษรและตัวเลข
  const charsthaialp = "กขคฆงจฉชซฌญฎฏฐฑฒณดตถทธนบปผฝพฟภมยรลวศษสหฬอฮ"; // ใช้ตัวอักษรและตัวเลข
  let LICNumber = "";

  for (let i = 0; i < length; i++) {
    if (i < 2) {
      LICNumber +=
        charsthaialp[Math.floor(Math.random() * charsthaialp.length)];
    } else {
      LICNumber += charsnum[Math.floor(Math.random() * charsnum.length)];
    }
  }

  return LICNumber;
}

function parseDateString(dateStr: string): Date {
  const [day, month, year] = dateStr.split("/").map(Number);
  return new Date(year, month - 1, day); // เดือนต้องลบ 1 เพราะ index เริ่มที่ 0
}

export function getBirthDate(dateStr: string, minusYear: number): string {
  const date = parseDateString(dateStr);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear() - minusYear;
  return `${day}/${month}/${year}`;
}
