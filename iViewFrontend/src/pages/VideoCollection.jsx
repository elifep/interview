import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const VideoCollection = () => {
  const { interviewId } = useParams(); // Get interviewId from URL parameters
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get(`/api/video/interview/${interviewId}`);
        console.log("Gelen Videolar:", response.data); // Konsolda veriyi kontrol edin
        if (Array.isArray(response.data)) { // Gelen verinin dizi olduğunu kontrol edin
          setVideos(response.data);
        } else {
          console.error("Beklenen dizi alınamadı:", response.data);
          setVideos([]); // Hatalı durumda boş bir diziye set edebilirsiniz
        }
      } catch (err) {
        setError('Videolar yüklenirken bir hata oluştu');
        setVideos([]); // Hatalı durumda boş bir diziye set edebilirsiniz
        setLoading(false);
      }
    };
  
    fetchVideos();
  }, [interviewId]);
  

  if (loading) return <p>Loading videos...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="video-collection-page">
      <h2>Uploaded Videos</h2>
      <div className="video-grid">
        {videos.map((video) => (
          <div key={video._id} className="video-card">
            <h3>Candidate ID: {video.candidateId}</h3>
            <video controls width="300">
              <source src={`/${video.videoUrl}`} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoCollection;
