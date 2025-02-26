import { test, expect } from "@playwright/test";
import {
  playFrontEndCustomer,
  nextToAsset,
  playFrontEndAssetAT05,
  playFrontEndCal,
  playFrontEndAdvance,
  playApprove,
  playLoginSec,
} from "./common/flowcontrol";

var firstname = "testbot";
var lastname = "testtest1";
var url = "http://192.168.1.169:9604/iLoan_Sec_App/Default/Login.aspx";

var AppCode = "";

test("เปิดใบคำขอกรอกข้อมูลลูกค้า ลูกค้าใหม่", async ({ page }) => {
  await playLoginSec(page, url);
  await playFrontEndCustomer(page, firstname, lastname);
  await nextToAsset(page);
  await playFrontEndAssetAT05(page);
  await playFrontEndCal(page);
  await playFrontEndAdvance(page);
  AppCode = (await page.getByText("บันทึกใบคำขอเลขที่:").innerText()).split(': ')[1];
  // await expect(page.getByText('บันทึกใบคำขอเลขที่:')).toBeVisible();
  await playApprove(page,AppCode);
  await expect(page.getByText('สร้างสัญญาใหม่เลขที่:')).toBeVisible();
  
});

