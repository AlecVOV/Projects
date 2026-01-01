# TỔNG QUAN (GENERAL)

- **Base URL:** `https://api.itealab-fund.com/v1`

- **Authentication:** Sử dụng `Bearer Token` (JWT) trong Header cho các API cần bảo mật.

- **Response Format:** JSON.

---

### 1. AUTHENTICATION (Xác thực & Cá nhân)

*Nhóm này để đăng nhập và lấy thông tin người dùng hiện tại.*

| **Method** | **Endpoint**     | **Mô tả**                                                                 | **Role** |
| ---------- | ---------------- | ------------------------------------------------------------------------- | -------- |
| **POST**   | `/auth/login`    | Đăng nhập bằng Email (Google OAuth hoặc Password). Trả về `access_token`. | All      |
| **GET**    | `/auth/profile`  | Lấy thông tin User hiện tại (Avatar, Role, Bank Info).                    | All      |
| **PUT**    | `/users/profile` | Cập nhật thông tin cá nhân (VD: Cập nhật STK ngân hàng để nhận tiền).     | All      |

---

### 2. USERS MANAGEMENT (Quản lý thành viên)

*Chức năng dành riêng cho Admin để quản lý danh sách Lab.*

| **Method** | **Endpoint**    | **Mô tả**                                  | **Role** |
| ---------- | --------------- | ------------------------------------------ | -------- |
| **GET**    | `/users`        | Lấy danh sách tất cả thành viên trong Lab. | Admin    |
| **POST**   | `/users/invite` | Thêm thành viên mới (Gửi email mời).       | Admin    |
| **DELETE** | `/users/{id}`   | Xóa thành viên khỏi Lab.                   | Admin    |

---

### 3. CAMPAIGNS (Quản lý Quỹ & Sự kiện)

*Quản lý các "cái xô" đựng tiền (Annual Fund hoặc Event).*

| **Method** | **Endpoint**            | **Mô tả**                                                                | **Role** |
| ---------- | ----------------------- | ------------------------------------------------------------------------ | -------- |
| **GET**    | `/campaigns`            | Lấy danh sách sự kiện (Có filter `?status=ACTIVE` để lấy cái đang chạy). | All      |
| **GET**    | `/campaigns/{id}`       | Lấy chi tiết 1 sự kiện (kèm tổng thu/chi hiện tại của sự kiện đó).       | All      |
| **POST**   | `/campaigns`            | Tạo sự kiện mới (VD: "Tiệc tất niên 2026").                              | Admin    |
| **PATCH**  | `/campaigns/{id}/close` | Đóng sự kiện (Chốt sổ, không cho thêm transaction).                      | Admin    |

---

### 4. TRANSACTIONS (Giao dịch - Core Feature)

*Đây là phần quan trọng nhất, thực thi logic "Reimbursement Lifecycle".*

#### A. Member Actions (Thao tác của thành viên)

| **Method** | **Endpoint**       | **Mô tả**                                          | **Input (Payload)**                                                      |
| ---------- | ------------------ | -------------------------------------------------- | ------------------------------------------------------------------------ |
| **POST**   | `/transactions`    | Tạo giao dịch mới (Nộp quỹ hoặc Up bill đòi tiền). | `{ campaign_id, amount, description, proof_image_url, type: "EXPENSE" }` |
| **GET**    | `/transactions/me` | Xem lịch sử nộp/chi tiêu của chính mình.           | N/A                                                                      |

#### B. Admin Actions (Thao tác duyệt chi - State Machine)

*Các API này sẽ kích hoạt ghi Log vào bảng `AUDIT_LOGS`.*

| **Method** | **Endpoint**                   | **Mô tả**                                                           | **Logic xử lý ngầm**                                        |
| ---------- | ------------------------------ | ------------------------------------------------------------------- | ----------------------------------------------------------- |
| **PATCH**  | `/transactions/{id}/verify`    | **Duyệt đơn (State 1 -> 2).** Xác nhận bill là thật.                | Cập nhật `status=VERIFIED`. Cộng trừ tiền vào báo cáo tổng. |
| **PATCH**  | `/transactions/{id}/reject`    | **Từ chối.**                                                        | Cập nhật `status=REJECTED`, bắt buộc nhập lý do (`reason`). |
| **PATCH**  | `/transactions/{id}/reimburse` | **Hoàn tiền (State 2 -> 3).** Xác nhận đã chuyển khoản trả lại mem. | Cập nhật `status=REIMBURSED`. Gửi email báo mem "Tiền về".  |

---

### 5. NOTIFICATIONS & REPORTS (Tính năng "Sát thủ")

| **Method** | **Endpoint**                    | **Mô tả**                                                                                           | **Note**                    |
| ---------- | ------------------------------- | --------------------------------------------------------------------------------------------------- | --------------------------- |
| **POST**   | `/notifications/remind-payment` | **Tính năng "Đòi tiền" (Batch Reminder).** Gửi email cho tất cả user chưa đóng tiền cho Campaign X. | **Must Have** trong Slide 3 |
| **GET**    | `/reports/dashboard`            | Lấy số liệu tổng quan: Tổng quỹ còn lại, Tổng chờ duyệt, Tổng nợ cần trả.                           | Dùng vẽ Chart Dashboard     |
| **GET**    | `/reports/export`               | Xuất file Excel/PDF lịch sử giao dịch.                                                              | Dùng cho báo cáo HQ         |

---

### 6. UPLOAD (Hỗ trợ)

*API này tách riêng để xử lý file ảnh.*

| **Method** | **Endpoint** | **Mô tả**                                                                   |
| ---------- | ------------ | --------------------------------------------------------------------------- |
| **POST**   | `/upload`    | Upload file ảnh (Multipart/form-data). Trả về URL ảnh (trên Cloudinary/S3). |

---

### Case Study: Luồng chạy thực tế qua API

Để bạn dễ hình dung cách viết code, đây là ví dụ luồng **"Chi Lon Thon up bill 500k và Admin duyệt"**:

1. **Lan up bill:**
   
   - Frontend gọi `POST /api/upload` (gửi file ảnh) $\rightarrow$ nhận về link `http://img.com/bill123.jpg`.
   
   - Frontend gọi `POST /api/transactions` với body:
     
     JSON
     
     ```
     {
      "campaign_id": 10,
      "amount": 500000,
      "description": "Thuê Lens",
      "proof_image_url": "http://img.com/bill123.jpg",
      "type": "EXPENSE"
     }
     ```
   
   - Backend lưu vào DB với status `PENDING`.

2. **Admin duyệt:**
   
   - Admin thấy thông báo, bấm nút "Approve".
   
   - Frontend gọi `PATCH /api/transactions/99/verify`.
   
   - Backend đổi status thành `VERIFIED`, ghi log audit.

3. **Admin trả tiền:**
   
   - Admin chuyển khoản xong, bấm nút "Mark as Paid".
   
   - Frontend gọi `PATCH /api/transactions/99/reimburse`.
   
   - Backend đổi status thành `REIMBURSED`, gửi email cho Lan.

### Tổng kết bộ "The Build Kit"

Bây giờ trong tay bạn đã có đủ bộ vũ khí hạng nặng:

1. **Product Concept:** 5 Slides (User Journey, Pain Point, Solution).

2. **Data Structure:** ERD Diagram (DBML code).

3. **Connectivity:** API Specification (List ở trên).

Với bộ này, bạn có thể đóng vai trò **PM (Product Manager)** hoặc **Tech Lead** cho dự án ITea Lab này một cách xuất sắc. Bạn có cần mình hỗ trợ gì thêm (ví dụ: Viết nội dung email nhắc nợ mẫu cho tính năng "Đòi tiền" để đưa vào Slide demo) không?
