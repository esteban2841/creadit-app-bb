import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Credit Sales treace" },
    { name: "description", content: "Part of the boutique bikers logic" },
  ];
};

export default function Index() {
  return (
    <div className="flex h-screen w-full justify-center p-6">
      <h1>Credit Sales</h1>
    </div>
  );
}

