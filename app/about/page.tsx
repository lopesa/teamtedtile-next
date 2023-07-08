import HomeSplash from "components/homeSplash";
import Overlay from "components/overlay";
import OverlayImageHeader from "components/OverlayImageHeader";
import styles from "styles/about.module.scss";
import { getApiUrlBase } from "utils/GeneralUtils";
import Image from "next/image";
import PageHead from "components/PageHead";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Team Ted Tile -- About",
  description: "About Team Ted Tile",
};

type IAboutData = {
  copy: string;
  bodyImages?: {
    data: {
      id: number;
      attributes: {
        name: string;
        alternativeText?: string;
        url: string;
        width: number;
        height: number;
      };
    }[];
  };
};

interface IAboutResponse {
  data: {
    id: number;
    attributes: IAboutData;
  };
}

interface IAboutProps extends IAboutData {
  notFound: boolean;
}

const getAboutPageData = async (): Promise<{
  props: IAboutProps;
}> => {
  const res = await fetch(`${getApiUrlBase()}/api/about?populate=*`).catch(
    (e) => {}
  );
  if (res && res.ok) {
    const json: IAboutResponse = await res.json();
    return {
      props: {
        copy: json.data.attributes.copy,
        bodyImages: json.data.attributes.bodyImages,
        notFound: false,
      },
    };
  } else {
    return { props: { copy: "", notFound: true } };
  }
};

export default async function About() {
  const props = await getAboutPageData();
  const copy = props.props.copy.replace(/\n/, "\n");
  let copyAsArray = copy.length ? copy.split(/\n/).filter((a) => a.length) : [];
  const bodyImages = props.props.bodyImages;
  return (
    <>
      <PageHead metaContent="About" />
      <Overlay>
        <>
          <OverlayImageHeader
            backgroundImage="/images/ted_calvert_at_work.jpg"
            backgroundPosition="0 40%"
            backgroundSize="cover"
            copyright="Ruth Hyndman Design"
            title="about"
          />
          <div className={`overlay-body ${styles.aboutContainer}`}>
            {copyAsArray.length &&
              copyAsArray.map((p: string, i: number) => {
                const insert =
                  i === copyAsArray.length - 2 ? (
                    <div key={i}>
                      <div className={styles.photos}>
                        {bodyImages?.data.length &&
                          bodyImages.data.map((img, i) => {
                            return (
                              <div key={i} className={styles.photo}>
                                <Image
                                  src={`${getApiUrlBase()}${
                                    img.attributes.url
                                  }`}
                                  alt={
                                    img.attributes.alternativeText ||
                                    "ttt_image"
                                  }
                                  width={img.attributes.width || 0}
                                  height={img.attributes.height || 0}
                                />
                              </div>
                            );
                          })}
                      </div>
                      <p>{p}</p>
                    </div>
                  ) : (
                    <p key={i}>{p}</p>
                  );
                return insert;
              })}

            <div className={styles.logoblock}>
              <div className={styles.logo}></div>
              <p>
                license #814515<br></br> Team Ted Tile is licensed, bonded and
                insured.
              </p>
            </div>
            <div className={styles.logocopy}>
              Team Ted Tile is licensed, bonded and insured.
            </div>
          </div>
        </>
      </Overlay>
      {/* <HomeSplash /> */}
    </>
  );
}
