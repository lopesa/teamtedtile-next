import { GetStaticProps } from "next";
import HomeSplash from "../components/homeSplash";
import Overlay from "../components/overlay";
import OverlayImageHeader from "../components/OverlayImageHeader";
import styles from "../styles/about.module.scss";
import { getApiUrlBase } from "../utils";
import Image from "next/image";

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

export default function About({ copy, bodyImages }: IAboutProps) {
  copy = copy.replace(/\n\s*\n/g, "\n");
  let copyAsArray = copy.length ? copy.split(/\n/) : [];
  return (
    <>
      <Overlay>
        <>
          <OverlayImageHeader
            backgroundImage="/images/ted_calvert_at_work.jpg"
            backgroundPosition="0 40%"
            backgroundSize="cover"
            copyright="Ruth Hyndman Design"
            title="about"
            style={{ flexShrink: 0 }}
          />
          <div className={`overlay-body ${styles.aboutContainer}`}>
            {copy.length &&
              copyAsArray.map((p: string, i: number) => {
                const paragraph = <p key={i}>{p}</p>;
                const insert =
                  i === copyAsArray.length - 2 ? (
                    <>
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
                      {paragraph}
                    </>
                  ) : (
                    paragraph
                  );
                return insert;
              })}
          </div>
        </>
      </Overlay>
      <HomeSplash />
    </>
  );
}

export const getStaticProps: GetStaticProps = async (): Promise<{
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
