import { JsonLd } from "@/components/seo/json-ld";
import { buildCreativeWorkSchema } from "@/lib/seo/schema";

type DemoPageFrameProps = {
  name: string;
  description: string;
  path: string;
  genre?: string;
  children: React.ReactNode;
};

export function DemoPageFrame({
  name,
  description,
  path,
  genre,
  children,
}: DemoPageFrameProps) {
  return (
    <>
      <JsonLd
        data={buildCreativeWorkSchema({
          name,
          description,
          path,
          genre,
        })}
      />
      {children}
    </>
  );
}
