import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full py-2">
      <div className="container mx-auto">
        <div className="text-center text-xs text-black font-semibold">
          Desenvolvido por{" "}
          <Link
            href={"https://www.viniciusneto.dev"}
            target="_blank"
            className="text-purple hover:text-black transition-colors"
          >
            @viniciusneto
          </Link>
        </div>
      </div>
    </footer>
  );
}
