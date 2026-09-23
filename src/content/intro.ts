/**
 * The home page's opening video: the camera starts directly above the centre circle with the badge painted in it,
 * follows the two pikes out of the badge and across the pitch, and ends on the goal in front of the Wizzie Wood
 * Stand as they dive into the net. Made with Higgsfield (Kling 3.0) from the two frames in /assets/intro-frames,
 * then compressed to /public/videos/intro.mp4 (H.264, 1.3 MB).
 * A second clip (water bursting from the net and plunging the camera into royal blue water) is being added to the
 * end, so the site no longer draws its own splash; PitchIntro fades from the water into the home page.
 *
 * Set `introVideo` to null to use the drawn pitch animation instead.
 */
export type IntroVideo = {
  src: string;
  poster: string;
  width: number;
  height: number;
  /** Seconds before the end at which the intro starts fading into the home page. */
  fadeFrom: number;
};

export const introVideo: IntroVideo | null = {
  src: "/videos/intro.mp4",
  poster: "/images/intro/intro-poster.webp",
  width: 1280,
  height: 720,
  fadeFrom: 0.8,
};
