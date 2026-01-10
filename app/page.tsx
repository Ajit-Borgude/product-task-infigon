import ClientWrapper from "@/components/ClientWrapper";
import { fetchProducts } from "@/lib/api";

export default async function Home() {
 const products = await fetchProducts();

  return (
    <ClientWrapper products={products} />
  );
}
