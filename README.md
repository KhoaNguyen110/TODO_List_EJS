# 📝 TODO List - My Group Website

Ứng dụng web **TODO List** giúp quản lý công việc cá nhân và nhóm một cách trực quan, sử dụng **Node.js**, **Express**, và **EJS** làm view engine, kết hợp **Tailwind CSS** cho giao diện hiện đại.

---

## 🚀 Tính năng chính

### 🧠 Trang chủ (`home.ejs`)

- Hiển thị **thông tin nhóm** từ file `members.json`.
- Banner chào mừng với hiệu ứng gradient và animation.
- Nút **Start** chuyển đến trang TODO List.

### ✅ Trang TODO List (`todo.ejs`)

- **Thêm công việc mới**.
- **Đánh dấu hoàn thành / Hoàn tác**.
- **Xóa công việc** khỏi danh sách.
- Lưu trữ công việc tạm thời trong file `tasks.json`.
- Hiển thị trạng thái “Chưa có công việc nào” khi danh sách rỗng.
- Thanh **cuộn tùy chỉnh** và hiệu ứng giao diện mượt mà.

---

## 🗂️ Cấu trúc thư mục

project_root/
├── app.js # Cấu hình Express app (view engine, routes, middleware)
├── server.js # Chạy server Node.js
│
├── views/ # Thư mục chứa giao diện EJS
│ ├── home.ejs # Trang chủ
│ └── todo.ejs # Trang TODO List
│
├── members.json # Danh sách thành viên nhóm
├── tasks.json # Danh sách công việc (lưu tạm)
│
├── package.json # Thông tin dự án & dependencies
├── package-lock.json
└── README.md # Tài liệu dự án
