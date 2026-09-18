// 5 Curated Sample Presets representing diverse user archetypes
// 100% distinct and completely separate from personal data

const SAMPLE_PRESETS = [
  {
    id: "preset_startup",
    title: "1. Startup Công Nghệ & SaaS Founder",
    icon: "🚀",
    desc: "Dành cho nhà sáng lập, quản lý sản phẩm số: Xây dựng MVP, hạ tầng đám mây, tích hợp thanh toán và tối ưu trải nghiệm.",
    data: {
      categories: ["Web & SaaS", "AI & Automation", "Marketing & Social", "Personal Utilities"],
      projects: [
        {
          id: "p_omflow",
          name: "OmniFlow - AI Workflow Automation SaaS",
          folderName: "OmniFlow_SaaS",
          category: "AI & Automation",
          stage: "In Progress - Expanding",
          tags: ["#AI", "#NextJS", "#Microservices", "#Stripe"],
          ideas: [
            { id: "s1", text: "Tích hợp webhook thanh toán tự động qua Stripe & MoMo", status: "Đã xong" },
            { id: "s2", text: "Tối ưu độ trễ phản hồi của AI Agent xuống dưới 250ms", status: "Đang triển khai" },
            { id: "s3", text: "Xây dựng bảng phân tích chỉ số người dùng (Analytics Dashboard)", status: "Chưa triển khai" },
            { id: "s4", text: "Tính năng popup khảo sát gây phiền khi khách đang thao tác", status: "Loại bỏ" }
          ]
        },
        {
          id: "p_cloudcost",
          name: "CloudCost - Công cụ Tối ưu Hóa Chi Phí AWS",
          folderName: "CloudCost_FinOps",
          category: "Web & SaaS",
          stage: "Near Complete - Polishing",
          tags: ["#AWS", "#FinOps", "#Python", "#Serverless"],
          ideas: [
            { id: "s5", text: "Thuật toán quét và cảnh báo tài nguyên EC2/RDS dư thừa", status: "Đã xong" },
            { id: "s6", text: "Báo cáo đề xuất tiết kiệm ngân sách gửi định kỳ qua Slack", status: "Đang triển khai" },
            { id: "s7", text: "Tích hợp xuất hóa đơn điện tử cho doanh nghiệp", status: "Chưa triển khai" }
          ]
        },
        {
          id: "p_healthpulse",
          name: "HealthPulse - Ứng Dụng Chăm Sóc Sức Khỏe",
          folderName: "HealthPulse_Mobile",
          category: "Web & SaaS",
          stage: "Just Started / Inception",
          tags: ["#Flutter", "#HealthTech", "#Mobile"],
          ideas: [
            { id: "s8", text: "Thiết kế bộ Wireframe và Prototype trên Figma", status: "Đã xong" },
            { id: "s9", text: "Tích hợp đồng bộ dữ liệu bước chân với Apple Health & Google Fit", status: "Đang triển khai" },
            { id: "s10", text: "Xây dựng tính năng nhắc lịch uống thuốc thông minh", status: "Chưa triển khai" }
          ]
        }
      ]
    }
  },

  {
    id: "preset_creator",
    title: "2. Sáng Tạo Nội Dung & Digital Media (KOL/YouTuber)",
    icon: "🎬",
    desc: "Dành cho nhà sáng tạo nội dung, Podcaster: Sản xuất video ngắn, kịch bản viral, hợp tác nhãn hàng và xây dựng cộng đồng.",
    data: {
      categories: ["Marketing & Social", "Web & SaaS", "Personal Utilities"],
      projects: [
        {
          id: "p_yt_tech",
          name: "Kênh YouTube Review Công Nghệ 100k Subs",
          folderName: "YouTube_TechReview",
          category: "Marketing & Social",
          stage: "Near Complete - Polishing",
          tags: ["#YouTube", "#VideoEdit", "#TechReview", "#KOL"],
          ideas: [
            { id: "c1", text: "Sản xuất seri 5 tập hướng dẫn ứng dụng AI cho người đi làm", status: "Đã xong" },
            { id: "c2", text: "Đàm phán hợp đồng tài trợ video với nhãn hàng màn hình", status: "Đang triển khai" },
            { id: "c3", text: "Thiết kế bộ Thumbnail chuẩn nhận diện thương hiệu mới", status: "Chưa triển khai" }
          ]
        },
        {
          id: "p_podcast",
          name: "Chuỗi Podcast 'Chuyện Khởi Nghiệp Số'",
          folderName: "Podcast_DigitalStartup",
          category: "Marketing & Social",
          stage: "In Progress - Expanding",
          tags: ["#Podcast", "#Spotify", "#Interview"],
          ideas: [
            { id: "c4", text: "Mời 4 nhà sáng lập công nghệ tham gia phỏng vấn", status: "Đã xong" },
            { id: "c5", text: "Cắt ngắn các câu chuyện truyền cảm hứng làm TikTok Shorts", status: "Đang triển khai" },
            { id: "c6", text: "Tạo kênh tài trợ hội viên độc quyền trên Patreon", status: "Chưa triển khai" }
          ]
        },
        {
          id: "p_newsletter",
          name: "Bản Tin Newsletter 'AI Insights Mỗi Tuần'",
          folderName: "AI_Weekly_Newsletter",
          category: "Web & SaaS",
          stage: "Ready for Promotion / Launch",
          tags: ["#Newsletter", "#Substack", "#Automation"],
          ideas: [
            { id: "c7", text: "Thiết lập hệ thống tự động tổng hợp tin tức AI hàng ngày", status: "Đã xong" },
            { id: "c8", text: "Chiến dịch tặng Ebook miễn phí để thu hút 3.000 subscriber", status: "Đang triển khai" }
          ]
        }
      ]
    }
  },

  {
    id: "preset_indie",
    title: "3. Lập Trình Viên Tự Do & Indie Hacker",
    icon: "💻",
    desc: "Dành cho kỹ sư phần mềm độc lập: Làm tiện ích mở rộng, ứng dụng vi mô (Micro-SaaS), nhận dự án ngoài và gia tăng thu nhập thụ động.",
    data: {
      categories: ["Desktop & Hardware", "Web & SaaS", "Personal Utilities"],
      projects: [
        {
          id: "p_focustab",
          name: "FocusTab - Chrome Extension Chống Xao Nhãng",
          folderName: "FocusTab_Extension",
          category: "Desktop & Hardware",
          stage: "Ready for Promotion / Launch",
          tags: ["#ChromeExt", "#ManifestV3", "#Productivity"],
          ideas: [
            { id: "i1", text: "Đưa extension lên cửa hàng Chrome Web Store", status: "Đã xong" },
            { id: "i2", text: "Tích hợp đồng hồ Pomodoro kèm danh sách việc cần làm", status: "Đã xong" },
            { id: "i3", text: "Tính năng chặn mạng xã hội trong giờ tập trung cao độ", status: "Đã xong" },
            { id: "i4", text: "Gói mở rộng tính năng nâng cao (In-App Purchase)", status: "Đang triển khai" }
          ]
        },
        {
          id: "p_quickinvoice",
          name: "QuickInvoice - Tạo Hóa Đơn Nhanh Cho Freelancer",
          folderName: "QuickInvoice_App",
          category: "Web & SaaS",
          stage: "In Progress - Expanding",
          tags: ["#VueJS", "#PDFKit", "#Freelance"],
          ideas: [
            { id: "i5", text: "Bộ mẫu hóa đơn xuất PDF đa tiền tệ (USD, EUR, VND)", status: "Đã xong" },
            { id: "i6", text: "Tự động gửi email nhắc khách hàng thanh toán quá hạn", status: "Đang triển khai" },
            { id: "i7", text: "Đồng bộ giao dịch tự động với Google Sheets", status: "Chưa triển khai" }
          ]
        },
        {
          id: "p_clientweb",
          name: "Dự Án Website Cho Sàn Bất Động Sản Khách Hàng",
          folderName: "Client_RealEstate_Web",
          category: "Web & SaaS",
          stage: "Near Complete - Polishing",
          tags: ["#ClientWork", "#React", "#Tailwind", "#MapsAPI"],
          ideas: [
            { id: "i8", text: "Tích hợp bản đồ quy hoạch và định vị vị trí dự án", status: "Đã xong" },
            { id: "i9", text: "Kiểm thử bảo mật form đăng ký tư vấn và nghiệm thu", status: "Đang triển khai" }
          ]
        }
      ]
    }
  },

  {
    id: "preset_student",
    title: "4. Học Tập & Nghiên Cứu AI / Sinh Viên CNTT",
    icon: "🎓",
    desc: "Dành cho sinh viên, học viên công nghệ: Đồ án tốt nghiệp, luyện thi chứng chỉ quốc tế, làm dự án Hackathon và tích lũy portfolio.",
    data: {
      categories: ["AI & Automation", "Education & Training", "Personal Utilities"],
      projects: [
        {
          id: "p_thesis",
          name: "Đồ Án Tốt Nghiệp: Hệ Thống RAG Trợ Lý Pháp Lý",
          folderName: "Thesis_Legal_RAG",
          category: "AI & Automation",
          stage: "In Progress - Expanding",
          tags: ["#RAG", "#LangChain", "#Python", "#ChromaDB"],
          ideas: [
            { id: "st1", text: "Thu thập và làm sạch 1.500 văn bản pháp luật giao thông", status: "Đã xong" },
            { id: "st2", text: "Thử nghiệm vector embedding mô hình tiếng Việt chuyên sâu", status: "Đang triển khai" },
            { id: "st3", text: "Hoàn thiện báo cáo luận văn chương 3 & slide bảo vệ", status: "Chưa triển khai" }
          ]
        },
        {
          id: "p_awscert",
          name: "Luyện Thi Chứng Chỉ AWS Solutions Architect (SAA)",
          folderName: "Study_AWS_SAA",
          category: "Education & Training",
          stage: "Just Started / Inception",
          tags: ["#AWS", "#Cert", "#CloudArchitecture"],
          ideas: [
            { id: "st4", text: "Hoàn thành khóa học video 24 giờ trên Udemy", status: "Đang triển khai" },
            { id: "st5", text: "Luyện 6 đề thi thử đạt điểm số trên 85%", status: "Chưa triển khai" }
          ]
        },
        {
          id: "p_hackathon",
          name: "Dự Án Hackathon: Nhận Diện Rác Thải Bằng Camera",
          folderName: "Hackathon_Waste_Vision",
          category: "AI & Automation",
          stage: "Idea / Conceptual",
          tags: ["#ComputerVision", "#YOLOv8", "#Hackathon"],
          ideas: [
            { id: "st6", text: "Chuẩn bị dataset 2.000 ảnh phân loại rác tái chế", status: "Chưa triển khai" },
            { id: "st7", text: "Dựng demo web nhúng camera thời gian thực", status: "Chưa triển khai" }
          ]
        }
      ]
    }
  },

  {
    id: "preset_ecommerce",
    title: "5. Kinh Doanh Cá Nhân & Bán Hàng E-Commerce",
    icon: "🛍️",
    desc: "Dành cho chủ shop online, người bán hàng: Livestream TikTok, bán hàng Shopee, tự động hóa tin nhắn và quản trị đơn hàng.",
    data: {
      categories: ["Web & SaaS", "Marketing & Social", "Personal Utilities"],
      projects: [
        {
          id: "p_tiktokshop",
          name: "Gian Hàng TikTok Shop Phụ Kiện & Đồ Chơi Công Nghệ",
          folderName: "TikTokShop_TechGear",
          category: "Marketing & Social",
          stage: "In Progress - Expanding",
          tags: ["#TikTokShop", "#Livestream", "#Affiliate"],
          ideas: [
            { id: "e1", text: "Lên lịch 3 ca livestream bán hàng mỗi tuần", status: "Đã xong" },
            { id: "e2", text: "Hợp tác với 10 KOC ngành công nghệ gắn giỏ hàng affiliate", status: "Đang triển khai" },
            { id: "e3", text: "Chạy chiến dịch Flash Sale săn voucher đầu tháng", status: "Chưa triển khai" }
          ]
        },
        {
          id: "p_autocskh",
          name: "Hệ Thống Tự Động Trả Lời & Chốt Đơn Fanpage",
          folderName: "Fanpage_Auto_CSKH",
          category: "Web & SaaS",
          stage: "Near Complete - Polishing",
          tags: ["#Chatbot", "#Automation", "#ZaloOA"],
          ideas: [
            { id: "e4", text: "Xây dựng kịch bản trả lời giá và phí ship theo từ khóa", status: "Đã xong" },
            { id: "e5", text: "Đẩy tự động thông tin khách đặt sang hãng vận chuyển ViettelPost", status: "Đang triển khai" }
          ]
        },
        {
          id: "p_wintercol",
          name: "Chiến Dịch Ra Mắt Dòng Sản Phẩm Mùa Đông",
          folderName: "Campaign_Winter_Launch",
          category: "Marketing & Social",
          stage: "Idea / Conceptual",
          tags: ["#Marketing", "#ShopeeMall", "#Ads"],
          ideas: [
            { id: "e6", text: "Đặt may mẫu và chụp bộ ảnh lookbook ngoại cảnh", status: "Chưa triển khai" },
            { id: "e7", text: "Thiết lập ngân sách quảng cáo Facebook & TikTok Ads", status: "Chưa triển khai" }
          ]
        }
      ]
    }
  }
];

// Export to window
window.SAMPLE_PRESETS = SAMPLE_PRESETS;
