### Bước 1: Chốt Tech Stack (Bộ công nghệ)

Với dự án quản lý tiền nong cần độ chính xác cao nhưng lại cần dev nhanh, mình đề xuất **Full-stack Nuxt 3 Architecture**. Bạn không cần tách riêng Frontend/Backend, hãy dùng Nuxt làm tất cả.

| **Hạng mục** | **Công nghệ đề xuất**          | **Lý do**                                                                                                                                                    |
| ------------ | ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Frontend** | **Nuxt 3** + TailwindCSS       | Bạn đã quen Nuxt 3. Tailwind giúp build UI cực nhanh.                                                                                                        |
| **Backend**  | **Nuxt Server Routes** (Nitro) | Viết API ngay trong folder `server/api` của Nuxt. Không cần dựng server Node.js riêng rườm rà.                                                               |
| **Database** | **Supabase** (PostgreSQL)      | App tiền nong **bắt buộc** dùng SQL để đảm bảo toàn vẹn dữ liệu (Relational). Supabase cung cấp Postgres miễn phí, có sẵn Auth và UI quản lý data rất sướng. |
| **ORM**      | **Prisma**                     | Giúp bạn gõ code thao tác DB (tạo, sửa, xóa) mà không cần viết câu lệnh SQL trần. Cực an toàn và gợi ý code tốt.                                             |
| **Images**   | **Cloudinary**                 | Bạn đã thích món này. Dùng để lưu ảnh bill.                                                                                                                  |
| **Email**    | **Resend** (hoặc Nodemailer)   | Dùng để gửi mail nhắc nợ. Resend có gói free 3000 emails/tháng, API cực dễ dùng.                                                                             |
| **Deploy**   | **Vercel**                     | Deploy cả Frontend và Backend chỉ bằng 1 cú click (vì Nuxt tương thích hoàn hảo với Vercel).                                                                 |

---

### Bước 2: Setup dự án & Môi trường (Environment)

Đừng code chức năng vội. Hãy làm xong cái "Móng nhà" trước.

1. **Khởi tạo Repo:** Tạo repo trên GitHub `itealab-fund-management`.

2. **Cài đặt Nuxt 3:** `npx nuxi@latest init itealab-fund`.

3. **Cài đặt Tailwind & Prisma:** Config cho xong giao diện và kết nối Database.

4. **Thiết lập Supabase:**
   
   - Vào Supabase tạo Project mới.
   
   - Lấy `DATABASE_URL` dán vào file `.env` trong dự án Nuxt.

5. **Push Schema:** Copy cái code DBML (ở bước ERD) chuyển sang file `schema.prisma` và chạy lệnh `npx prisma db push` để nó tự tạo bảng trên Supabase.

---

### Bước 3: Chia giai đoạn Dev (Sprint Planning)

Đừng cố làm hết 1 lúc. Hãy chia làm 3 đợt (Sprints), mỗi đợt 1 tuần.

#### **Sprint 1: The Core (Khung sườn)**

- Làm trang Login (Dùng Supabase Auth cho nhanh).

- Làm Dashboard Layout (Menu bên trái, Header bên trên).

- Làm CRUD Campaign (Admin tạo được sự kiện "Quỹ 2026").

- Làm CRUD Member (Admin add được email thành viên).

#### **Sprint 2: The Money Flow (Dòng tiền)**

- Làm tính năng Upload Bill (Kết nối Cloudinary).

- Làm form "Tạo giao dịch" (Transaction).

- Làm trang "Danh sách giao dịch" (Hiển thị Status: Pending/Verified bằng màu sắc).

- **Quan trọng:** Viết API `POST /transactions` và `PATCH /verify` (Admin duyệt).

#### **Sprint 3: Automation & Reports (Tự động hóa & Báo cáo)**

- Làm Dashboard Chart (Tổng thu, tổng chi).

- Viết script gửi email nhắc nợ (Kết nối Resend).

- Tối ưu UI/UX (Loading skeleton, thông báo Toast khi thành công).

---

### Bước 4: Quản lý công việc (Project Management)

Để không bị "ngợp", bạn cần một chỗ để theo dõi tiến độ.

- Dùng **GitHub Projects** (ngay trong repo) hoặc **Trello**.

- Tạo 3 cột: **To Do** (Cần làm) -> **In Progress** (Đang code) -> **Done** (Xong).

- Copy cái list API mình đưa lúc nãy, biến mỗi cái thành 1 task (Ví dụ: "Viết API Login", "Viết API Upload ảnh").
