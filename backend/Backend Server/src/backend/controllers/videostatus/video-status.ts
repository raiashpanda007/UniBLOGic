import { asyncHandler, response } from "../../utilities/utilities";
import {
  video_transcoded,
  video_uploading,
  video_hls,
  video_process,
} from "./video-status.controller";
import { z as zod } from "zod";

const video_statusSchema = zod.object({
  key: zod.string(),
});

const video_status = asyncHandler(async (req, res) => {
  const parsedData = video_statusSchema.safeParse(req.body);
  if (!parsedData.success) {
    return res
      .status(400)
      .json(new response(400, "No key provided for polling", {}));
  }

  const key = parsedData.data.key;

  // Initialize local state
  const state = {
    video_status: "not uploaded",
    result: false,
  };

  try {
    // Check if the video is uploaded
    const isUploaded = await video_uploading(key);
    if (!isUploaded) {
      state.video_status = "video uploading to the bucket";
      return res.status(200).json(new response(200, "Video status", state));
    }

    state.video_status = "uploaded && video quality transcoding started";

    // Check if the video is transcoded
    const isTranscoded = await video_transcoded(key);
    if (!isTranscoded) {
      state.video_status = "video uploaded but only quality transcoding started";
      return res.status(200).json(new response(200, "Video status", state));
    }

    state.video_status = "video hls and quality transcoding";

    // Check if HLS generation has started
    const isHlsGenerated = await video_hls(key);
    if (!isHlsGenerated) {
      state.video_status = "video uploaded and transcoded, HLS generation pending";
      return res.status(200).json(new response(200, "Video status", state));
    }

    state.video_status = "video uploaded and transcoded and HLS generation is ongoing";

    // Check if all video processing steps are complete
    const isProcessed = await video_process(key);
    if (!isProcessed) {
      state.video_status = "video uploaded and transcoded, HLS generation incomplete";
      return res.status(200).json(new response(200, "Video status", state));
    }

    // All steps completed
    state.video_status = "video uploaded, transcoded, and HLS generation complete";
    state.result = true;

    return res.status(200).json(new response(200, "Video status", state));
  } catch (error) {
    console.error("Error in video status checking:", error);
    return res.status(500).json(new response(500, "Internal Server Error", {}));
  }
});

export default video_status;
