import RichText from "../RichText";
import ImageSlider from "@/components/View/ImageSlider";
import Quote from "../Quote";
import Media from "../Media";
import VideoEmbed from "@/components/View/VideoEmbed";

export function postRenderer(section: any, index: number) {
  switch (section.__component) {
    case "shared.rich-text":
      return <RichText key={index} data={section} />;
    case "shared.slider":
      return <Image
layout="intrinsic"Slider key={index} data={section} />;
    case "shared.quote":
      return <Quote key={index} data={section} />;
    case "shared.media":
      return <Media key={index} data={section} />;
    case "shared.video-embed":
      return <VideoEmbed key={index} data={section} />;
    default:
      return null;
  }
}
