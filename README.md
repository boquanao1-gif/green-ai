# GREEN AI - Ứng Dụng Phân Loại Rác Thông Minh & Hướng Dẫn Tái Chế

Ứng dụng Full-Stack hỗ trợ nhận diện và phân tích nhiều vật thể rác thải đồng thời trong một bức ảnh, phân loại theo quy chuẩn 4 nhóm rác thải của Luật Bảo vệ Môi trường Việt Nam và đưa ra hướng dẫn xử lý, tái chế sáng tạo.

---

## 🌟 ĐẶC ĐIỂM NỔI BẬT

1. **Phân tích đa vật thể (Multi-Object Detection):** Nhận diện chính xác nhiều đồ vật rác trong cùng một ảnh (ví dụ: một bức ảnh có hộp xốp bẩn, chai nhựa PET, nắp chai, lon nhôm và túi nilon sẽ được phân tách thành từng mục độc lập).
2. **Hiển thị kết quả riêng biệt cho từng vật thể:**
   - Tên cụ thể và vị trí trong ảnh.
   - Nhóm phân loại: *Rác tái chế*, *Rác hữu cơ*, *Rác nguy hại*, *Rác vô cơ / Rác còn lại*.
   - Màu sắc thùng rác tương ứng theo quy chuẩn Việt Nam.
   - Chất liệu chính và tỷ lệ tái chế (%).
   - Thời gian phân hủy tự nhiên ước tính trong môi trường.
   - Mức độ tác động đến hệ sinh thái.
   - Các bước làm sạch, bóc tách và phân loại từng bước (có checkbox tương tác).
   - Ý tưởng tái sử dụng (Upcycling tips).
   - Cảnh báo an toàn nếu chứa chất độc, nguy cơ nổ hoặc kim loại nặng.
3. **Bảo mật Full-Stack 100%:**
   - Toàn bộ lệnh gọi Gemini Vision AI chạy qua **Next.js Server-side Route Handler** (`app/api/analyze/route.ts`).
   - Đọc trực tiếp từ `process.env.GEMINI_API_KEY`.
   - Tuyệt đối không gọi Gemini từ trình duyệt và không dùng biến `NEXT_PUBLIC_`.
   - Trình duyệt chỉ gửi base64 ảnh tới `/api/analyze`.
4. **Xử lý toàn diện các trường hợp lỗi:**
   - Lỗi ảnh không có rác thải / ảnh mờ / ảnh phong cảnh không liên quan.
   - Ảnh vượt quá giới hạn 15MB.
   - Tệp không đúng định dạng hình ảnh.
   - Quá hạn mức (429) hoặc sai API Key (401/403).
   - Mất kết nối mạng.
5. **Giao diện 100% tiếng Việt, tối ưu trải nghiệm người dùng.**

---

## 📂 CẤU TRÚC THƯ MỤC DỰ ÁN

```text
├── app/
│   ├── api/
│   │   └── analyze/
│   │       └── route.ts         # Next.js Serverless Route Handler (POST /api/analyze)
│   ├── globals.css              # Global styles (Tailwind CSS)
│   ├── layout.tsx               # Next.js App Router Root Layout & Metadata
│   └── page.tsx                 # Next.js App Router Client Page
├── src/
│   ├── components/
│   │   ├── AnalysisSummary.tsx  # Tổng điểm sinh thái và bộ lọc nhóm rác
│   │   ├── ErrorAlert.tsx       # Báo lỗi và gợi ý khắc phục chi tiết
│   │   ├── Header.tsx           # Thanh điều hướng và nút mở hướng dẫn
│   │   ├── ImageUploader.tsx    # Kéo thả, chụp ảnh, kiểm tra dung lượng & ảnh mẫu
│   │   ├── NoWasteFoundNotice.tsx # Thông báo khi ảnh không chứa rác
│   │   ├── VercelDeployGuideModal.tsx # Hướng dẫn triển khai Vercel
│   │   ├── WasteBinGuideModal.tsx   # Cẩm nang 4 loại thùng rác
│   │   └── WasteObjectCard.tsx  # Thẻ hiển thị chi tiết từng vật thể
│   ├── data/
│   │   └── sampleImages.ts      # Bộ ảnh mẫu đa vật thể thử nghiệm nhanh
│   ├── server/
│   │   └── geminiService.ts     # Server-side Gemini 3.8 Flash SDK service
│   ├── types/
│   │   └── green.ts             # Định nghĩa kiểu dữ liệu TypeScript
│   ├── App.tsx                  # Giao diện chính ứng dụng
│   ├── index.css                # Tailwind CSS
│   └── main.tsx                 # Client entry point
├── server.ts                    # Full-stack Node.js server (hỗ trợ preview và container)
├── next.config.mjs              # Cấu hình Next.js cho Vercel
├── vercel.json                  # Cấu hình Vercel Serverless Function & Timeout
├── package.json                 # Quản lý dependencies & scripts
└── .env.example                 # Mẫu cấu hình biến môi trường
```

---

## 🚀 HƯỚNG DẪN TRIỂN KHAI LÊN VERCEL

### Cách 1: Triển khai qua GitHub (Khuyên dùng)

1. Đẩy toàn bộ mã nguồn của dự án lên kho lưu trữ GitHub của bạn.
2. Truy cập [vercel.com](https://vercel.com) và đăng nhập.
3. Bấm **Add New...** > **Project** và chọn repository vừa đẩy lên.
4. Tại mục **Environment Variables**, thêm biến môi trường bắt buộc:
   - **Key:** `GEMINI_API_KEY`
   - **Value:** Điền mã khóa API Gemini của bạn (lấy tại Google AI Studio).
   - *(Lưu ý: Không đặt tiền tố `NEXT_PUBLIC_`)*
5. Bấm **Deploy**. Vercel sẽ tự động build ứng dụng Next.js và cấp tên miền `*.vercel.app` hoàn toàn miễn phí.

### Cách 2: Triển khai trực tiếp qua Vercel CLI

```bash
# 1. Cài đặt Vercel CLI
npm install -g vercel

# 2. Đăng nhập Vercel
vercel login

# 3. Thêm biến môi trường
vercel env add GEMINI_API_KEY

# 4. Triển khai sản phẩm
vercel deploy --prod
```

---

## 💻 CHẠY TẠI MÔI TRƯỜNG CỤC BỘ (LOCAL)

```bash
# 1. Cài đặt các gói phụ thuộc
npm install

# 2. Tạo tệp .env từ .env.example và điền GEMINI_API_KEY
cp .env.example .env
# Chỉnh sửa file .env:
# GEMINI_API_KEY="AIzaSy..."

# 3. Khởi chạy máy chủ phát triển
npm run dev

# 4. Mở trình duyệt tại: http://localhost:3000
```

---

## 🗑️ QUY CHUẨN 4 NHÓM RÁC THẢI VIỆT NAM ĐƯỢC AI ÁP DỤNG

1. **Thùng Vàng / Trắng (Rác tái chế):**
   Chai nhựa PET, can HDPE, lon nhôm, giấy báo, bìa carton, chai lọ thủy tinh lành.
2. **Thùng Xanh Lá (Rác hữu cơ):**
   Thức ăn thừa, vỏ rau củ quả, bã trà/cà phê, lá cây, hoa rụng.
3. **Thùng Cam / Đỏ (Rác nguy hại):**
   Pin cũ (AA, AAA), ắc quy, bóng đèn huỳnh quang, bình xịt nén, chai thuốc trừ sâu, rác điện tử.
4. **Thùng Xám / Đen (Rác vô cơ / Rác còn lại):**
   Hộp xốp dính dầu mỡ, túi nilon bẩn, khăn giấy ăn bẩn, tã bỉm, mảnh gốm sứ vỡ.
