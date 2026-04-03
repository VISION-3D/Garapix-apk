export default function PageContainer({ children }) {
  return (
    <div className="max-w-md mx-auto w-full px-4 fade-in">
      {children}
    </div>
  );
}