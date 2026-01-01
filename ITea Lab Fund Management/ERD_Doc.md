Đây là bản thiết kế **Database Schema (ERD)** chuẩn chỉnh cho **ITea Lab Fund Management App**.

Mô hình này được tối ưu cho **tính toàn vẹn dữ liệu (Data Integrity)** tiền nong và hỗ trợ trọn vẹn logic **"Reimbursement Lifecycle"** (Vòng đời hoàn ứng) mà bạn đã chốt ở Slide 4.

### 1. Sơ đồ Quan hệ Thực thể (ERD Diagram)

Dưới đây là sơ đồ tổng quan. Bạn có thể copy code này vào `mermaid.live` để vẽ lại hoặc đưa cho Dev xem là họ hiểu ngay.

Code snippet

```
erDiagram
    USERS ||--o{ TRANSACTIONS : "creates"
    USERS ||--o{ AUDIT_LOGS : "performs"
    USERS ||--o{ CAMPAIGNS : "manages (if admin)"

    CAMPAIGNS ||--o{ TRANSACTIONS : "contains"

    USERS {
        int id PK
        string email UK "Login ID"
        string full_name
        string avatar_url
        enum role "ADMIN | MEMBER"
        string bank_info "STK để nhận tiền hoàn ứng"
        datetime created_at
    }

    CAMPAIGNS {
        int id PK
        string name "VD: Quỹ Lab 2026, Tiệc Cuối Năm"
        enum type "ANNUAL_FUND | EVENT"
        decimal target_amount "Mục tiêu thu/chi"
        enum status "ACTIVE | CLOSED"
        datetime start_date
        datetime end_date
        datetime created_at
    }

    TRANSACTIONS {
        int id PK
        int campaign_id FK
        int user_id FK "Người tạo/Người ứng tiền"
        enum type "INCOME (Thu) | EXPENSE (Chi)"
        decimal amount "Số tiền (VND)"
        string description
        string proof_image_url "Ảnh bill/chuyển khoản"
        enum status "PENDING | VERIFIED | REIMBURSED | REJECTED"
        string rejection_reason
        int verified_by FK "Admin nào duyệt?"
        datetime verified_at
        datetime created_at
    }

    AUDIT_LOGS {
        int id PK
        int user_id FK "Ai làm?"
        string action "CREATE | UPDATE_STATUS | DELETE"
        string target_table "Transactions / Campaigns"
        int target_id "ID của dòng bị sửa"
        json old_value "Giá trị cũ"
        json new_value "Giá trị mới"
        string ip_address
        datetime created_at
    }
```

---

### 2. Chi tiết cấu trúc các bảng (Table Specifications)

Dưới đây là giải thích tại sao lại thiết kế như vậy (Logic nghiệp vụ):

#### A. Bảng `USERS` (Thành viên)

- **Mục đích:** Quản lý danh tính và phân quyền.

- **Điểm lưu ý:**
  
  - `role`: Cực quan trọng. Chỉ `ADMIN` mới có quyền thấy nút "Approve" (Duyệt) trong bảng Transactions.
  
  - `bank_info`: Nên lưu sẵn (VD: "TPBank - 0123xxx - Nguyen Van A") để khi Admin hoàn tiền (Reimburse) chỉ cần copy paste, đỡ phải nhắn tin hỏi lại.

#### B. Bảng `CAMPAIGNS` (Quỹ & Sự kiện)

- **Mục đích:** Gom nhóm các giao dịch. Đây là "cái xô" đựng tiền.

- **Điểm lưu ý:**
  
  - `type`: Phân loại rõ ràng.
    
    - `ANNUAL_FUND` (Quỹ năm): Dùng để mọi người đóng tiền vào (Transaction type = INCOME).
    
    - `EVENT` (Sự kiện): Dùng để chi tiêu (Transaction type = EXPENSE).
  
  - `status`: Nếu là `CLOSED`, không ai được thêm bill mới vào nữa (Chốt sổ).

#### C. Bảng `TRANSACTIONS` (Giao dịch - Trái tim của hệ thống)

- **Mục đích:** Lưu trữ từng đồng tiền vào/ra.

- **Logic trạng thái (State Machine):** Cột `status` chính là cái "Secret Sauce" của bạn.
  
  - `PENDING`: Thành viên vừa up bill, tiền chưa được tính vào quỹ.
  
  - `VERIFIED`: Admin đã check bill thật. Tiền chính thức được ghi nhận (Cập nhật Dashboard).
  
  - `REIMBURSED`: (Chỉ dành cho Type = EXPENSE) Admin đã chuyển khoản trả lại tiền ứng cho thành viên.
  
  - `REJECTED`: Bill sai, ảnh mờ, không chấp nhận. Kèm theo `rejection_reason`.

- **Dữ liệu tiền tệ:** `amount` phải dùng kiểu dữ liệu `DECIMAL` (hoặc `BIGINT` nếu lưu đơn vị đồng), tuyệt đối không dùng `FLOAT` để tránh sai số làm tròn.

#### D. Bảng `AUDIT_LOGS` (Nhật ký hệ thống)

- **Mục đích:** Sự minh bạch tuyệt đối (Transparency).

- **Cách hoạt động:** Bất cứ khi nào Admin bấm nút "Duyệt" hoặc "Sửa số tiền", hệ thống sẽ tự động ghi 1 dòng vào đây.

- **Ví dụ dữ liệu:**
  
  - *User:* Admin Huy
  
  - *Action:* UPDATE_STATUS
  
  - *Old Value:* `{ status: "PENDING" }`
  
  - *New Value:* `{ status: "VERIFIED" }`
  
  - *Time:* 10:00 AM.
  
  - $\rightarrow$ Sau này ai thắc mắc "Tại sao bill này được duyệt?", chỉ cần mở Log ra xem.

---

### 3. Cách mô hình này giải quyết bài toán "Đòi tiền" (Collection Logic)

Bạn có hỏi về tính năng "Gửi nhắc nhở". Với Database này, Dev sẽ viết câu lệnh SQL (hoặc Code logic) như sau:

> *"Tìm tất cả User có `role` = MEMBER mà KHÔNG có transaction nào thuộc `campaign_id` = 'Quỹ 2026' với `status` = 'VERIFIED'."*

$\rightarrow$ Ra danh sách những người chưa đóng tiền $\rightarrow$ Gửi mail hàng loạt cho danh sách này.

### Lời khuyên cho Dev của bạn (Technical Notes)

Khi đưa tài liệu này cho Dev, hãy nhắn nhủ họ 3 điều này để App chạy mượt:

1. **Index (Chỉ mục):** Đánh index cho cột `campaign_id` và `user_id` trong bảng `TRANSACTIONS` để load lịch sử cho nhanh.

2. **Ảnh bằng chứng:** Cột `proof_image_url` chỉ lưu đường link (String). Ảnh thật nên lưu trên **Cloudinary** hoặc **AWS S3** (Đừng lưu ảnh trực tiếp vào Database, nặng lắm).

3. **Concurrency:** Khi cập nhật số dư tổng, cẩn thận trường hợp 2 Admin cùng duyệt 1 lúc. (Cái này Dev Backend sẽ lo, nhưng nhắc trước cho ngầu).


