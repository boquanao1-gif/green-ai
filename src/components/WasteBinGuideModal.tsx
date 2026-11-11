import React from 'react';
import { X, Trash2, RefreshCw, AlertTriangle, Apple } from 'lucide-react';

interface WasteBinGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WasteBinGuideModal: React.FC<WasteBinGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const bins = [
    {
      title: 'Thùng Vàng / Trắng - Rác Tái Chế',
      category: 'Rác tái chế',
      icon: RefreshCw,
      color: 'bg-amber-500 text-white',
      border: 'border-amber-200 bg-amber-50/50',
      tagColor: 'bg-amber-100 text-amber-900 border-amber-300',
      description: 'Các vật liệu có thể thu hồi tái chế lại thành sản phẩm mới.',
      examples: [
        'Chai nhựa PET (nước suối, nước ngọt), can nhựa HDPE (dầu ăn, dầu gội)',
        'Giấy báo, thùng carton sạch, sách vở cũ',
        'Lon nước ngọt bằng nhôm, vỏ đồ hộp bằng sắt, kim loại phế liệu',
        'Chai lọ thủy tinh nguyên vẹn, hũ thủy tinh',
      ],
      tips: 'Cần làm sạch cặn thức ăn hoặc nước đọng, ép dẹp chai/lon trước khi bỏ vào thùng.',
    },
    {
      title: 'Thùng Xanh Lá - Rác Hữu Cơ',
      category: 'Rác hữu cơ',
      icon: Apple,
      color: 'bg-emerald-600 text-white',
      border: 'border-emerald-200 bg-emerald-50/50',
      tagColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
      description: 'Chất thải dễ phân hủy sinh học, dùng để ủ phân compost hoặc làm khí sinh học biogas.',
      examples: [
        'Thức ăn thừa, cơm nguội, canh cặn, vỏ bánh',
        'Vỏ rau củ, vỏ chuối, vỏ dưa, hạt quả',
        'Bã cà phê, bã trà, xác thuốc đông y',
        'Hoa lá cây rụng, cỏ cắt tỉa từ sân vườn',
      ],
      tips: 'Không bỏ lẫn túi nilon hoặc màng bọc thực phẩm vào thùng rác hữu cơ.',
    },
    {
      title: 'Thùng Đỏ / Cam - Rác Nguy Hại',
      category: 'Rác nguy hại',
      icon: AlertTriangle,
      color: 'bg-rose-600 text-white',
      border: 'border-rose-200 bg-rose-50/50',
      tagColor: 'bg-rose-100 text-rose-900 border-rose-300',
      description: 'Chất thải chứa yếu tố độc hại, dễ cháy, nổ, ăn mòn gây nguy hiểm cho người và môi trường.',
      examples: [
        'Pin tiểu cũ (AA, AAA), ắc quy xe máy/ô tô',
        'Bóng đèn huỳnh quang, đèn compact hỏng chứa thủy ngân',
        'Chai lọ thuốc trừ sâu, bình xịt côn trùng, dung môi hóa chất',
        'Nhiệt kế thủy ngân vỡ, thuốc tây hết hạn',
        'Linh kiện điện tử hỏng, bo mạch điện thoại/máy tính',
      ],
      tips: 'Phải để riêng biệt trong túi kín hoặc hộp cứng, nộp tại các điểm thu hồi pin/rác nguy hại công cộng.',
    },
    {
      title: 'Thùng Xám / Đen - Rác Vô Cơ / Rác Còn Lại',
      category: 'Rác vô cơ / Rác còn lại',
      icon: Trash2,
      color: 'bg-slate-700 text-white',
      border: 'border-slate-200 bg-slate-50/50',
      tagColor: 'bg-slate-200 text-slate-800 border-slate-300',
      description: 'Các loại rác không thuộc 3 nhóm trên, không thể tái chế và phải đem đi chôn lấp hoặc đốt phát điện.',
      examples: [
        'Hộp xốp thực phẩm dính dầu mỡ không thể rửa sạch',
        'Túi nilon bẩn, màng co thực phẩm mỏng',
        'Khăn giấy ăn đã qua sử dụng, tã bỉm trẻ em, băng vệ sinh',
        'Gốm, sứ, sành vỡ, thủy tinh vỡ vụn',
        'Quần áo cũ rách nát không thể tái sử dụng',
      ],
      tips: 'Buộc chặt túi rác để tránh rò rỉ nước rỉ rác và mùi hôi ra môi trường.',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-slate-100 p-5 flex items-center justify-between z-10">
          <div>
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2.5 h-6 rounded-full bg-emerald-600 inline-block"></span>
              Quy Chuẩn Phân Loại Rác Tại Nguồn Việt Nam
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Áp dụng theo quy định của Luật Bảo vệ Môi trường Việt Nam mới nhất
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-700 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {bins.map((bin, idx) => {
              const Icon = bin.icon;
              return (
                <div
                  key={idx}
                  className={`rounded-xl border p-5 flex flex-col justify-between ${bin.border}`}
                >
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center shadow-xs ${bin.color}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900 text-base leading-snug">{bin.title}</h3>
                        <span className={`inline-block px-2 py-0.5 rounded text-[11px] font-semibold border ${bin.tagColor}`}>
                          {bin.category}
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-slate-600 mb-3">{bin.description}</p>

                    <div className="bg-white/80 rounded-lg p-3 border border-slate-200/60 mb-3">
                      <h4 className="text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Ví dụ phổ biến:
                      </h4>
                      <ul className="space-y-1 text-xs text-slate-600">
                        {bin.examples.map((ex, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="text-emerald-500 font-bold">•</span>
                            <span>{ex}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="text-[11px] text-slate-600 bg-white/60 p-2.5 rounded-lg border border-slate-200/40">
                    <span className="font-semibold text-slate-800">Lưu ý xử lý:</span> {bin.tips}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-200 text-xs text-emerald-900 flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">
              ✓
            </div>
            <div>
              <span className="font-bold">Lợi ích từ việc phân loại rác:</span> Giúp giảm tới 70% lượng rác phải chôn lấp, tiết kiệm tài nguyên thiên nhiên, giảm thiểu khí thải nhà kính và bảo vệ môi trường sống cho tương lai.
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-slate-100 p-4 flex justify-end bg-slate-50 rounded-b-2xl">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 transition-colors"
          >
            Đã hiểu & Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
