import { test, expect , Page } from "@playwright/test";
import {
  playFrontEndCustomer,
  playApprove,
  playLoginSec,
} from "./flowcontrol";

var url = "http://192.168.1.169:9604/iLoan_Sec_App/Default/Login.aspx";
var _page: Page;
var AppCode = "";

test.describe.serial("iLoan FrontEnd Test", () => {

  test.beforeAll(async ({ browser }) => {
    _page = await browser.newPage();
  });

  //login sec portal
  test("ล็อกอินเข้าใช้งานระบบ", async () => {
    await playLoginSec(_page, url);
    await expect(_page.locator('span.big').getByText("ระบบงานสินเชื่อ")).toBeVisible;
  });

  test("เปิดใบคำขอกรอกข้อมูลลูกค้า ลูกค้าใหม่", async () => {

    await playFrontEndCustomer(_page);
    AppCode = (await _page.getByText("บันทึกใบคำขอเลขที่:").innerText()).split(': ')[1];
    await expect(_page.getByText('บันทึกใบคำขอเลขที่:')).toBeVisible();
    
  });

  test("อณุมัติสัญญา ลูกค้าใหม่", async () => {
    await playApprove(_page,AppCode);
    await expect(_page.getByText('สร้างสัญญาใหม่เลขที่:')).toBeVisible();
  });

});







