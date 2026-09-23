/**
 * The home page's opening video: the camera starts directly above the centre circle with the badge painted in it,
 * follows the two pikes out of the badge and across the pitch, and ends on the goal in front of the Wizzie Wood
 * Stand as they dive into the net. Made with Higgsfield from the two frames in /public/images/intro.
 * The royal blue splash when they hit the net is added by the site (PitchIntro), so it always lands on the goal.
 *
 * Set `introVideo` to null to use the drawn pitch animation instead.
 */
export type IntroVideo = {
  src: string;
  poster: string;
  width: number;
  height: number;
  /** Where the pikes hit the net, as a fraction of the video frame: the splash starts here. */
  splash: { x: number; y: number };
};

export const introVideo: IntroVideo | null = {
  // CONFIRM: served from Higgsfield for now. Once the club sends the file, put it in /public/videos and point here.
  src: "https://d8j0ntlcm91z4.cloudfront.net/user_3JSRPkm2Z8mcuv7Ixeo3VVxt5rS/hf_20260923_211840_c6863b07-3c56-4fb6-a29a-5a2edc0d35c7.mp4",
  poster: "/images/intro/topdown-start.jpg",
  width: 1280,
  height: 720,
  splash: { x: 0.266, y: 0.34 },
};
