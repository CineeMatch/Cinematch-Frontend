import { Box, Card } from "@mui/material"
import CategoriesBar from '../components/community/CategoriesBar.jsx'
import { useEffect, useState } from "react"
import PostCard from "../components/community/PostCard.jsx"
import { getPostsByUserId, getPostsUserByCategoryId } from "../api/post/post.js"
import { useParams } from "react-router-dom"


const PostPage = () => {
    const { userId } = useParams();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true)
    const [selectedCategoryId, setSelectedCategoryId] = useState(null); 
    const [posts, setPosts] = useState([]);

    useEffect(() => {
      const fetchPosts = async () => {
        try {
          if (selectedCategoryId) {
            const data = await getPostsUserByCategoryId(selectedCategoryId);
            setPosts(data);
          } else {
            const data = await getPostsByUserId(userId);
            setPosts(data);
          }
        } catch (err) {
          console.error("Postlar alınamadı:", err.message);
        }
      };
      fetchPosts();
    }, [selectedCategoryId, userId]);
    
    return (
        <Box sx={{ 
            display: "flex",
            justifyContent:"spsace-between",
            alignItems: "flex-start",
            width: "100vw",
            minHeight: "100vh",
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.79), rgba(0, 0, 0, 0.5)), url(/images/main-Photoroom.png)`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            gap: 2,
        }}>
        <Card sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            overflowY: "auto",
            flexGrow: 1,
            marginRight: isSidebarOpen ? "300px" : "35px",
            transition: "margin 0.3s ease",
            p: 4,
            borderRadius: 3,
            boxShadow: "0px 4px 10px rgba(255, 255, 255, 0.5)",
            bgcolor: "rgba(0, 0, 0, 0.6)",
            color: "white",
            position: "relative",
            ml: 2,
            marginBottom: 2,
            gap: 2,
            marginTop: 10,
            }}
        >
      {posts.map((item) => (
        <PostCard
          key={item.id}
          id={item.id}
          nickname={item.nickname}
          text={item.contentText}
          selectedMovie={item.Movie.title}
        />
      ))}
    </Card>
            <CategoriesBar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} onCategorySelect={setSelectedCategoryId}/>
        </Box>
    )
}

export default PostPage
