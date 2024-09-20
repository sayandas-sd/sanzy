"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ThumbsUp, ThumbsDown, Play, Link } from "lucide-react"

interface Video {
  id: string
  title: string
  votes: number
}

export default function Component() {
  const [inputLink, setInputLink] = useState("")
  const [previewId, setPreviewId] = useState("")
  const [currentVideo, setCurrentVideo] = useState<Video | null>(null)
  const [queue, setQueue] = useState<Video[]>([
    { id: "dQw4w9WgXcQ", title: "Rick Astley - Never Gonna Give You Up", votes: 5 },
    { id: "L_jWHffIx5E", title: "Smash Mouth - All Star", votes: 3 },
    { id: "fJ9rUzIMcZQ", title: "Queen - Bohemian Rhapsody", votes: 4 },
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
      const newVideo = { id: previewId, title: `Video ${previewId}`, votes: 0 }
      setQueue([...queue, newVideo])
      setInputLink("")
      setPreviewId("")
    }
  }

  const handleVote = (id: string, increment: number) => {
    setQueue(queue.map(video => 
      video.id === id ? { ...video, votes: video.votes + increment } : video
    ).sort((a, b) => b.votes - a.votes))
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-20">
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
            <Button onClick={playNext} className="w-full">
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
              <Button onClick={handleAddVideo}>Add</Button>
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
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Upcoming Videos</h2>
          <ul className="space-y-4">
            {queue.map((video) => (
              <li key={video.id} className="flex items-center gap-4 bg-gray-800 p-4 rounded-lg">
                <img
                  src={`https://img.youtube.com/vi/${video.id}/default.jpg`}
                  alt={video.title}
                  className="w-24 h-18 object-cover rounded"
                />
                <span className="flex-grow">{video.title}</span>
                <span className="font-bold text-xl">{video.votes}</span>
                <div className="flex gap-2">
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => handleVote(video.id, 1)}
                    aria-label="Like"
                    className="hover:bg-green-700/20"
                  >
                    <ThumbsUp className="h-5 w-5 text-green-500" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => handleVote(video.id, -1)}
                    aria-label="Dislike"
                    className="hover:bg-red-700/20"
                  >
                    <ThumbsDown className="h-5 w-5 text-red-500" />
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <footer className="border-t border-gray-800 bg-gray-950">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">&copy; 2024 Sanzy. All rights reserved.</p>
            <nav className="flex space-x-4 mt-4 md:mt-0">
              <Link href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                Privacy
              </Link>
              <Link href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                Terms
              </Link>
              <Link href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                Contact
              </Link>
            </nav>
          </div>
        </div>
      </footer>
      </div>
    </div>
  )
}