import React from "react";
import "../App.css";
import { makeStyles } from "@mui/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteOutlineTwoToneIcon from "@mui/icons-material/DeleteOutlineTwoTone";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: "56.25%",
  },
}));

interface CardItemProps {
  product: {
    id: number;
    title: string;
    image: string;
    price: number;
    description: string;
    rating: { rate: number; count: number };
  };
  isLiked: boolean;
  onToggleLike: () => void;
  onDelete: (id: number) => void;
}

const CardItem: React.FC<CardItemProps> = ({ product, isLiked, onToggleLike, onDelete }) => {
  const classes = useStyles();
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <Card className={classes.root} sx={{ height: "100%", cursor: "pointer" }}>
      <CardHeader
        action={
          <IconButton aria-label="delete" onClick={() => onDelete(product.id)} color="secondary">
            <DeleteOutlineTwoToneIcon />
          </IconButton>
        }
        title={product.title}
      />
      <CardMedia className={classes.media} image={product.image} onClick={handleCardClick} />
      <CardContent onClick={handleCardClick}>
        <Typography variant="body2" color="textSecondary" component="p">
          Price: {product.price} $
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          Rating: {product.rating.rate}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton onClick={onToggleLike} color="error" aria-label="like">
          {isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default CardItem;
