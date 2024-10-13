export default function Layout({ children }) {
  return (
    <div className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-lg p-4">{children}</div>
    </div>
  );
}
