interface Article {
  id: number;
  title: string;
  date: string;
  summary: string;
  author?: string;
  references?: string[];
  content: {
    title: string;
    introduction?: string;
    sections?: Array<{
      title: string;
      content: string[];
      chart?: string;
    }>;
    paragraphs?: string[];
    list?: {
      title?: string;
      items: string[];
    };
    conclusion: string;
  };
}

export const articles: Article[] = [
  {
    id: 1,
    title: "Phân Tích Sâu: Xu Hướng Giá Vàng 6 Tháng Đầu Năm 2025",
    date: "01-06-2025",
    summary: "Báo cáo chi tiết với dữ liệu độc quyền về biến động giá vàng và các yếu tố tác động",
    author: "Nguyễn Văn A - Chuyên gia phân tích thị trường",
    references: [
      "World Gold Council Q1 2025 Report",
      "Federal Reserve Economic Data", 
      "Vietnam Gold Traders Association"
    ],
    content: {
      title: "Phân Tích Xu Hướng Giá Vàng 6 Tháng Đầu Năm 2025",
      introduction: "Năm 2025 bắt đầu với nhiều biến động mạnh trên thị trường vàng toàn cầu. Bài phân tích này dựa trên dữ liệu từ 15 nguồn uy tín và phỏng vấn độc quyền với 5 chuyên gia hàng đầu.",
      
      sections: [
        {
          title: "Diễn biến giá nổi bật",
          content: [
            "Giá vàng thế giới dao động mạnh trong khoảng $2,100 - $2,450/ounce, biên độ 16.7% - mức cao nhất 5 năm.",
            "Giá vàng SJC đạt đỉnh 78.5 triệu đồng/lượng vào tháng 3, cao hơn 12.4% so với đầu năm.",
            "Chênh lệch giá vàng thế giới và trong nước trung bình 18.7%, cao hơn mức trung bình 5 năm (14.2%)."
          ],
          chart: "gold-price-comparison-chart.png"
        },
        {
          title: "Yếu tố tác động chính",
          content: [
            "Chính sách tiền tệ: FED duy trì lãi suất cao đến Q2/2025",
            "Lạm phát toàn cầu trung bình 5.8%, cao hơn mục tiêu 2%",
            "Nhu cầu vàng vật chất tăng 22% tại châu Á",
            "Dòng vốn an toàn do căng thẳng địa chính trị"
          ],
          chart: "gold-demand-factors.png"
        }
      ],
      conclusion: "Giá vàng dự kiến tiếp tục biến động mạnh trong năm 2025. Nhà đầu tư nên đa dạng hóa danh mục và theo dõi sát các chỉ báo kinh tế vĩ mô."
    }
  },
  {
    id: 2,
    title: "Dự Báo Giá Vàng Trong Quý 2 Năm 2024",
    date: "15-05-2024",
    summary: "Dự báo giá vàng sẽ có xu hướng tăng trong quý 2 năm 2024.",
    content: {
      title: "Dự Báo Giá Vàng Trong Quý 2 Năm 2024",
      paragraphs: [
        "Các chuyên gia kinh tế và phân tích thị trường vàng đồng thuận rằng quý 2/2024 giá vàng sẽ tiếp tục đà tăng nhờ nhu cầu đầu tư tăng cao khi các thị trường tài chính có nhiều biến động.",
        "Sự bất ổn trên thị trường chứng khoán toàn cầu, đặc biệt là những lo ngại về suy thoái kinh tế tại các nền kinh tế lớn như Mỹ, châu Âu đã thúc đẩy dòng vốn chảy vào vàng như một tài sản an toàn.",
        "Mặt khác, nhu cầu vàng vật chất, bao gồm trang sức và tích trữ từ các quốc gia châu Á, cũng đóng góp đáng kể vào việc duy trì sức cầu vàng."
      ],
      list: {
        title: "Dự báo giá vàng theo từng tháng:",
        items: [
          "Tháng 6: Dự kiến giá sẽ dao động quanh mức 11.800.000 VNĐ/lượng do sự ổn định tương đối của thị trường tiền tệ.",
          "Tháng 7: Giá có thể tăng nhẹ lên khoảng 12.000.000 VNĐ/lượng khi các dữ liệu kinh tế Mỹ cho thấy tăng trưởng chậm lại.",
          "Tháng 8: Tiếp tục xu hướng tăng với mức dự báo 12.200.000 VNĐ/lượng do tác động từ các sự kiện địa chính trị và chính sách tiền tệ."
        ]
      },
      conclusion: "Nhà đầu tư nên cân nhắc đầu tư vàng trong quý 2 như một phần của danh mục đa dạng, đồng thời theo dõi sát sao các chỉ báo kinh tế để điều chỉnh kịp thời."
    }
  },
  {
    id: 3,
    title: "Xu Hướng Đầu Tư Vàng Trong Năm 2024",
    date: "30-05-2024",
    summary: "Khám phá xu hướng đầu tư vàng trong năm 2024 và những điều cần lưu ý.",
    content: {
      title: "Xu Hướng Đầu Tư Vàng Trong Năm 2024",
      paragraphs: [
        "Năm 2024 được dự đoán là năm nhiều thách thức cho các nhà đầu tư khi các nền kinh tế lớn đang trong quá trình điều chỉnh chính sách nhằm kiểm soát lạm phát và ổn định tài chính.",
        "Vàng tiếp tục khẳng định vị trí là một kênh đầu tư an toàn khi các rủi ro toàn cầu về kinh tế, địa chính trị vẫn hiện hữu và có thể làm gia tăng nhu cầu trú ẩn tài sản.",
        "Tuy nhiên, nhà đầu tư cần có kiến thức sâu và phân tích kỹ lưỡng để chọn thời điểm và hình thức đầu tư phù hợp nhằm tối đa hóa lợi nhuận và hạn chế rủi ro."
      ],
      list: {
        title: "Những điều cần lưu ý khi đầu tư vào vàng:",
        items: [
          "Theo dõi các chỉ số kinh tế vĩ mô như lạm phát, tăng trưởng GDP, và lãi suất để dự đoán xu hướng giá vàng.",
          "Đánh giá rủi ro và lợi nhuận trên cơ sở các kịch bản biến động thị trường tài chính.",
          "Chọn thời điểm đầu tư hợp lý, tránh mua vào khi giá đã đạt đỉnh hoặc bán ra khi giá ở đáy tạm thời.",
          "Đa dạng hóa hình thức đầu tư vàng: vàng vật chất, quỹ ETF vàng, tài khoản vàng điện tử, v.v."
        ]
      },
      conclusion: "Đầu tư vào vàng có thể mang lại lợi nhuận cao nếu được thực hiện đúng cách, kết hợp giữa phân tích kỹ thuật và cơ bản, đồng thời có chiến lược quản lý rủi ro rõ ràng."
    }
  },
  {
    id: 4,
    title: "Giá Vàng Thế Giới Tác Động Như Thế Nào Đến Vàng SJC?",
    date: "15/05/2025",
    summary: "Sự chênh lệch giữa giá vàng SJC và giá vàng thế giới đang ở mức cao kỷ lục. Nguyên nhân chủ yếu đến từ chính sách quản lý của Ngân hàng Nhà nước và nhu cầu trong nước tăng cao...",
    content: {
      title: "Phân tích chi tiết",
      paragraphs: [
        "Giá vàng SJC trong nước có mức chênh lệch lớn so với giá vàng thế giới, lên tới 17-18 triệu đồng mỗi lượng, cao hơn rất nhiều so với mức chênh lệch bình thường trong các năm trước.",
        "Nguyên nhân chủ yếu nằm ở chính sách quản lý thị trường vàng của Ngân hàng Nhà nước Việt Nam, bao gồm việc hạn chế nhập khẩu vàng nguyên liệu và duy trì quyền sản xuất độc quyền vàng SJC cho một số doanh nghiệp nhất định.",
        "Ngoài ra, nhu cầu tích trữ vàng trong nước tăng cao do lo ngại về lạm phát và biến động tỷ giá cũng góp phần đẩy giá vàng SJC lên cao hơn giá thế giới.",
        "Sự kỳ vọng về lợi nhuận từ đầu cơ và tâm lý tích trữ vàng trong dân cư cũng là những yếu tố quan trọng làm tăng chênh lệch giá."
      ],
      list: {
        items: [
          "Chính sách độc quyền sản xuất vàng SJC, giới hạn nguồn cung trên thị trường.",
          "Hạn chế nhập khẩu vàng nguyên liệu để kiểm soát nguồn cung và tỷ giá ngoại tệ.",
          "Nhu cầu tích trữ vàng tăng cao trong bối cảnh lạm phát kéo dài và kinh tế không ổn định.",
          "Tâm lý đầu cơ và kỳ vọng lợi nhuận từ chênh lệch giá vàng trong nước và thế giới."
        ]
      },
      conclusion: "Dự báo trong thời gian tới, mức chênh lệch này có thể duy trì ở ngưỡng cao nếu không có sự can thiệp mạnh mẽ từ cơ quan quản lý. Nhà đầu tư cần thận trọng khi tham gia thị trường vàng SJC ở mức giá hiện tại, nên theo dõi sát sao diễn biến và cân nhắc các rủi ro liên quan."
    }
  },
  {
    id: 5,
    title: "Dự Báo Giá Vàng Quý 3/2025: Đâu Là Điểm Đỉnh?",
    date: "10/05/2025",
    summary: "Với các dự báo về việc FED sẽ bắt đầu cắt giảm lãi suất từ tháng 9/2025, giá vàng được kỳ vọng sẽ tiếp tục đà tăng trong quý 3. Mức kháng cự mạnh sẽ là 2.500 USD/ounce...",
    content: {
      title: "Dự báo thị trường quý 3/2025",
      paragraphs: [
        "Các dự báo mới nhất cho thấy FED nhiều khả năng sẽ bắt đầu cắt giảm lãi suất từ tháng 9/2025 để hỗ trợ nền kinh tế tăng trưởng sau giai đoạn thắt chặt chính sách tiền tệ mạnh mẽ trước đó.",
        "Việc này sẽ tạo điều kiện thuận lợi cho giá vàng tăng trưởng khi chi phí cơ hội của việc nắm giữ vàng giảm xuống và dòng vốn tìm đến các tài sản an toàn tăng lên.",
        "Mức kháng cự mạnh của giá vàng trên thị trường thế giới được dự báo nằm ở mức 2.500 USD/ounce, nếu vượt qua ngưỡng này, giá có thể bứt phá mạnh mẽ.",
        "Tuy nhiên, các rủi ro địa chính trị, biến động tỷ giá USD và diễn biến kinh tế toàn cầu vẫn là những yếu tố không thể bỏ qua khi đưa ra quyết định đầu tư."
      ],
      list: {
        items: [
          "FED có thể bắt đầu cắt giảm lãi suất từ tháng 9/2025.",
          "Giá vàng thế giới có thể chạm mức 2.500 USD/ounce trong quý 3.",
          "Nhu cầu trú ẩn an toàn gia tăng do bất ổn địa chính trị.",
          "Tỷ giá USD biến động gây ảnh hưởng lớn đến giá vàng.",
          "Các sự kiện kinh tế lớn như báo cáo việc làm Mỹ, dữ liệu GDP cũng tác động đáng kể."
        ]
      },
      conclusion: "Nhà đầu tư cần theo dõi chặt chẽ chính sách tiền tệ và các sự kiện kinh tế để tận dụng cơ hội gia tăng giá vàng, đồng thời có chiến lược quản lý rủi ro phù hợp."
    }
  }
];
