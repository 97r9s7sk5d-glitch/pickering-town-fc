/**
 * The home page's opening video: the camera starts directly above the centre circle with the badge painted in it,
 * follows the two pikes out of the badge and across the pitch, and ends on the goal in front of the Wizzie Wood
 * Stand as they dive into the net. Made with Higgsfield (Kling 3.0) from the two frames in /assets/intro-frames,
 * then compressed to /public/videos/intro.mp4 (H.264, 1.3 MB).
 * The royal blue splash when they hit the net is added by the site (PitchIntro), so it always lands on the goal.
 *
 * Set `introVideo` to null to use the drawn pitch animation instead.
 */
export type IntroVideo = {
  src: string;
  poster: string;
  width: number;
  height: number;
  /** Where the pikes hit the net, as a fraction of the video frame, and when (seconds): the splash starts there. */
  splash: { x: number; y: number; at: number };
};

export const introVideo: IntroVideo | null = {
  src: "/videos/intro.mp4",
  poster: "/images/intro/intro-poster.webp",
  width: 1280,
  height: 720,
  // Measured from the video: the pikes enter the net about 4.45s in, just right of centre in the goal mouth.
  splash: { x: 0.29, y: 0.37, at: 4.45 },
};
