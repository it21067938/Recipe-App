import React, { useState } from "react";
import axios from "axios";
import Header from "../Component/header";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Modal from "@mui/material/Modal";
import favourite from './favourite';

function Home() {
  const [mealData, setMealData] = useState([]);
  const [selectedItem, setSelectedItem] = useState("");
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [open, setOpen] = useState(false);
  
  const addFav = (image, name) => {
    console.log("Favorite Added:", image, name);
  };

  const categoryAPIs = {
    Chicken: "https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken_breast",
    Beef: "https://www.themealdb.com/api/json/v1/1/filter.php?i=beef",
    Lamb: "https://www.themealdb.com/api/json/v1/1/filter.php?i=lamb",
    Pork: "https://www.themealdb.com/api/json/v1/1/filter.php?i=pork",
    Pasta: "https://www.themealdb.com/api/json/v1/1/filter.php?i=pasta",
  };

  const fetchMeals = (category) => {
    setSelectedItem(category);
    axios
      .get(categoryAPIs[category])
      .then((res) => setMealData(res.data.meals || []))
      .catch((err) => console.error(`Error fetching ${category} data:`, err));
  };

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

  return (
    <Box>
      <Header />
      <Box sx={{ marginLeft: 5,  padding: 3 }}>
        {Object.keys(categoryAPIs).map((category) => (
          <Button
            key={category}
            onClick={() => fetchMeals(category)}
            variant={selectedItem === category ? "contained" : "outlined"}
            sx={{
              borderRadius: 20,
              margin: 1,
              textTransform: "capitalize",
              borderColor: "#f28e8e",
              backgroundColor:
                selectedItem === category ? "#f28e8e" : "transparent",
              color: selectedItem === category ? "#fff" : "#f28e8e",
              "&:hover": { backgroundColor: "#f57676", color: "#fff" },
            }}
          >
            {category}
          </Button>
        ))}
      </Box>

      <Grid container spacing={2} sx={{ paddingInline: 10}}>
        {mealData.map((meal) => (
          <Grid item xs={6} sm={4} md={3} key={meal.idMeal}>
            <img
              src={meal.strMealThumb}
              alt={meal.strMeal}
              style={{ width: "100%", height: "auto", objectFit: "cover" }}
            />
            <Typography
              variant="subtitle2"
              sx={{ marginTop: 1, color: "#888", display: "flex", gap: 0.5 }}
            >
              Soups
              <FavoriteBorderIcon  onClick={() => addFav(meal.strMealThumb, meal.strMeal)} sx={{ color: "pink", fontSize: "20px" }} />
            </Typography>
            <Typography
              variant="body1"
              onClick={() => fetchMealDetails(meal.idMeal)}
              sx={{ cursor: "pointer", color: "#000" }}
            >
              {meal.strMeal}
            </Typography>
          </Grid>
        ))}
      </Grid>

      {mealData.length === 0 && selectedItem && (
        <Typography
          variant="body1"
          align="center"
          sx={{ padding: 2, color: "#888" }}
        >
          No meals available for {selectedItem}.
        </Typography>
      )}

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

export default Home;
