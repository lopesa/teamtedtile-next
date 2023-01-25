import Head from "next/head";
interface Props {
  metaContent?: string;
}
function PageHead({ metaContent }: Props) {
  return (
    <Head>
      <title>{`Team Ted Tile -- ${metaContent}`}</title>
      <meta name="description" content={`Team Ted Tile -- ${metaContent}`} />
      <link rel="icon" href="/favicon.ico" type="image/x-icon" />
    </Head>
  );
}

export default PageHead;
