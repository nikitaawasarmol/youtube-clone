import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { Typography, Box, Stack } from '@mui/material';
import { CheckCircle } from '@mui/icons-material';
import Videos from './Videos';
import { fetchAPI } from '../utils/fetchAPI';




const VideoDetail = () => {
const [videoDetail, setvideoDetail] = useState(null);
const { id } = useParams();

useEffect(() => {
  fetchAPI(`videos?part=snippet,statistics&id=${id}`)
    .then((data) => setvideoDetail(data.items[0]));
}, [id])

if(!videoDetail?.snippet) return 'Loading...'

const { snippet: { title, channelId, channelTitle }, 
        statistics : {viewCount, likeCount}  } = videoDetail  


        return (
    <Box minHeight="95vh">
      <Stack direction={{ xs: 'column', md: 'row'}}>
        <Box flex={1}>
          <Box sx={{width: '100%', position: 'sticky', top: '86px'}}></Box>
            <ReactPlayer url={`https://www.youtube.com/watch?v=${id}`} className="react-player" controls />
            <Typography color="#fff" variant="h6" p={2}>
              {title}
            </Typography>
            <Stack direction='row' justifyContent="space-between" py={1} px={2} sx={{
              color: '#fff' 
            }}>
              <Link to={`/channel/${channelId}`}>
                <Typography>
                  {channelTitle}
                </Typography>
              </Link>
            </Stack>
        </Box>
      </Stack>
    </Box>
  )
}

export default VideoDetail