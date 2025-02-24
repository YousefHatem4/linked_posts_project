import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import CommentIcon from "@mui/icons-material/Comment";
import { Comment, Post } from "../interfaces";
import Image from "next/image";
import Link from "next/link";
import { Button, TextField, Menu, MenuItem } from "@mui/material"; // Import Menu and MenuItem
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { deletePost, deletePostComment } from "../_redux/postsSlice";
import { storeDispatch } from "../_redux/store";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme }) => ({
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
  variants: [
    {
      props: ({ expand }) => !expand,
      style: {
        transform: "rotate(0deg)",
      },
    },
    {
      props: ({ expand }) => !!expand,
      style: {
        transform: "rotate(180deg)",
      },
    },
  ],
}));

export default function PostDetails({
  post,
  isComments = false,
}: {
  post: Post;
  isComments?: Boolean;
}) {
  const [expanded, setExpanded] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null); // For Menu

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget); // Open the menu
  };

  const handleMenuClose = () => {
    setAnchorEl(null); // Close the menu
  };

  let dispatch = useDispatch<storeDispatch>();

  const handleDelete = async () => {
    try {
      await dispatch(deletePost(post._id)).unwrap();
      toast.success("Post deleted successfully!");
      handleMenuClose();
    } catch (error) {
      toast.error("Failed to delete post.");
    }
  };
  // delete the comment 
  
  const [commentAnchorEl, setCommentAnchorEl] = React.useState<{
    [key: string]: HTMLElement | null;
  }>({});

const handleDeleteComment = async (commentId: string) => {
  try {
    await dispatch(deletePostComment(commentId)).unwrap();
    toast.success("Comment deleted successfully!");
    handleCommentMenuClose(commentId); // Close the comment menu after deletion
  } catch (error) {
    toast.error("Failed to delete comment.");
  }
};

  const handleCommentMenuOpen = (
    event: React.MouseEvent<HTMLElement>,
    commentId: string
  ) => {
    setCommentAnchorEl((prev) => ({
      ...prev,
      [commentId]: event.currentTarget,
    }));
  };
  const handleCommentMenuClose = (commentId: string) => {
    setCommentAnchorEl((prev) => ({ ...prev, [commentId]: null }));
  };


  const [comments, setComments] = React.useState([]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); // prevent submit reload
    let form = e.target as HTMLFormElement;

    let values = {
      // the api waiting values
      content: form.comment.value, // values of comment
      post: post._id, // the post id
    };
    let response = await fetch(`https://linked-posts.routemisr.com/comments`, {
      method: "POST",
      body: JSON.stringify(values), // transform data from json to string
      headers: {
        token: `${localStorage.getItem("token")}`,
        "Content-type": "application/json",
      },
    });
    let data = await response.json();
    setComments(data.comments);
    form.comment.value = null; // to make the input empty
  }

  return (
    <Card
      sx={{
        m: 3,
        p: 2,
        width: { xs: "90%", md: "75%", xl: "35%" },
        mx: "auto",
      }}
      elevation={5}
    >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            <Image
              src={post.user.photo}
              alt={post.user.name}
              style={{ width: "100%", height: "auto" }}
              width={40}
              height={40}
            />
          </Avatar>
        }
        action={
          <>
            <IconButton aria-label="settings" onClick={handleMenuOpen}>
              <MoreVertIcon />
            </IconButton>
            {/* Menu for Delete Option */}
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleDelete}>Delete</MenuItem>
            </Menu>
          </>
        }
        title={post.user.name}
        subheader={post.createdAt.split("T", 1)} // delete from T to the end
      />
      {/* the description of the post */}
      <Typography
        variant="body2"
        sx={{ color: "text.secondary", mb: 1, fontFamily: "cursive" }}
      >
        {post.body}
      </Typography>
      {/* the image of the post */}
      {post.image && (
        <Image
          src={post.image}
          alt={`${post.body}`}
          style={{
            width: "100%",
            objectFit: "cover",
            borderRadius: "10px",
            objectPosition: "top",
            height: "auto",
          }}
          width={400}
          height={300}
        />
      )}
      <CardContent></CardContent>
      {/* like + comment + share icons actions */}
      <CardActions
        sx={{
          width: "50%",
          mx: "auto",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {/* like of post */}
        <IconButton aria-label="add to favorites">
          <ThumbUpIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <CommentIcon />
        </ExpandMore>
        <IconButton aria-label="share">
          {" "}
          {/* icon of share */}
          <ShareIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        {/* if comments more than 0 and there isn't comments display that */}
        {post.comments.length > 0 && isComments == false ? (
          <CardContent sx={{ backgroundColor: "#eee", my: 2 }}>
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                  {" "}
                  {/* // the image of user comment creater */}
                  {!post.comments[0].commentCreator.photo.includes(
                    "undefined"
                  ) ? (
                    <Image
                      src={post.comments[0].commentCreator.photo}
                      alt={post.comments[0].commentCreator.name}
                      style={{ width: "100%", height: "auto" }}
                      width={40}
                      height={40}
                    />
                  ) : (
                    post.comments[0].commentCreator.name.slice(0, 1)
                  )}
                </Avatar>
              }
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
              title={post.comments[0].commentCreator.name}
              subheader={post.comments[0].createdAt.split("T", 1)} // delete from T to the end
            />
            {/* content of post */}
            <Typography sx={{ marginBottom: 2, width: "80%", mx: "auto" }}>
              {post.comments[0].content}
            </Typography>
            <Link
              href={`/singlePost/${post._id}`}
              style={{
                textAlign: "right",
                width: "100%",
                display: "block",
                color: "#09c",
              }}
            >
              {" "}
              View All Comments{" "}
            </Link>
          </CardContent>
        ) : // if comment more than 0 and there is comments also then map to all comments to display it
        post.comments.length > comments.length && isComments ? (
          post.comments.map((comment: Comment) => (
            <CardContent
              key={comment._id}
              sx={{ backgroundColor: "#eee", my: 2 }}
            >
              <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                    {" "}
                    {/* // the image of user comment creater */}
                    {!comment.commentCreator.photo.includes("undefined") ? (
                      <Image
                        src={comment.commentCreator.photo}
                        alt={comment.commentCreator.name}
                        style={{ width: "100%", height: "auto" }}
                        width={40}
                        height={40}
                      />
                    ) : (
                      comment.commentCreator.name.slice(0, 1)
                    )}
                  </Avatar>
                }
                action={
                  <>
                    <IconButton
                      aria-label="settings"
                      onClick={(e) => handleCommentMenuOpen(e, comment._id)}
                    >
                      <MoreVertIcon />
                    </IconButton>

                    <Menu
                      anchorEl={commentAnchorEl[comment._id] || null}
                      open={Boolean(commentAnchorEl[comment._id])}
                      onClose={() => handleCommentMenuClose(comment._id)}
                    >
                      <MenuItem
                        onClick={() => handleDeleteComment(comment._id)}
                      >
                        Delete Comment
                      </MenuItem>
                    </Menu>
                  </>
                }
                title={comment.commentCreator.name}
                subheader={comment.createdAt.split("T", 1)} // delete from T to the end
              />
              {/* content of post */}
              <Typography sx={{ marginBottom: 2, width: "80%", mx: "auto" }}>
                {comment.content}
              </Typography>
            </CardContent>
          ))
        ) : (
          comments.map((comment: Comment) => (
            <CardContent
              key={comment._id}
              sx={{ backgroundColor: "#eee", my: 2 }}
            >
              <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                    {" "}
                    {/* // the image of user comment creater */}
                    {!comment.commentCreator.photo.includes("undefined") ? (
                      <Image
                        src={comment.commentCreator.photo}
                        alt={comment.commentCreator.name}
                        style={{ width: "100%", height: "auto" }}
                        width={40}
                        height={40}
                      />
                    ) : (
                      comment.commentCreator.name.slice(0, 1)
                    )}
                  </Avatar>
                }
                action={
                  <IconButton aria-label="settings" onClick={handleMenuOpen}>
                    <MoreVertIcon />
                  </IconButton>
                }
                title={comment.commentCreator.name}
                subheader={comment.createdAt.split("T", 1)} // delete from T to the end
              />
              {/* content of post */}
              <Typography sx={{ marginBottom: 2, width: "80%", mx: "auto" }}>
                {comment.content}
              </Typography>
            </CardContent>
          ))
        )}
        <form
          style={{
            padding: "1rem",
            display: "flex",
            gap: "0.5rem",
            alignItems: "center",
          }}
          onSubmit={(e) => handleSubmit(e)}
        >
          <TextField
            name="comment"
            id="comment"
            label="Add a comment"
            type="text"
            variant="outlined"
            sx={{
              flex: 1,
              borderRadius: "8px",
              backgroundColor: "#f5f5f5",
              "& .MuiOutlinedInput-root": {
                borderRadius: "20px",
              },
              "& .MuiInputLabel-root": {
                fontSize: "1rem",
                color: "#555",
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#ccc",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#1976d2",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#1976d2",
              },
            }}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{
              borderRadius: "20px",
              padding: "8px 16px",
              backgroundColor: "#1976d2", // MUI primary blue
              color: "#fff",
              textTransform: "none",
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: "#1565c0",
              },
            }}
          >
            Add
          </Button>
        </form>
      </Collapse>
    </Card>
  );
}
