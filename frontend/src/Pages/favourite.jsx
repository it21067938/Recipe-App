import React, { useState, useEffect } from "react";
import Header from "../Component/header";
import Box from "@mui/material/Box";
import axios from "axios";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import Modal from "@mui/material/Modal";

function Favourite() {
  
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [open, setOpen] = useState(false);

  const fetchMealDetails = (idMeal) => {
    const detailAPI = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`;
    axios
      .get(detailAPI)
      .then((res) => {
        setSelectedMeal(res.data.meals[0]);
        setOpen(true);
      })
      .catch((err) => console.error("Error fetching meal details:", err));
  };

  const handleClose = () => setOpen(false);
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
          setFavourite((prevFavorites) =>
            prevFavorites.filter((item) => item._id !== e._id)
          );
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
              alt=""
              style={{ width: "100%", height: "auto", objectFit: "cover" }}
            />
            <Typography
              variant="subtitle2"
              sx={{ marginTop: 1, color: "#888", display: "flex", gap: 28 }}
            >
              Soups
              <RemoveCircleOutlineIcon
                onClick={() => {
                  removeFAV(e);
                }}
                sx={{
                  color: "red",
                  fontSize: "20px",
                  cursor: "pointer",
                }}
              />
            </Typography>
            <Typography
              variant="body1"
              sx={{ cursor: "pointer", color: "#000" }}
              onClick={() => fetchMealDetails(e.idMeal)}
            >
              {e.name}
            </Typography>
          </Grid>
        ))}
      </Grid>

      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 500,
            maxHeight: "70vh",
            bgcolor: "white",
            borderRadius: 2,
            p: 2,
            overflowY: "auto",
          }}
        >
          {selectedMeal && (
            <>
              <Typography id="meal-details-title">
                {selectedMeal.strMeal}
              </Typography>
              <img
                src={selectedMeal.strMealThumb}
                alt={selectedMeal.strMeal}
                style={{ width: "50%", marginTop: 16 }}
              />
              <Typography variant="subtitle1" sx={{ marginTop: 2 }}>
                Category: {selectedMeal.strCategory}
              </Typography>
              <Typography variant="subtitle1" sx={{ marginTop: 2 }}>
                Meal_ID: {selectedMeal.idMeal}
              </Typography>
              <Typography variant="subtitle1">
                Area: {selectedMeal.strArea}
              </Typography>
              <Typography variant="subtitle1">
                Tags: {selectedMeal.strTags}
              </Typography>
              <Typography variant="body2" sx={{ marginTop: 2 }}>
                {selectedMeal.strInstructions}
              </Typography>
              <Typography variant="body2" sx={{ marginTop: 2, color: "#888" }}>
                <a
                  href={selectedMeal.strYoutube}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Watch Recipe on YouTube
                </a>
              </Typography>
            </>
          )}
        </Box>
      </Modal>
    </Box>
  );
}

export default Favourite;
