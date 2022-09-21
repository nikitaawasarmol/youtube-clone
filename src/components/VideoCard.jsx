import React from 'react'
import {Link} from 'react-router-dom';
import { Typography, Card, CardContent, CardMedia, snackbarClasses } from '@mui/material';
import {CheckCircle} from '@mui/icons-material'
import {demoThumbnailUrl, demoVideoUrl, demoVideoTitle, demoChannelUrl, demoChannelTitle} from '../utils/constants'
const VideoCard = ({video: {id: {videoId}, snippet }}) => {
    console.log();
  return (
    <Card sx={{ width: { md: '320px', xs: '100%' }, boxShadow: 'none', borderRadius: 'none'}}>
        <Link to={videoId ? `/video/${videoId}` : demoVideoUrl}>
            <CardMedia 
            image={snippet?.thumbnails?.high?.url}
            alt={snackbarClasses.title}
            sx={{width: 358, height:180 }}
            />
        </Link>
        <CardContent sx={{ backgroundColor: '#1e1e1e', height: '106px' }}> 
        <Link to={videoId ? `/video/${videoId}` : demoVideoUrl}>
          <Typography variant="subtitle1" fontWeight="bold" color="#fff">
            {snippet?.title.slice(0, 60) || demoVideoTitle.slice(0, 60)}
          </Typography>
        </Link>

        <Link to={snippet?.channelId ? `/channel/${videoId}` : demoChannelUrl}>
          <Typography variant="subtitle2" fontWeight="bold" color="gray">
            {snippet?.channelTitle || demoChannelTitle}
          <CheckCircle sx={{ fontSize: 12, color:'gray', ml:'5px' }}></CheckCircle>
          </Typography>
        </Link>


        </CardContent>
    </Card>
  )
}

export default VideoCard