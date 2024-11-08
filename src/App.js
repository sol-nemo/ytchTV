import logo from './logo.svg';
import './App.css';
import axios from 'axios'
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

/*
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const API_KEY = "AIzaSyB7iZkZnVp1AyV997x4JF_hK1AjcQcZ1YYY";
const CHANNEL_ID = "YUC_jBXeWtwdqV14jldwAgsWg"; // Replace with a YouTube channel ID

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

*/
import React, { useState, useEffect } from 'react';

const YouTubeChannel = ({ keyword }) => {
  const [videoIds, setVideoIds] = useState([]);
  const API_KEY = "AIzaSyB7iZkZnVp1AyV997x4JF_hK1AjcQcZ1YY";

  useEffect(() => {
    // Function to fetch videos from YouTube API based on the provided keyword
    const fetchVideos = async () => {
      try {
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${keyword}&type=video&key=${API_KEY}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        const ids = data.items.map(item => item.id.videoId);
        setVideoIds(ids);
        setVideoIds(ids);
          console.log("Fetched video IDs:", ids);
          

      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchVideos();

  }, [keyword]); // Re-run when the keyword changes
  

  return (
    <div>
      <h1>Playing videos for: {keyword}</h1>
      <div>
        {videoIds.map((videoId, index) => (
          <iframe
            key={index}
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${videoId}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ))}
      </div>
    </div>
  );
};

export default YouTubeChannel;
