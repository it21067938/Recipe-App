import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../Component/header";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Modal from "@mui/material/Modal";
import { useDispatch, useSelector } from "react-redux";

function Home() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [mealData, setMealData] = useState([]);
  const [selectedItem, setSelectedItem] = useState("");
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [open, setOpen] = useState(false);

  const [favorites, setFavorites] = useState([]);
  useEffect(() => {
    function getfav() {
      axios
        .get("http://localhost:8070/recipe/view")
        .then((res) => {
          setFavorites(res.data);
        })
        .catch((err) => {
          alert(err.message);
        });
    }
    getfav();
  }, []);

  const addFav = (UID, idMeal, image, name) => {
    const isFavorite = favorites.some((fav) => fav.idMeal === idMeal);
    console.log(UID, "Favorite Added:", image, name);

    if (isFavorite) {
      alert("This meal is already in your favorites!");
      return;
    }

    const ADD_Faviourite = {
      UID,
      idMeal,
      image,
      name,
    };
    axios
      .post("http://localhost:8070/recipe/add", ADD_Faviourite)
      .then(() => {
        alert("Added FAV");
        // Update the state locally 
        setFavorites((prevFavorites) => [...prevFavorites, ADD_Faviourite]);
      })
      .catch((err) => {
        alert(err);
      });
  };

  const categoryAPIs = {
    Chicken:
      "https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken_breast",
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

  //Search
  const [search, setSerch] = useState("");
  function searchItem(event) {
    setSerch(event.target.value);
  }

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
      >
        <Box sx={{ display: "flex", gap: 1.5 }}>
          {Object.keys(categoryAPIs).map((category) => (
            <Button
              key={category}
              onClick={() => fetchMeals(category)}
              variant={selectedItem === category ? "contained" : "outlined"}
              sx={{
                borderRadius: 20,
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

        <Box>
          <input
            onChange={searchItem}
            className="form-control"
            type="search"
            placeholder="Search...."
            name="searchQuery"
            style={{
              padding: "8px 12px",
              borderRadius: "20px",
              border: "1px solid #ccc",
              outline: "none",
              marginRight: "50px",
            }}
          />
        </Box>
      </Box>

      <Grid container spacing={2} sx={{ paddingInline: 10 }}>
        {mealData
          .filter((e) => e.strMeal.toLowerCase().includes(search))
          .map((meal) => (
            <Grid item xs={6} sm={4} md={3} key={meal.idMeal}>
              <img
                src={meal.strMealThumb}
                alt={meal.strMeal}
                style={{ width: "100%", height: "auto", objectFit: "cover" }}
              />
              <Typography
                variant="subtitle2"
                sx={{ marginTop: 1, color: "#888", display: "flex", gap: 5 }}
              >
                Soups
                <FavoriteBorderIcon
                  onClick={() =>
                    addFav(
                      user.UID,
                      meal.idMeal,
                      meal.strMealThumb,
                      meal.strMeal
                    )
                  }
                  sx={{
                    color: "pink",
                    fontSize: "20px",
                    cursor: "pointer",
                  }}
                />
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

export default Home;
