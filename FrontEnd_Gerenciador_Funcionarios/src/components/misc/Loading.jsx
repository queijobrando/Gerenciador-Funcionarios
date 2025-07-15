export default function Loading({ size = 8 }) {
  // size em rem (8 = 2rem = 32px)
  const dimension = size + "rem";

  return (
    <div
      className="border-4 border-gray-300 border-t-slate-700 rounded-full animate-spin"
      style={{ width: dimension, height: dimension }}
      role="status"
      aria-label="Carregando"
    />
  );
}
