import React, { useState, useEffect } from "react";
import Header from "../Component/header";
import Box from "@mui/material/Box";
import axios from "axios";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

function Favourite() {
  //view all fav
  const [favorite, setFavourite] = useState([]);
  useEffect(() => {
    function getFavouriteRecipe() {
      axios
        .get("http://localhost:8070/recipe/view")
        .then((res) => {
          setFavourite(res.data);
        })
        .catch((err) => {
          alert(err.message);
        });
    }
    getFavouriteRecipe();
  }, []);

  //Remove fav
  const removeFAV = (e) => {
    var result = window.confirm("Are you sure?");
  
    if (result === true) {
      axios
        .delete(`http://localhost:8070/recipe/remove/${e._id}`)
        .then((res) => {
          setFavourite((prevFavorites) => prevFavorites.filter((item) => item._id !== e._id));
        })
        .catch((err) => {
          alert(err);
        });
    } else {
      e.preventDefault();
    }
  };
  

  return (
    <Box>
      <Header />

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginLeft: 5,
          padding: 3,
        }}
      ></Box>

      <Grid container spacing={2} sx={{ paddingInline: 10 }}>
        {favorite.map((e) => (
          <Grid item xs={6} sm={4} md={3} key={e._id}>
            <img
              src={e.image}
              style={{ width: "100%", height: "auto", objectFit: "cover" }}
            />
            <Typography
              variant="subtitle2"
              sx={{ marginTop: 1, color: "#888", display: "flex", gap: 28 }}
            >
              Soups
              <RemoveCircleOutlineIcon
              onClick={() => { removeFAV(e) }}
                sx={{
                  color: "red",
                  fontSize: "20px",
                  cursor: "pointer",
                }}
              />
            </Typography>
            <Typography variant="body1" sx={{ color: "#000" }}>
              {e.name}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Favourite;
