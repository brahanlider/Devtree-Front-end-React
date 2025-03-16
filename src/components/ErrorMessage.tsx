export default function ErrorMessage({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <p className="p-3 text-sm text-center text-red-600 uppercase bg-red-50">
      {children}
    </p>
  );
}
