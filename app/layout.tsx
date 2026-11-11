import './globals.css';

export const metadata = {
  title: 'GREEN AI - Phân Loại Rác Thông Minh',
  description:
    'Ứng dụng AI nhận diện và phân tích nhiều vật thể rác thải qua hình ảnh, hướng dẫn phân loại và tái chế bảo vệ môi trường.',
  openGraph: {
    title: 'GREEN AI - Phân Loại Rác Thông Minh',
    description:
      'Ứng dụng AI nhận diện và phân tích nhiều vật thể rác thải qua hình ảnh, hướng dẫn phân loại và tái chế bảo vệ môi trường.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GREEN AI - Phân Loại Rác Thông Minh',
    description:
      'Ứng dụng AI nhận diện và phân tích nhiều vật thể rác thải qua hình ảnh, hướng dẫn phân loại và tái chế bảo vệ môi trường.',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body className="min-h-screen bg-slate-50 text-slate-800 antialiased selection:bg-emerald-100 selection:text-emerald-900">
        {children}
      </body>
    </html>
  );
}
