import Link from "next/link";
import { useQuery } from "react-query";

export default function IndexPage() {
  const data = useQuery("data", () => fetch("/api/").then((res) => res.json()));

  console.log(data);
  return (
    <div>
      Hello World. <pre>{JSON.stringify(data, null, 2)}</pre>
      <Link href="/about">
        <a>About</a>
      </Link>
    </div>
  );
}
