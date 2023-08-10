document.addEventListener("DOMContentLoaded", function() {

  function generateReviewCards() {
      const reviewsContainer = document.getElementById("reviews-container");
      reviewsContainer.innerHTML = "";

      window.reviewData.forEach((review) => {
          const card = document.createElement("div");
          card.classList.add("review-card");

          const name = document.createElement("h2");
          name.textContent = `From: ${review.name}`;

          const rating = document.createElement("p");
          rating.textContent = `Rating: ${"⭐".repeat(review.rating)}${"☆".repeat(5 - review.rating)}`;

          const reviewText = document.createElement("p");
          reviewText.textContent = `Thoughts: ${review.review}`;

          card.appendChild(name);
          card.appendChild(rating);
          card.appendChild(reviewText);

          reviewsContainer.appendChild(card);
      });
  }

  generateReviewCards();

  document.getElementById("review-form").addEventListener("submit", function(event) {
      event.preventDefault();
      const form = event.target;
      const formData = new FormData(form);
      const newReview = {
          name: formData.get("name"),
          rating: parseInt(formData.get("rating")),
          review: formData.get("review"),
      };
      window.reviewData.push(newReview);

      generateReviewCards();

      form.reset();
  });

  document.getElementById("newsletter-form").addEventListener("submit", function(event) {
      event.preventDefault();
      const form = event.target;
      const emailInput = form.querySelector('[name="email"]');

      if (!validateEmail(emailInput.value)) {
          alert("Please provide a valid email address.");
          return;
      }

      alert("Thanks for connecting with us!");

      emailInput.value = "";
  });

  function validateEmail(email) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailPattern.test(email);
  }
});
