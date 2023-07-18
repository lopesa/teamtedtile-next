import Head from "next/head";
interface Props {
  metaContent?: string;
}
function PageHead({ metaContent }: Props) {
  return (
    <Head>
      <title>{`Team Ted Tile -- ${metaContent}`}</title>
      <meta name="description" content={`Team Ted Tile -- ${metaContent}`} />
    </Head>
  );
}

export default PageHead;
