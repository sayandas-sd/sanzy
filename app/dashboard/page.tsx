"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ThumbsUp, ThumbsDown, Play, Music } from "lucide-react"


interface Video {
  id: string
  title: string
  likes: number
  dislikes: number
}


export default function Component() {
  const [inputLink, setInputLink] = useState("")
  const [previewId, setPreviewId] = useState("")
  const [currentVideo, setCurrentVideo] = useState<Video | null>(null)
  const [queue, setQueue] = useState<Video[]>([
    { id: "dQw4w9WgXcQ", title: "Rick Astley - Never Gonna Give You Up", likes: 5, dislikes: 1 },
    { id: "L_jWHffIx5E", title: "Smash Mouth - All Star", likes: 3, dislikes: 2 },
    { id: "fJ9rUzIMcZQ", title: "Queen - Bohemian Rhapsody", likes: 4, dislikes: 0 },
  ])


  const extractVideoId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/
    const match = url.match(regExp)
    return (match && match[2].length === 11) ? match[2] : null
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputLink(e.target.value)
    const videoId = extractVideoId(e.target.value)
    if (videoId) {
      setPreviewId(videoId)
    } else {
      setPreviewId("")
    }
  }

  const handleAddVideo = () => {
    if (previewId) {
      const newVideo = { id: previewId, title: `Video ${previewId}`, likes: 0, dislikes: 0 }
      setQueue([...queue, newVideo])
      setInputLink("")
      setPreviewId("")
    }
  }

  const handleVote = (id: string, isLike: boolean) => {
    setQueue(queue.map(video => 
      video.id === id
        ? { ...video, [isLike ? 'likes' : 'dislikes']: video[isLike ? 'likes' : 'dislikes'] + 1 }
        : video
    ).sort((a, b) => (b.likes - b.dislikes) - (a.likes - a.dislikes)))

    fetch("/api/streams/upvote",{
      method: "POST",
      body: JSON.stringify({
        streamId: id
      })
    })
  }

  

  const playNext = () => {
    if (queue.length > 0) {
      setCurrentVideo(queue[0])
      setQueue(queue.slice(1))
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-950 text-gray-100 items-center">
      <div className="container mx-auto p-4 max-w-4xl">
        <h1 className="text-3xl font-bold text-center mb-8">Stream Song Voting </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Current Video</h2>
            {currentVideo ? (
              <div className="aspect-video rounded-lg overflow-hidden">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${currentVideo.id}`}
                  allowFullScreen
                  className="border-0"
                ></iframe>
              </div>
            ) : (
              <div className="aspect-video bg-gray-800 flex items-center justify-center rounded-lg">
                <p>No video playing</p>
              </div>
            )}
            <Button onClick={playNext} className="w-full bg-purple-600 hover:bg-purple-700 text-white mt-7">
              <Play className="mr-2 h-4 w-4" /> Play Next
            </Button>
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Add Video</h2>
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Enter YouTube URL"
                value={inputLink}
                onChange={handleInputChange}
                className="bg-gray-800 border-gray-700 text-gray-100"
              />
              <Button onClick={handleAddVideo} className="bg-purple-600 hover:bg-purple-700 text-white">Add</Button>
            </div>
            {previewId && (
              <div className="aspect-video rounded-lg overflow-hidden">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${previewId}`}
                  allowFullScreen
                  className="border-0"
                ></iframe>
              </div>
            )}
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4">Upcoming Videos</h2>
          <ul className="space-y-4">
            {queue.map((video) => (
              <li key={video.id} className="flex items-center gap-4 bg-gray-800 p-4 rounded-lg">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Music className="w-8 h-8 text-white" />
                </div>
                <div className="flex-grow">
                  <h3 className="font-semibold text-lg line-clamp-1">{video.title}</h3>
                  <p className="text-sm text-gray-400">Score: {video.likes - video.dislikes}</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => handleVote(video.id, true)}
                    aria-label={`Like (${video.likes})`}
                    className="relative"
                  >
                    <ThumbsUp className="h-5 w-5" />
                    <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {video.likes}
                    </span>
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => handleVote(video.id, false)}
                    aria-label={`Dislike (${video.dislikes})`}
                    className="relative"
                  >
                    <ThumbsDown className="h-5 w-5" />
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {video.dislikes}
                    </span>
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}