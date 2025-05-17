export interface Article {
  id: number;
  title: string;
  date: string;
  summary: string;
  content: {
    title: string;
    paragraphs: string[];
    list?: {
      title?: string;
      items: string[];
    };
    conclusion?: string;
  };
}

export const articles: Article[] = [
  {
    id: 1,
    title: "Giá Vàng Thế Giới Tác Động Như Thế Nào Đến Vàng SJC?",
    date: "15/05/2025",
    summary: "Sự chênh lệch giữa giá vàng SJC và giá vàng thế giới đang ở mức cao kỷ lục. Nguyên nhân chủ yếu đến từ chính sách quản lý của Ngân hàng Nhà nước và nhu cầu trong nước tăng cao...",
    content: {
      title: "Phân tích chi tiết",
      paragraphs: [
        "Sự chênh lệch giữa giá vàng SJC và giá vàng thế giới đang ở mức cao kỷ lục, với khoảng cách lên đến 17-18 triệu đồng/lượng. Nguyên nhân chủ yếu đến từ chính sách quản lý của Ngân hàng Nhà nước và nhu cầu trong nước tăng cao.",
        "Các yếu tố tác động đến mức chênh lệch này bao gồm:"
      ],
      list: {
        items: [
          "Chính sách độc quyền sản xuất vàng SJC",
          "Hạn chế nhập khẩu vàng nguyên liệu",
          "Nhu cầu tích trữ vàng tăng cao trong bối cảnh lạm phát",
          "Tâm lý đầu cơ trên thị trường"
        ]
      },
      conclusion: "Dự báo trong thời gian tới, mức chênh lệch này có thể sẽ tiếp tục duy trì ở ngưỡng cao nếu không có sự can thiệp mạnh mẽ từ cơ quan quản lý. Nhà đầu tư cần thận trọng khi tham gia thị trường vàng SJC với mức giá hiện tại."
    }
  },
  {
    id: 2,
    title: "Dự Báo Giá Vàng Quý 3/2025: Đâu Là Điểm Đỉnh?",
    date: "10/05/2025",
    summary: "Với các dự báo về việc FED sẽ bắt đầu cắt giảm lãi suất từ tháng 9/2025, giá vàng được kỳ vọng sẽ tiếp tục đà tăng trong quý 3. Mức kháng cự mạnh sẽ là 2.500 USD/ounce...",
    content: {
      title: "Dự báo thị trường quý 3/2025",
      paragraphs: [
        "Với các dự báo về việc FED sẽ bắt đầu cắt giảm lãi suất từ tháng 9/2025, giá vàng được kỳ vọng sẽ tiếp tục đà tăng trong quý 3. Mức kháng cự mạnh sẽ là 2.500 USD/ounce.",
        "Các yếu tố hỗ trợ giá vàng tăng trong quý 3/2025:"
      ],
      list: {
        items: [
          "Chu kỳ cắt giảm lãi suất của FED",
          "USD suy yếu",
          "Nhu cầu trú ẩn an toàn tăng do bất ổn địa chính trị",
          "Nhu cầu vàng vật chất từ các ngân hàng trung ương"
        ]
      },
      conclusion: "Tuy nhiên, nhà đầu tư cần lưu ý rằng nếu dữ liệu kinh tế Mỹ tiếp tục khả quan, FED có thể trì hoãn việc cắt giảm lãi suất, điều này sẽ tạo áp lực giảm lên giá vàng trong ngắn hạn."
    }
  },
  {
    id: 3,
    title: "Xu Hướng Giá Vàng Năm 2025: Cơ Hội Và Thách Thức",
    date: "05/05/2025",
    summary: "Năm 2025, thị trường vàng toàn cầu dự báo tiếp tục biến động mạnh do lạm phát và các yếu tố địa chính trị. Nhà đầu tư cần theo dõi sát các chỉ số kinh tế lớn và xu hướng chính sách tiền tệ của các ngân hàng trung ương.",
    content: {
      title: "Tổng quan thị trường vàng 2025",
      paragraphs: [
        "Năm 2025 được dự báo là một năm đầy biến động đối với thị trường vàng toàn cầu, với nhiều yếu tố tác động đan xen giữa cơ hội và thách thức đối với các nhà đầu tư.",
        "Các yếu tố chính ảnh hưởng đến giá vàng trong năm 2025:"
      ],
      list: {
        items: [
          "Chính sách tiền tệ của Fed và các ngân hàng trung ương lớn",
          "Diễn biến lạm phát toàn cầu",
          "Căng thẳng địa chính trị và kinh tế",
          "Nhu cầu vàng vật chất từ các quốc gia đang phát triển",
          "Biến động của đồng USD và lợi suất trái phiếu"
        ]
      },
      conclusion: "Nhìn chung, vàng vẫn sẽ là kênh đầu tư an toàn được ưa chuộng trong bối cảnh kinh tế toàn cầu còn nhiều bất ổn. Tuy nhiên, nhà đầu tư cần có chiến lược dài hạn và đa dạng hóa danh mục để tối ưu hóa lợi nhuận và quản lý rủi ro hiệu quả."
    }
  }
];
