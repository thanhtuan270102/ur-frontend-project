import pandas as pd
import matplotlib.pyplot as plt

# Giả sử bạn có dữ liệu tài liệu
data = pd.DataFrame({
    'symbolNumber': ['123', '124', '125', '126', '127', '128'],
    'description': ['Document A about finance', 'Document B about health', 
                    'Document C about finance', 'Document D about health', 
                    'Document E about finance and health', 'Document F about technology'],
    'createdAt': ['2021-01-01', '2021-02-01', '2021-03-01', '2021-04-01', '2021-05-01', '2021-06-01'],
    'issuingAuthority': ['Authority A', 'Authority B', 'Authority B', 'Authority B', 'Authority C', 'Authority C']
})

# Tạo báo cáo: Ví dụ số lượng tài liệu theo cơ quan phát hành
doc_counts = data['issuingAuthority'].value_counts()

# Biểu đồ cột
plt.figure(figsize=(10, 6))
doc_counts.plot(kind='bar', color='skyblue')
plt.title('Số lượng tài liệu theo cơ quan phát hành')
plt.xlabel('Cơ quan phát hành')
plt.ylabel('Số lượng tài liệu')
plt.xticks(rotation=45)
plt.tight_layout()
plt.show()
