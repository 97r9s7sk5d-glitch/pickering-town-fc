/**
 * The home page's opening video, in one continuous shot: the camera starts directly above the centre circle with
 * the badge painted in it, follows the two pikes out of the badge and across the pitch into the goal in front of the
 * Wizzie Wood Stand, then the net bursts into a real-looking water splash that surges at the camera and plunges it
 * underwater into royal blue, which PitchIntro fades into the home page.
 *
 * Made with Higgsfield (Kling 3.0) as two clips from the frames in /assets/intro-frames (topdown-start and
 * wizzie-wood-goal, then splash-start and splash-end-underwater), joined where the pikes hit the net (4.58s) and
 * compressed to /public/videos/intro.mp4 (8.2s, H.264, 2.2 MB).
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
