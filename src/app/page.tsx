import ChapterNav from "@/components/ChapterNav";
import FilmTexture from "@/components/FilmTexture";
import SmoothScroll from "@/components/SmoothScroll";
import Coda from "@/components/scenes/Coda";
import Prologue from "@/components/scenes/Prologue";
import ChapterTwo from "@/components/scenes/camp/ChapterTwo";
import ChapterThree from "@/components/scenes/dispatch/ChapterThree";
import ChapterOne from "@/components/scenes/hotel/ChapterOne";

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <ChapterNav />
      <main>
        <Prologue />
        <ChapterOne />
        <ChapterTwo />
        <ChapterThree />
        <Coda />
      </main>
      <FilmTexture />
    </>
  );
}
