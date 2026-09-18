// 10 Diverse, Curated Sample Presets representing popular industry archetypes
const SAMPLE_PRESETS = [
  {
    id: "preset_startup",
    title: "1. Startup Công Nghệ & SaaS Founder",
    icon: "🚀",
    desc: "Xây dựng sản phẩm MVP, hạ tầng đám mây, tích hợp thanh toán Stripe và tối ưu chỉ số tăng trưởng.",
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
    desc: "Sản xuất video YouTube/TikTok, podcast khởi nghiệp, bản tin newsletter và tài trợ nhãn hàng.",
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
    desc: "Phát triển extension Chrome, công cụ xuất hóa đơn micro-SaaS và dự án nhận ngoài cho khách hàng.",
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
    desc: "Đồ án tốt nghiệp RAG Chatbot, luyện thi chứng chỉ AWS Cloud và dự án Hackathon nhận diện ảnh.",
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
    desc: "Gian hàng TikTok Shop, Shopee Mall, tự động hóa kịch bản CSKH và chiến dịch quảng cáo ra mắt sản phẩm.",
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
  },

  {
    id: "preset_agency",
    title: "6. Agency Tiếp Thị & Quảng Cáo Số (Digital Agency)",
    icon: "📢",
    desc: "Chạy quảng cáo đa kênh (Meta/Google/TikTok), dịch vụ SEO tổng thể và xây dựng nội dung chuyển đổi cao.",
    data: {
      categories: ["Marketing & Social", "Web & SaaS", "Personal Utilities"],
      projects: [
        {
          id: "p_meta_ads",
          name: "Chiến Dịch Lead Generation Bất Động Sản Nghỉ Dưỡng",
          folderName: "Agency_Meta_Campaign",
          category: "Marketing & Social",
          stage: "In Progress - Expanding",
          tags: ["#MetaAds", "#LeadGen", "#A/BTesting", "#CPL"],
          ideas: [
            { id: "ag1", text: "Thử nghiệm 6 bộ Video Creative dạng phỏng vấn chuyên gia", status: "Đã xong" },
            { id: "ag2", text: "Tối ưu chi phí mỗi khách hàng tiềm năng (CPL) dưới 120k", status: "Đang triển khai" },
            { id: "ag3", text: "Đồng bộ lead tự động về CRM Salesforce cho đội Sales", status: "Đã xong" }
          ]
        },
        {
          id: "p_seo_audit",
          name: "Dự Án SEO Tổng Thể Cho Thương Hiệu Dược Phẩm",
          folderName: "Agency_SEO_Project",
          category: "Web & SaaS",
          stage: "Near Complete - Polishing",
          tags: ["#TechnicalSEO", "#Backlink", "#ContentStrategy"],
          ideas: [
            { id: "ag4", text: "Khắc phục lỗi index và tối ưu tốc độ tải trang Mobile", status: "Đã xong" },
            { id: "ag5", text: "Xây dựng 50 bài viết Pillar chuyên sâu chuẩn Y khoa", status: "Đang triển khai" },
            { id: "ag6", text: "Mục tiêu đưa 30 từ khóa ngách vào Top 3 Google", status: "Chưa triển khai" }
          ]
        }
      ]
    }
  },

  {
    id: "preset_gamedev",
    title: "7. Xưởng Phát Triển Game Độc Lập (Indie Game Studio)",
    icon: "🎮",
    desc: "Thiết kế game 2D Pixel, cơ chế chiến đấu RPG, dựng tài nguyên đồ họa và phát hành lên Steam/Di động.",
    data: {
      categories: ["Game & Entertainment", "Desktop & Hardware", "Personal Utilities"],
      projects: [
        {
          id: "p_cyber_rogue",
          name: "CyberRogue - Game Nhập Vai Pixel 2D",
          folderName: "Game_CyberRogue_Unity",
          category: "Game & Entertainment",
          stage: "In Progress - Expanding",
          tags: ["#Unity", "#PixelArt", "#Steam", "#C#"],
          ideas: [
            { id: "gm1", text: "Hoàn thiện cơ chế di chuyển mượt mà và né đòn Dash", status: "Đã xong" },
            { id: "gm2", text: "Thuật toán sinh bản đồ hầm ngục ngẫu nhiên (Procedural Generation)", status: "Đang triển khai" },
            { id: "gm3", text: "Thiết kế 12 loại quái vật và 3 màn đấu Trùm (Boss fight)", status: "Chưa triển khai" },
            { id: "gm4", text: "Tích hợp âm thanh 8-bit và rung tay cầm Controller", status: "Chưa triển khai" }
          ]
        },
        {
          id: "p_puzzle_mobile",
          name: "WordMatch - Game Giải Đố Từ Vựng Trên Di Động",
          folderName: "Game_WordMatch_Mobile",
          category: "Game & Entertainment",
          stage: "Ready for Promotion / Launch",
          tags: ["#Godot", "#CasualGame", "#AdMob", "#Android"],
          ideas: [
            { id: "gm5", text: "Tích hợp mạng quảng cáo Google AdMob phần thưởng", status: "Đã xong" },
            { id: "gm6", text: "Kiểm thử 200 màn chơi câu đố logic không phát sinh lỗi", status: "Đã xong" },
            { id: "gm7", text: "Đăng ký chương trình chạy thử nghiệm Google Play Closed Beta", status: "Đang triển khai" }
          ]
        }
      ]
    }
  },

  {
    id: "preset_enterprise",
    title: "8. Chuyển Đổi Số & Quản Trị Vận Hành Doanh Nghiệp",
    icon: "🏢",
    desc: "Ứng dụng phần mềm không giấy tờ, tích hợp ERP, tự động hóa quy trình phê duyệt nội bộ và bảo mật dữ liệu.",
    data: {
      categories: ["Web & SaaS", "AI & Automation", "Personal Utilities"],
      projects: [
        {
          id: "p_paperless_office",
          name: "Văn Phòng Số Không Giấy Tờ (E-Office & Ký Số)",
          folderName: "Enterprise_EOffice",
          category: "Web & SaaS",
          stage: "Near Complete - Polishing",
          tags: ["#DigitalSignature", "#BPMN", "#CloudDoc", "#Security"],
          ideas: [
            { id: "ep1", text: "Tích hợp chữ ký số HSM cho ban giám đốc phê duyệt từ xa", status: "Đã xong" },
            { id: "ep2", text: "Quy trình luân chuyển hợp đồng tự động giữa các phòng ban", status: "Đã xong" },
            { id: "ep3", text: "Đào tạo hướng dẫn sử dụng cho toàn thể 150 nhân viên", status: "Đang triển khai" }
          ]
        },
        {
          id: "p_crm_sync",
          name: "Chuẩn Hóa Dữ Liệu Khách Hàng Tập Trung (Customer Data Hub)",
          folderName: "Enterprise_CRM_Hub",
          category: "Web & SaaS",
          stage: "Just Started / Inception",
          tags: ["#PostgreSQL", "#DataWarehouse", "#ETL", "#BI"],
          ideas: [
            { id: "ep4", text: "Làm sạch và hợp nhất dữ liệu bán hàng từ 3 chi nhánh", status: "Đang triển khai" },
            { id: "ep5", text: "Dựng biểu đồ trực quan doanh thu theo thời gian thực (PowerBI)", status: "Chưa triển khai" }
          ]
        }
      ]
    }
  },

  {
    id: "preset_education",
    title: "9. Giảng Viên & Xây Dựng Khóa Học Trực Tuyến",
    icon: "👨‍🏫",
    desc: "Xây dựng giáo trình, quay dựng video bài giảng thực chiến, hệ thống bài tập trắc nghiệm và cấp chứng nhận.",
    data: {
      categories: ["Education & Training", "Marketing & Social", "Personal Utilities"],
      projects: [
        {
          id: "p_course_prompting",
          name: "Khóa Học: Làm Chủ Prompt Engineering & AI Thực Chiến",
          folderName: "Course_AI_Prompting",
          category: "Education & Training",
          stage: "Ready for Promotion / Launch",
          tags: ["#EdTech", "#GenAI", "#OnlineCourse", "#VideoTutorial"],
          ideas: [
            { id: "ed1", text: "Biên soạn đề cương 8 module từ căn bản đến chuyên sâu", status: "Đã xong" },
            { id: "ed2", text: "Quay và hậu kỳ 35 video bài giảng chất lượng Full HD", status: "Đã xong" },
            { id: "ed3", text: "Tổ chức buổi Webinar miễn phí giới thiệu khóa học đầu tiên", status: "Đang triển khai" },
            { id: "ed4", text: "Xây dựng cộng đồng Discord hỗ trợ học viên giải đáp 24/7", status: "Đang triển khai" }
          ]
        },
        {
          id: "p_exam_portal",
          name: "Hệ Thống Trắc Nghiệm Tự Động Chấm Điểm Cho Học Viên",
          folderName: "Portal_Exam_Quiz",
          category: "Education & Training",
          stage: "In Progress - Expanding",
          tags: ["#React", "#NodeJS", "#AutoGrading"],
          ideas: [
            { id: "ed5", text: "Ngân hàng 500 câu hỏi trắc nghiệm chia theo cấp độ khó", status: "Đã xong" },
            { id: "ed6", text: "Tính năng tự động phát sinh chứng chỉ PDF khi đạt >80 điểm", status: "Đang triển khai" }
          ]
        }
      ]
    }
  },

  {
    id: "preset_personal_growth",
    title: "10. Phát Triển Cá Nhân & Quản Lý Thói Quen (Second Brain)",
    icon: "🎯",
    desc: "Theo dõi đọc sách, rèn luyện thể thao chạy bộ, kế hoạch tài chính đầu tư cá nhân và học ngoại ngữ.",
    data: {
      categories: ["Personal Utilities", "Education & Training"],
      projects: [
        {
          id: "p_reading_habit",
          name: "Mục Tiêu Đọc & Tóm Tắt 24 Cuốn Sách/Năm",
          folderName: "Personal_Reading_Challenge",
          category: "Personal Utilities",
          stage: "In Progress - Expanding",
          tags: ["#Books", "#SecondBrain", "#Notes", "#Mindset"],
          ideas: [
            { id: "pg1", text: "Đọc xong cuốn 'Nguyên Lý Khởi Nghiệp Tinh Gọn' và ghi chú", status: "Đã xong" },
            { id: "pg2", text: "Đọc xong cuốn 'Tâm Lý Học Về Tiền' và đúc kết 5 bài học", status: "Đã xong" },
            { id: "pg3", text: "Đang đọc cuốn 'Atomic Habits - Thay Đổi Tí Hon Hiệu Quả Bất Ngờ'", status: "Đang triển khai" },
            { id: "pg4", text: "Viết bài chia sẻ cảm nhận sách lên blog cá nhân", status: "Chưa triển khai" }
          ]
        },
        {
          id: "p_marathon_prep",
          name: "Chinh Phục Cự Ly Bán Marathon 21km",
          folderName: "Personal_Marathon_21km",
          category: "Personal Utilities",
          stage: "Near Complete - Polishing",
          tags: ["#Running", "#Health", "#Garmin", "#Discipline"],
          ideas: [
            { id: "pg5", text: "Duy trì lịch chạy 4 buổi/tuần, đạt mốc tích lũy 120km/tháng", status: "Đã xong" },
            { id: "pg6", text: "Bài chạy dài thử nghiệm cự ly 18km với tốc độ Pace 6:15", status: "Đã xong" },
            { id: "pg7", text: "Chuẩn bị gel năng lượng và trang phục thi đấu chính thức", status: "Đang triển khai" }
          ]
        }
      ]
    }
  }
];

window.SAMPLE_PRESETS = SAMPLE_PRESETS;
