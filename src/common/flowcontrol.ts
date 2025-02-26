import {
  genCitizenId,
  generateRandomNumByDigit,
  generateRandomAccountNumber,
  generateRandomAlpNumber,
  generateRandomLICNumber,
  getBirthDate,
} from "./utils";

export async function playLoginSec(page, url): Promise<void> {
  await page.goto(url);
  // await page.locator("#txtUsername_txtText").click();
  await page.locator("#txtUsername_txtText").fill("Administrator");
  // await page.locator("#txtPassword_txtText").click();
  await page.locator("#txtPassword_txtText").fill("XqUb5xx");
  await page.getByRole("button", { name: "Login" }).click();
  //กรณีมี alert แจ้งเตือน
  // const [dialog] = await Promise.all([
  //   page.waitForEvent('dialog'),  // รอให้ Alert ปรากฏขึ้น
  // ]);
  // await dialog.accept();
  await page.frameLocator("#AjaxFrame").locator("#btnOK").click();
  await page.locator("div.details.details-noImage span.big").click();
  // await page.getByText('บริษัท ไอทอส คอนซัลติ้ง จำกัด').click();
  await page.getByText("สำนักงานใหญ่").click();
}

export async function playLocalFrontEnd(page): Promise<void> {
  await playFrontEndCustomer(page, "testLocal", "testtest2");
}

export async function playFrontEndCustomer(
  page,
  firstname,
  lastname
): Promise<void> {
  await playFrontEndCustomerGeneralFill(page, firstname, lastname);
  await playFrontEndAddressFill(page);
  await playFrontEndTelFill(page);
  await playFrontEndAccountFill(page);
  await playFrontEndcareerFill(page);
  await playFrontEndcreditFill(page);
}

async function playFrontEndCustomerGeneralFill(
  page,
  firstname,
  lastname
): Promise<void> {
  await page
    .getByRole("listitem")
    .filter({ hasText: "ระบบงานสินเชื่อ" })
    .getByRole("img")
    .click();

  await page.waitForTimeout(500);
  await page.getByRole("link", { name: "ใบคำขอ" }).click();
  await page.getByRole("link", { name: "เปิดใบคำขอ", exact: true }).click();
  await page.getByRole("link", { name: " เพิ่ม" }).click();
  await page
    .getByRole("textbox", { name: "ชื่อ", exact: true })
    .first()
    .click();
  await page
    .getByRole("group", { name: "ข้อมูลทั่วไป" })
    .getByLabel("คำนำหน้า")
    .selectOption("TITLE01");
  await page.getByRole("textbox", { name: "ชื่อ", exact: true }).click();
  await page
    .getByRole("textbox", { name: "ชื่อ", exact: true })
    .fill(firstname);
  await page.getByRole("textbox", { name: "นามสกุล" }).click();
  await page.getByRole("textbox", { name: "นามสกุล" }).fill(lastname);
  await page.getByRole("textbox", { name: "ชื่อเล่น" }).click();
  await page.getByRole("textbox", { name: "ชื่อเล่น" }).fill("t");
  await page.getByLabel("สถานภาพสมรส").selectOption("SP01");
  var sysDate = await page
    .locator("#dashboard-report-range.yellow-gold")
    .innerText();
  await page.locator("#BirthDate").click();
  await page.getByRole("textbox", { name: "วันเกิด" }).click();
  await page.locator("#BirthDate").fill(getBirthDate(sysDate, 33));

  await page.locator("#IssueDate").click();
  await page.getByRole("textbox", { name: "วันออกบัตร" }).click();
  await page.locator("#IssueDate").fill(getBirthDate(sysDate, 2));

  await page
    .getByRole("textbox", { name: "บัตรประชาชน / หนังสือรับรอง" })
    .click();
  await page
    .getByRole("textbox", { name: "บัตรประชาชน / หนังสือรับรอง" })
    .fill(genCitizenId());
  await page.getByLabel("ประเภทบัตรแสดงตน").click();
  await page.getByRole("button", { name: "ตกลง" }).click();
}

async function playFrontEndAddressFill(page): Promise<void> {
  // กรอกข้อมูลที่อยู่
  await page.getByRole("textbox", { name: "-- กรุณาเลือก --" }).click();
  await page
    .getByRole("treeitem", { name: "ที่อยู่ตามทะเบียนบ้าน/ภพ.20" })
    .click();
  await page.locator("ul.select2-selection__rendered").click();
  await page.getByRole("treeitem", { name: /ปัจจุบัน/ }).click();
  await page.locator("ul.select2-selection__rendered").click();
  // await page.getByRole('treeitem', { name: /ภพ.20/ }).click();
  await page.getByRole("treeitem", { name: "ที่อยู่ ภพ.20" }).click();
  await page.locator("#HouseNumber").click();
  await page.locator("#HouseNumber").fill("11/1");
  await page.locator("#select2-SubDistrict-container").click();
  await page.locator('input[type="search"]').nth(1).fill("ราษ");
  // await page.getByRole('treeitem', { name: 'สำราญราษฎร์, พระนคร, กรุงเทพมหานคร' }).click();
  await page.locator("role=treeitem >> nth=2").click();
  await page.locator("#addressPanel").getByText("เพิ่ม").click();
}

async function playFrontEndTelFill(page): Promise<void> {
  //กรอกข้อมูลเบอร์โทร
  await page
    .getByRole("group", { name: "ข้อมูลหมายเลขโทรศัพท์" })
    .getByLabel("ประเภท")
    .selectOption("P02");
  await page.getByRole("textbox", { name: "หมายเลข", exact: true }).click();
  await page
    .getByRole("textbox", { name: "หมายเลข", exact: true })
    .fill("0961111111");
  await page.locator("#phoneNoPanel").getByText("เพิ่ม").click();
}

async function playFrontEndAccountFill(page): Promise<void> {
  //กรอกข้อมูลบช.
  await page.locator("#select2-BankCode-container").click();
  await page.getByRole("treeitem", { name: "(004" }).click();
  await page.locator("#select2-BankBranchCode-container").click();
  await page.waitForTimeout(500);
  await page.getByRole("treeitem", { name: "(0002" }).click();
  await page.getByRole("textbox", { name: "หมายเลขบัญชี" }).click();
  await page
    .getByRole("textbox", { name: "หมายเลขบัญชี" })
    .fill(generateRandomAccountNumber());
  await page.getByRole("textbox", { name: "ชื่อ-สกุล เจ้าของบัญชี" }).click();
  await page
    .getByRole("textbox", { name: "ชื่อ-สกุล เจ้าของบัญชี" })
    .fill("test test");
  await page.locator("#bankBookPanel").getByText("เพิ่ม").click();
}

async function playFrontEndcareerFill(page): Promise<void> {
  //กรอกข้อมูลอาชีพ
  await page.waitForSelector(".blockUI", { state: "hidden", timeout: 60000 });
  await page.locator("#select2-BusinessTypeId-container").click();
  await page.locator("role=treeitem >> nth=2").click();
  await page.waitForSelector(".blockUI", { state: "hidden", timeout: 60000 });
  await page.locator("#select2-OccupationTypeId-container").click();
  await page.locator("role=treeitem >> nth=1").click();
  // await page.getByRole('treeitem', { name: 'สถาปนิก,วิศวกร' }).click();
  // await page.waitForSelector('.blockUI', { state: 'hidden', timeout: 60000 });
  await page.waitForTimeout(500);
  await page
    .getByRole("group", { name: "ข้อมูลอาชีพ" })
    .getByLabel("-- กรุณาเลือก --")
    .first()
    .click();
  await page.waitForTimeout(500);
  await page.locator("role=treeitem >> nth=3").click();
  await page.waitForTimeout(500);
  await page.getByLabel("ประเภทธุรกิจของกิจการ").selectOption("0787500003");
  await page.getByRole("textbox", { name: "สถานที่ทำงาน" }).click();
  await page
    .getByRole("textbox", { name: "สถานที่ทำงาน" })
    .fill("test test company");
  await page.locator("#Salary").click();
  await page.locator("#occupationPanel").getByText("เพิ่ม").click();
  await page.waitForTimeout(500);
}

async function playFrontEndcreditFill(page): Promise<void> {
  //ข้อมูลวงเงินสินเชื่อบุคคล

  // await page.getByRole('textbox', { name: 'อัตรากำไร' }).click();
  await page.locator("#InterestRate").fill("10");
  await page.locator("#divCreditLine").getByText("%").click();

  await page.getByLabel("ประเภทเครดิต").selectOption("CT2");
  await page.getByRole("textbox", { name: "วงเงินอนุมัติ" }).click();
  await page.getByRole("textbox", { name: "วงเงินอนุมัติ" }).fill("100000");
  await page.getByRole("textbox", { name: "วงเงินที่ใช้ได้" }).click();
  await page.getByRole("textbox", { name: "วงเงินที่ใช้ได้" }).fill("500000");
  await page.locator("#CreditGroup").selectOption("1");
  await page.locator("#divCreditLine").getByText("เพิ่ม").click();
  await page.waitForTimeout(500);
}

export async function nextToAsset(page): Promise<void> {
  await page.getByRole("button", { name: "ถัดไป " }).click();
  var isVisible = await page
    .getByText("ข้อมูลสมุดบัญชีเล่มนี้มีอยู่ในระบบแล้ว")
    .isVisible();
  if (isVisible) {
    await page.getByRole("button", { name: "ตกลง" }).click();
    return;
  }
  await page.getByRole("button", { name: "ตกลง" }).click();
}

export async function playFrontEndAssetAT01(page): Promise<void> {
  await page.locator("#Asset_AssetType").selectOption("AT01");
  await page.locator("#select2-BrandName-container").click();
  await page.getByRole("treeitem", { name: "ปอร์เช่ | Porsche" }).click();
  await page.locator("#select2-ModelId-container").click();
  await page.getByRole("treeitem", { name: "911 Carrera 4S COUPE" }).click();
  await page.locator("#select2-VehicleUseTypeId-container").click();
  await page.getByRole("treeitem", { name: "รถยนต์ส่วนบุคคล" }).click();
  await page.getByRole("textbox", { name: "สี", exact: true }).click();
  await page.getByRole("textbox", { name: "สี", exact: true }).fill("แดง");
  await page.getByRole("textbox", { name: "เลขเครื่องยนต์" }).click();
  await page
    .getByRole("textbox", { name: "เลขเครื่องยนต์" })
    .fill(generateRandomAlpNumber());
  await page.getByRole("textbox", { name: "เลขตัวถังรถ" }).click();
  await page
    .getByRole("textbox", { name: "เลขตัวถังรถ" })
    .fill(generateRandomAlpNumber());
  await page.getByRole("textbox", { name: "เลขทะเบียน" }).click();
  await page
    .getByRole("textbox", { name: "เลขทะเบียน" })
    .fill(generateRandomLICNumber());
  await page.getByLabel("", { exact: true }).click();
  await page.getByRole("treeitem", { name: "กรุงเทพมหานคร" }).click();
  await page.getByRole("textbox", { name: "วันที่จดทะเบียน" }).click();
  await page
    .getByRole("textbox", { name: "วันที่จดทะเบียน" })
    .fill("12/07/2559");
  await page.getByRole("textbox", { name: "วันที่จดทะเบียน" }).press("Enter");
  await page.getByRole("textbox", { name: "วันที่ครอบครอง" }).click();
  await page
    .getByRole("textbox", { name: "วันที่ครอบครอง" })
    .fill("12/06/2566");
  await page.getByRole("textbox", { name: "วันที่ครอบครอง" }).press("Enter");
  await page.getByRole("textbox", { name: "วันที่เสียภาษี" }).click();
  await page
    .getByRole("textbox", { name: "วันที่เสียภาษี" })
    .fill("12/07/2566");
  await page.getByRole("textbox", { name: "วันที่เสียภาษี" }).press("Enter");
  await page.waitForTimeout(500);
  await page.getByLabel("ประเภทเชื้อเพลิง").selectOption("GAS01");
  // คลิกที่ combobox เพื่อเปิด dropdown
  await page
    .locator(".select2-selection__rendered#select2-VehicleCategoryId-container")
    .click();
  // รอให้ dropdown ปรากฏ
  await page.waitForSelector(".select2-results__option");
  // เลือกตัวเลือกจาก dropdown ที่มีข้อความ 'กรุณาเลือก'
  await page
    .locator(".select2-results__option")
    .filter({ hasText: "1.10-รถยนต์นั่งไม่เกิน 7 คน" })
    .click();
  await page.getByLabel("ประเภทจดทะเบียน").selectOption("RG01");
  await page.getByLabel("ประเภทเกียร์").selectOption("GG01");
  await page.getByRole("textbox", { name: "ราคาซื้อเข้า(รวมภาษี)" }).click();
  await page
    .getByRole("textbox", { name: "ราคาซื้อเข้า(รวมภาษี)" })
    .fill("5000000");
  await page
    .getByRole("textbox", { name: "ราคาซื้อเข้า(รวมภาษี)" })
    .press("Enter");
  await page
    .getByLabel("ภาษีมูลค่าเพิ่ม", { exact: true })
    .selectOption("VT01");
  await page.getByRole("textbox", { name: "ขนาดเครื่องยนต์" }).click();
  await page.getByRole("textbox", { name: "ขนาดเครื่องยนต์" }).fill("2000");
  await page.getByRole("textbox", { name: "ขนาดเครื่องยนต์" }).press("Enter");
  await page.locator(".col-md-offset-5 > .btn > .fa").first().click();
  await page.getByRole("button", { name: "ตกลง" }).click();
  await page.waitForTimeout(500);

  var saveVisible = await (
    await page.waitForSelector(".bootbox-body")
  ).isVisible();

  if (saveVisible) {
    await page.waitForTimeout(500);
    await page.getByRole("button", { name: "OK" }).click();
  }

  var ErrorVisible = await page
    .getByText("  เกิดข้อผิดพลาด TrackId", { exact: false })
    .isVisible();
  if (ErrorVisible) {
    return;
  }

  // เลือก checkbox โดยใช้ attribute data-asset-id หรือ name
  await page
    .locator("#dataTable1")
    .locator(".asset-checkbox")
    .locator("input")
    .check();

  await page.getByRole("button", { name: "ถัดไป " }).click();
  await page.waitForTimeout(500);
  await page.getByRole("button", { name: "ตกลง" }).click();
  await page.waitForTimeout(500);
}

export async function playFrontEndAssetAT05(page): Promise<void> {
  await page.locator("#Asset_AssetType").selectOption("AT05");
  await page.locator("#ProductType").selectOption("OT01");
  await page.locator("span.select2-selection").first().click();
  await page.waitForSelector(".select2-results__options");
  await page.locator("li.select2-results__option").nth(2).click();
  await page.locator("#ProductNo").fill(generateRandomNumByDigit(10));
  await page.locator("span.select2-selection").nth(1).click();
  await page.waitForSelector(".select2-results__options");
  await page.locator("li.select2-results__option").nth(1).click();
  await page.locator("#ProductSizeId").selectOption("PS001");
  await page.locator("#ProductConditionId").selectOption("PC001");
  await page.locator("#MadeInId").selectOption("MI001");
  await page.locator("#TotalPurchasePrice").fill("100000");
  await page.locator("#PurchaseVatInOut").selectOption("VT01");
  await page.locator("#PurchaseWTHTax").check();
  // await page.locator("div.btn.blue[onclick='addAsset()']", { hasText: "เพิ่ม" }).click();
  await page
    .locator("#dvAssetVehicle")
    .getByText("เพิ่ม", { exact: true })
    .click();
  await page.getByRole("button", { name: "ตกลง" }).click();
  await page.getByRole("button", { name: "OK" }).click();
  await page.locator("td.asset-checkbox.checker").locator("input").check();
  // await page.waitForTimeout(500);
  // await page.getByRole("button", { name: "ตกลง" }).click();
  await page.waitForTimeout(500);
  // await page.getByRole("button", { name: "OK" }).click();
  await page.getByRole("button", { name: "ถัดไป " }).click();
  await page.waitForTimeout(500);
  await page.getByRole("button", { name: "ตกลง" }).click();
}

export async function playFrontEndCal(page): Promise<void> {
  //เปิดใบคำขอกรอกข้อมูลสินทรัพย
  await page.locator("#select2-LoanProduct-container").first().click();
  await page
    .getByRole("treeitem", { name: /(โทรศัพท์ Tablet เครื่องใช้ไฟฟ้า อื่นๆ)/ })
    .click();

  // await page.locator('#Principal_Loan').waitFor(); // รอให้ฟิลด์แสดงก่อน
  // await page.locator('#Principal_Loan').fill('100000');

  // await page.locator('#InterestRatePerMonth').waitFor(); // รอให้ฟิลด์แสดงก่อน
  // await page.locator('#InterestRatePerMonth').fill('');
  // await page.locator('#InterestRatePerMonth').type('0.000', { delay: 100 });
  // await page.locator('#InterestRatePerMonth').click();

  await page.locator("#InterestRatePerYear").waitFor(); // รอให้ฟิลด์แสดงก่อน
  await page.locator("#InterestRatePerYear").click();
  // await page.locator("#InterestRatePerYear").fill("2.000");
  await page.locator("#InterestRatePerYear").type("2.000", { delay: 500 });
  // await page.locator("#InterestRatePerYear").waitFor(); // รอให้ฟิลด์แสดงก่อน
  // await page.locator("#InterestRatePerYear").click();
  // await page.locator('#InterestRatePerYear_Simple').fill('7.0');

  // await page.type('#InterestRatePerYear_Simple','7', { delay: 100 });

  await page.locator("#FlagDueEndOfMonthHp").check();

  await page.getByRole("button", { name: "คำนวณ" }).click();
  await page.locator("#goToMoreInfo").click();
  await page.waitForTimeout(500);
  await page.getByRole("button", { name: "ตกลง" }).click();
}

export async function playFrontEndAdvance(page): Promise<void> {
  await page.locator("#btnGuarantor").first().click();
  await page.locator("#CardId_Pop").fill("1");
  await page.locator("#btnSearchPopupCIF").first().click();
  await page
    .locator("#dtCIFPopup")
    .locator("tbody")
    .locator("tr")
    .locator(".sorting_1 .btn")
    .first()
    .click();
  await page.type("#FeePercent", "7", { delay: 100 });
  await page.locator("#FeePercent").click();
  await page.locator("#btnAddFeeOnetime").click();
  await page.getByRole("button", { name: "เพิ่มข้อมูล" }).click();
  //รายละเอียดทำจ่าย

  await page
    .locator("#divPopDealerId")
    .getByRole("combobox", { name: "-- กรุณาเลือก --" })
    .click();
  await page.getByRole("treeitem", { name: /ดีลเลอร์ประเทศไทย จำกัด/ }).click();
  await page
    .locator("#divPopSellerId")
    .getByRole("combobox", { name: "-- กรุณาเลือก --" })
    .click();
  await page
    .getByRole("treeitem", { name: /มาโนช ใจขำ/ })
    .first()
    .click();
  await page
    .locator("#dealerForm #dvBankCode")
    .getByRole("combobox", { name: "-- กรุณาเลือก --" })
    .click();
  await page
    .getByRole("treeitem", { name: "ธนาคารกรุงเทพจำกัด(มหาชน)" })
    .click();

  await page.getByRole("combobox").filter({ hasText: /^$/ }).click();
  await page.locator('input[type="search"]').fill("หล");
  await page.getByRole("treeitem", { name: "หลักสี่", exact: true }).click();
  await page.locator("#PaymentToDealerTypeID").selectOption("DT01");
  await page.locator("#PopPaymentChannelID").selectOption("CHE");
  await page
    .getByRole("combobox", { name: "-- กรุณาเลือก --" })
    .first()
    .click();
  await page.getByRole("treeitem", { name: /ณัฐพล มาเจริญ/ }).click();


  await page.locator("#PaymentToDealerTypeID").selectOption("DT01");
  await page.locator("#PopPaymentChannelID").selectOption("CHE");
  await page
    .locator("#dealerForm")
    .getByText("บันทึก", { exact: true })
    .click();
  await page.locator('input[name="IsMain"]').check();
  // await page.locator('#PaymentChannel').selectOption('CSH');
  await page.locator("#Receive_Type_Id").selectOption("CSH");
  await page.locator("#chkSendUpTier").click();
  await page.locator('#divRecommend #btnSaler').click();
  await page.locator("#CustomerTypeId_Pop").selectOption("CT1");
  await page.locator("#CardId_Pop").fill("1");
  await page.locator("#btnSearchPopupCIF").first().click();
  await page
    .locator("#dtCIFPopup")
    .locator("tbody")
    .locator("tr")
    .locator(".sorting_1 .btn")
    .first()
    .click();
  await page.locator("#Payment_Channel").selectOption("CSH");
  await page.locator("#btnAddRecommend").click();
  await page
    .locator('input[name="prosonalDataProtec[0].ProtecFlag"][value="true"]')
    .click();
  await page
    .locator('input[name="prosonalDataProtec[1].ProtecFlag"][value="true"]')
    .click();
  await page.locator('button:has-text("บันทึก")').click();
  var saveVisible = await (
    await page.waitForSelector(".bootbox-body")
  ).isVisible();

  if (saveVisible) {
    await page.getByRole("button", { name: "ตกลง" }).click();
    await page.waitForTimeout(500);
  }
  await page.getByRole("button", { name: "OK" }).click();
  // await page.waitForTimeout(500);
  // await page.getByRole("button", { name: "บันทึก" }).click();
}

export async function playApprove(page,AppCode: String): Promise<void> {
  await playChecker(page,AppCode);
  await playApprover(page,AppCode);
  await playOpenLoan(page,AppCode);
}

async function playChecker(page,AppCode: String): Promise<void> {
  await page.getByRole("link", { name: "อนุมัติใบคำขอ", exact: true }).click();
  await page.locator("#AppCode").fill(AppCode);
  await page.locator("#btnSearch").click();
  await page.locator('a[title="พิจารณา"]').click();

  await page.locator("#line-step5").click();
  await page.locator("#RemarkVerify").fill("อนุมัติ");
  await page.locator("#VerifyTabCondition #uniform-002 span").click();
  await page.locator("#btnSaveVerify").click();
  await page.getByRole("button", { name: "ตกลง" }).click();
  await page.getByRole("button", { name: "ตกลง" }).click();
}
async function playApprover(page,AppCode: String): Promise<void> {
  await page.locator("#AppCode").fill(AppCode);
  await page.locator("#btnSearch").click();
  await page.locator('button[title="พิจารณา"]').click();
  await page.locator("#line-step5").click();
  await page
    .getByRole("textbox", { name: "หมายเหตุการอนุมัติ" })
    .fill("อนุมัติ");
  await page.getByRole("button", { name: "บันทึก " }).click();
  await page.getByRole("button", { name: "ตกลง" }).click();
  await page.getByRole("button", { name: "OK" }).click();
}
async function playOpenLoan(page,AppCode: String): Promise<void> {
    await page.locator("#AppCode").fill(AppCode);
    await page.locator('#StatusId').selectOption('AW');
    await page.locator("#btnSearch").click();
    await page.locator('a[title="เปิดสัญญา"]').click();
    await page.locator("#line-step5").click();
    await page.getByRole("button", { name: "เปิดสัญญา " }).click();
    await page.getByRole("button", { name: "ตกลง" }).click();
    await page.getByRole("button", { name: "OK" }).click();
}