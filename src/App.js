import logo from './logo.svg';
import './App.css';
/*
function App() {
  return (
    <div className="App">
      <h1>you is to </h1>
    </div>
  );
}

export default App;
 */

// src/App.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const API_KEY = "YOUR_YOUTUBE_API_KEY"; // Replace with your API key
const CHANNEL_ID = "YOUR_CHANNEL_ID"; // Replace with a YouTube channel ID

function App() {
  const [videos, setVideos] = useState([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  // Fetch videos on component mount
  useEffect(() => {
    fetchVideos();
  }, []);

  // Fetch YouTube videos from a specific channel
  const fetchVideos = async () => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/search`, {
          params: {
            part: "snippet",
            channelId: CHANNEL_ID,
            maxResults: 10,
            order: "date",
            type: "video",
            key: API_KEY,
          },
        }
      );
      setVideos(response.data.items);
    } catch (error) {
      console.error("Error fetching videos", error);
    }
  };

  // Autoplay the next video when the current one ends
  const handleVideoEnd = () => {
    setCurrentVideoIndex((prevIndex) =>
      prevIndex === videos.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="App">
      <h1>YT_CHTV</h1>
      {videos.length > 0 ? (
        <div className="video-container">
          <iframe
            width="100%"
            height="500px"
            src={`https://www.youtube.com/embed/${videos[currentVideoIndex].id.videoId}?autoplay=1&controls=0`}
            title="YouTube video player"
            allow="autoplay"
            onEnded={handleVideoEnd}
            frameBorder="0"
          ></iframe>
          <p>{videos[currentVideoIndex].snippet.title}</p>
        </div>
      ) : (
        <p>Loading videos...</p>
      )}
    </div>
  );
}

export default App;
