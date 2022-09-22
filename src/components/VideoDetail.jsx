import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { Typography, Box, Stack } from '@mui/material';
import { CheckCircle } from '@mui/icons-material';
import { fetchAPI } from '../utils/fetchAPI';
import Videos from './Videos'



const VideoDetail = () => {
const [videoDetail, setvideoDetail] = useState(null);
const [videos, setVideos] = useState([]);
const { id } = useParams();

useEffect(() => {
  fetchAPI(`videos?part=snippet,statistics&id=${id}`)
    .then((data) => setvideoDetail(data.items[0]));

  fetchAPI(`search?part=snippet&relatedToVideoId=${id}&type=video`)
    .then((data) => setVideos(data.items));
}, [id])

if(!videoDetail?.snippet) return 'Loading...'

const { snippet: { title, channelId, channelTitle }, 
        statistics : {viewCount, likeCount}  } = videoDetail  


        return (
    <Box minHeight="95vh">
      <Stack direction={{ xs: 'column', md: 'row'}}>
        <Box flex={1}>
          <Box sx={{width: '100%', position: 'sticky', top: '86px'}}>
            <ReactPlayer url={`https://www.youtube.com/watch?v=${id}`} className="react-player" controls />
            <Typography color="#fff" variant="h6" p={2}>
              {title}
            </Typography>
            <Stack direction='row' justifyContent="space-between" py={1} px={2} sx={{
              color: '#fff' 
            }}>
              <Link to={`/channel/${channelId}`}>
                <Typography color="#fff" variant={{
                  sm: 'subtitle1',
                  md: 'h6'
                }}>
                  {channelTitle}
                  <CheckCircle sx={{fontSize: '12px',  color: 'gray', ml:'5px'}} />
                </Typography>
              </Link>
              <Stack direction="row" gap="20px" alignItems="center" mr="10px">
                {/* view count */}
                <Typography variant="body1" sx={{
                  opacity: 0.7}}>
                    {parseInt(viewCount).toLocaleString()} views
                </Typography>
        
                {/* like count */}
                <Typography variant="body1" sx={{
                  opacity: 0.7}}>
                    {parseInt(likeCount).toLocaleString()} likes
                </Typography>
              </Stack>
            </Stack>
        </Box>
        </Box>
        <Box px={2} py={{ md: 1, xs: 3 }} justifyContent="center" alignItems="center">
      <Videos videos={videos} direction="column" />
      </Box>
      </Stack>
     
      </Box>
  );
};

export default VideoDetail